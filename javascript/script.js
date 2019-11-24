class GameMaster{
    constructor(){
        this.inputsPerTurn = 0;
        this.result = [];
        this.userEvent = 0;
        this.speedInterval = 2000;
        this.userRoundStreak = 0;
        this.userInputStreak = 0;
        this.userCanPlay = false;
        this.isPLaying = false;

    }
    gameSTART = () => {
        if(this.isPLaying === false){
            this.roundSTART();
            this.isPLaying = true;
        } else{
            document.getElementById('starterBtn').value = "You can't start a game, a game is running";
        }
    };

    resetGame = () => {
        document.getElementById('successBoard').innerHTML = this.userInputStreak;
        document.getElementById('roundBoard').innerHTML = this.userRoundStreak;
        document.getElementById('scoreboard').style.display= "block";
        this.inputsPerTurn = 0;
        this.result = [];
        this.userEvent = 0;
        this.speedInterval = 2000;
        this.userRoundStreak = 0;
        this.userInputStreak = 0;
        this.userCanPlay = false;
        this.isPLaying = false;
        document.getElementById('successCount').innerHTML = this.userInputStreak;
        document.getElementById('roundCount').innerHTML = this.userRoundStreak;
        document.getElementById('starterBtn').value = "Replay the game";
        document.getElementById('infoTurn').classList.remove('turnYes');
        document.getElementById('infoTurn').classList.add('turnNo');
        document.getElementById('Turn').innerHTML = "NO";
        document.getElementById('inputLength').innerHTML = "0";
    };

    // Start a round, make the input per turn grow and generate a new number to play and make interval faster
    roundSTART = () => {
        let x = 0;
        console.log("not ur turn");
        document.getElementById('infoTurn').classList.remove('turnYes');
        document.getElementById('infoTurn').classList.add('turnNo');
        document.getElementById('Turn').innerHTML = "NO";
        this.userCanPlay = false;
        // add 1 input needed to complete the turn 0
        this.inputsPerTurn++;
        document.getElementById('inputLength').innerHTML = this.inputsPerTurn;
        // generate a random number between 1 and 4
        let rand = Math.floor(1 + Math.random() * Math.floor(4));
        // add the random number to the array made by GM
        this.result.push(rand);
        // Make the inputs play the "song" in a specific interval
        let rowsGenerator = window.setInterval( () => {
            // Make the input glow to show the player wich key are being played
            let inputPLaying = this.result[x];
            this.makeInputsInteract(inputPLaying, true);
            console.log(this.result);
            // stop the Interval when all the key are played
            if(this.inputsPerTurn - 1 === x ){
                window.clearInterval(rowsGenerator);
                window.setTimeout(() => {
                    console.log("your turn");
                    this.userCanPlay = true;
                    document.getElementById('infoTurn').classList.remove('turnNo');
                    document.getElementById('infoTurn').classList.add('turnYes');
                    document.getElementById('Turn').innerHTML = "YES";
                }, this.speedInterval);
            }
            x++;
        },  this.speedInterval);
    };
    // Used whenever the user loose or has clicked as many time as needed roundResult is either true or false
    roundEND = (roundResult) => {
        this.userEvent = 0;
        // if true reduce the interval and relaunch a round
        if(roundResult){
            // reduce speed interval to make the game harder, cap at 240ms
            this.speedInterval -= this.speedInterval === 240 ? 0 : 220;
            this.userRoundStreak += 1;
            document.getElementById('roundCount').innerHTML = this.userRoundStreak;
            document.getElementById('infoTurn').classList.remove('turnYes');
            document.getElementById('infoTurn').classList.add('turnNo');
            document.getElementById('Turn').innerHTML = "NO";
            window.setTimeout( () => {
               this.roundSTART();
               console.log('go win');
            }, 2000);
            console.log('Next round in 2s');
        }else{
            // reset the game and make the button play usable again to start a new game
            console.log('Game reseting,');
            // Vous avez perdu
            this.resetGame();
            // show button replay
        }
    };

    userClick = ($eventValue) => {
        if(this.userCanPlay === false){
            console.log("you can't play");
        } else {
            if (this.result[this.userEvent] === $eventValue) {
                console.log('win');
                this.userEvent++;
                this.userInputStreak++;
                this.makeInputsInteract($eventValue, true , 'user');
                document.getElementById('successCount').innerHTML = this.userInputStreak;
                if (this.userEvent === this.inputsPerTurn) {
                    console.log('you win the round');
                    this.roundEND(true);
                    this.userCanPlay = false;
                    console.log("your turn is finished");

                    // display a green light and a win sound
                }
            } else {
                this.makeInputsInteract($eventValue, false , 'user');
                console.log('you loose');
                this.roundEND(false);
                console.log("your turn is finished");
                // display a red light and a loose sound plus a scoreboard

            }
        }
    };

    makeInputsInteract($input, correct, $whoClicked){
        if( $whoClicked === 'user' && this.userCanPlay === false){

        } else {
            // When the user or GM click an input
            let input = document.querySelector("[data-note='" + $input + "']");
            let note = $input;
            if (correct) {
                switch (note) {
                    case 1:
                        input.value = 'do';
                        input.classList.add('playing');
                        window.setTimeout(() => {
                            input.value = "";
                            input.classList.remove('playing')
                        },  180);
                        break;
                    case 2:
                        input.value = 're';
                        input.classList.add('playing');
                        window.setTimeout(() => {
                            input.value = "";
                            input.classList.remove('playing')

                        }, 180);
                        break;
                    case 3:
                        input.value = 'mi';
                        input.classList.add('playing');
                        window.setTimeout(() => {
                            input.value = "";
                            input.classList.remove('playing')

                        }, 180);
                        break;
                    case 4:
                        input.value = 'fa';
                        input.classList.add('playing');
                        window.setTimeout(() => {
                            input.value = "";
                            input.classList.remove('playing')

                        }, 180);
                        break;

                }
                // make the $input glow white and play the note
            } else {
                // make the $input glow red and play a false note

                input.classList.add('loose');
                window.setTimeout(() => {
                    input.classList.remove('loose')
                }, 180);
            }
        }
    }

}

let GM = new GameMaster();

playGame = (value) => {
    GM.userClick(value);
};

Start = () => {
    GM.gameSTART();
};

Reset = () => {
    GM.resetGame();
};