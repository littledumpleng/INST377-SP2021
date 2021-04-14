function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([51.505, -0.09], 13); // generating a map instance. L is a global variable

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  console.log('window loaded');
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();
  // restaurant is request formatted to json; empty array
  const search = document.querySelector('#search'); // document is html page
  const suggestions = document.querySelector('.suggestions');

  function findMatches(WordToMatch, restaurant) {
    return restaurant.filter((place) => {
      const regex = new RegExp(WordToMatch, 'gi'); // gi means all regular expression matches
      return place.city.match(regex) || place.name.match(regex) || place.category.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurant);
    const html = matchArray.map((place) => { // creating a box. inside box, set each item
      console.log(place);
      return `
              <li> 
                  <div class="labels">
                      <span class="name">${place.name}</span> 
                      <br>
                      <span class="category">${place.category}</span>
                      <br>
                      <span class="address">${place.address_line_1}</span>
                      <br>
                      <span class="city">${place.city}</span>
                      <br>
                      <span class="zip">${place.zip}</span>
                  </div>
              </li> 
          `; // span is an inline container
    }).join('');
    suggestions.innerHTML = html; // returns inner HTML text content
  }

  search.addEventListener('keyup', async (event) => { // keyup is stop typing
    displayMatches(event);
  });

  search.addEventListener('change', displayMatches); // checking for changes on input field
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;

// in windowActions?
  // const request = await fetch(endpoint); // request fetches the api; await pauses async function execution until a Promise is addressed
  // const restaurant = await request.json(); //restaurants is request formatted to json; empty array
  
  // // const form = document.querySelector('#search-form');
  // const search = document.querySelector("#search"); // document is html page
  // // const targetList = document.querySelector('.target-list');
  // const suggestions = document.querySelector('.suggestions');