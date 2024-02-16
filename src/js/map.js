"use strict";

let map; // Lagrar variabel för karta
let marker; // Lagrar variabel för markering
let searchInputEl = document.getElementById("search") // Hämtar och lagrar variabel för sökfältet

// Asynkron funktion för att skapa karta
async function createMap() {
    try {
        // Laddar in google Maps API bibliotek och extraherar Maps-objektet
        const { Map } = await google.maps.importLibrary("maps");
        // Sätter position till Sundsvall initialt
        const position = { lat: 62.3908, lng: 17.3069 };
        // Skapar ny karta
        map = new Map(document.getElementById("map"), {
            center: position, // Centrerar över position som är Sundsvall
            zoom: 12 // Zoomar in till nivå 12
        });
        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error("Felmeddelande", error);
    }
}

// Anropar funktion
createMap()


// Asynkron funktion för att skapa autocomplete
async function createAutocomplete() {
    try {
        // Inväntar att createMap har slutförts
        await createMap();
        // Skapar ny instans av autocomplete från google maps javascript places api och lagrar i variabel
        let autocomplete = new google.maps.places.Autocomplete(
            // Kopplar autocomplete funktionen till search-elementet
            searchInputEl, {
            types: ['establishment', 'geocode'], // Specificerar typer av sökning till både platser och adresser
            fields: ['geometry', 'name'], // Specificerar de fält som ska returneras när en plats väljs till geografisk plats och platsens namn
            language: 'sv' // Sätter språket till svenska
        });

        // Lägger till lyssnare för när användaren väljer en plats från listan
        autocomplete.addListener('place_changed', async function () {
            // Hämtar den aktuella platsen som är vald i autocomplete-listan
            const place = autocomplete.getPlace();
            // Anropar funktion med platsen som argument
            displayMarker(place);
        });
        // Hämtar element för sökknappen
        const searchButton = document.getElementById('search-btn');
        // Lägger till händelselyssnare för sökknappen som vid klick anropar funktion
        searchButton.addEventListener('click', searchPlace);
        // Lägger till händelselyssnare för Enter i sökfältet
        searchInputEl.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                // Förhindrar standardbeteendet för Enter-knappen
                event.preventDefault();
                // Anropar sökfunktionen när Enter trycks
                searchPlace();
            }
        });
        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error('Felmeddelande:', error);
    }
}

// Anropar funktionen
createAutocomplete();

// Funktion för att utföra sökning av plats
function searchPlace() {

    // Skapar ett objekt med sökparametrar inför platsförfrågan
    const searchQuest = {
        query: searchInputEl.value, // Definierar sökningen till värdet från inputfältet.
        fields: ['geometry', 'name'] // Specificerar de fält som ska inkluderas i resultaten till geografisk plats och platsens namn
    };
    // Skapar en ny instans av PlacesService med referens till befintlig karta och lagrar i variabel
    const getPlace = new google.maps.places.PlacesService(map);

    // Utför en platsförfrågan med sökparametrarna och en callback-funktion som hanterar sökresultaten och statusen
    getPlace.findPlaceFromQuery(searchQuest, function (results, status) {
        // Kontrollerar om statusen för sökförfrågan är OK
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Anropar isåfall funktionen displayMarker med den första platsen i resultaten som argument
            displayMarker(results[0]);
        } else {
            // Skriver annars ut felmeddelande med status
            console.error('Felmeddelande:', status);
        }
    });
}

// Funktion för att placera ut markering på kartan
function displayMarker(place) {
    // Kontrollerar om platsen har en geografisk position
    if (place.geometry) {
        const location = place.geometry.location; // Hämtar platsens geografiska position
        const name = place.name; // Hämtar platsens namn

        // Kontrollerar om det redan finns en markering på kartan
        if (marker) {
            marker.setMap(null); // Tar bort markering
        }

        // Skapar en ny markering på kartan
        marker = new google.maps.Marker({
            position: location, // Sätter markeringens position till platsens geografiska position
            map: map, // Visar markeringen på den befintliga kartan
            title: name // Sätter titel på markeringen till platsens namn
        });

        map.setCenter(location); // Centrerar kartan på den valda platsen
        map.setZoom(18); // Zoomar in kartan till nivå 18
    }
}