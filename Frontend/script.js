const map = L.map('map').setView([40.76549231747426, -111.8421121901956], 13); // Salt Lake City coords

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
).addTo(map);


fetch('http://localhost:8080/spots')
  .then(res => res.json())
  .then(spots => {
    spots.forEach(spot => {
      L.marker([spot.latitude, spot.longitude])
        .addTo(map)
        .bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}`);
    });
  })
  .catch(err => console.error('Error fetching study spots:', err));


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addSpotForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const latitude = parseFloat(document.getElementById('lat').value);
        const longitude = parseFloat(document.getElementById('lon').value);
        const rating = parseFloat(document.getElementById('rating').value);

        fetch('http://localhost:8080/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, latitude, longitude, rating })
        })
            .then(res => res.json())
            .then(spot => {
            L.marker([spot.latitude, spot.longitude]).addTo(map).bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}`);

            document.getElementById('addSpotForm').reset();
        })
            .catch(err => console.error('Error adding spot:', err));
  });
});

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

        fetch('http://localhost:8080/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, latitude: lat, longitude: lon, rating })
    })
        .then(res => res.json())
        .then(spot => {
        L.marker([spot.latitude, spot.longitude]).addTo(map).bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}`);

        document.getElementById('mapClickForm').reset();
        document.getElementById('mapClickForm').style.display = 'none';
        document.getElementById('addSpotForm').style.display = 'block';
    })
        .catch(err => console.error('Error adding spot:', err));
    });
});