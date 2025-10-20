# Smart Calendar System Regulations Document

## Preface

This document outlines the requirements and specifications for the development of a Smart Calendar system. The system is designed to assist users such as students, employees, and organizations in managing their schedules, events, reminders, and tasks efficiently. It aims to provide a user-friendly interface with real-time collaboration features and integration with existing calendars.

The purpose of this document is to serve as a comprehensive guide for developers, stakeholders, and users, ensuring that the system meets the specified needs and adheres to best practices in software development.

## Introduction

The Smart Calendar system is a web-based application that allows users to schedule events, set reminders, and manage tasks. It supports user registration and authentication, an admin dashboard, event creation and management, calendar integration, collaborative scheduling, real-time notifications, and reminders & task management.

The system will be built using JavaScript for the frontend, PHP for the backend, and MySQL (via XAMPP) for the database. This document details the functional and non-functional requirements, along with prototypes, scenarios, use cases, and specifications.

## Analysis of Similar Systems

Similar systems include Google Calendar, Outlook Calendar, and Apple Calendar. These systems offer event scheduling, reminders, and sharing features. However, they often lack advanced collaborative tools for organizations or real-time notifications without additional integrations. Our system will differentiate by providing seamless real-time collaboration and task management integrated into the calendar view.

## Glossary

- **Event**: A scheduled occurrence with date, time, location, and participants.
- **Reminder**: A notification set for an upcoming event or task.
- **Task**: A to-do item associated with the calendar.
- **Collaboration**: The ability for multiple users to edit shared events.
- **Integration**: Syncing with external calendars like Google or Outlook.
- **Admin Dashboard**: A control panel for administrators to manage users and system settings.

## Functional User Requirements (Natural Language)

1. As a user, I want to register an account so that I can access the calendar system.
2. As a user, I want to log in to my account to view and manage my events.
3. As an admin, I want to access a dashboard to monitor users and manage group calendars.
4. As a user, I want to create events with details like title, date, time, location, and participants.
5. As a user, I want to edit or delete my events.
6. As a user, I want to view my calendar in a monthly, weekly, or daily view.
7. As a user, I want to integrate my calendar with external services like Google Calendar.
8. As a user, I want to collaborate on events with other users in real-time.
9. As a user, I want to receive real-time notifications for event changes.
10. As a user, I want to set reminders for events and manage tasks.

## Functional System Requirements (Natural/Structured Language)

1. The system shall allow users to register with email, password, and user type (student, employee, organization).
2. The system shall authenticate users via login form.
3. The system shall provide an admin dashboard for user management and event oversight.
4. The system shall enable event creation with fields: title, description, start/end date/time, location, participants.
5. The system shall allow editing and deletion of events by the creator or collaborators.
6. The system shall display calendar views: month, week, day.
7. The system shall integrate with external calendars via API (e.g., Google Calendar API).
8. The system shall support real-time collaboration using WebSockets or similar.
9. The system shall send real-time notifications via email or in-app alerts.
10. The system shall allow setting reminders and managing tasks linked to events.

## Non-Functional Requirements

1. **Performance**: The system shall load calendar views within 2 seconds.
2. **Security**: User data shall be encrypted, and authentication shall use secure protocols.
3. **Usability**: The interface shall be intuitive, with a response time under 1 second for actions.
4. **Scalability**: The system shall support up to 10,000 concurrent users.
5. **Reliability**: Uptime shall be 99.9%.
6. **Compatibility**: Compatible with major browsers (Chrome, Firefox, Safari).

## Prototypes of All Forms/Pages

### Login Page Prototype
```
+-------------------+
| Smart Calendar    |
+-------------------+
| Email: [________] |
| Password: [_____] |
| [Login] [Sign Up] |
+-------------------+
```

### Registration Page Prototype
```
+-------------------+
| Register          |
+-------------------+
| Name: [_________] |
| Email: [________] |
| Password: [_____] |
| User Type: [Drop] |
| [Register]        |
+-------------------+
```

### Calendar View Page Prototype
```
+-------------------+
| Month View        |
+-------------------+
| [Prev] [Next]     |
| Sun Mon Tue ...   |
| 1   2   3   ...   |
| Event1 on 5th     |
+-------------------+
```

### Event Creation Form Prototype
```
+-------------------+
| Create Event      |
+-------------------+
| Title: [________] |
| Desc: [_________] |
| Date: [__/__/__]  |
| Time: [__:__]     |
| Location: [_____] |
| Participants: [__]|
| [Save]            |
+-------------------+
```

### Admin Dashboard Prototype
```
+-------------------+
| Admin Dashboard   |
+-------------------+
| Users: [List]     |
| Events: [List]    |
| [Manage Groups]   |
+-------------------+
```

## Scenarios

1. **User Registration**: A student registers with email and password, selects user type.
2. **Event Creation**: An employee creates an event, invites participants, sets reminder.
3. **Collaboration**: Multiple users edit a shared event in real-time.
4. **Notification**: User receives alert for an upcoming event.

## Use Cases

1. **UC1: User Registration**
   - Actor: User
   - Precondition: User on registration page
   - Steps: Enter details, submit, account created.

2. **UC2: Create Event**
   - Actor: User
   - Precondition: Logged in
   - Steps: Click create, fill form, save.

3. **UC3: View Calendar**
   - Actor: User
   - Precondition: Logged in
   - Steps: Select view, display events.

4. **UC4: Collaborate on Event**
   - Actor: Users
   - Precondition: Shared event
   - Steps: Edit simultaneously, changes sync.

5. **UC5: Set Reminder**
   - Actor: User
   - Precondition: Event exists
   - Steps: Set reminder time, save.

## Form-Based Specification

### Login Form
- Fields: Email (text), Password (password)
- Validation: Email format, password length >6
- Action: Authenticate and redirect to dashboard

### Event Form
- Fields: Title (text), Description (textarea), Start Date/Time (datetime), End Date/Time (datetime), Location (text), Participants (multi-select)
- Validation: Required fields, date logic
- Action: Save to database

## Tabular Specification

| Requirement ID | Description | Priority | Status |
|----------------|-------------|----------|--------|
| FR1 | User Registration | High | Pending |
| FR2 | User Login | High | Pending |
| FR3 | Admin Dashboard | Medium | Pending |
| FR4 | Event Creation | High | Pending |
| FR5 | Event Editing | High | Pending |
| FR6 | Calendar Views | High | Pending |
| FR7 | Calendar Integration | Low | Pending |
| FR8 | Collaboration | Medium | Pending |
| FR9 | Notifications | Medium | Pending |
| FR10 | Reminders/Tasks | Medium | Pending |
