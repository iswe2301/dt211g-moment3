"use strict";

let map; // Lagrar variabel för karta
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
        // Skapar ny instans av autocomplete från google maps javascript places api
        autocomplete = new google.maps.places.Autocomplete(
            // Kopplar autocomplete funktionen till search-elementet
            searchInputEl, {
            types: ['establishment', 'geocode'], // Specificerar typer av sökning till både platser och adresser
            fields: ['geometry', 'name'], // Specificerar de fält som ska returneras när en plats väljs till geografisk plats och platsens namn
            language: 'sv' // Sätter språket till svenska
        });
        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error('Felmeddelande:', error);
    }
}