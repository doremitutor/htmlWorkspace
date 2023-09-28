let raf, timer;
function $(id){return document.getElementById(id);};
function $ce(elem){return document.createElement(elem)};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};
function showAbortAlert(){
	alert($str('Lo sentimos. Su navegador no puede cargar esta aplicación.', 'We\'re sorry. Your browser can\'t load this application'));
};
function setCtx(){	
	canvas=document.getElementById("canvas");
	if(canvas.getContext){
		ctx=canvas.getContext("2d");
		ctx.lineWidth=2;
		ctx.lineCap='round';
		ctx.strokeStyle=ctx.fillStyle='black';
	}
	else{alert("Sorry, no canvas here");}
}
function setAC(){
	AudioContext = window.AudioContext || window.webkitAudioContext ||
					   window.mozAudioContext || window.oAudioContext;
	if(!AudioContext){
		alert("Sorry. WebAudio API not supported. Try using the Google Chrome or Safari browser.");
	}
}
function animate(){
   raf=(requestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame     ||
        window.oRequestAnimationFrame)(animate);
   // setTimeout(animate.callback, 500);
   animate.callback();
}
function animate_Slow(delay){
   raf=(requestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame     ||
        window.oRequestAnimationFrame)(animate_Slow);
    setTimeout(animate_Slow.callback(), 100);
}

animate.callback;
function resume(){
	if(raf!=undefined||animate.callback==undefined){
		console.log('Nothing running!');
		return;
	}
	raf=window.requestAnimationFrame(animate);
}
function stopOrClear(){
	if(raf!=undefined){	
		window.cancelAnimationFrame(raf);
		if(timer!=undefined){
			//window.clearTimeout(timer);
		}		
		raf=undefined;
		console.log('Stopped!');
	}else{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		animate.callback=undefined;
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
