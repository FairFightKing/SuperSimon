class Computer{
    constructor(inputsPerTurn = 4){
        this.inputsPerTurn = inputsPerTurn;
        this.result = "";
        this.init();
    }
    init(){
        let i;
        for(i = 0; i < this.inputsPerTurn; i++) {
            let test = Math.floor(1 + Math.random() * Math.floor(4));
            this.result += test;
        };
        console.log(this.result);
    }
    roundEND(userInputs){
        this.result == userInputs ? console.log('win') : console.log('loose');
    }

}

const computer1 = new Computer(1);

computer1.roundEND(4);