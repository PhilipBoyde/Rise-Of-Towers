/**
 * @author Philip
 * @author Emil
 */
export class SaveController{


    /**
     * @author Emil Åqvist
     */
    constructor() {
        this.highScoresList = document.getElementById('highScores');
        this.playerNameInput = document.getElementById('playerName');
        this.saveNameButton = document.getElementById('saveNameButton');
        this.currentScore = 0;

    }

    /**
     * @author Philip
     * @Author Emil
     */
    createHigscoreList(){
        if (!localStorage.getItem('highscoreList')) {
            // Initialize an empty highscore list
            const highscoreList = [];
            console.log("Created HigscoreList")
            // Store the highscore list in localStorage
            localStorage.setItem('highscoreList', JSON.stringify(highscoreList));
        }
    }

    /**
     * @author Philip
     * @author Emil
     * @returns {any|*[]}
     */
    getHighscoreList() {
        const highscoreList = JSON.parse(localStorage.getItem('highscoreList'));
        return highscoreList || [];
    }

    /**
     * @author Philip
     * @author Emil
     */
    displayHighscoreList() {
        const highscoreList = this.getHighscoreList();
        const ol = document.getElementById('highscoreList');
        ol.innerHTML = ''; // Clear any existing list items
        let count = 0;
        let maxAmmout = 10;

        highscoreList.forEach((entry, index) => {
            count++;
            if(count <= maxAmmout) {
                const list = document.createElement('li');
                list.textContent = `${entry.name} ${entry.score}`;
                ol.appendChild(list);
            }

            console.log(`${index + 1}. ${entry.name} - ${entry.score}`);
        });
    }


    /**
     *
     * @author Philip
     * @author Emil
     * @param name
     * @param score
     */
    addHighscore(name, score) {
        this.createHigscoreList();
        // Retrieve the current highscore list
        const highscoreList = this.getHighscoreList();
        // Add the new score to the list
        highscoreList.push({ name: name, score: score });
        // Sort the list in descending order of scores
        highscoreList.sort((a, b) => b.score - a.score);
        // Store the updated list back in localStorage
        localStorage.setItem('highscoreList', JSON.stringify(highscoreList));
        //this.displayHighscoreList();

        window.location.href = "../../../Tower-Defense-Game/index.html"
    }



}

