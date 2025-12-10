/*
CSV -> SQLite importer
Usage: node import_csv.js path/to/data.csv path/to/output.db
*/
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Database = require('better-sqlite3');

const inPath = process.argv[2];
const outPath = process.argv[3] || path.join(__dirname, '..', 'data', 'transactions.db');

if (!inPath || !fs.existsSync(inPath)){ console.error('Provide CSV path as first arg'); process.exit(1); }

if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive:true });

const db = new Database(outPath);
db.exec(`DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  transaction_id TEXT,
  date TEXT,
  customer_id TEXT,
  customer_name TEXT,
  phone_number TEXT,
  gender TEXT,
  age INTEGER,
  customer_region TEXT,
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
);
CREATE INDEX idx_customer_name ON transactions(customer_name);
CREATE INDEX idx_phone ON transactions(phone_number);
CREATE INDEX idx_region ON transactions(customer_region);
CREATE INDEX idx_date ON transactions(date);
`);
const insert = db.prepare(`INSERT INTO transactions VALUES (
  @transaction_id,@date,@customer_id,@customer_name,@phone_number,@gender,@age,@customer_region,
  @product_id,@product_name,@brand,@product_category,@tags,@quantity,@price_per_unit,@discount_percentage,
  @total_amount,@final_amount,@payment_method,@order_status,@delivery_type,@store_id,@store_location,
  @salesperson_id,@employee_name
)`);
const stream = fs.createReadStream(inPath).pipe(csv());
let count = 0;
stream.on('data', (row)=>{
  insert.run({
    transaction_id: row['Transaction ID'] || row['TransactionId'] || '',
    date: row['Date'] || row['Transaction Date'] || '',
    customer_id: row['Customer ID'] || '',
    customer_name: row['Customer Name'] || '',
    phone_number: row['Phone Number'] || '',
    gender: row['Gender'] || '',
    age: row['Age'] || null,
    customer_region: row['Customer Region'] || '',
    product_id: row['Product ID'] || '',
    product_name: row['Product Name'] || '',
    brand: row['Brand'] || '',
    product_category: row['Product Category'] || '',
    tags: row['Tags'] || '',
    quantity: row['Quantity'] || 0,
    price_per_unit: row['Price per Unit'] || 0,
    discount_percentage: row['Discount Percentage'] || 0,
    total_amount: row['Total Amount'] || 0,
    final_amount: row['Final Amount'] || 0,
    payment_method: row['Payment Method'] || '',
    order_status: row['Order Status'] || '',
    delivery_type: row['Delivery Type'] || '',
    store_id: row['Store ID'] || '',
    store_location: row['Store Location'] || '',
    salesperson_id: row['Salesperson ID'] || '',
    employee_name: row['Employee Name'] || ''
  });
  count++;
  if (count % 10000 === 0) console.log('Inserted', count);
});
stream.on('end', ()=>{ console.log('Done. Inserted', count, 'rows'); db.close(); });
