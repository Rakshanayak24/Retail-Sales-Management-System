const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory SQLite
const db = new sqlite3.Database(":memory:");

// Correct CSV path for Railway (using __dirname safely)
const CSV_PATH = path.join(__dirname, "../data/truestate_assignment_dataset.csv");

// EXACT 26 COLUMNS
const COLS = [
    "Transaction ID", "Date", "Customer ID", "Customer Name", "Phone Number",
    "Gender", "Age", "Customer Region", "Customer Type", "Product ID",
    "Product Name", "Brand", "Product Category", "Tags", "Quantity",
    "Price per Unit", "Discount Percentage", "Total Amount", "Final Amount",
    "Payment Method", "Order Status", "Delivery Type", "Store ID",
    "Store Location", "Salesperson ID", "Employee Name"
];

// LOAD CSV → MEMORY → SQLITE
function loadCSVIntoMemory() {
    return new Promise((resolve, reject) => {
        const rows = [];

        fs.createReadStream(CSV_PATH)
            .pipe(csv())
            .on("data", (row) => {
                const safeRow = COLS.map(col => row[col] ?? null);
                rows.push(safeRow);
            })
            .on("end", () => {
                console.log(`Loaded ${rows.length} rows into memory...`);

                db.serialize(() => {
                    db.run(`
                        CREATE TABLE transactions (
                            transaction_id TEXT,
                            date TEXT,
                            customer_id TEXT,
                            customer_name TEXT,
                            phone_number TEXT,
                            gender TEXT,
                            age INTEGER,
                            customer_region TEXT,
                            customer_type TEXT,
                            product_id TEXT,
                            product_name TEXT,
                            brand TEXT,
                            product_category TEXT,
                            tags TEXT,
                            quantity INTEGER,
                            price_per_unit REAL,
                            discount_percentage REAL,
                            total_amount REAL,
                            final_amount REAL,
                            payment_method TEXT,
                            order_status TEXT,
                            delivery_type TEXT,
                            store_id TEXT,
                            store_location TEXT,
                            salesperson_id TEXT,
                            employee_name TEXT
                        )
                    `);

                    const insert = db.prepare(
                        `INSERT INTO transactions VALUES (${Array(26).fill("?").join(",")})`
                    );

                    rows.forEach(r => insert.run(r));
                    insert.finalize();

                    console.log("In-memory SQL database is ready.");
                    resolve();
                });
            })
            .on("error", (err) => {
                console.error("CSV Load Error:", err);
                reject(err);
            });
    });
}

// ----------------------------
//      API ENDPOINT
// ----------------------------
app.get("/api/transactions", (req, res) => {
    const {
        search = "",
        region,
        gender,
        minAge,
        maxAge,
        category,
        payment,
        startDate,
        endDate,
        sort,
        page = 1
    } = req.query;

    const params = [];
    let where = "WHERE 1=1";

    if (search) {
        where += " AND (LOWER(customer_name) LIKE ? OR phone_number LIKE ?)";
        params.push(`%${search.toLowerCase()}%`, `%${search}%`);
    }

    function addFilter(field, value) {
        if (!value) return;
        const list = value.split(",");
        where += ` AND ${field} IN (${list.map(() => "?").join(",")})`;
        params.push(...list);
    }

    addFilter("customer_region", region);
    addFilter("gender", gender);
    addFilter("product_category", category);
    addFilter("payment_method", payment);

    if (minAge) { where += " AND age >= ?"; params.push(minAge); }
    if (maxAge) { where += " AND age <= ?"; params.push(maxAge); }

    if (startDate) { where += " AND date >= ?"; params.push(startDate); }
    if (endDate) { where += " AND date <= ?"; params.push(endDate); }

    const countQuery = `SELECT COUNT(*) AS total FROM transactions ${where}`;

    db.get(countQuery, params, (err, countResult) => {
        if (err) return res.json({ error: err.message });

        const total = countResult.total;
        const pageSize = 10;
        const totalPages = Math.ceil(total / pageSize);
        const offset = (page - 1) * pageSize;

        let mainQuery = `SELECT * FROM transactions ${where}`;

        if (sort === "date_desc") mainQuery += " ORDER BY date DESC";
        if (sort === "qty") mainQuery += " ORDER BY quantity DESC";
        if (sort === "name") mainQuery += " ORDER BY customer_name ASC";

        mainQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;

        db.all(mainQuery, params, (err, rows) => {
            if (err) return res.json({ error: err.message });

            res.json({
                page: Number(page),
                pageSize,
                total,
                totalPages,
                data: rows
            });
        });
    });
});

// START SERVER (Railway Compatible)
loadCSVIntoMemory().then(() => {
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log("=============================================");
        console.log(`   Backend running on PORT: ${PORT}`);
        console.log("=============================================");
    });
});



