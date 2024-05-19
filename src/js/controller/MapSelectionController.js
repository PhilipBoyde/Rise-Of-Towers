/** Controller for map selection page. */

/**
 * Global variable to keep track of the selected map.
 */
let selectedMap = '';

/**
 * Highlights the selected map and shows the confirmation modal.
 *
 * @param {string} mapId - The ID of the selected map.
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
