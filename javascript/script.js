
function drawSpiral(ratio, canvas)
{
    var dirEnum = {
        RIGHT:  0,
        DOWN:   1,
        LEFT:   2,
        UP:     3
    };


    canvas.height = Math.round(canvas.width/ratio);

    var ctx = canvas.getContext('2d');

    // Rysowanie ramki
    ctx.beginPath();
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.stroke();

    // Przygotowanie do rysowania spirali
    var direction = dirEnum.RIGHT;
    var top = 0, left = 0, width = canvas.width, height = canvas.width/ratio;
    var seq = getContinued(ratio);

    // Rysowanie spirali
    for(var i = 0; i < seq.length; i++)
    {
        var numberOfSquare = seq[i];
        if(numberOfSquare == -1) break;

        var size = Math.min(width, height);

        ctx.beginPath();
        ctx.strokeStyle ="#999";
        ctx.rect(left, top, width, height);
        ctx.stroke();

        switch(direction)
        {
            case dirEnum.RIGHT:
                ctx.beginPath();
                ctx.strokeStyle ="black";
                ctx.moveTo(left,top+height);
                if(numberOfSquare >= 1)
                    ctx.arcTo(left, top, left+size, top, size);
                left += size*numberOfSquare;
                width -= size*numberOfSquare;
                ctx.lineTo(left, top);
                ctx.stroke();
                break;

            case dirEnum.DOWN:
                ctx.beginPath();
                ctx.strokeStyle ="black";
                ctx.moveTo(left,top);
                if(numberOfSquare >= 1)
                    ctx.arcTo(left+size, top, left+size, top+size, size);
                top += size*numberOfSquare;
                height -= size*numberOfSquare;
                ctx.lineTo(left+size, top);
                ctx.stroke();
                break;

                case dirEnum.LEFT:
                    ctx.beginPath();
                    ctx.strokeStyle ="black";
                    ctx.moveTo(left+width,top);
                    if(numberOfSquare >= 1)
                        ctx.arcTo(left+width, top+size, left+width-size, top+size, size);
                    width -= size*numberOfSquare;
                    ctx.lineTo(left+width, top+size);
                    ctx.stroke();
                    break;

                case dirEnum.UP:
                    ctx.beginPath();
                    ctx.strokeStyle ="black";
                    ctx.moveTo(left+width,top+height);
                    if(numberOfSquare >= 1)
                        ctx.arcTo(left, top+height, left, top+height-size, size);
                    height -= size*numberOfSquare;
                    ctx.lineTo(left, top+height);
                    ctx.stroke();
                    break;
        }
        direction = (direction+1)%4;
    }
}

 function getContinued(number, depth = 10)
 {
     var seq = [];
     for(var i = 0; i < depth; i++)
     {
         seq.push(Math.floor(number));
         number -= Math.floor(number);
 
         if(Math.abs(number) < 1e-10) return seq;
         console.log(number)
 
         number = 1.0/number;
     }
 
     if(number != 0) seq.push(-1);
 
     return seq;
 }

 var canvas = document.getElementById('spiral-canvas');
 var phi = (1+Math.sqrt(5))/2;

 document.getElementById("number").value = phi;

 updateNumber();
 function updateNumber()
 {
    var number = document.getElementById("number").value;
    drawSpiral(number, canvas);


 }