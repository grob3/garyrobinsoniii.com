# Gary Robinson III Website

A full-stack web application built with modern technologies.

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database (for local development)
- npm or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone [repository-url]
cd garyrobinsoniii.com
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

### 4. Run the Application

#### Development Mode

To run both the client and server in development mode:

```bash
npm run dev
```

This will start both the client (Vite) and server (Node.js) in development mode.

#### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Database Setup

The application uses Neon Database (PostgreSQL) for data storage. To set up the database:

1. Ensure you have a PostgreSQL database running
2. Update your `DATABASE_URL` in the `.env` file
3. Run database migrations:
```bash
npm run db:push
```

## Updating CMS Content

The application uses a headless CMS approach. To update content:

1. Ensure you're in development mode (`npm run dev`)
2. Navigate to the CMS admin interface at `/admin` in your browser
3. Log in using your CMS credentials
4. Use the CMS interface to update content, create new pages, or modify existing content

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Node.js/Express server
- `/shared` - Shared types and utilities
- `/components` - Reusable UI components

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database migrations
- `npm run check` - Type check the project

## Technologies Used

### Frontend
- **React**: A powerful and flexible JavaScript library for building user interfaces. Perfect for personal websites as it allows for dynamic content updates without page reloads, and has a rich ecosystem of components and tools.
- **Vite**: Next generation frontend tooling that provides instant hot module replacement (HMR) and fast build times. Ideal for development as it offers near-instant feedback during development.
- **TypeScript**: Adds type safety and better development experience through static typing. Perfect for maintaining code quality and catching errors early in a personal project.

### Backend
- **Node.js**: Allows for full-stack JavaScript development, making it easier to share code between frontend and backend. Ideal for personal projects as it provides a consistent development experience.
- **Express**: A minimal and flexible Node.js web application framework that provides robust features for web and mobile applications. Perfect for handling API requests and serving content.

### Database
- **PostgreSQL (Neon)**: A powerful, open-source relational database that supports JSON operations. Neon provides a serverless PostgreSQL experience, making it easy to scale and manage without infrastructure overhead. Ideal for personal websites as it handles both structured and unstructured data well.

### Styling
- **Tailwind CSS**: A utility-first CSS framework that provides pre-defined classes for styling. Perfect for personal websites as it allows for rapid prototyping and consistent styling without writing custom CSS.

### UI Components
- **Radix UI**: A collection of fully accessible, fully customizable, React component primitives. Provides robust, accessible components that can be styled to match any design system. Ideal for personal projects as it ensures accessibility and provides a solid foundation for UI development.
