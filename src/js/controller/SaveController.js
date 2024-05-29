/**
 * Handles saving player scores and managing the highscore list.
 * This controller interacts with localStorage to store and retrieve highscores.
 * @class SaveController
 * @author Emil
 * @author Philip
 */
export class SaveController {

    /**
     * Constructs a new SaveController instance.
     * Initializes necessary elements and properties for managing highscores.
     * @constructor
     * @author Emil
     * @author Philip
     */
    constructor() {
        this.highScoresList = document.getElementById('highScores');
        this.playerNameInput = document.getElementById('playerName');
        this.saveNameButton = document.getElementById('saveNameButton');
        this.currentScore = 0;
    }

    /**
     * Creates an empty highscore list in localStorage if it doesn't already exist.
     * This method is called upon initialization to ensure the highscore list is available.
     * @author Emil
     * @author Philip
     */
    createHighscoreList() {
        if (!localStorage.getItem('highscoreList')) {
            const highscoreList = [];
            localStorage.setItem('highscoreList', JSON.stringify(highscoreList));
        }
    }

    /**
     * Retrieves the highscore list from localStorage.
     * @returns {Array} The highscore list or an empty array if not found.
     * @author Emil
     * @author Philip
     */
    getHighscoreList() {
        const highscoreList = JSON.parse(localStorage.getItem('highscoreList'));
        return highscoreList || [];
    }

    /**
     * Displays the highscore list in the user interface.
     * Only displays a maximum of 10 entries.
     * @author Emil
     * @author Philip
     */
    displayHighscoreList() {
        const highscoreList = this.getHighscoreList();
        const ol = document.getElementById('highscoreList');
        ol.innerHTML = ''; // Clear any existing list items
        let count = 0;
        const maxAmount = 10;

        highscoreList.forEach((entry, index) => {
            count++;
            if (count <= maxAmount) {
                const list = document.createElement('li');
                list.textContent = `${entry.name} ${entry.score}`;
                ol.appendChild(list);
            }

            console.log(`${index + 1}. ${entry.name} - ${entry.score}`);
        });
    }

    /**
     * Adds a new highscore entry to the list.
     * If the highscore list doesn't exist, it's created.
     * The list is then sorted in descending order of scores and stored back in localStorage.
     * Finally, the user is redirected to the main game page.
     * @param {string} name - The name of the player.
     * @param {number} score - The score achieved by the player.
     * @author Emil
     * @author Philip
     */
    addHighscore(name, score) {
        this.createHighscoreList();
        const highscoreList = this.getHighscoreList();
        highscoreList.push({ name: name, score: score });
        highscoreList.sort((a, b) => b.score - a.score);
        localStorage.setItem('highscoreList', JSON.stringify(highscoreList));
        window.location.href = "../../../Tower-Defense-Game/index.html";
    }
}
