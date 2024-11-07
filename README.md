# Ransomware Dashboard API & Dashboard

Ransomware Dashboard system designed with a Flask API backend connected to MongoDB and a React frontend to manage ransomware-related data. The dashboard allows users to add, view, update, and delete ransomware records through a RESTful API and provides an interface for seamless interaction.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Database Interaction (MongoDB Atlas)](#database-interaction-mongodb-atlas)
8. [Components Overview](#components-overview)

## Project Structure

```plaintext
project-root/
├── api/
│   ├── app.py                # Main Flask API application
│   ├── store_ransomware_data.py  # Data insertion script from JSON to MongoDB
├── frontend/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Dashboard.js         # Main dashboard component
│   │   │   ├── RansomwareForm.js    # Form component for adding/updating data
│   └── package.json           # Frontend dependencies
├── ransomware_overview.json   # Sample ransomware data in JSON
└── README.md
```

## Features

- **CRUD Operations:** Add, update, view, and delete ransomware records.
- **Database Integration:** MongoDB for data storage.
- **REST API:** Flask-based API with endpoints for accessing and managing ransomware data.
- **Frontend Dashboard:** Built with React to interact with the API and visualize data.

## Prerequisites

- Python 3.10+
- MongoDB (running on `localhost:27017`)
- Node.js and npm

## Installation

### Backend (API)

1. Clone the repository and navigate to the API directory:
   ```bash
   git clone <repo-url>
   cd project-dir
   ```

2. Set up a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Start MongoDB if it isn't already running:
   ```bash
   mongod
   ```

4. Run the Flask API:
   ```bash
   flask run --host=0.0.0.0 --port=5000
   ```

### Frontend (React Dashboard)

1. Navigate to the frontend directory:
   ```bash
   cd project-root/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint                | Description                         |
|--------|--------------------------|-------------------------------------|
| GET    | `/`                     | Welcome message                     |
| GET    | `/ransomware`           | Retrieve all ransomware records     |
| POST   | `/ransomware`           | Add a new ransomware record         |
| PUT    | `/ransomware/<id>`      | Update a specific ransomware record |
| DELETE | `/ransomware/<id>`      | Delete a specific ransomware record |

## Usage

- Access the API directly on `http://localhost:5000`.
- Open the frontend on `http://localhost:3000` to interact with the dashboard.

### Loading Initial Data

To populate the database with initial ransomware data:

1. Place `ransomware_overview.json` in the `api` directory.
2. Run `store_ransomware_data.py`:
   ```bash
   python store_ransomware_data.py
   ```

## Database Interaction (MongoDB Atlas)

To interact directly with the MongoDB Atlas database:

1. Connect to your MongoDB Atlas cluster using the connection string.
   ```bash
   mongo "mongodb+srv://cluster0.fthx3.mongodb.net/ransomware_db" --username nensi --password <password>
   ```

2. List all databases:
   ```bash
   show dbs
   ```

3. Switch to the ransomware database:
   ```bash
   use ransomware_db
   ```

4. Display all ransomware data in a readable format:
   ```bash
   db.ransomware_data.find().pretty()
   ```

5. Exit the MongoDB shell:
   ```bash
   exit
   ```

## Components Overview

### API (Flask)

- **app.py**: Main Flask application managing routes and CRUD operations.
- **store_ransomware_data.py**: Script to load initial data from `ransomware_overview.json` into MongoDB.

### Frontend (React)

- **Dashboard.js**: Main interface displaying ransomware data.
- **RansomwareForm.js**: Form component for adding and updating records.
```

### Data insertion into the database
![image](https://github.com/user-attachments/assets/e231601b-3eaf-4db1-81de-80613afcc178)
