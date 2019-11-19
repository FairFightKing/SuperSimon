class GameMaster{
    constructor(inputsPerTurn = 4){
        this.inputsPerTurn = inputsPerTurn;
        this.result = [];
        this.userString = "";
        this.userEvent = 0;
        this.speedInterval = 2000;
        this.userStreak = 0;
    }
    roundSTART(){
        let x = 0;
        let rowsGenerator = window.setInterval( () => {
            this.inputsPerTurn === x++ ? window.clearInterval(rowsGenerator) : console.log('not finished yet');
            let test = Math.floor(1 + Math.random() * Math.floor(4));
            this.result.push(test);
           // document.querySelector('input[value="'+test+'"]').value = "ohlala";
            console.log(x);
        },  this.speedInterval);
        console.log(this.result);
    }

    roundEND(roundResult){
        this.userString = "";
        this.userEvent = 0;
        if(roundResult){
            this.speedInterval -= 220;
            this.userStreak += 1;
        }else{
            this.userStreak = 0;
        }
    }

    userClick(eventValue){
        if(this.result[this.userEvent] === eventValue){
            this.userEvent++;
        }else{
            this.roundEND(false);
            return;
        }
        if(this.userEvent === this.inputsPerTurn){
            this.roundEND(true);
        }
    }
}

const GM = new GameMaster(4);
GM.roundSTART();
GM.roundEND(4);