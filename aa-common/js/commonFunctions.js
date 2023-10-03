function resume(){
	$cl(raf, animate.callback);
	if(raf!=undefined||animate.callback==undefined){
		alert('Nothing running!');
		return;
	}
	raf(animate);
}
function stopOrClear(){
	$cl(raf, timer);
	if(raf!=undefined){	
		cancelAnimationFrame(raf);
		if(timer!=undefined){
			window.clearTimeout(timer);
		}		
		raf=undefined;
		console.log('Stopped!');
	}else{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		window.clearTimeout(timer);
		console.log('Cleared!');
	}
}
function keepOn(callBack, delay){
	if(delay==undefined){throw new Error("You forgot to set the delay");} 
	timer=window.setTimeout(callBack, delay);
}
function showCount(count){			
	ctx.clearRect(100, 300, 200, 200);
	ctx.save();
	ctx.globalAlpha=1.0;
	ctx.font=fontLarge;
	ctx.fillStyle='red';
	ctx.fillText(count, 200, 400);
	ctx.strokeRect(100, 300, 200, 200);
	ctx.restore()
}
function drawVertMark(x, centerY, height, lineWidth){
	ctx.beginPath();
	ctx.lineWidth=lineWidth;
	let offset=height/2
	ctx.moveTo(x, centerY-offset);
	ctx.lineTo(x, centerY+offset);
	ctx.stroke();
}
function drawSinusoid(x, y, width, peakValue, harmonic, centerLine){
	let nextX;
	let nextY;
	let advance;
	ctx.beginPath();
	if(centerLine){
		ctx.moveTo(x, y);
		ctx.lineTo(x+width, y);
	}
	ctx.moveTo(x, y);
	for(let i=0; i<=width; i++){		
		nextX=x+i;
		nextY=y-(peakValue*Math.sin(2*harmonic*Math.PI*i/width));
		ctx.lineTo(nextX, nextY);
	}
	ctx.stroke();
 }
 Array.prototype.hasIt=function(str){
	for(let i=0; i<this.length; i++){
		if(this[i]==str){
			return true;
		}
	}
	return false;	
 }
