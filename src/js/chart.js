"use strict";

// Importerar modul från chart.js
import Chart from 'chart.js/auto';

// Asynkron funktion som hämtar kursdata till stapeldiagrammet
async function getCourseData() {
    try {
        // Utför fetch-anrop och inväntar svaret
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        // Konverterar svaret till JSON och inväntar resultatet
        const data = await response.json();

        // Filtrerar datan för att endast inkludera kurser
        const courses = data.filter(course => course.type === "Kurs");

        // Sorterar kurser efter antal sökande i fallande ordning
        courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        // Skapar ny array genom att välja ut de sex första kurserna, från index 0 - 5.
        const topCourses = courses.slice(0, 6);

        // Skapar nya arrayer med map genom att hämta kursnamn och antalet kurssökande
        const courseName = topCourses.map(course => course.name);
        const courseApplicants = topCourses.map(course => course.applicantsTotal);

        // Skapar ny array genom att dela upp befintlig array utifrån varje mellanslag i strängar
        const courseNameSplit = courseName.map(name => name.split(' '))

        // Returnerar kursnamn och antal sökande
        return { courseNameSplit, courseApplicants };

        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error("Error-meddelande:", error);
        throw error;
    }
}

// Asynkron funktion för att visa data
async function displayCourseData() {
    try {
        // Inväntar att data har hämtats från getData-funktionen
        const data = await getCourseData();

        // Skapar diagram
        new Chart(
            // Hämtar element för stapeldiagram
            document.getElementById('bar-chart'),
            {
                // Av typen stapeldiagram
                type: 'bar',
                data: {
                    labels: data.courseNameSplit, // Sätter staplarnas ettiketter till kursnamnen
                    datasets: [{
                        label: 'Antal sökande', // Sätter ettiketter för data till Antal sökande
                        data: data.courseApplicants, // Sätter data till antal kurssökande
                        backgroundColor: 'rgba(255, 105, 180, 0.5)', // Sätter bakgrundsfärg
                        borderColor: 'rgb(255, 105, 180)', // Sätter borderfärg
                        borderWidth: 1 // Sätter borderbredd
                    }]
                },
                options: {
                    layout: {
                        padding: {
                            bottom: 50, // Sätter padding bottom
                        }
                    },
                    maintainAspectRatio: false, // Stänger av AspectRatio för att mobilversion ska funka bra
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false // Tar bort rutnätet på y-axeln
                            }
                        },
                        x: {
                            grid: {
                                display: false // Tar bort rutnätet på x-axeln
                            }
                        }
                    }
                }
            });

        // Fångar upp felmeddelanden
    } catch (error) {
        console.error('Error-meddelande:', error);
        throw error;
    }
}

// Anropar funktion
displayCourseData();

// Asynkron funktion som hämtar programdata till cirkeldiagrammet
async function getProgramData() {
    try {
        // Utför fetch-anrop och inväntar svaret
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        // Konverterar svaret till JSON och inväntar resultatet
        const data = await response.json();

        // Filtrerar datan för att endast inkludera program
        const programs = data.filter(program => program.type === "Program");

        // Sorterar programmen efter antal sökande i fallande ordning
        programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        // Skapar ny array genom att välja ut de fem första programmen, från index 0 - 4.
        const topPrograms = programs.slice(0, 5);

        // Skapar nya arrayer med map genom att hämta programnamn och antal sökande
        const programName = topPrograms.map(program => program.name);
        const programApplicants = topPrograms.map(program => program.applicantsTotal);

        // Returnerar programnamn och antal sökande
        return { programName, programApplicants };

        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error("Error-meddelande:", error);
        throw error;
    }
}

// Asynkron funktion för att visa cirkeldiagrammet
async function displayProgramData() {
    try {
        // Inväntar att data har hämtats från getProgram-funktionen
        const data = await getProgramData();

        // Skapar diagram
        new Chart(
            // Hämtar element för cirkeldiagram
            document.getElementById('pie-chart'),
            {
                // Av typen cirkeldiagram
                type: 'pie',
                data: {
                    labels: data.programName, // Sätter cirkeldelarnas ettiketter till programmens namn
                    datasets: [{
                        label: 'Antal sökande', // Sätter ettiketter för data till Antal sökande
                        data: data.programApplicants, // Sätter data till antal programsökande
                        backgroundColor: [ // Sätter bakgrundsfärger för de olika delarna
                            'rgba(255, 105, 180, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)'
                        ],
                        borderColor: [ // Sätter border färger för de olika delarna
                            'rgba(255, 105, 180)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(153, 102, 255)'
                        ],
                        borderWidth: 1 // Sätter borderns bredd
                    }]
                }
            });
        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error('Error-meddelande:', error);
        throw error;
    }
}

// Anropar funktionen
displayProgramData();