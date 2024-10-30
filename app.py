from flask import Flask, jsonify, request, send_from_directory
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)

# Connect to MongoDB Atlas
client = MongoClient("mongosh "mongodb+srv://cluster0.fthx3.mongodb.net/" --apiVersion 1 --username nensiransomware_db?retryWrites=true&w=majority")
db = client['ransomware_db']
collection = db['ransomware_data']

@app.route('/', methods=['GET'])
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/ransomware', methods=['GET'])
def get_ransomware_data():
    try:
        data = list(collection.find())
        for item in data:
            item['_id'] = str(item['_id'])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ransomware', methods=['POST'])
def add_ransomware_data():
    new_data = request.json
    if not new_data or "name" not in new_data:
        return jsonify({"error": "Invalid data"}), 400

    if collection.find_one({"name": new_data["name"]}) is None:
        collection.insert_one(new_data)
        return jsonify(new_data), 201
    else:
        return jsonify({"error": "Duplicate entry"}), 409

@app.route('/ransomware/<id>', methods=['PUT'])
def update_ransomware_data(id):
    updated_data = request.json
    if not updated_data:
        return jsonify({"error": "Invalid data"}), 400

    try:
        collection.update_one({'_id': ObjectId(id)}, {'$set': updated_data})
        return jsonify(updated_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ransomware/<id>', methods=['DELETE'])
def delete_ransomware_data(id):
    try:
        result = collection.delete_one({'_id': ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Not found"}), 404
        return jsonify({'result': 'Deleted'}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve static files for React
@app.route('/<path:path>', methods=['GET'])
def serve_react(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)