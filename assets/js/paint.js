let canvas = document.getElementById('draw');
context = canvas.getContext("2d");
let paintColor = document.querySelector("#paintColor");
let paintSizze = document.getElementById('paintSize');

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
let mouseX;
let mouseY;

let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop  = canvas.parentElement.parentElement.offsetTop;


canvas.addEventListener('mousedown',function (e){
   mouseX = e.pageX - this.offsetLeft - offsetLeft;
   mouseY = e.pageY - this.offsetTop - offsetTop;
   paint = true;
   addClick(mouseX, mouseY);
   redraw();
});

canvas.addEventListener('mousemove',function (e){
   if(paint){
       addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, true);
        redraw();
   }
});

canvas.addEventListener('mouseup',function (e){
   paint = false;
});

canvas.addEventListener('mouseleave',function (e){
   paint = false;
   clickX.length = 0;
    clickY.length = 0;
    clickDrag.length = 0;
});

function addClick(x, y, dragging)
{
   clickX.push(x);
   clickY.push(y);
   clickDrag.push(dragging);
}

function redraw(){
   context.strokeStyle = paintColor.value;
   context.lineJoin = "round";
   context.lineWidth = paintSize.value;
   for(var i=0; i < clickX.length; i++) {
       context.beginPath();
       if(clickDrag[i] && i){
           context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
           context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
   }
}

function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX.length = 0;
    clickY.length = 0;
    clickDrag.length = 0;
}