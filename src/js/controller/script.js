/**
 * @class script
 * This script handles the navigation between slides and controls the display of associated images.
 * It includes functions to move to the next or previous slide, and to show the appropriate image for each slide.
 * @author: Mahyar
 */

let currentSlide = 1; // Initialize the current slide index

// Define an array of image paths corresponding to each slide
const imagePaths = [
    "../js/model/assets/Tutorial/CoinsAndHealth.png", // slide 2
    "../js/model/assets/Tutorial/TowerPlecement.png",       // slide 3
    "../js/model/assets/Tutorial/TowersICon.png",       // slide 4
    "../js/model/assets/Tutorial/TowerRadiaEnemies.png", // slide 5
    "../js/model/assets/Tutorial/TowerAndUpgrade.png", // slide 6
    "../js/model/assets/Tutorial/VanligaEnemies.png",  // slide 7
    "../js/model/assets/Tutorial/BossEnemies.png"  // slide 8
];

// Add event listeners to buttons when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", prevSlide);
        nextButton.addEventListener("click", nextSlide);
    }
});

/**
 * Function to navigate to the next slide and update displayed content accordingly.
 */
function nextSlide() {
    const currentText = document.querySelector(".slide" + currentSlide);
    currentText.style.display = "none"; // Hide current text

    currentSlide++;
    if (currentSlide > 9) {
        currentSlide = 1; // Reset to the first slide if it exceeds the total number of slides
    }

    const newText = document.querySelector(".slide" + currentSlide);
    newText.style.display = "block"; // Show next text

    // Determine which picture should be shown
    const imageContainer = document.querySelector(".imageContainer");
    imageContainer.innerHTML = ""; // Clear the existing images

    if (currentSlide >= 2 && currentSlide <= 9) {
        const towerImage = document.createElement("img");
        towerImage.src = imagePaths[currentSlide - 2]; // Adjust index to match array index
        imageContainer.appendChild(towerImage);
    }
}

/**
 * Function to navigate to the previous slide and update displayed content accordingly.
 */
function prevSlide() {
    const currentText = document.querySelector(".slide" + currentSlide);
    currentText.style.display = "none"; // Hide current text

    currentSlide--;
    if (currentSlide < 1) {
        currentSlide = 9; // Reset to the last slide if it goes below the first slide
    }

    const newText = document.querySelector(".slide" + currentSlide);
    newText.style.display = "block"; // Show previous text

    // Determine which picture should be displayed
    const imageContainer = document.querySelector(".imageContainer");
    imageContainer.innerHTML = ""; // Clear the existing images

    if (currentSlide >= 2 && currentSlide <= 9) {
        const towerImage = document.createElement("img");
        towerImage.src = imagePaths[currentSlide - 2]; // Adjust index to match array index
        imageContainer.appendChild(towerImage);
    }
}