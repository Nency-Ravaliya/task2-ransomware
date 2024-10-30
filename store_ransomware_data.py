import json
from pymongo import MongoClient

# Load JSON data
with open('ransomware_overview.json') as file:
    data = json.load(file)

# Connect to MongoDB
# client = MongoClient('mongodb://localhost:27017/')
client = MongoClient("mongodb+srv://nensi:yatricloud@cluster0.mongodb.net/ransomware_db?retryWrites=true&w=majority")
db = client['ransomware_db']
collection = db['ransomware_data']

# Insert data into MongoDB
for item in data:
    try:
        # Check for duplicates based on a unique field (e.g., 'name')
        if collection.find_one({"name": item["name"]}) is None:
            collection.insert_one(item)
            print(f"Inserted: {item['name']}")
        else:
            print(f"Duplicate found, skipping: {item['name']}")
    except Exception as e:
        print(f"Error inserting item: {e}")

print("Data insertion complete!")
