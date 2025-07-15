const map = L.map('map').setView([40.76549231747426, -111.8421121901956], 13); // Salt Lake City coords
// Initialize the map centered on Salt Lake City with a zoom level of 13
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
).addTo(map);


fetch('http://localhost:8080/spots')
  .then(res => res.json())
  .then(spots => {
    spots.forEach(spot => {
      L.marker([spot.latitude, spot.longitude])
        .addTo(map)
        .bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}<br>Wifi: ${spot.wifiStrength}`);
    });
  })
  .catch(err => console.error('Error fetching study spots:', err));

// This code initializes a Leaflet map centered on Salt Lake City and fetches study spots from the backend. It adds markers for each spot with a popup displaying the name, rating, and wifi strength. The map uses OpenStreetMap tiles for rendering.
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addSpotForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const latitude = parseFloat(document.getElementById('lat').value);
        const longitude = parseFloat(document.getElementById('lon').value);
        const rating = parseFloat(document.getElementById('rating').value);
        const wifiStrength = parseFloat(document.getElementById('wifiStrength').value);

        fetch('http://localhost:8080/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, latitude, longitude, rating, wifiStrength })
        })
            .then(res => res.json())
            .then(spot => {
            L.marker([spot.latitude, spot.longitude]).addTo(map).bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}<br>Wifi: ${spot.wifiStrength}`);

            document.getElementById('addSpotForm').reset();
        })
            .catch(err => console.error('Error adding spot:', err));
  });
});
// This code listens for clicks on the map, allowing users to add study spots by clicking on the map. It displays a form to input details about the spot, including name, latitude, longitude, rating, and wifi strength. When the form is submitted, it sends a POST request to the backend to save the new spot and updates the map with a marker for the new spot. The form is hidden after submission, and the user can click on the map again to add another spot.
document.addEventListener('DOMContentLoaded', function () {
    let tempMarker = null;
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        if (tempMarker) {
            map.removeLayer(tempMarker);
        }

        tempMarker = L.marker([lat, lon]).addTo(map);

        document.getElementById('addSpotForm').style.display = 'none';
        const mapForm = document.getElementById('mapClickForm');
        mapForm.style.display = 'block';

        document.getElementById('click-lat').value = lat;
        document.getElementById('click-lon').value = lon;
    });

    document.getElementById('mapClickForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('click-name').value;
        const lat = parseFloat(document.getElementById('click-lat').value);
        const lon = parseFloat(document.getElementById('click-lon').value);
        const rating = parseFloat(document.getElementById('click-rating').value);
        const wifiStrength = parseFloat(document.getElementById('click-wifiStrength').value);

        fetch('http://localhost:8080/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, latitude: lat, longitude: lon, rating, wifiStrength })
    })
        .then(res => res.json())
        .then(spot => {
        L.marker([spot.latitude, spot.longitude]).addTo(map).bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}<br>Wifi: ${spot.wifiStrength}`);

        document.getElementById('mapClickForm').reset();
        document.getElementById('mapClickForm').style.display = 'none';
        document.getElementById('addSpotForm').style.display = 'block';
    })
        .catch(err => console.error('Error adding spot:', err));
    });
});