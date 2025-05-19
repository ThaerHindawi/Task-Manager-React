# Task Manager

A modern task management application built with React, TypeScript, and Tailwind CSS. This application provides a clean and intuitive interface for managing your tasks.

## Features

- Create, read, update, and delete tasks
- Task completion status tracking
- Responsive design that works on all devices
- Dark mode support
- Real-time updates using SWR

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- SWR for data fetching
- DaisyUI for UI components
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- A running backend API server (see API section)

### Installation

1.Clone the repository:

```bash
git clone https://github.com/ThaerHindawi/Task-Manager-React.git
cd Task-Manager-React
```

2.Install dependencies:

```bash
npm install
```

3.Create a `.env` file in the root directory and add your API URL:

```bash
VITE_API_URL=http://127.0.0.1:8000/api
```

4.Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

This application requires a backend API that provides the following endpoints:

- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

The API should return tasks in the following format:

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: number;
  created_at: string;
  updated_at: string;
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Author

Created by [Thaer Hendawi](https://thaerhendawi.com)

## License

This project is open source and available under the MIT License.
