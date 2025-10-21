# Run Tracker Frontend

Simple web interface for tracking running activities.

## Features
## Features
- ✅ Display all runs in a table
- ✅ View statistics (all-time, weekly, monthly, yearly)
- ✅ Add new runs via form
- ✅ Delete individual runs
- ✅ Delete all runs
- [ ] Edit existing runs

## Tech Stack
- Vanilla JavaScript
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
- `DELETE /runs/{id}` - Delete specific run ✨ NEW!
- `DELETE /runs` - Delete all runs ✨ NEW!

## What I Learned
- Async/await and Promises
- DOM manipulation
- Event listeners and callbacks
- fetch API
  
## What I Learned (Part 2)
- Form handling and preventDefault
- FormData API and Object.fromEntries()
- POST requests with fetch
- Importance of Content-Type headers
- JSON.stringify() for request bodies
- HTTP status codes (415 errors)
- 
## What I Learned (Part 3)
- Data attributes (dataset) for storing element metadata
- DELETE requests with fetch
- DOM manipulation (removing elements)
- Creating dynamic delete buttons for table rows