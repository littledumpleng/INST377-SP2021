/* eslint-disable no-console */
/* eslint-disable max-len */
// KEEP
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13); // generating a map instance. L is a global variable

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGl0dGxlZHVtcGxlbmciLCJhIjoiY2tuaTI5NzVpMmM3ZDJ2b281MDRsMWgycSJ9.y2zTyXFqtMhyK7a5KykCTw'
  }).addTo(mymap);
  console.log('mymap', mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');
  const replyMessage = document.querySelector('.reply-message');

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    targetList.innerText = '';

    event.preventDefault();
    console.log('submit fired', search.value);
    // take the first five matches from your user's query string which also have the required geocoded_column_1 values
    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const topFive = filtered.slice(0, 5);

    if (topFive.length < 1) {
      replyMessage.classList.add('box');
      replyMessage.innerText = 'No matches found';
    } else {
      console.table(topFive); // done
    }

    topFive.forEach((item) => {
      // geocoded_column_1 is a table column in the api
      const longLat = item.geocoded_column_1.coordinates;
      // latitude and longitude positions are reversed in the array you receive
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      // creating list items
      const appendItem = document.createElement('li');
      appendItem.classList.add('block'); // block is from bulma
      appendItem.classList.add('list-item');
      // this is the innerHTML for the appendItem. ${} is using javascript within quotes
      appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
      targetList.append(appendItem);
    });

    const {coordinates} = topFive[0]?.geocoded_column_1;
    console.log('viewSet coords]', coordinates);
    mapObjectFromFunction.panTo([coordinates[1], coordinates[0], 0]);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;