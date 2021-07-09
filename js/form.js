class Form {
    //creates different objects
    constructor() {
        //creates name input
        this.input = createInput("Please Enter Your Name");
        //creates play button
        this.button = createButton('Start');
        //creates greeting
        this.greeting = createElement('h2');
        //creates game title
        this.title = createElement('h2');
        //creates reset button
        this.reset = createButton('Reset');
    }
    //hides the objects
    //the reset button will be present at all times
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    //displays the objects
    display() {
        //why is html written?
        this.title.html("FRUIT CATCHER");
        //positioning the title
        this.title.position(350, 50);
        //confusion 29,30
        this.title.style('font-size', '70px');
        this.title.style('color', 'yellow');
        //positioning the input
        this.input.position(550, 400);
        //confusion 35,36,37
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'white');
        //positioning the play button
        this.button.position(560, 500);
        //confusion 41,42,43
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'cyan');
        //positioning the reset button
        this.reset.position(900, 660);
        //confusion 47,48,49
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'cyan');

        //defines the mousePressed arrow function
        this.button.mousePressed(() => {
            //hide input and button
            this.input.hide();
            this.button.hide();
            //player's name should be the value entered in input box
            player.name = this.input.value();
            //when player name is ended the player count should increase by 1
            //confusion 60
            playerCount += 1;
            //the playerCount should be recorded in player index
            player.index = playerCount;
            //update function from player class is called
            player.update();
            //updateCount function from player class is called
            player.updateCount(playerCount);
            //greeting should be displayed after the player presses the play button
            this.greeting.html("Hello " + player.name)
            //positioning the greeting
            this.greeting.position(400, 250);
            //confusion 72,73
            this.greeting.style('color', 'turquoise');
            this.greeting.style('font-size', '100px');
        });

        this.reset.mousePressed(() => {
           database.ref("/").update({
               gameState:0,
               playerCount:0
           })
        });

    }
}