import requests
import json

def fetch_places(api_key, text_query, field_mask):
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': api_key,
        'X-Goog-FieldMask': field_mask
    }
    data = {
        'textQuery': text_query
    }
    response = requests.post(url, headers=headers, json=data)
    print(response.text)
    if response.status_code == 200:
        return response.json()  # Return the JSON response
    else:
        return None

def save_data(data, filename='toilettes.json'):
    # Save the data in JSON format
    with open(filename, 'w') as f:
        f.write("")
        json.dump(data, f)
    print("Data saved to", filename)

if __name__ == "__main__":
    # Replace 'YOUR_API_KEY' with your actual Google API key
    with open("apikey.txt", "r") as t:
        API_KEY = t.read()

    # Text query example, adjust it as per your needs
    TEXT_QUERY = "toilets in Paris"
    FIELD_MASK = "*"
    CENTER = (48.8566, 2.3522)  # Latitude, Longitude of Paris
    RADIUS = 1000  # Radius in meters

    # Fetch the data using Text Search
    data = fetch_places(API_KEY, TEXT_QUERY, FIELD_MASK)

    # Save the data if the request was successful
    if data:
        save_data(data)
    else:
        print("Failed to fetch data")
