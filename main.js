let map;

function initMap() {
    
    var options = {
        zoom: 12,
        disableDefaultUI: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles:
        [
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "hue": "#FFA800"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 0
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "stylers": [
                    {
                        "hue": "#53FF00"
                    },
                    {
                        "saturation": -73
                    },
                    {
                        "lightness": 40
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "hue": "#FBFF00"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 0
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "hue": "#00FFFD"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 30
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "hue": "#00BFFF"
                    },
                    {
                        "saturation": 6
                    },
                    {
                        "lightness": 8
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "hue": "#679714"
                    },
                    {
                        "saturation": 33.4
                    },
                    {
                        "lightness": -25.4
                    },
                    {
                        "gamma": 1
                    }
                ]
            }
        ]
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), options);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetch('/save-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: "alexandre",
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
            .then(response => response.json())
            .then(data => console.log("Server response:", data))
            .catch(error => console.error("Failed to send location data:", error));
            
            // Center the map on the user's location
            map.setCenter({ lat: latitude, lng: longitude });

            // Create a marker for the user's location
            new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: 'Your Location',
                icon: 'loc.png'
            });
        }, (error) => {
            console.error(`Error getting location: ${error.message}`);
        });
    } else {
        console.error('Geolocation is not supported by this browser');
    }
}


let globalPlacesData = [];

function loadInitialData() {
    fetch('database.json') // Remplacez par l'URL correcte de votre API
        .then(response => response.json())
        .then(data => {
            globalPlacesData = data.places;
            console.log("Data loaded:", globalPlacesData);
        })
        .catch(error => console.error('Failed to load data:', error));
}



function saveRating(placeId) {
    loadInitialData();
    let ratingValue = document.getElementById(`rating-${placeId}`).value;  // Récupérer la note depuis l'élément DOM
    fetch('/data') // Assurez-vous que cette route renvoie la structure actuelle du fichier JSON
        .then(response => response.json())
        .then(data => {
            let places = data.places;
            let found = false;

            // Recherche du lieu dans le tableau
            for (let i = 0; i < places.length; i++) {
                if (places[i].id === placeId) {
                    if (!places[i].ratings) {
                        places[i].ratings = []; // Assurez-vous que l'array de ratings existe
                    }
                    places[i].ratings.push(parseInt(ratingValue)); // Ajoute la nouvelle note
                    found = true;
                    break;
                }
            }

            // Si le lieu n'est pas trouvé, ajoutez un nouvel objet lieu
            if (!found) {
                places.push({ id: placeId, ratings: [parseInt(ratingValue)] });
            }

            // Envoyer les données mises à jour au serveur
            return fetch('/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ places: places })
            });
        })
        .then(response => response.text()) // ou response.json() si votre serveur renvoie du JSON
        .then(data => console.log("Server responded with:", data))
        .catch(error => console.error('Failed to save data:', error));
}


function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0; // Éviter la division par zéro
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return (total / ratings.length).toFixed(1); // Retourner la moyenne avec une décimale
}


function loadLocations() {
    initMap();
    // Chargement des données depuis le fichier data.json
    console.log("loading locations...");
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.places.forEach(place => {
                const pos = { lat: place.location.latitude, lng: place.location.longitude };
                const marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    animation: google.maps.Animation.DROP // Add animation
                });


                // Récupérer les ratings depuis database.json
                fetch('database.json')
                    .then(response => response.json())
                    .then(dbData => {
                        const placeData = dbData.places.find(p => p.id === place.id);
                        const ratings = placeData ? placeData.ratings : [];
                        const averageRating = calculateAverageRating(ratings);

                        // Initialize rating
                        let ratingHTML = `<select id='rating-${place.id}'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>`;

                        let saveButtonHTML = `<button onclick='saveRating("${place.id}")'>Save Rating</button>`;

                        let infoContent = `${place.formattedAddress}<br>Average Rating: ${averageRating}<br>${ratingHTML}<br>${saveButtonHTML}`;

                        let infoWindow = new google.maps.InfoWindow({
                            content: infoContent
                        });


                        let isInfoWindowOpen = false;
                        marker.addListener('click', () => {
                            if (isInfoWindowOpen) {
                                marker.setAnimation(null);
                                infoWindow.close();
                                isInfoWindowOpen = false;
                            } else {
                                infoWindow.open(map, marker);
                                isInfoWindowOpen = true;
                            }
                        });

                    })
                    .catch(error => console.error('Failed to load data:', error));
                
            });
        })
        .catch(error => console.error('Erreur loading the data:', error));
}