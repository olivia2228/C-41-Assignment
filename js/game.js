class Game {
    constructor() {

    }
    //defines the getState function
    getState() {
        //gameStateRef refers to the gameState child of database 
        var gameStateRef = database.ref('gameState');
        //creates a continuous listener for the variable
        //why is function (data) written?
        gameStateRef.on("value", function (data) {
            //extracts the necessary data from the information retrieved
            gameState = data.val();
        })

    }
    //defines the update function and updates the state 
    update(state) {
        //database refers to the database itself and updates the state
        database.ref('/').update({
            //gameState is equal to state(curly bracket= JSON data)  
            gameState: state
        });
    }
    //creates a asynchronous function
    async start() {
        //compares the gameState and 0  
        if (gameState === 0) {
            //calls the object player from the Player class
            player = new Player();
            //playerCountRef waits for the database to refer to the playerCount child and creates a one-time listener
            var playerCountRef = await database.ref('playerCount').once("value");
            //if the variable retrieves the data from the database then execute the nexr part of the code
            if (playerCountRef.exists()) {
                //extracts the necessary data from the information retrieved 
                playerCount = playerCountRef.val();
                //calls the getCount function from the player class
                player.getCount();
            }
            //calls the object form from the form class
            form = new Form()
            //displays the form
            form.display();
        }
        //creates player 1
        player1 = createSprite(200, 500);
        //adds player 1's image
        player1.addImage("player1", player_img);
        //creates player 2
        player2 = createSprite(800, 500);
        //adds player 2's image
        player2.addImage("player2", player_img);
        //players array is equal to player1 and player2
        players = [player1, player2];

    }
    //defines the play function
    play() {
        //hides the form when in play state 
        form.hide();
        //calls the getPlayerInfo function from player class
        Player.getPlayerInfo();
        //puts the background image
        image(back_img, 0, 0, 1000, 800);
        //what does x stand for?
        var x = 100;
        //what does y stand for?
        var y = 200;
        //indexis equal to 0
        var index = 0;
        //dra3ws sprites
        drawSprites();
        //defines variable plr to get information on all players
        for (var plr in allPlayers) {
            //if we get information on all players then index should increase
            index = index + 1;
            //confusion 78,79
            x = 500 - allPlayers[plr].distance;
            y = 500;
            //an array starts from zero but the index starts from 1 so index should be 1 less for the x amd y position
            players[index - 1].x = x;
            players[index - 1].y = y;
            //comparison between index and player index
            //the index is for the players only?  
            if (index === player.index){
                fill("red")
               textSize(30);
               text(player.name,x,y)
               
            }
            fill("blue")
            textSize(20);
            text(allPlayers["player1"].name+"-"+allPlayers["player1"].score,50,50)
            text(allPlayers["player2"].name+"-"+allPlayers["player2"].score,50,100)



        }



        //if right arrow key is pressed and player index is not equal to null (not empty) 
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            //player should move to the right
            //confusion 102
            player.distance -= 10
            //calls the update function from player class
            player.update();
        }
        //if left arrow key is pressed and player index is not equal to null (not empty) 
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            //player should move to the left
            player.distance += 10
            //update function from player class is called
            player.update();
        }
        //confusion 114           
        if (frameCount % 20 === 0) {
            //fruits will be spawned at random spots
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            //sets the fruit's velocity
            fruits.velocityY = 6;
            //it should be spawning randomly between the numbers 1 and 5
            var rand = Math.round(random(1, 5));
            //switching the fruits for the rand variable 
            switch (rand) {
                //passing arguments
                //explain arguement system
                case 1: fruits.addImage("fruit1", fruit1_img);
                    break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                    break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                    break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                    break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                    break;
            }
            //adds fruits for the fruit group
            fruitGroup.add(fruits);

        }
        //comparison between player index and null 
        if (player.index !== null) {
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    fruitGroup.get(i).destroy();
                    player.score+=1
                    player.update();

                }

            }
        }







    }

    end() {
        console.log("Game Ended");
    }
}
