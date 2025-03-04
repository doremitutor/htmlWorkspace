let lang, html, body, canvas, ctx, ac;
const darkColor='rgb(58, 43, 28)', bgColor='rgb(250, 230, 209)', lightColor='rgb(255, 204, 153)';
const AC=window.AudioContext ||
		 window.webkitAudioContext ||
		 window.mozAudioContext ||
		 window.oAudioContext ||
		 null;
const RAF=window.requestAnimationFrame ||
		  window.mozRequestAnimationFrame ||
		  window.webkitRequestAnimationFrame ||
		  window.msRequestAnimationFrame ||
		  window.oRequestAnimationFrame ||
		  null;
const $cl=console.log;
function $(id){return document.getElementById(id);};
function $ce(tag, prop){return document.createElement(tag, prop);};
function $sel(sel){return document.querySelector(sel);}
function $all(sel){return document.querySelectorAll(sel);}
function $txtNode(txt){return document.createTextNode(txt);};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};
function showAbortAlert(){
	alert($str('Lo sentimos. Su navegador no puede cargar esta aplicación.', 'We\'re sorry. Your browser can\'t load this application'));
};
function getRadFromDeg(angleInDegrees){
	return angleInDegrees*Math.PI/180;
};
function getDegFromRad(angleInRadians){
	return angleInRadians*180/Math.PI;
};
function setUpCommonalities(title){
	html=$('html');
	lang=html.getAttribute('lang')
	body=$('body');
	let titleHeader=$ce('h1');
	titleHeader.id='titleHeader';
	titleHeader.textContent=title;
	body.append(titleHeader);
	canvas=$ce('canvas');
	canvas.id="canvas";
	canvas.width=980;
	canvas.height=552;
	body.append(canvas);
	ctx=canvas.getContext("2d");
	ctx.lineWidth=2;
	ctx.lineCap='round';
	ctx.lineJoin='round';
	ctx.strokeStyle=ctx.fillStyle='black';
};
function ButtonSpec(id, className, content, listener){
	this.prop={};
    this.prop.id=id;
    this.prop.className=className;
    this.prop.textContent=content;
    this.listener=listener;
};
function createButtonsDiv(buttonsSpecsArray){
    const canvas=$('canvas');
    const buttonsDiv=$ce('div');
    buttonsDiv.id='buttonsDiv';
    canvas.after(buttonsDiv);
    buttonsSpecsArray.forEach(spec=>{
        const button=$ce('button');
        for(const prop in spec.prop){
            button[prop]=spec.prop[prop];
            buttonsDiv.append(button);
        }
		button.addEventListener('click', spec.listener, false);
    });
};
function getAC(){
	if(ac)return ac;
	if(!AC){
		alert("Sorry. WebAudio API not supported. Try using the Google Chrome, Firefox, or Safari browser.");
		return AC;
	}
	return ac=new AC({latencyHint: "interactive", sampleRate: 44100});
};
function animate(animation){
	if(animation.frameRate){
		if(!animation.raf){
			animation.raf=RAF(animation);
		}
		animation.timer=setTimeout(()=>{animation.raf=RAF(animation); animate(animation);}, 1000/animation.frameRate);
	}else{
		animation.raf=RAF(animation);
	}
};
function cancelRAF(animation){
	cancelAnimationFrame(animation.raf);
	clearTimeout(animation.timer);
};
function resume(){
	$cl(raf, animate.callback);
	if(raf!=undefined||animate.callback==undefined){
		alert('Nothing running!');
		return;
	}
	raf(animate);
};
function clear(){
	if(true){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
};
function keepOn(callBack, delay){
	if(delay==undefined){throw new Error("You forgot to set the delay");} 
	timer=window.setTimeout(callBack, delay);
};
function showCount(count){			
	ctx.clearRect(100, 300, 200, 200);
	ctx.save();
	ctx.globalAlpha=1.0;
	ctx.font=fontLarge;
	ctx.fillStyle='red';
	ctx.fillText(count, 200, 400);
	ctx.strokeRect(100, 300, 200, 200);
	ctx.restore()
};
function drawVertMark(x, centerY, height, lineWidth, color){
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth=lineWidth;
	let offset=height/2
	ctx.moveTo(x, centerY-offset);
	ctx.lineTo(x, centerY+offset);
	ctx.strokeStyle=color;
	ctx.stroke();
	ctx.restore();
};
function drawHorizMark(centerX, y, width, lineWidth, color){
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth=lineWidth;
	let offset=width/2
	ctx.moveTo(centerX-offset, y);
	ctx.lineTo(centerX+offset, y);
	ctx.strokeStyle=color;
	ctx.stroke();
	ctx.restore();

};
function drawSinusoid(x, y, width, curveLineWidth, peakValue, harmonic, centerLineWidth, nodesLineWidth=2, nodesHeight=20, nodesColor='red'){
	let nextX;
	let nextY;
	ctx.save();
	ctx.beginPath();
	if(typeof centerLineWidth=='number'&&centerLineWidth>0){
		ctx.lineWidth=centerLineWidth;
		ctx.moveTo(x, y);
		ctx.lineTo(x+width, y);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineWidth=curveLineWidth;
	for(let i=0; i<=width; i++){		
		nextX=x+i;
		nextY=y-(peakValue*Math.sin(2*harmonic*Math.PI*i/width));
		ctx.lineTo(nextX, nextY);
	}
	ctx.stroke();
	if(typeof nodesLineWidth=='number'&&nodesLineWidth>0){
		ctx.strokeStyle=nodesColor;
		ctx.lineWidth=nodesLineWidth;
		for(let i=0; i<=harmonic; i++){
			ctx.beginPath();
			ctx.moveTo(x+i/harmonic*width, y-nodesHeight/2);
			ctx.lineTo(x+i/harmonic*width, y+nodesHeight/2);
			ctx.stroke();
		}
	}	
	ctx.restore();
 };
 Array.prototype.hasIt=function(str){
	for(let i=0; i<this.length; i++){
		if(this[i]==str){
			return true;
		}
	}
	return false;	
 };