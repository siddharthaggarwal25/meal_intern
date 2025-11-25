# TheMealDB Explorer

Complete meal discovery app with Node.js backend and React frontend.

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm start
```
App runs on http://localhost:3000

## API Endpoints

- `GET /api/meals/search?query=pasta` - Search meals
- `GET /api/meals/categories` - Get all categories
- `GET /api/meals/category/Seafood` - Get meals by category
- `GET /api/meals/random` - Get random meal
- `GET /api/meals/:id` - Get meal details
- `GET /health` - Health check

## Features

- Search meals by name
- Browse categories
- View meal details with ingredients
- Watch embedded YouTube recipes
- Random meal generator
- Responsive design
- In-memory caching

## Folder Structure

**Backend** - Express.js with routes, controllers, services, cache
**Frontend** - React with pages, components, hooks, services

## Tech Stack

- Backend: Node.js, Express, Axios
- Frontend: React, React Router
- Caching: In-memory with TTL
