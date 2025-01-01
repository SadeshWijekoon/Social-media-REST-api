# Node.js REST API

## Overview

This is a REST API built with Node.js, Express, and MongoDB. It includes endpoints for user management, authentication, and post management. The API supports user registration, login, profile updates, post creation, and interaction features like liking and following.

## Features

- **User Management**: Register, login, update, delete, follow, and unfollow users.
- **Post Management**: Create, update, delete, like, and unlike posts.
- **Timeline Feed**: Fetch posts from the user and their followed users.

## Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and post data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcrypt**: Library for hashing passwords.
- **Helmet**: Middleware for setting various HTTP headers to secure the app.
- **Morgan**: HTTP request logger middleware.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database (Atlas or local)
- Environment variables set in a `.env` file

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
