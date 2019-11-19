class Computer{
    constructor(x = 4){
        this.x = x;
        this.result = "";
        this.init();
    }
    init(){
        let i;
        for(i = 0; i < this.x; i++) {
            let test = Math.floor(Math.random() * Math.floor(7));
            this.result += test;
        };
        console.log(this.result);
    }

}

const computer1 = new Computer(6);