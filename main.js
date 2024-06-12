let map;

function initMap() {
    
    var options = {
        center: { lat: 48.8589384 ,lng: 2.366341 },
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

function loadLocations() {
    initMap();
    // Chargement des données depuis le fichier toilettes.json
    console.log("loading locations...");
    fetch('toilettes.json')
        .then(response => response.json())
        .then(data => {
            data.places.forEach(place => {
                const pos = { lat: place.location.latitude, lng: place.location.longitude };
                const marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    animation: google.maps.Animation.DROP // Add animation
                });

                // Add click event listener to the marker
                let isAnimating = false;
                marker.addListener('click', () => {
                    if (isAnimating) {
                        marker.setAnimation(null);
                        isAnimating = false;
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        isAnimating = true;
                    }
                });

                // add window info
                let infoWindow = new google.maps.InfoWindow({
                    content: place.formattedAddress
                });
                let isInfoWindowOpen = false;
                marker.addListener('click', () => {
                    if (isInfoWindowOpen) {
                        infoWindow.close();
                        isInfoWindowOpen = false;
                    } else {
                        infoWindow.open(map, marker);
                        isInfoWindowOpen = true;
                    }
                });
                
            });
        })
        .catch(error => console.error('Erreur loading the data:', error));
}