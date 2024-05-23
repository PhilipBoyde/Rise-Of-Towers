/** Controller for map selection page. */

document.getElementById("Map1").addEventListener("click", () => selectMap(1));
document.getElementById("Map2").addEventListener("click", () => selectMap(2));
document.getElementById("Map3").addEventListener("click", () => selectMap(3));
let images /** @type NodeListOf */ = document.querySelectorAll('.map img');
let texts /** @type NodeListOf */ = document.querySelectorAll('.mapText');
let backgrounds  /** @type NodeListOf */ = document.querySelectorAll('.blurryBackground');
/**
 * Global variable to keep track of the selected map.
 */
let selectedMap;

/**
 * Highlights the selected map and shows the confirmation modal.
 *
 * @param mapId - The ID of the selected map.
 * @author Muhamed
 */
function selectMap(mapId) {
    // Remove the selected class from any previously selected map
    const previousSelectedMap = document.querySelector('.map.selected');
    if (previousSelectedMap) {
        previousSelectedMap.classList.remove('selected');
    }

    // Add the selected class to the clicked map
    const mapElement = document.getElementById(mapId);
    if (mapElement) {
        mapElement.classList.add('selected');
    }

    // Store the selected map ID
    selectedMap = mapId;
}

/**
 * Confirms the selection of the map and redirects to the game page with the selected map.
 *
 * @author Muhamed
 */
function confirmSelection() {
    if (selectedMap) {
        window.location.href = `Game.html?map=${selectedMap}`;
    }
}

/**
 * Resets the map selection by removing the selected class from all maps.
 * @author Philip
 */
function reset(){
    images.forEach(function (img) {
        img.style.width = '30vw';
        img.style.position = 'initial';
        img.style.left = 'initial';
        img.style.top = 'initial';
        img.classList.remove('enlarged');
        img.classList.remove('no-hover');
    });
    texts.forEach(function (text) {
        text.style.display = 'none';
    });
    backgrounds.forEach(function (background) {
        background.style.display = 'none';
    });
}


/**
 * Event listener for the map images. When an image is clicked, it is enlarged and the associated text is displayed.
 * If the image has been clicked before, it is reset to its original size and the text is hidden.
 * @param image - The image that was clicked.
 * @param index - The index of the image in the images array.
 * @author Philip
 */
images.forEach(function(image, index) {
    image.addEventListener('click', function() {
        // If the image has been clicked before
        if (image.classList.contains('enlarged')) {
            // Reset the image and hide the text and blurry background
            image.style.width = '30vw';
            image.style.position = 'initial';
            image.style.left = 'initial';
            image.style.top = 'initial';
            texts[index].style.display = 'none';
            backgrounds[index].style.display = 'none';

            // Remove the classes
            image.classList.remove('enlarged');
            image.classList.remove('no-hover');
        } else {
            reset();

            // Update the clicked image, display the associated text, and show the blurry background
            image.style.width = 'auto';
            image.style.position = 'absolute';
            image.style.left = '0';
            image.style.top = '10vh';
            texts[index].style.display = 'block';
            backgrounds[index].style.display = 'block';
            backgrounds[index].style.height = image.height + "px"; // Set the height of the blurry background to the height of the image
            backgrounds[index].style.top = '11.2vh';
            backgrounds[index].style.left = (image.offsetWidth - 1) + 'px'; // Position the blurry background right up against the image on the right
            backgrounds[index].appendChild(texts[index]) // Append the text to the blurry background

            // Add the classes
            image.classList.add('no-hover');
            image.classList.add('enlarged');
        }
    });
});
