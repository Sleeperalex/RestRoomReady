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
                    title: place.displayName.text  // Assuming the title to use is within 'displayName' -> 'text'
                });
            });
        })
        .catch(error => console.error('Erreur loading the data:', error));
}