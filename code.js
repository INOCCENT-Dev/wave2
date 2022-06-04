window.onload = function() {
  const canvas = document.getElementById("mycanvas"); 
  const ctx = canvas.getContext("2d");
  const TIME_INTERVAL = 33; 
  const SPOT_NUMBER = 50; // spot number drawing wave

  let layer1 = []; // back wave layer
  let layer2 = []; // front wave layer

  let color = 'rgba(100,165,255,0.5)'; // start color


  for(let i = 0 ; i < SPOT_NUMBER; i ++){ // reset spot
    let x = (600 / (SPOT_NUMBER-1)) * i;
    
    layer1[i] = new SPOT(300,400,x+300,400,i);
    layer2[i] = new SPOT(250,300,x+250,300,i);
  }

  window.onclick = function() { 
    for(let i = 0; i < 3; i ++){
      color = setColorAsRandom(50,255);
    }
  }
  
  setInterval(function(){
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawWave(layer1,color);
    drawWave(layer2,color);
    drawLeft();
    drawBox();
  },TIME_INTERVAL);

  function drawLeft(){ // draw left layer
    ctx.beginPath();
    ctx.moveTo(250,300);
    ctx.lineTo(300,400);
    ctx.lineTo(300,600);
    ctx.lineTo(250,500);
    ctx.fill();
  }

  function drawWave(spot,color){ // draw wave function
    let gapY = spot[0].setGapY(SPOT_NUMBER);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(300,400);

    for(let i = 0 ; i < SPOT_NUMBER; i ++){  
      spot[i].setPosition(SPOT_NUMBER,gapY).wave().draw(ctx);
    }
    
    ctx.lineTo(900,400);
    ctx.lineTo(900,600);
    ctx.lineTo(300,600);
    ctx.lineTo(250,500);
    ctx.lineTo(250,300);
    ctx.lineTo(300,400);
    ctx.fill();
  }

  function drawBox(){ // draw outer box
    ctx.strokeStyle = 'grey';

    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.strokeRect(250,150,600,350);
    ctx.strokeRect(300,250,600,350);

    ctx.moveTo(250,150);
    ctx.lineTo(300,250);
    ctx.moveTo(250,500);
    ctx.lineTo(300,600);
    ctx.moveTo(850,150);
    ctx.lineTo(900,250);
    ctx.moveTo(850,500);
    ctx.lineTo(900,600);

    ctx.stroke();
    ctx.closePath();
  }
};

function setColorAsRandom(lmin,lmax){ // set wave color random
  let R = Math.floor(lmin+Math.random()*(lmax - lmin));
  let G = Math.floor(lmin+Math.random()*(lmax - lmin));
  let B = Math.floor(lmin+Math.random()*(lmax - lmin));
  return 'rgba('+R+','+B+','+G+',0.5)'; 
}

function SPOT(sx,sy,x,y,tmpX){
  this.sx = sx;
  this.sy = sy;
  this.x = x;
  this.y = y;
  this.tmpX = tmpX;
}

SPOT.prototype = {
  draw: function(ctx){ // draw wave line
    ctx.lineTo(this.x,this.y);
    return this;
  },
  wave: function(){ // make wave 
    this.tmpX ++;
    return this;
  },
  setPosition: function(num,gap){ // set y position
    if(this.tmpX == 0){
      this.y = this.sy;
    }else{
      this.y = gap + Math.sin(Math.PI*2/num*this.tmpX) * 40;
    }
    return this;
  },
  setGapY: function(num){  
    return this.sy - Math.sin(Math.PI*2/num*this.tmpX) * 40;
  }
};