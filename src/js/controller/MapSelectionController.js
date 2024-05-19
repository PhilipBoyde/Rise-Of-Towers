/** Controller for map selection page. */

document.getElementById("Map1").addEventListener("click", () => selectMap(1));
document.getElementById("Map2").addEventListener("click", () => selectMap(2));
document.getElementById("Map3").addEventListener("click", () => selectMap(3));

/**
 * Global variable to keep track of the selected map.
 */
let selectedMap;
let mapId = 0;

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

    // Show confirmation modal
    showConfirmation(mapId);
}

/**
 * Displays the confirmation modal.
 *
 * @param {string} mapId - The ID of the selected map.
 * @author Muhamed
 */
function showConfirmation(mapId) {
    selectedMap = mapId;
    document.getElementById('confirmationModal').style.display = 'block';

    console.log(mapId);
    console.log(selectedMap);
}

/**
 * Confirms the selection of the map and redirects to the game page with the selected map.
 *
 * @author Muhamed
 */
function confirmSelection() {
    if (selectedMap) {
        // Redirect to game page with selected map
        window.location.href = `Game.html?map=${selectedMap}`;
    }
}

/**
 * Hides the confirmation modal.
 *
 * @author Muhamed
 */
function hideConfirmation() {
    document.getElementById('confirmationModal').style.display = 'none';
}
