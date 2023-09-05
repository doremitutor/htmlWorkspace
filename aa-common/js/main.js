let html, lang, canvas, ctx, ac;
function $(id){return document.getElementById(id);};
function $ce(elem){return document.createElement(elem)};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};
function showAbortAlert(){
	alert($str('Lo sentimos. Su navegador no puede cargar esta aplicación.', 'We\'re sorry. Your browser can\'t load this application'));
};
function setUpCommonalities(){
	html=$('html');
	lang=html.getAttribute('lang');
	canvas=$('canvas');
	try{
		ctx=canvas.getContext("2d");
		ctx.lineWidth=2;
		ctx.lineCap='round';
		ctx.strokeStyle=ctx.fillStyle='black';
		return ctx;
	}catch{
		alert("Sorry, no valid canvas here");
		return;
	}
};
function getAC(){
	if(ac)return ac;
	let AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext;
	if(!AudioContext){
		alert("Sorry. WebAudio API not supported. Try using the Google Chrome, Firefox, or Safari browser.");
		return null;
	}
	return ac=new AudioContext({latencyHint: "interactive", sampleRate: 44100});
};