var s;
var scl = 20;
var food;
var score = 0;
var best = 0;
var font_scale = 1;
var display_hidden_text = false;
var display_instructions = true;
var tail_positions = [];
var current_dir;
const delay = 80;

console.log('你好！如果你想看看我的code的话，你可以浏览我的GitHub：https://github.com/liyunze-coding/portfolio');
console.log('如果你达到5000分，会有彩蛋的喔 ^_^');

const includesArray = (data, arr) => {
    return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
}

function near_round(n,scale){
    // Smaller multiple
    let a = parseInt(n / scale, 10) * scl;
    return a;
}

function windowResized() {
    resizeCanvas(near_round(windowWidth,scl)-scl, near_round(windowHeight-70,scl));
    s = new Snake();
    scl = parseInt(width/70);
    pickLocation();
    score = 0;
    up_button.size(60,60);
    up_button.position(width-120, height-95);

    left_button.size(60,60);
    left_button.position(width-190, height-45);

    right_button.size(60,60);
    right_button.position(width-50, height-45);

    down_button.size(60,60);
    down_button.position(width-120, height);
}

function highlight_arrow(dir){
    directions = ['left','right', 'up','down'];

    for (d of directions){
        if (d === dir){
            document.getElementById(d).style.border = "2px solid #505050";
        } else {
            document.getElementById(d).style.border = "1px solid #505050";
        }
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    scl = parseInt(width/70);
    resizeCanvas(near_round(windowWidth,scl)-scl, near_round(windowHeight-70,scl));
    s = new Snake();
    frameRate(10);

    pickLocation();

    up_button = createButton(`↑`);
    up_button.id('up');
    up_button.size(60,60);
    up_button.position(width-120, height-95);

    left_button = createButton(`←`);
    left_button.id('left');
    left_button.size(60,60);
    left_button.position(width-190, height-45);

    right_button = createButton(`→`);
    right_button.id('right');
    right_button.size(60,60);
    right_button.position(width-50, height-45);

    down_button = createButton(`↓`);
    down_button.id('down');
    down_button.size(60,60);
    down_button.position(width-120, height);

    up_button.mousePressed(()=>{
        if (current_dir !== 'down'){
            moveUp();
        }
    });
    left_button.mousePressed(()=>{
        if (current_dir !== 'right'){
            moveLeft();
        }
    });
    right_button.mousePressed(()=>{
        if (current_dir !== 'left'){
            moveRight();
        }
    });
    down_button.mousePressed(()=>{
        if (current_dir !== 'up'){
            moveDown();
        }
    });
}

function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food_x = floor(random(cols-2))+1;
    food_y = floor(random(rows-2))+1;

    food = createVector(food_x, food_y);

    for (t of s.tail){
        tail_positions.push([parseInt(t.x/scl), parseInt(t.y/scl)]);
    }
    
    while (includesArray(tail_positions, [food.x, food.y]) 
    || includesArray(tail_positions, [food.x-1, food.y]) 
    || includesArray(tail_positions, [food.x, food.y-1]) 
    || includesArray(tail_positions, [food.x+1, food.y]) 
    || includesArray(tail_positions, [food.x, food.y+1])){
        food_x = floor(random(cols-2))+1;
        food_y = floor(random(rows-2))+1;

        food = createVector(food_x, food_y);
    }

    tail_positions = [];
    food.mult(scl);
}

function draw(){
    background(25);
    fill(230,230,230);
    textFont('montserrat-bold');
    textAlign(CENTER);

    if (width < 700){
        font_scale = 2
    } else {
        font_scale = 1
    }

    textSize(width/30*font_scale);
    text('你好! 我是Ryan。\n欢迎来我的网站!', width/2, height/2-50);
    textSize(width/70*font_scale);
    text('来玩一下这个Snake游戏吧 :D', width/2, height/2+80);

    if(display_hidden_text){
        textSize(width/70*font_scale);
        text('哇！你很厉害👍！', width/2, height/2+120);
    }

    textAlign(LEFT);
    textSize(width/70*font_scale);
    if (best < score) best = score;
    text(`分数: ${score}   最高分: ${best}`, 10, height-10);

    s.death();
    s.update();
    s.show();

    if (s.eat(food)){
        pickLocation();
        score += 1000;
        if (score >= 5000){
            display_hidden_text = true;
        }
    }
    fill(255, 0,100);
    rect(food.x, food.y, scl, scl);
}

function moveUp(){
    s.dir(0,-1);
    setTimeout(()=>{
        current_dir = 'up';
    }, delay)
    highlight_arrow('up');
}

function moveDown(){
    s.dir(0,1);
    setTimeout(()=>{
        current_dir = 'down';
    }, delay)
    highlight_arrow('down');
}

function moveRight(){
    s.dir(1,0);
    setTimeout(()=>{
        current_dir = 'right';
    }, delay)
    highlight_arrow('right');
}

function moveLeft(){
    s.dir(-1,0);
    setTimeout(()=>{
        current_dir = 'left';
    }, delay)
    highlight_arrow('left');
}

function keyPressed(){
    if (keyCode === UP_ARROW && current_dir !== 'down'){
        moveUp();
    } else if (keyCode === DOWN_ARROW && current_dir !== 'up'){
        moveDown();
    } else if (keyCode === RIGHT_ARROW && current_dir !== 'left'){
        moveRight();
    } else if (keyCode === LEFT_ARROW && current_dir !== 'right'){
        moveLeft();
    }
}
function keyTyped(){
    if (key === 'w' && current_dir !== 'down'){
        moveUp()
    } else if (key === 's' && current_dir !== 'up'){
        moveDown();
    } else if (key === 'd' && current_dir !== 'left'){
        moveRight();
    } else if (key === 'a' && current_dir !== 'right'){
        moveLeft();
    }
}