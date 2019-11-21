class GameMaster{
    constructor(){
        this.inputsPerTurn = 0;
        this.result = [];
        this.userEvent = 0;
        this.speedInterval = 2220;
        this.userRoundStreak = 0;
        this.userInputStreak = 0;
    }

    // Start a round, make the input per turn grow and generate a new number to play and make interval faster
    roundSTART = () => {
        let x = 0;
        this.inputsPerTurn++;
        this.speedInterval -= this.speedInterval === 240 ? 0 : 220;
        let rand = Math.floor(1 + Math.random() * Math.floor(4));
        this.result.push(rand);
        let rowsGenerator = window.setInterval( () => {
            this.inputsPerTurn - 1 === x++ ? window.clearInterval(rowsGenerator) : console.log('not finished yet');
            // joue les touches suivant l'array
            console.log(x);
            console.log(this.result);
        },  this.speedInterval);
    }
    // Used whenever the user loose or has clicked as many time as needed roundResult is either true or false
    roundEND = (roundResult) => {
        this.userEvent = 0;
        if(roundResult){
            this.speedInterval -= 220;
            this.userRoundStreak += 1;
            window.setTimeout( () => {
               this.roundSTART();
               console.log('go win');
            }, 3000);
            console.log('Next round in 3s');
        }else{
            console.log('Game reseting,');
            this.userRoundStreak = 0;
            this.userInputStreak = 0;
            this.inputsPerTurn = 0;
            this.result = [];
            this.speedInterval = 2220;
            // Vous avez perdu
            window.setTimeout( () => {
                this.roundSTART();
                console.log('go loose');
            }, 3000);
            console.log('Next round in 3s');
        }
    }

    userClick = ($eventValue) => {
        console.log("event value :" + $eventValue);
        console.log("GameMaster value :" + this.result[this.userEvent]);
        console.log("Array index value :" + this.userEvent);
        console.log('Input Streak : ' + this.userInputStreak);
        console.log('Input PER TURN : ' + this.inputsPerTurn);
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
}

const GM = new GameMaster();
GM.roundSTART();