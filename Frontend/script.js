const map = L.map('map').setView([40.76549231747426, -111.8421121901956], 13); // Salt Lake City coords

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data © OpenStreetMap contributors',
}).addTo(map);

// const myMap = new Map();
// myMap.set("Marriot Library", [40.76259974563067, -111.84615814162471])
// myMap.set("Union", [40.765022635471816, -111.84613557797536])
// myMap.set("Huntsmun Center", [40.762051516183625, -111.8387307042958])
// myMap.set("Field", [40.764858695837184, -111.83394714415668])
// myMap.set("Subway", [40.76450786986249, -111.85350243638295])


// for (const [key, value] of myMap){
//     L.marker(value).addTo(map).bindPopup(key)
// }

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
        L.marker([spot.latitude, spot.longitude])
          .addTo(map)
          .bindPopup(`<b>${spot.name}</b><br>Rating: ${spot.rating}`);

        document.getElementById('addSpotForm').reset();
      })
      .catch(err => console.error('Error adding spot:', err));
  });
});