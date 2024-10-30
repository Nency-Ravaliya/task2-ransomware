# Migrating Local MongoDB Data to MongoDB Atlas and Connecting Your Flask Application

To migrate your local MongoDB data to MongoDB Atlas and ensure your Flask application connects to the Atlas database, follow these steps:

## Step 1: Connect to MongoDB Atlas

1. **Open Your Terminal**: Use the command below to connect to your MongoDB Atlas cluster. Replace `<password>` with the actual password for your user `nensi`.

   ```bash
   mongo "mongodb+srv://cluster0.fthx3.mongodb.net/ransomware_db" --username nensi --password <password>
   ```

## Step 2: Create the Database and Collection in Atlas

1. **Create the Database**:
   Once connected, create the `ransomware_db` database by switching to it:

   ```javascript
   use ransomware_db
   ```

2. **Create the Collection**:
   Create the `ransomware_data` collection:

   ```javascript
   db.createCollection("ransomware_data")
   ```

## Step 3: Export Data from Local MongoDB

1. **Export Data**:
   Use the `mongoexport` command to export your local MongoDB data to a JSON file. Open a new terminal window and run the following command:

   ```bash
   mongoexport --db ransomware_db --collection ransomware_data --out ransomware_data.json
   ```

## Step 4: Import Data into MongoDB Atlas

1. **Import Data**:
   Use the `mongoimport` command to import the exported data into your MongoDB Atlas collection. Replace `<password>` with your actual password:

   ```bash
   mongoimport --uri "mongodb+srv://nensi:<password>@cluster0.fthx3.mongodb.net/ransomware_db" --collection ransomware_data --file ransomware_data.json
   ```

## Step 5: Update Your Flask Application

1. **Modify `app.py`**:
   Update your `app.py` to connect to MongoDB Atlas instead of your local MongoDB instance:

   ```python
   from flask import Flask
   from pymongo import MongoClient

   app = Flask(__name__)

   # Connect to MongoDB Atlas
   client = MongoClient("mongodb+srv://nensi:<password>@cluster0.fthx3.mongodb.net/ransomware_db")
   db = client.ransomware_db
   ```

## Step 6: Run Your Flask Application

1. **Run the Flask App**:
   Make sure your Flask app is running and connected to MongoDB Atlas:

   ```bash
   flask run
   ```

## Summary

By following these steps, you should be able to migrate your local MongoDB data to MongoDB Atlas and update your Flask application to connect to the Atlas database. If you encounter any issues, please let me know!
```
