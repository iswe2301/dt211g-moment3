"use strict";

// Variabler
const menuBtnEl = document.querySelector(".menubtn");
const containerEl = document.querySelector("div");
const sassBtnEl = document.getElementById("SASS-btn");

// Händelselyssnare vid klick somm anropar funktioner
menuBtnEl.addEventListener("click", transformMenu);
menuBtnEl.addEventListener("click", dropDownMenu);
sassBtnEl.addEventListener("click", goToSass);

// Funktion för att växla mellan klassen cross samt opacity vid klick.
// Hämtar element genom class.
function transformMenu() {
    const menuiconEl = document.querySelector(".menuicon");
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