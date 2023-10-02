let lengthUnit; 
let textX;
let stringX;
let stringW;
let sinWaveX;
let sinWaveW;	
let y0;
let y1;
let y2;
let y3;
let y4;
let y5;
let textYOffset;
let freq1=1;
let amplitude1=30;
let freq2=2;
let amplitude2=25;
let freq3=3;
let amplitude3=15;
let freq4=4;
let amplitude4=10;
let freq5=5;
let amplitude5=5;
window.onload=setUp;
function setUp(){
	setUpCommonalities();
	lengthUnit=canvas.width/32; //1280/32=40
	textX=Math.floor(lengthUnit);
	stringX=Math.floor(7*lengthUnit);
	stringW=Math.floor(18*lengthUnit);
	sinWaveX=Math.floor(26*lengthUnit);
	sinWaveW=Math.floor(5*lengthUnit);	
	// common ordinates
	y1=Math.floor(4*lengthUnit);
	y2=Math.floor(6.4*lengthUnit);
	y3=Math.floor(8.8*lengthUnit);
	y4=Math.floor(11.2*lengthUnit);
	y5=Math.floor(13.6*lengthUnit);
	y0=Math.floor(16*lengthUnit);
	textYOffset=lengthUnit*2/7;
	showAll();
}
function showAll(){
	writeText();
	showHarmonics();
	oscillateString();
	//showCompare();
}
function writeText(){	
	let a='armónico';
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	ctx.font=Math.floor(lengthUnit*6/7)+'px sans-serif';
	ctx.fillText('Ejemplo de composición de frecuencias en sonidos complejos', canvas.width/2, lengthUnit*4/5);
	ctx.font=Math.floor(lengthUnit*5/7)+'px sans-serif';
	//ctx.fillText('(También llamados sobretonos a partir del segundo)', canvas.width/2, lengthUnit*5/3);
	ctx.textAlign='center';
	ctx.fillText('Frecuencia', lengthUnit*3, lengthUnit*9/5);
	ctx.fillText('Cuerda vibrante (nodos de oscilación en rojo)', lengthUnit*16, lengthUnit*9/5);
	ctx.fillText('Senoide', lengthUnit*29, lengthUnit*9/5);
	ctx.font=Math.floor(lengthUnit*4/7)+'px sans-serif';
	ctx.textAlign='left';
	ctx.fillText('1er. '+a+' o', textX, y1-textYOffset);
	ctx.fillText('frecuencia fundamental', textX, y1+textYOffset);
	ctx.fillText('2do. '+a+' o', textX, y2-textYOffset*2);
	ctx.fillText('1er. sobretono', textX, y2);
	ctx.fillText('(frecuencia doble)', textX, y2+textYOffset*2)
	ctx.fillText('3er. '+a+' o', textX, y3-textYOffset*2);
	ctx.fillText('2do. sobretono', textX, y3);
	ctx.fillText('(frecuencia triple)', textX, y3+textYOffset*2)
	ctx.fillText('4o. '+a+' o', textX, y4-textYOffset*2);
	ctx.fillText('3er. sobretono', textX, y4);
	ctx.fillText('(frecuencia cuádruple)', textX, y4+textYOffset*2)
	ctx.fillText('5o. '+a+' o', textX, y5-textYOffset*2);
	ctx.fillText('4o. sobretono', textX, y5);
	ctx.fillText('(frecuencia quíntuple)', textX, y5+textYOffset*2)
	ctx.fillText('Oscilación compleja', textX, y0-textYOffset);
	ctx.fillText('resultante', textX, y0+textYOffset)
}
function showHarmonics(){
	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y1);
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y1-amplitude1*Math.sin(2*Math.PI*x/sinWaveW*freq1));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y2);
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y2-amplitude2*Math.sin(2*Math.PI*x/sinWaveW*freq2));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y3);
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y3-amplitude3*Math.sin(2*Math.PI*x/sinWaveW*freq3));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y4);
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y4-amplitude4*Math.sin(2*Math.PI*x/sinWaveW*freq4));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y5);
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y5-amplitude5*Math.sin(2*Math.PI*x/sinWaveW*freq5));
	}
	ctx.stroke();	
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y0);
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y0-(amplitude1*Math.sin(2*Math.PI*x/sinWaveW*1)
								+amplitude2*Math.sin(2*Math.PI*x/sinWaveW*2)
								+amplitude3*Math.sin(2*Math.PI*x/sinWaveW*3)
								+amplitude4*Math.sin(2*Math.PI*x/sinWaveW*4)
								+amplitude5*Math.sin(2*Math.PI*x/sinWaveW*5)
								)/2);
	}
	ctx.stroke();
};
	
function oscillateString(){
	let maxY1=30;
	let maxY2=15;
	let maxY3=10;
	let maxY4=7.5;
	let maxY5=6;
	let angleY1=0;
	let angleY2=0;	
	let angleY3=0;	
	let angleY4=0;	
	let angleY5=0;	
	let step1=2*Math.PI/120;
	let step2=2*Math.PI/60;
	let step3=2*Math.PI/40;
	let step4=2*Math.PI/30;
	let step5=2*Math.PI/24;
	let drawingAreaX=stringX-3;
	let drawingAreaY=y1-maxY1-2;
	let drawingAreaWidth=stringW+6;
	let drawingAreaHeight=y0-lengthUnit;
	ctx.lineWidth=4;
	ctx.lineCap='round';
	let amplitude1;
	let amplitude2;
	let amplitude3;
	let amplitude4;
	let amplitude5;
	function go(){
		ctx.clearRect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		// 1hz
		ctx.beginPath();
		ctx.moveTo(stringX, y1);
		amplitude1=maxY1*Math.sin(angleY1);
		for(let x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y1-amplitude1*(Math.sin(Math.PI*x/stringW*freq1)));
		}
		ctx.stroke();
		// 2hz
		ctx.beginPath();
		ctx.moveTo(stringX, y2);
		amplitude2=maxY2*Math.sin(angleY2);
		for(let x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y2-amplitude2*Math.sin(Math.PI*x/stringW*freq2));
		}
		ctx.stroke();
		// 3hz
		ctx.beginPath();
		ctx.moveTo(stringX, y3);
		amplitude3=maxY3*Math.sin(angleY3);
		for(let x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y3-amplitude3*Math.sin(Math.PI*x/stringW*freq3));
		}
		ctx.stroke();
		// 4hz
		ctx.beginPath();
		ctx.moveTo(stringX, y4);
		amplitude4=maxY4*Math.sin(angleY4);
		for(let x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y4-amplitude4*Math.sin(Math.PI*x/stringW*freq4));
		}
		ctx.stroke();
		// 5hz
		ctx.beginPath();
		ctx.moveTo(stringX, y5);
		amplitude5=maxY5*Math.sin(angleY5);
		for(let x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y5-amplitude5*Math.sin(Math.PI*x/stringW*freq5));
		}
		ctx.stroke();
		// sum of all
		ctx.beginPath();
		ctx.moveTo(stringX, y0);
		for(let x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y0 -amplitude1*Math.sin(Math.PI*x/stringW*freq1)
										-amplitude2*Math.sin(Math.PI*x/stringW*freq2)
										-amplitude4*Math.sin(Math.PI*x/stringW*freq3)
										-amplitude3*Math.sin(Math.PI*x/stringW*freq4)
										-amplitude5*Math.sin(Math.PI*x/stringW*freq5)
										);
		}
		ctx.stroke();
		// draw nodes	
		let tempStyle=ctx.strokeStyle;
		ctx.lineWidth=6;
		ctx.strokeStyle='red';
		let nodeOffset=8;
		for(let i=0; i<=freq1; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq1*stringW, y1-nodeOffset);
			ctx.lineTo(stringX+i/freq1*stringW, y1+nodeOffset);
			ctx.stroke();
		}
		for(let i=0; i<=freq2; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq2*stringW, y2-nodeOffset);
			ctx.lineTo(stringX+i/freq2*stringW, y2+nodeOffset);
			ctx.stroke();
		}
		for(let i=0; i<=freq3; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq3*stringW, y3-nodeOffset);
			ctx.lineTo(stringX+i/freq3*stringW, y3+nodeOffset);
			ctx.stroke();
		}
		for(let i=0; i<=freq4; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq4*stringW, y4-nodeOffset);
			ctx.lineTo(stringX+i/freq4*stringW, y4+nodeOffset);
			ctx.stroke();
		}
		for(let i=0; i<=freq5; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq5*stringW, y5-nodeOffset);
			ctx.lineTo(stringX+i/freq5*stringW, y5+nodeOffset);
			ctx.stroke();
		}
		for(let i=0; i<=freq1; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq1*stringW, y0-nodeOffset);
			ctx.lineTo(stringX+i/freq1*stringW, y0+nodeOffset);
			ctx.stroke();
		}
		ctx.strokeStyle=tempStyle;
		ctx.lineWidth=4;
		//new cycle synchronized start
		if((angleY1+=step1)>2*Math.PI){
			angleY1=0;
			angleY2=0;
			angleY3=0;
			angleY4=0;
			angleY5=0;
			//ctx.fillRect(drawingAreaX, y0-35, 15, 15);
		}else{				
			angleY2+=step2;
			angleY3+=step3;
			angleY4+=step4;
			angleY5+=step5;
		}
	}
	animate.callback=go;
	animate.framesPerSec=10;
	animate();
}
function showCompare(){	
	ctx.lineWidth=4;
	ctx.strokeStyle='black';
	sinWaveX=Math.floor(canvas.width/20);
	sinWaveW=Math.floor(9*canvas.width/10);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y1);
	let freq=4;
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y1-amplitude1*(Math.sin(2*Math.PI*freq*x/sinWaveW)));
	}
	ctx.stroke();
	let tempStyle=ctx.strokeStyle;
	ctx.strokeStyle='red';
	for(let i=0; i<=freq; i++){
		ctx.beginPath();
		ctx.moveTo(sinWaveX+i/freq*sinWaveW, y1-20);
		ctx.lineTo(sinWaveX+i/freq*sinWaveW, y1+20);
		ctx.stroke();
	}
	ctx.strokeStyle=tempStyle;
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y3);
	freq=5;
	for(let x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y3-amplitude1*(Math.sin(2*Math.PI*freq*x/sinWaveW)));
	}
	ctx.stroke();
	ctx.strokeStyle='red';
	for(let i=0; i<=freq; i++){
		ctx.beginPath();
		ctx.moveTo(sinWaveX+i/freq*sinWaveW, y3-20);
		ctx.lineTo(sinWaveX+i/freq*sinWaveW, y3+20);
		ctx.stroke();
	}
}