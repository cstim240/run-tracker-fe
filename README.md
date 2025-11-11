# Run Tracker Frontend

Simple web interface for tracking running activities.

## Features
- ✅ Display all runs in a table
- ✅ View statistics (all-time, weekly, monthly, yearly)
- ✅ Add new runs via form
- ✅ Edit existing runs
- ✅ Delete individual runs
- ✅ Delete all runs

## Tech Stack
- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- Fetch API for REST calls

## Setup
1. Ensure backend is running on `localhost:8080`
2. Open `index.html` in browser
3. That's it!

## API Endpoints Used
- `GET /runs` - Fetch all runs
- `GET /runs/stats` - All-time statistics
- `GET /runs/stats/week` - Weekly stats
- `GET /runs/stats/month` - Monthly stats
- `GET /runs/stats/year` - Yearly stats
- `POST /runs` - Create new run
- `PUT /runs/{id}` - Update existing run
- `DELETE /runs/{id}` - Delete specific run
- `DELETE /runs` - Delete all runs

## What I Learned

### Part 1: Reading Data
- Async/await and Promises
- DOM manipulation (createElement, appendChild)
- fetch API and response.json()
- Event listeners and callbacks
- for...of vs for...in loops

### Part 2: Creating Data
- Form handling and preventDefault
- FormData API and Object.fromEntries()
- POST requests with fetch
- Importance of Content-Type headers
- JSON.stringify() for request bodies
- HTTP status codes (415 errors)

### Part 3: Deleting Data
- Data attributes (dataset) for storing element metadata
- DELETE requests with fetch
- DOM manipulation (removing elements)
- Creating dynamic delete buttons for table rows

### Part 4: Updating Data
- Form state management (create vs edit modes)
- Populating form fields programmatically
- PUT requests
- Conditional logic (POST vs PUT based on mode)
- .value vs .textContent for form inputs
- Handling different input types (text, radio, select)
- Array.find() for searching objects
- UX patterns (cancel button, mode switching)

## Project Structure
```
runtracker-frontend/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Next Steps
- Add CSS styling for better UI/UX
- Add filtering and sorting functionality
- Add form validation
- Refactor to a modern framework (React/Vue)
- Deploy the application