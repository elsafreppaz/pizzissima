/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */


let score = 0;
let bestScore = "";

// Mes ingrédients
let basil = document.createElement("img");
basil.src = "assets/basil.png";

let mushroom = document.createElement("img");
mushroom.src = "assets/mushroom.png";

let pineapple = document.createElement("img");
pineapple.src = "assets/pineapple.png";


let closingCross = document.getElementById("closing-cross");
closingCross.addEventListener('click', function () {
    hideStartOverlay();
});


let music = document.getElementById("myAudio");

window.onload = function () {

    //Stockage local
    let storedBestScore = localStorage.getItem("bestScore"); 
    if (storedBestScore) {
        bestScore = parseInt(storedBestScore);
    }
    document.getElementById("best-score").innerHTML = "Meilleur score : " + bestScore;

    // Overlay
    setTimeout(function () {
        showStartOverlay();
    }, 1000); 
};





// TABLEAU

let grid = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
let ingredients = [basil, mushroom, pineapple];

let randomIngredient = "";
let chosenIngredient = "";

let randomTile = "";
let chosenTile = "";
let tempTiles = [];



//sélectionner les tuiles vides 
let emptyTiles = grid.filter(tile => tile === "empty");


/* -------------------------------------------------------------------------- */
/*                                Fonctions                                   */
/* -------------------------------------------------------------------------- */




function getRandomIngredient() {
    randomIngredient = Math.floor(Math.random() * ingredients.length);
    chosenIngredient = ingredients[randomIngredient];
    console.log(chosenIngredient);
};


function getRandomTile() {
    chosenTile = Math.floor(Math.random() * grid.length) + 1; // +1 permet de décale la plage
    console.log(chosenTile);

};




function appearIngredient(tileId, ingredient) {
    let clone = ingredient.cloneNode(true);
    document.getElementById(tileId).appendChild(clone);
    grid[tileId - 1] = ingredient.src; // update le tableau faudra que je mette la random tile ici
    console.table(grid);
};


function removeIngredient(tileId) {
    document.getElementById(tileId).innerHTML = "";
    grid[tileId - 1] = "empty"; // update le tableau
    console.table(grid);
};



function compareScores() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore); 
    }
    
    document.getElementById("best-score").innerHTML = "Meilleur score : " + bestScore;
    document.getElementById("overlay-best-score").innerHTML = "Meilleur score : " + bestScore;
};


function playMusic() {
    music.currentTime = 0
    music.play();
}

function stopMusic() {
    let fadeDuration = 2000;
    let fadeInterval = 50;
    let volumeStep = music.volume / (fadeDuration / fadeInterval);

    let fadeOut = setInterval(function () {
        if (music.volume > 0.05) {
            music.volume -= volumeStep;
        } else {
            music.volume = 0;
            music.pause();
            music.volume = 1;
            clearInterval(fadeOut);
        }
    }, fadeInterval);
}


function clickedTile() {
    grid.forEach((ingredient, index) => {
        // Crée un écouteur d'événements sur chaque tuile
        let tile = document.getElementById(index + 1); // Récupère la tuile par son ID (index + 1)

        tile.addEventListener('click', () => {
            //tile.classList.toggle('clicked');
            if (grid[index] === "empty") {
                console.log("Cette case est vide.");
            } else if (grid[index] === basil.src) {
                score += 20;
                console.log("Basil" + score);
                removeIngredient(tile.id)
            } else if (grid[index] === mushroom.src) {
                score += 10;
                console.log("Mushroom" + score);
                removeIngredient(tile.id)
            } else if (grid[index] === pineapple.src) {
                score -= 20;
                console.log("Pineapple" + score);
                removeIngredient(tile.id)
            }

            compareScores()

            // Affiche le score mis à jour
            let scoreDisplay = document.getElementById("score");
            scoreDisplay.innerHTML = "Score " + score; // Met à jour l'affichage du score
            let bestScoreDisplay = document.getElementById("best-score");
            bestScoreDisplay.innerHTML = "Meilleur score : " + bestScore;
        });
    });
};



function showStartOverlay() {
    let startoverlay = document.getElementById("startOverlay");
    startoverlay.style.display = 'flex';
}



function hideStartOverlay() {
    let startoverlay = document.getElementById("startOverlay");
    startoverlay.style.display = 'none';
}




function showEndOverlay() {
    let overlay = document.getElementById('endOverlay');
    overlay.style.display = 'flex'; 
    document.getElementById("overlay-score").innerHTML = "Score : " + score;
    document.getElementById("overlay-best-score").innerHTML = "Meilleur score : " + bestScore;
}


function hideEndOverlay() {
    let overlay = document.getElementById('endOverlay');
    overlay.style.display = 'none';
}


function init() {
    clickedTile();
};



function game() {
    getRandomIngredient();
    getRandomTile()
    while (grid[chosenTile - 1] !== "empty") {
        getRandomTile(); 
    }
    appearIngredient(chosenTile, chosenIngredient);


    tempTiles.push(chosenTile); 

    setTimeout(() => {
        removeIngredient(tempTiles[0]);
        tempTiles.shift();

    }, 2000);


};





function startGame() {
    document.getElementById("startGame").disabled = true;
    score = 0;
    document.getElementById("score").innerHTML = "Score " + score;

    playMusic();


    timeCalc();
    let gameInterval = setInterval(() => {
        game()
    }, 500); //Temps d'apaprition des ingrédient


    setTimeout(() => {
        clearInterval(gameInterval);
        stopMusic();
        console.log("Le jeu est terminé !");
        showEndOverlay()
        setTimeout(() => {
            hideEndOverlay()
        }, 10000) // Temps overlay de fin 


        document.getElementById("startGame").disabled = false;
    }, 30000); //Temps de jeu



};


function timeCalc() {
    let timer = 30;
    let totalTime = timer;
    let timerDisplay = document.getElementById("time");
    timerDisplay.innerHTML = timer + "s";


    let timerInterval = setInterval(() => {
        timer = timer - 1;
        timerDisplay.innerHTML = timer + "s";

        let progressBar = document.getElementById('progress-bar');
        progressBar.style.width = (timer / totalTime) * 100 + '%';

        if (timer <= 5) {
            progressBar.style.backgroundColor = 'var(--rouge)';
        } else {
            progressBar.style.backgroundColor = 'var(--vert)';
        }

        if (timer == 0) {
            clearInterval(timerInterval);
            clearGrid();

            progressBar.style.width = '100%';
            progressBar.style.backgroundColor = 'var(--vert)'; 
            timerDisplay.innerHTML ="30s";

       
        }
    }, 1000);
};





function clearGrid() {
    for (let m = 0; m < grid.length; m++) {
        removeIngredient(m + 1)
    }
};



init()






