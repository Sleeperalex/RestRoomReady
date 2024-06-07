import requests
import json

def fetch_toilets(api_key, location, radius=1000, types='toilet'):
    # Construire l'URL de l'API Places
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type={types}&key={api_key}"
    
    # Faire la requête à l'API
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def save_data(data, filename='toilettes.json'):
    # Sauvegarder les données en format JSON
    with open(filename, 'w') as f:
        json.dump(data, f)
    print("Data saved to", filename)

if __name__ == "__main__":
    # Remplacez 'YOUR_API_KEY' par votre clé API Google
    with open("apikey.txt","r") as t:
        API_KEY = t.read()
    # Utilisez les coordonnées du centre de Paris
    LOCATION = '48.8566,2.3522'
    # Radius en mètres
    RADIUS = 6000
    # Type de lieu à chercher
    TYPES = 'toilet'

    # Récupérer les données
    data = fetch_toilets(API_KEY, LOCATION, RADIUS, TYPES)
    
    # Sauvegarder les données si la requête a réussi
    if data:
        save_data(data)
    else:
        print("Failed to fetch data")
