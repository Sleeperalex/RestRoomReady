function initMap() {
    
    var options = {
        center: { lat: 48.8589384 ,lng: 2.366341 },
        zoom: 12,
        disableDefaultUI: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), options);
}


function loadLocations() {
    // Chargement des données depuis le fichier toilettes.json
    console.log("Chargement des locations...");
    fetch('toilettes.json')
        .then(response => response.json())
        .then(data => {
            data.results.forEach(place => {
                const pos = { lat: place.geometry.location.lat, lng: place.geometry.location.lng };
                const marker = new google.maps.Marker({
                    position: pos,
                    map: window.map,
                    title: place.name
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement des données:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showToilets').addEventListener('click', loadLocations);
});