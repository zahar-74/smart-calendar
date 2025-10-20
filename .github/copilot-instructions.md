# Smart Calendar - AI Agent Instructions

## Project Overview
Smart Calendar is a web-based calendar application that supports multiple user types (students, employees, organizations) with event management capabilities. The application uses a PHP backend with MySQL database and vanilla JavaScript frontend.

## Architecture & Data Flow

### Database Structure
- Central database: `smart_calendar` (MySQL)
- Key tables:
  - `users`: Stores user accounts with type-based classification
  - `events`: Stores calendar events with JSON support for participants

### Component Overview
- Frontend (`index.html`, `script.js`, `style.css`):
  - Single-page application architecture
  - Modular UI components (login, register, dashboard, calendar, events)
  - Client-side state management via `currentUser`

- Backend (PHP files):
  - `db.php`: Database connection handler
  - Authentication: `login.php`, `register.php`, `logout.php`
  - Event operations: `create_event.php`, `edit_event.php`, `delete_event.php`, `get_events.php`
  - Session-based authentication required for all operations

## Development Workflows

### Database Setup
1. Ensure MySQL server is running locally
2. Execute `create_db.sql` to initialize database schema
3. Default credentials in `db.php`: 
   ```php
   $servername = "localhost"
   $username = "root"
   $password = ""
   ```

### Frontend Patterns
- UI State Management:
  - Use `showX()` functions for view transitions (e.g., `showLogin()`, `showDashboard()`)
  - Toggle visibility using `hidden` CSS class
  - Example: `document.getElementById('componentId').classList.toggle('hidden')`

- AJAX Patterns:
  - Use `fetch()` for API calls
  - Form submissions use `application/x-www-form-urlencoded` format
  - Standard response handling pattern:
    ```javascript
    fetch('endpoint.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
    }).then(response => response.text())
    ```

### Backend Patterns
- Session Management:
  - All authenticated endpoints must start with `session_start()`
  - Verify authentication with `$_SESSION['user_id']` check
  - Example:
    ```php
    if (!isset($_SESSION['user_id'])) {
        echo "Not logged in";
        exit;
    }
    ```

## Integration Points
- Events data structure:
  ```sql
  {
    title: string,
    description: text,
    start_datetime: datetime,
    end_datetime: datetime,
    location: string,
    participants: JSON
  }
  ```

- User types: 'student', 'employee', 'organization'
- Session-based authentication required for all API endpoints
- Participants are stored as JSON arrays in the events table

## Common Tasks
- Adding new event fields:
  1. Update `events` table in `create_db.sql`
  2. Modify event form in `index.html`
  3. Update `create_event.php` and `edit_event.php`
  
- Adding new user types:
  1. Modify `user_type` ENUM in `create_db.sql`
  2. Update registration form options in `index.html`