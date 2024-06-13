from flask import Flask, jsonify, request, send_from_directory
import json

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/save-location', methods=['POST'])
def save_location():
    location_data = request.get_json()
    if not location_data or 'user_id' not in location_data:
        return jsonify({"error": "No data provided or missing user_id"}), 400

    file_path = 'locations.json'
    
    try:
        # Tentative de lire le fichier existant pour mettre à jour les données
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
        except FileNotFoundError:
            data = {"locations": []}

        # Recherche de l'utilisateur existant
        locations = data['locations']
        user_found = False
        for location in locations:
            if location['user_id'] == location_data['user_id']:
                # Mise à jour de la localisation de l'utilisateur existant
                location['latitude'] = location_data['latitude']
                location['longitude'] = location_data['longitude']
                user_found = True
                break
        
        # Si l'utilisateur n'existe pas, ajoutez une nouvelle entrée
        if not user_found:
            locations.append(location_data)
        
        # Sauvegarde des données mises à jour dans le fichier
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        
        return jsonify({"message": "Location data updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to process location data", "message": str(e)}), 500


@app.route('/data', methods=['GET'])
def get_data():
    try:
        with open('database.json', 'r') as f:
            data = json.load(f)
            return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Database not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding database"}), 500

@app.route('/save', methods=['POST'])
def save_data():
    new_data = request.get_json()
    try:
        with open('database.json', 'w') as f:
            json.dump(new_data, f, indent=4)
        return jsonify(new_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to write to database", "message": str(e)}), 500
    


if __name__ == '__main__':
    with open('config.json', 'r') as f:
        config = json.load(f)
        if config['api_places'] == True:
            # execute the fetch.py script
            import fetch
            fetch.main('alexandre')
    app.run(debug=True, port=8000)