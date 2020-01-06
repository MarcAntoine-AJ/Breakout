/*eslint-env browser*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x =canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;
var colorBall = "blue";
var colorArray=["blue","red","green","yellow","purple","pink"];

//Position variations
var dx=2;
var dy =-2;

var paddleHeight=10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;


var rightPressed = false;
var leftPressed = false;


var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPaddingTop = 30;
var brickPaddingSide=10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks=[];

var score=0;

var lives=3;

function drawLives()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20); 
}

for(var c =0;c<brickColumnCount;c++)
{
    bricks[c]=[];
    for(var r =0;r<brickRowCount;r++)
    {
        bricks[c][r]={x:0,y:0,status:1,colorBrick:colorArray[Math.floor(Math.random()*colorArray.length)]};
    }
}

function drawBricks()
{
    for(var c=0;c<brickColumnCount;c++)
    {
        for(var r=0;r<brickRowCount;r++)
        {
            if(bricks[c][r].status==1){
                var brickX = (c*(brickWidth+brickPaddingSide))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPaddingTop))+brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y= brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle=bricks[c][r].colorBrick;
                ctx.fill();
                ctx.closePath();  
                
            }
           
        }
    }
}


document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e)
{
    if(e.key=="Right" || e.key=="ArrowRight")
    {
        rightPressed=true;
        
    }
    else if(e.key=="Left" || e.key=="ArrowLeft")
    {
        leftPressed=true;
    }
}

function keyUpHandler(e)
{
    if(e.key=="Right" || e.key=="ArrowRight")
    {
        rightPressed=false;
        
    }else if(e.key=="Left" || e.key=="ArrowLeft")
    {
        leftPressed=false;
    }
}

function collisionDetection()
{
    if(y+dy-ballRadius<0)
    {
        dy=-dy;
        colorBall=colorArray[Math.floor(Math.random()*colorArray.length)];
    }else if(y+dy+ballRadius>canvas.height)
    { if(x>paddleX && x<paddleX+paddleWidth)
         {  
            dy=-dy;  
         }else
         {
             lives--;
            if(!lives)
            {
            alert("Game Over");
            document.location.reload();
            
            }
             else
            {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
         }
    }
    
    if(x+dx+ballRadius>canvas.width ||x+dx-ballRadius<0)
    {
        dx=-dx;
        colorBall=colorArray[Math.floor(Math.random()*colorArray.length)];
    }
}

function collisionBricks()
{
    for(var c =0; c<brickColumnCount;c++)
    {
        for(var r=0;r<brickRowCount;r++)
        {
           var  b=bricks[c][r];
            if(b.status==1)
            {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight )
                {
                 dy=-dy;
                if(bricks[c][r].colorBrick==colorBall)
                {
                    bricks[c][r].status=0;
                    score++;
                }
                if(score==brickColumnCount*brickRowCount)
                {
                    alert("YOU WIN");
                    document.location.reload();
                    
                }  
                }
               
            }
        }
    }
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle=colorBall;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawScore()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    collisionBricks();
    if(rightPressed)
    {
        paddleX+=7;
        if(paddleX+paddleWidth>canvas.width)
        {
            paddleX=canvas.width-paddleWidth;
        }
    }else if(leftPressed)
    {
        paddleX-=7;
        
        if(paddleX<0)
        {
            paddleX=0;
        }
    }
    x+=dx;
    y+=dy;
    drawScore();
    drawLives();
    
    requestAnimationFrame(draw);
}

draw();