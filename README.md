Overview
A complete Retail Sales Management System scaffold for the TruEstate SDE Intern assignment — includes backend (Express + SQLite), frontend (React Vite), full-text search, multi-select filters, sorting, and pagination. Designed for easy extension and deployment.

Tech Stack
- Backend: Node.js, Express, SQLite (better-sqlite3)
- Frontend: React (Vite)
- Import: CSV -> SQLite script (streaming-friendly)

Search Implementation Summary
Full-text search is implemented server-side by performing case-insensitive LIKE searches on `customer_name` and `phone_number`. Search works together with all filters and sorting and is exposed via the `/api/transactions` endpoint.

Filter Implementation Summary
Filters are applied server-side using query parameters. Supported filters include: customer_region, gender, age range, product_category, tags (partial match), payment_method, and date range. Filters can be combined and preserve state across pagination and sorting.

Sorting Implementation Summary
Sorting options supported: date (newest first), quantity (desc), customer_name (A–Z). Sorting is applied server-side and always preserves active search and filters.

Pagination Implementation Summary
Server-side pagination with page size 10. Responses include `total` result count, `page`, and `pageSize`. Frontend supports Next / Previous and retains active search/filter/sort state.

Setup Instructions
1. Unzip the project.
2. Backend:
   - cd backend
   - npm install
   - Create data folder at repo root: mkdir ../data
   - Run importer: node ../scripts/import_csv.js ../dataset.csv data/transactions.db
   - Start server: npm start
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev
4. Open frontend URL (Vite default http://localhost:5173) and ensure backend is running at http://localhost:4000/api/transactions?page=1&limit=10
