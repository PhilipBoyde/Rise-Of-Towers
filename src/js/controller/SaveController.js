export class SaveController{


    /**
     * @author Emil Åqvist
     */
    constructor() {
        this.highScoresList = document.getElementById('highScores');
        this.playerNameInput = document.getElementById('playerName');
        this.saveNameButton = document.getElementById('saveNameButton');
        this.currentScore = 0;

        this.saveNameButton.addEventListener('click', () => this.saveName());
        document.addEventListener('DOMContentLoaded',() => this.displayHighScores());
    }

    /**
     * @author Emil Åqvist
     * @returns {any|*[]}
     */
    getHighScores(){
        const highScores = localStorage.getItem('highScores');
        return highScores ? JSON.parse(highScores) : [];
    }

    /**
     * @author Emil Åqvist
     * @param highscores
     */
    saveHighScores(highscores){
        localStorage.setItem('highScores',JSON.stringify(highscores))
    }

    /**
     * @author Emil Åqvist
     * @param score
     */
    addScore(score){
        this.currentScore = score;
    }

    /**
     * @author Emil Åqvist
     */
    displayHighScores(){
        const highScores = this.getHighScores();
        this.highScoresList.innerHTML = '';

        highScores.forEach((scoreEntry,index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${scoreEntry.name}: ${scoreEntry.score}`;
            this.highScoresList.appendChild(listItem);

            }
        )
    }

    /**
     * @author Emil Åqvist
     */
    saveName(){
        const name = this.playerNameInput.value.trim();

        if(name && this.currentScore > 0){
            const highScores = this.getHighScores();
            highScores.push({name,score:this.currentScore});

            highScores.sort((a,b) => b.score - a.score);

            this.saveHighScores(highScores);
            this.displayHighScores();

            this.playerNameInput.value = '';
            this.currentScore = 0;

        } else {
            alert('Ange Namnet tack!');
        }
    }


}