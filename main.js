// Initialisiere die Karte
const map = L.map('map').setView([50.0, 8.25], 13);

// Tile Layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap-Mitwirkende'
}).addTo(map);

// Lade GeoJSON und erstelle Marker
fetch('sportangebote.json')
  .then(response => response.json())
  .then(data => {
L.geoJSON(data, {
  pointToLayer: (feature, latlng) => {
    const svgIcon = L.icon({
      iconUrl: `icons/${feature.properties.svg}`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker(latlng, { icon: svgIcon });

    // Popup mit fetten Property-Namen
    const props = feature.properties;
    const popupContent = `
  <strong>Vereinsname:</strong> ${props.Vereinsname || 'Kein Name'}<br>
  <strong>Sportart:</strong> ${props.Sportart || 'k.A.'}<br>
  <strong>Adresse:</strong> ${props.Adresse || 'k.A.'}<br>
  <strong>Gegründet:</strong> ${props.Gegründet || 'k.A.'}<br>
  <strong>Beschreibung:</strong><br> ${props.Umschreibung || 'Keine Beschreibung'}
`;


    marker.bindPopup(popupContent);

    return marker;
  }
}).addTo(map);

  })
  .catch(error => console.error('Fehler beim Laden der GeoJSON:', error));
