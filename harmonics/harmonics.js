var lengthUnit;
var y0;
var y1;
var y2;
var y3;
var y4;
var y5;
var textYOffset;
var freq1=1;
var amplitude1=30;
var freq2=2;
var amplitude2=25;
var freq3=3;
var amplitude3=15;
var freq4=4;
var amplitude4=10;
var freq5=5;
var amplitude5=5;
window.onload=setUp;
function setUp(){
	setCtx();
	// abscisae and ordinates
	lengthUnit=canvas.width/32;
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
	// writeText();
	// showHarmonics();
	// oscillateString();
	// showCompare();	
}
function showAll(){
	writeText();
	showHarmonics();
	oscillateString();
}
function writeText(){	
	var a='arm'+String.fromCharCode(0x00f3)+'nico';
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	ctx.font=Math.floor(lengthUnit*6/7)+'px sans-serif';
	ctx.fillText('Ejemplo de composici'+String.fromCharCode(0x00f3)+'n de frecuencias en sonidos complejos', canvas.width/2, lengthUnit*4/5);//An'+String.fromCharCode(0x00e1)+'lisis de '+a+'
	ctx.font=Math.floor(lengthUnit*5/7)+'px sans-serif';
	//ctx.fillText('(Tambi'+String.fromCharCode(0x00e9)+'n llamados sobretonos a partir del segundo)', canvas.width/2, lengthUnit*5/3);
	ctx.textAlign='center';
	ctx.fillText('Frecuencia', lengthUnit*3, lengthUnit*9/5);
	ctx.fillText('Cuerda vibrante (nodos de oscilaci'+String.fromCharCode(0x00f3)+'n en rojo)', lengthUnit*16, lengthUnit*9/5);
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
	ctx.fillText('(frecuencia cu'+String.fromCharCode(0x00e1)+'druple)', textX, y4+textYOffset*2)
	ctx.fillText('5o. '+a+' o', textX, y5-textYOffset*2);
	ctx.fillText('4o. sobretono', textX, y5);
	ctx.fillText('(frecuencia qu'+String.fromCharCode(0x00ed)+'ntuple)', textX, y5+textYOffset*2)
	ctx.fillText('Oscilaci'+String.fromCharCode(0x00f3)+'n compleja', textX, y0-textYOffset);
	ctx.fillText('resultante', textX, y0+textYOffset)
}
function showHarmonics(){
	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y1);
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y1-amplitude1*Math.sin(2*Math.PI*x/sinWaveW*freq1));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y2);
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y2-amplitude2*Math.sin(2*Math.PI*x/sinWaveW*freq2));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y3);
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y3-amplitude3*Math.sin(2*Math.PI*x/sinWaveW*freq3));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y4);
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y4-amplitude4*Math.sin(2*Math.PI*x/sinWaveW*freq4));
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y5);
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y5-amplitude5*Math.sin(2*Math.PI*x/sinWaveW*freq5));
	}
	ctx.stroke();	
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y0);
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y0-(amplitude1*Math.sin(2*Math.PI*x/sinWaveW*1)
								+amplitude2*Math.sin(2*Math.PI*x/sinWaveW*2)
								+amplitude3*Math.sin(2*Math.PI*x/sinWaveW*3)
								+amplitude4*Math.sin(2*Math.PI*x/sinWaveW*4)
								+amplitude5*Math.sin(2*Math.PI*x/sinWaveW*5)
								)/2);
	}
	ctx.stroke();
}
function oscillateString(){
	var maxY1=30;
	var maxY2=15;
	var maxY3=10;
	var maxY4=7.5;
	var maxY5=6;
	var angleY1=0;
	var angleY2=0;	
	var angleY3=0;	
	var angleY4=0;	
	var angleY5=0;	
	var step1=2*Math.PI/120;
	var step2=2*Math.PI/60;
	var step3=2*Math.PI/40;
	var step4=2*Math.PI/30;
	var step5=2*Math.PI/24;
	var amplitude1;
	var amplitude2;
	var amplitude3;
	var amplitude4;
	var amplitude5;
	var drawingAreaX=stringX-3;
	var drawingAreaY=y1-maxY1-2;
	var drawingAreaWidth=stringW+6;
	var drawingAreaHeight=y0-lengthUnit;
	ctx.lineWidth=4;
	ctx.lineCap='round';
	function go(){
		ctx.clearRect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		// 1hz
		ctx.beginPath();
		ctx.moveTo(stringX, y1);
		amplitude1=maxY1*Math.sin(angleY1);
		for(var x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y1-amplitude1*(Math.sin(Math.PI*x/stringW*freq1)));
		}
		ctx.stroke();
		// 2hz
		ctx.beginPath();
		ctx.moveTo(stringX, y2);
		amplitude2=maxY2*Math.sin(angleY2);
		for(var x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y2-amplitude2*Math.sin(Math.PI*x/stringW*freq2));
		}
		ctx.stroke();
		// 3hz
		ctx.beginPath();
		ctx.moveTo(stringX, y3);
		amplitude3=maxY3*Math.sin(angleY3);
		for(var x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y3-amplitude3*Math.sin(Math.PI*x/stringW*freq3));
		}
		ctx.stroke();
		// 4hz
		ctx.beginPath();
		ctx.moveTo(stringX, y4);
		amplitude4=maxY4*Math.sin(angleY4);
		for(var x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y4-amplitude4*Math.sin(Math.PI*x/stringW*freq4));
		}
		ctx.stroke();
		// 5hz
		ctx.beginPath();
		ctx.moveTo(stringX, y5);
		amplitude5=maxY5*Math.sin(angleY5);
		for(var x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y5-amplitude5*Math.sin(Math.PI*x/stringW*freq5));
		}
		ctx.stroke();
		// sum of all
		ctx.beginPath();
		ctx.moveTo(stringX, y0);
		for(var x=1; x<=stringW; x++){
			ctx.lineTo(stringX+x, y0 -amplitude1*Math.sin(Math.PI*x/stringW*freq1)
										-amplitude2*Math.sin(Math.PI*x/stringW*freq2)
										-amplitude4*Math.sin(Math.PI*x/stringW*freq3)
										-amplitude3*Math.sin(Math.PI*x/stringW*freq4)
										-amplitude5*Math.sin(Math.PI*x/stringW*freq5)
										);
		}
		ctx.stroke();
		// draw nodes	
		var tempStyle=ctx.strokeStyle;
		ctx.lineWidth=6;
		ctx.strokeStyle='red';
		var nodeOffset=8;
		for(var i=0; i<=freq1; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq1*stringW, y1-nodeOffset);
			ctx.lineTo(stringX+i/freq1*stringW, y1+nodeOffset);
			ctx.stroke();
		}
		for(var i=0; i<=freq2; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq2*stringW, y2-nodeOffset);
			ctx.lineTo(stringX+i/freq2*stringW, y2+nodeOffset);
			ctx.stroke();
		}
		for(var i=0; i<=freq3; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq3*stringW, y3-nodeOffset);
			ctx.lineTo(stringX+i/freq3*stringW, y3+nodeOffset);
			ctx.stroke();
		}
		for(var i=0; i<=freq4; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq4*stringW, y4-nodeOffset);
			ctx.lineTo(stringX+i/freq4*stringW, y4+nodeOffset);
			ctx.stroke();
		}
		for(var i=0; i<=freq5; i++){
			ctx.beginPath();
			ctx.moveTo(stringX+i/freq5*stringW, y5-nodeOffset);
			ctx.lineTo(stringX+i/freq5*stringW, y5+nodeOffset);
			ctx.stroke();
		}
		for(var i=0; i<=freq1; i++){
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
	//go();
	animate.callback=go;
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
	var freq=4;
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y1-amplitude1*(Math.sin(2*Math.PI*freq*x/sinWaveW)));
	}
	ctx.stroke();
	var tempStyle=ctx.strokeStyle;
	ctx.strokeStyle='red';
	for(var i=0; i<=freq; i++){
		ctx.beginPath();
		ctx.moveTo(sinWaveX+i/freq*sinWaveW, y1-20);
		ctx.lineTo(sinWaveX+i/freq*sinWaveW, y1+20);
		ctx.stroke();
	}
	ctx.strokeStyle=tempStyle;
	ctx.beginPath();
	ctx.moveTo(sinWaveX, y3);
	freq=5;
	for(var x=1; x<=sinWaveW; x++){
		ctx.lineTo(sinWaveX+x, y3-amplitude1*(Math.sin(2*Math.PI*freq*x/sinWaveW)));
	}
	ctx.stroke();
	ctx.strokeStyle='red';
	for(var i=0; i<=freq; i++){
		ctx.beginPath();
		ctx.moveTo(sinWaveX+i/freq*sinWaveW, y3-20);
		ctx.lineTo(sinWaveX+i/freq*sinWaveW, y3+20);
		ctx.stroke();
	}
}