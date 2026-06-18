// Globals
let circles;
let hero;
let dFactor = 15;
let gameWidth = window.innerWidth - 15;
let gameHeight = window.innerHeight - 15;
let numbCircles = 30;
let gameOver = false;

// Setup
function setup(){
    createCanvas(gameWidth,gameHeight);
    noStroke();
    noCursor();
    resetGame();
    rectMode(CENTER);
    textSize(40);
    textAlign(CENTER,CENTER);
}

// Animation
function draw(){
    //startScreen();
    gameRun();
}

/* Main Functions
function startRect(){
    rect(gameWidth/2,gameHeight/2,gameWidth,gameHeight);
}

function startScreen(){
    
}
*/

function Circle(){
    this.renew();
}

function Hero(x,y){
    this.x = x;
    this.y = y;
    this.d = dFactor;
}

function resetGame(){
    hero = new Hero(gameWidth/2, gameHeight/2);

    hero.d = 15;
    dFactor = 15;
    
    Circle.d = random(dFactor/8, 1.25 * dFactor);
    
    circles = [];
    for (let c = 0; c<numbCircles; c++){
        circles.push(new Circle());
    }
    
    gameOver = false;
}

function buttonMaker(){
    let button = createButton("Play again?");
    button.center();
    button.mousePressed(resetGame);
    button.mouseClicked(button.hide);
}

function gameRun(){
    if(!gameOver){
        background(0,0,0);
        
        noCursor();
        
        for(let c = 0; c < circles.length; c++){
            circles[c].x += circles[c].xinc;
            circles[c].y += circles[c].yinc;
            circles[c].show();
            
            if(dFactor >= ((7/8) * gameHeight)){
                background(0, 0, 0);
                cursor(255,255,255);
                fill(255, 215, 0);
                text("YOUR SIZE IS HIGH.", gameWidth/2, gameHeight/3);
                text("YOU WIN!", gameWidth/2, (gameHeight * 2/3));
                buttonMaker();
            }
            
            if(hero.collisionCheck(circles[c])){
                background(0, 0, 0);
                fill(255, 40, 40);
                text("GAME OVER", gameWidth/2, gameHeight/3);
                fill(255, 40, 40);
                text("Size: " + dFactor, gameWidth/2, gameHeight*(2/3));
                cursor(255,255,255);
                
                buttonMaker();   
                
                break;
            }
            
            if(circles[c].offCanvas()){
                circles[c].renew();
            }
        }

        hero.x = mouseX;
        hero.y = mouseY;
        hero.show();
    }
}

// Main Function Prototypes
Circle.prototype.show = function(){
    fill(this.r, this.g, this.b);
    ellipse(this.x,this.y,this.d, this.d);
}

Circle.prototype.renew = function(){
    this.d = random(dFactor/8, 1.25 * dFactor);
    if(random(0,2) > 1){
        if(random(0,2) > 1){
            this.x = -60;
            this.xinc = random(0.1, 2.5);
        } else {
            this.x = gameWidth + 60;
            this.xinc = random(0.1, 2.5) * -1;
        }
        
        this.y = random(1, gameHeight);
        this.yinc = random(0.1, 2.5) - 1.5;
    } else {
        if(random(0,2) > 1){
            this.y = -60;
            this.yinc = random(0.1, 2.5);
        } else {
            this.y = gameHeight + 60;
            this.yinc = random(0.1, 2.5) * -1;
        }
        
        this.x = random(1, gameWidth);
        this.xinc = random(0.1, 2.5) - 1.5;
    }

    this.r = random(50, 255);
    this.g = random(50, 255);
    this.b = random(50, 255);
}

Circle.prototype.offCanvas = function(){
    if(this.x < -60 || this.x > gameWidth + 60){
        return true;
    } else if(this.y < -60 || this.y > gameHeight + 60){
        return true;
    } else {
        return false;
    }
}

Hero.prototype.show = function(){
    fill(255,0,0);
    ellipse(this.x,this.y,dFactor,dFactor);
    
    fill(0,255,160);
    rect(this.x, this.y, this.d, 4);
    rect(this.x, this.y, 4, this.d);
};

Hero.prototype.collisionCheck = function(circ){
    if(dist(this.x,this.y, circ.x, circ.y) < (this.d/3) + (circ.d/2)){
        if(this.d > circ.d){
            let dInc = circ.d/10;
            this.d += dInc;
            dFactor = Math.floor(this.d);
            circ.renew();
            return false;
        } else if(this.d < circ.d){
            gameOver = true;
            return true;
        }
    }
    
    return false;
}
