# Todo List Application Readme

This repository contains a Todo List application built with React using Vite, Firebase, Ant Design (antd), and Tailwind CSS. The application allows users to manage their tasks with various features including authentication, task creation, updating task details, and more.

## Features

1. **Firebase Database Integration**: Utilizes Firebase as the backend database.
2. **Firebase Authentication**: Implements Firebase authentication system for user management.
3. **Task Management**:
   - Users can create tasks with title, description, task type, and due date.
   - Update task type and status directly from the task table.
   - Modify title, description, and due date from the task details drawer.
4. **Component Libraries**:
   - Utilizes Ant Design (antd) for UI components.
   - Tailwind CSS for responsive design, ensuring optimal viewing experience on various devices.
5. **Vite React Setup**:
   - Developed using Vite, a next-generation frontend tooling for React projects.
   - Frontend runs on port `localhost:5173`.
6. **Environment Configuration**:
   - Configured `.env` file with `VITE_APP_API_URL` set to `https://track-list-4de35-default-rtdb.firebaseio.com`.

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure Firebase credentials in your Firebase project.
4. Set up Firebase Authentication and Database rules as required.
5. Create a `.env` file and set `VITE_APP_API_URL` to your Firebase Database URL.
6. Run the application using `npm run dev`.
7. Access the application at `localhost:5173` in your browser.

## Deployment

To deploy the application, consider the following steps:

1. Build the application using `npm run build`.
2. Deploy the built files to your hosting platform.
3. Configure environment variables as needed for the production environment.
4. Ensure Firebase configurations are set up correctly for production.
5. Deploy Firebase functions if required for server-side operations.
