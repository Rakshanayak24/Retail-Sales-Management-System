## Architecture Document
# Backend Architecture

1. Framework: Express.js

- The backend is built with Express.js, serving a REST API that exposes all necessary endpoints under /api/transactions.

- The backend uses SQLite (with the better-sqlite3 library) for simple, lightweight database management.

- SQL indexes are created on fields frequently used for filtering and searching to improve performance.

## Backend Modules:

## 1. controllers/

- Handle HTTP requests, parse query parameters, and interact with the services.

- Example: TransactionsController.js that handles GET /api/transactions.

## 2. services/

- Contains the business logic for handling data.

- Example: TransactionsService.js builds SQL queries based on user filters and sorting options.

## 3. routes/

- Define the Express routes and link controllers to them.

- Example: transactionsRoutes.js connects API endpoints to the relevant controller methods.

## 4.utils/

- Utility functions that assist with SQL query construction, validation, and any other shared functionality.

- Example: queryBuilder.js helps to safely construct SQL queries with filters and sorting.

## Data Flow in Backend:

1. The frontend sends API requests with parameters (search term, filters, sorting options, and pagination).

2. The backend processes the incoming request, validates parameters, and constructs an SQL query dynamically.

3. SQL query is executed using SQLite and the result is returned in JSON format.

4. The frontend renders the response, including the required page, total records, and pagination controls.

## Frontend Architecture

- Framework: React (Vite)

- The frontend is built using React and the Vite bundler for fast development and building.

- All UI components are designed to be reusable and modular.

## Frontend Components:

## 1. SearchBar:

- A search bar component that lets the user search for customers by name or phone number.

## 2. FilterPanel:

- A multi-select filter panel with options for Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, and Date Range.

## 3. TransactionsTable:

- A table component that displays the transaction data in a list/grid format with support for sorting and pagination.

## 4. SortDropdown:

- A dropdown for sorting options, such as Date (Newest First), Quantity (Descending), and Customer Name (A-Z).

## 5. PaginationControls:

- Pagination component to handle Next / Previous navigation with an active state for page size and current page.

## Data Flow in Frontend:

1. The user interacts with the UI elements (search, filter, sort, and pagination).

2. Frontend builds query parameters based on user input and calls the backend API (/api/transactions).

3. The backend processes the query and sends the data back to the frontend.

4. The frontend renders the received data and updates the pagination controls.

## Data Flow

1. User Interaction: 
- The user interacts with UI elements (Search, Filters, Sort, Pagination).

2. Frontend API Call:
-  The frontend constructs the query string with the selected filters, sorting options, and pagination parameters and sends a GET request to the backend at /api/transactions.

## Backend Data Handling:

- The backend receives the query string, validates parameters, and constructs an SQL query using these parameters (e.g., WHERE, ORDER BY, LIMIT/OFFSET).

- The query is executed against the SQLite database, and a response containing data, page number, and total records is returned.

## Frontend Data Rendering:

- The frontend receives the response in JSON format, which includes the filtered data, pagination details (current page, total records), and renders it in the TransactionsTable component.

- Pagination controls are updated based on the total number of records and the current page.

## Folder Structure
root/
├── backend/
│   ├── node_modules/                    # Backend dependencies
│   ├── src/
│   │   ├── controllers/                 # Handle HTTP requests, parse query params
│   │   ├── services/                    # Business logic for queries and DB
│   │   ├── utils/                       # Helpers like SQL builders, validation
│   │   ├── routes/                      # Express route definitions
│   │   └── index.js                     # Backend entry point
│   ├── package.json                     # Backend dependencies and scripts
│   └── README.md                        # Backend-specific README
├── frontend/
│   ├── node_modules/                    # Frontend dependencies
│   ├── src/
│   │   ├── components/                  # React components for various UI parts
│   │   ├── services/                    # API calls and query param building
│   │   ├── App.jsx                      # Main entry component
│   │   ├── Pagination.jsx               # Pagination component
│   │   ├── FilterBarTop.jsx             # Filter bar with multi-select options
│   │   ├── TransactionsTable.jsx        # Table for displaying transactions
│   │   ├── Sidebar.jsx                  # Sidebar component
│   │   ├── SummaryCards.jsx             # Cards for total units sold, amount, etc.
│   │   ├── Topbar.jsx                   # Topbar with search and UI elements
│   │   └── index.js                     # Main entry point for frontend
│   ├── public/                          # Public static assets
│   ├── package.json                     # Frontend dependencies and scripts
│   └── README.md                        # Frontend-specific README
├── data/
│   ├── transactions.db                  # SQLite database for storing transactions
│   ├── transactions.db-journal          # Journal file for SQLite
│   ├── truestate_assignment_dataset.csv # Raw dataset (CSV)
├── docs/
│   └── architecture.md                  # Detailed architecture document
├── scripts/                             # Helper scripts for data import or other utilities
│   ├── import_csv.js                    # Script to import data into the database
├── .gitignore                           # Git ignore rules
├── package-lock.json                    # Lock file for consistent dependencies
├── package.json                         # Root package.json (if monorepo setup)
└── README.md                            # General project README

## Module Responsibilities

# Controllers:

- Responsible for translating HTTP requests into service calls and handling responses (e.g., fetching data).

- Example: TransactionsController.js.

# Services:

- Contains business logic, including the safe construction of SQL queries and executing them against the database.

- Example: TransactionsService.js.

# Utils:

- Small helper functions such as sanitizing inputs, parsing arrays, and constructing SQL queries safely.

- Example: queryBuilder.js.

# Frontend Components:

- SearchBar: Collects search input for customer name or phone.

- FilterPanel: Displays filters for customer region, gender, age range, etc.

- TransactionsTable: Renders a table of transactions.

- SortDropdown: Provides sorting options for the table.

- PaginationControls: Handles page navigation with "Next" and "Previous" buttons.