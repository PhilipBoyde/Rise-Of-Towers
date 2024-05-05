/**
 * @class script
 * This script handles the navigation between slides and controls the display of associated images.
 * It includes functions to move to the next or previous slide, and to show the appropriate image for each slide.
 * @author: Mahyar
 */

let currentSlide = 1; // Initialize the current slide index

/**
 * Function to navigate to the next slide and update displayed content accordingly.
 */
function nextSlide() {
    const currentText = document.querySelector(".slide" + currentSlide);
    currentText.style.display = "none"; // Hide current text

    currentSlide++;
    if (currentSlide > 7) {
        currentSlide = 1; // Reset to the first slide if it exceeds the total number of slides
    }

    const newText = document.querySelector(".slide" + currentSlide);
    newText.style.display = "block"; // Show next text

    // Determine which picture should be shown
    if (currentSlide === 2) {
        document.querySelector("#towerImageContainerSlide2").style.display = "block";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 3) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "block";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 4) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "block";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 5) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "block";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 6) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "block";
    } else {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
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
        currentSlide = 7; // Reset to the last slide if it goes below the first slide
    }

    const newText = document.querySelector(".slide" + currentSlide);
    newText.style.display = "block"; // Show previous text

    // Determine which picture should be displayed
    if (currentSlide === 2) {
        document.querySelector("#towerImageContainerSlide2").style.display = "block";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 3) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "block";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 4) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "block";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 5) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "block";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    } else if (currentSlide === 6) {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "block";
    } else {
        document.querySelector("#towerImageContainerSlide2").style.display = "none";
        document.querySelector("#towerImageContainerSlide3").style.display = "none";
        document.querySelector("#towerImageContainerSlide4").style.display = "none";
        document.querySelector("#towerImageContainerSlide5").style.display = "none";
        document.querySelector("#towerImageContainerSlide6").style.display = "none";
    }
}
