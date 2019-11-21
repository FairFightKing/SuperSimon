class GameMaster{
    constructor(){
        this.inputsPerTurn = 0;
        this.result = [];
        this.userEvent = 0;
        this.speedInterval = 2000;
        this.userRoundStreak = 0;
        this.userInputStreak = 0;
    }

    // Start a round, make the input per turn grow and generate a new number to play and make interval faster
    roundSTART = () => {
        let x = 0;
        this.letUserPLay(false);
        // add 1 input needed to complete the turn
        this.inputsPerTurn++;
        // generate a random number between 1 and 4
        let rand = Math.floor(1 + Math.random() * Math.floor(4));
        // add the random number to the array made by GM
        this.result.push(rand);
        // Make the inputs play the "song" in a specific interval
        let rowsGenerator = window.setInterval( () => {
            // stop the Interval when all the key are played
            if(this.inputsPerTurn - 1 === x++ ){
             window.clearInterval(rowsGenerator);
             this.letUserPLay(true);
            } else {
                // do nothing, just let user its not done yet
                console.log('not finished yet');
            };
            // Make the input glow to show the player wich key are being played
            /* debug
            console.log(x);
            console.log(this.result);
             */
        },  this.speedInterval);
    }
    // Used whenever the user loose or has clicked as many time as needed roundResult is either true or false
    roundEND = (roundResult) => {
        this.userEvent = 0;
        // if true reduce the interval and relaunch a round
        if(roundResult){
            // reduce speed interval to make the game harder, cap at 240ms
            this.speedInterval -= this.speedInterval === 240 ? 0 : 220;
            this.userRoundStreak += 1;
            window.setTimeout( () => {
               this.roundSTART();
               console.log('go win');
            }, 3000);
            console.log('Next round in 3s');
        }else{
            // reset the game and make the button play usable again to start a new game
            console.log('Game reseting,');
            this.userRoundStreak = 0;
            this.userInputStreak = 0;
            this.inputsPerTurn = 0;
            this.result = [];
            this.speedInterval = 2000;
            // Vous avez perdu
            // show button play
        }
    }

    userClick = ($eventValue) => {
        /* debug
        console.log("event value :" + $eventValue);
        console.log("GameMaster value :" + this.result[this.userEvent]);
        console.log("Array index value :" + this.userEvent);
        console.log('Input Streak : ' + this.userInputStreak);
        console.log('Input PER TURN : ' + this.inputsPerTurn);
        */
        if(this.result[this.userEvent] === $eventValue){
            console.log('win');
            this.userEvent++;
            this.userInputStreak++;
            if(this.userEvent === this.inputsPerTurn) {
                console.log('you WIN');
                this.roundEND(true);
                // display a green light and a win sound
            }
        } else {
            console.log('you loose');
            this.roundEND(false);
            // display a red light and a loose sound plus a scoreboard

        }
    }

    letUserPLay = (GM_Playing) => {
        if (GM_Playing === true){
            // Make the player unable to interact with the inputs and launch the userClick method
        } else {
            // Make the inputs accessible to the player when the GM finished playing
        }
    }
}

const GM = new GameMaster();
GM.roundSTART();