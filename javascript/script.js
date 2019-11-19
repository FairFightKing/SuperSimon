class GameMaster{
    constructor(){
        this.inputsPerTurn = 0;
        this.result = [];
        this.userString = "";
        this.userEvent = 0;
        this.speedInterval = 2000;
        this.userRoundStreak = 0;
        this.userInputStreak = 0;
    }
    roundSTART(inputsPerTurn = 4){
        this.inputsPerTurn = inputsPerTurn;
        let x = 0;
        let rowsGenerator = window.setInterval( () => {
            this.inputsPerTurn - 1 === x++ ? window.clearInterval(rowsGenerator) : console.log('not finished yet');
            let test = Math.floor(1 + Math.random() * Math.floor(4));
            this.result.push(test);
           // document.querySelector('input[value="'+test+'"]').value = "ohlala";
            console.log(x);
            console.log(this.result);
        },  this.speedInterval);
    }

    roundEND(roundResult){
        this.userString = "";
        this.userEvent = 0;
        if(roundResult){
            this.speedInterval -= 220;
            this.userRoundStreak += 1;
        }else{
            this.userRoundStreak = 0;
            this.userInputStreak = 0;
            this.speedInterval = 2000;
        }
    }

    userClick(eventValue){
        if(this.result[this.userEvent] === eventValue){
            this.userEvent++;
            this.userInputStreak++;
            if(this.userEvent === this.inputsPerTurn) {
                this.roundEND(true);
            }
        } else {
            this.roundEND(false);
        }
    }
}

const GM = new GameMaster();
GM.roundSTART(4);