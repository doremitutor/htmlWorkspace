let lang, html, body, canvas, ctx, ac, raf, timer;
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
function setUpCommonalities(){
	html=$('html');
	lang=html.getAttribute('lang')
	body=$('body');
	try{
		canvas=$('canvas');
		ctx=canvas.getContext("2d");
		ctx.lineWidth=2;
		ctx.lineCap='round';
		ctx.strokeStyle=ctx.fillStyle='black';
	}catch{
		alert("Sorry, no valid canvas here");
	}
};
function getAC(){
	if(ac)return ac;
	if(!AC){
		alert("Sorry. WebAudio API not supported. Try using the Google Chrome, Firefox, or Safari browser.");
		return AC;
	}
	return ac=new AC({latencyHint: "interactive", sampleRate: 44100});
};
function animate(){
	if(animate.framesPerSec){
		const delay=1000/animate.framesPerSec;
		raf=RAF(animate.callback);
		setInterval(()=>{
			RAF(animate.callback);
		}, delay);
	}else{
		raf=RAF(animate);
		animate.callback();
	}
}
