"use strict";

// Variabler
const menuBtnEl = document.querySelector(".menubtn");
const containerEl = document.querySelector("div");
const menuiconEl = document.querySelector(".menuicon");
const sassBtnEl = document.getElementById("SASS-btn");
const flipCardEl = document.querySelector(".flip-card-inner");

// Händelselyssnare vid klick somm anropar funktioner
menuBtnEl.addEventListener("click", transformMenu);
menuBtnEl.addEventListener("click", dropDownMenu);


// Lägger till händelselyssnare om knappen finns
if (sassBtnEl) {
    sassBtnEl.addEventListener("click", goToSass);
}

// Lägger till händelselyssnare om flipcard finns
if (flipCardEl) {
    flipCardEl.addEventListener("click", flipImage);
}

// Funktion för att växla mellan klassen cross samt opacity vid klick.
function transformMenu() {
    menuiconEl.classList.toggle("cross");
    containerEl.classList.toggle("opacity");
}

// Funktion för att växla mellan att visa och dölja länkar i navigering när hamburgermenyn klickas.
function dropDownMenu() {
    // Hämtar element genom ID till länkarna.
    const mobilenavEl = document.getElementById("mobilenav");
    // Hämtar element genom ID till menytext.
    const menutextEl = document.getElementById("menu-text");
    const style = window.getComputedStyle(mobilenavEl);
    // Kontroll om menyn visas som block, döljer vid klick
    if (style.display === "block") {
        mobilenavEl.style.display = "none";
        menutextEl.innerHTML = "MENY";
    } else {
        // Om meny inte visas som block (display: none), visar block vid klick
        mobilenavEl.style.display = "block";
        menutextEl.innerHTML = "STÄNG";
    }
}

// Funktion för att gå till SASS-sidan
function goToSass() {
    window.location.href = "sass.html"
}

// Funktion för att vända bild, togglar mellan klass vid klick
function flipImage() {
    flipCardEl.classList.toggle("flipped");
}