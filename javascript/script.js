class Computer{
    constructor(inputsPerTurn = 4){
        this.inputsPerTurn = inputsPerTurn;
        this.result = "";
    }
    generator(){
        let x = 0;
        let rowsGenerator = window.setInterval( () => {
            this.inputsPerTurn === x++ ? window.clearInterval(rowsGenerator) : console.log('not finished yet');
            let test = Math.floor(1 + Math.random() * Math.floor(4));
            this.result += test;
           // document.querySelector('input[value="'+test+'"]').value = "ohlala";
            console.log(x);
        },  1000);
        console.log(this.result);
    }

    roundEND(userInputs){
        this.result == userInputs ? console.log('win') : console.log('loose');
    }


}

const computer1 = new Computer(4);
computer1.generator();
computer1.roundEND(4);