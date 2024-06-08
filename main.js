let map;

function initMap() {
    
    var options = {
        center: { lat: 48.8589384 ,lng: 2.366341 },
        zoom: 12,
        disableDefaultUI: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
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