var topMargin=130;
var sideMargin=100; // must be 40
var r=24; // 26, actually
var dev=40; //it was 80
var arrowFatness=8;	
var tipDepth=10;
var white='#ffffff';
var lightBrown='#ffcc99';
var darkBrown='#3b2c1d';
var dim='#ff00ff';
var minor='#ff0000'; 
var just='#ff9900';
var major='#77ff00';  
var aug='#ffff00';
var point=new Array();
var y=new Array(6);
for(var i=0; i<y.length; i++){
	y[i]=topMargin+110*i;
}
var diatPoint=[0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 25];
window.onload=setUp;
function setUp(){
	setCtx();
	// listeners
	document.getElementById('a0').addEventListener('click', f0);
	document.getElementById('a1').addEventListener('click', f1);
	document.getElementById('a2').addEventListener('click', f2);
	document.getElementById('a3').addEventListener('click', animate);
	document.getElementById('a4').addEventListener('click', f4);
	document.getElementById('a5').addEventListener('click', f5);
	document.getElementById('a6').addEventListener('click', resume);
	document.getElementById('a7').addEventListener('click', stopOrClear);
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	ctx.font='bold 28px sans-serif';
	ctx.lineWidth=2;
	f0();
	//f1();
	//f2();
	//f3();
}
function f0(){// draw everything!
	//alert('F0 not available yet');
	// 2nds
	// var y0=y[0];
	/* ASCENDING AND DESCENDING THIRDS */
	y0=200;
	var hide=1;
	drawScale(y0, 13, 8, hide);
	drawInterval(point[0].x, point[7].x, y0, r, dev, just);
	drawInterval(point[7].x, point[12].x, y0, r, dev, just);
	// drawInterval(point[0].x, point[14].x, y0, r, dev, major);
	// drawInterval(point[0].x, point[21].x, y0, r, dev, major);
	// y0=400;
	//  drawScale(y0, 25, 15, hide);
	// drawInterval(point[4].x, point[5].x, y0, r, dev, minor);
	// drawInterval(point[11].x, point[23].x, y0, r, dev, just);
	// drawInterval(point[4].x, point[17].x, y0, r, dev, minor);
	// drawInterval(point[0].x, point[21].x, y0, r, dev, major);
	// y0=600;
	// drawScale(y0, 25, 15, hide);
	// drawInterval(point[4].x, point[12].x, y0, r, dev, minor);
	// drawInterval(point[12].x, point[24].x, y0, r, dev, just);
	//drawInterval(point[4].x, point[24].x, y0, r, dev, minor);
	// drawInterval(point[0].x, point[21].x, y0, r, dev, major);
	//drawInterval(point[0].x, point[5].x, y0, r, dev, just);
	//drawInterval(point[12].x, point[5].x, y0, r, dev, just);
	// drawInterval(point[7].x, point[9].x, y0, r, dev, major);
	// drawInterval(point[9].x, point[11].x, y0, r, dev, major);
	// drawInterval(point[11].x, point[12].x, y0, r, dev, minor);
	// y0=500;
	// drawScale(y0, 25, 15, false);	
	// drawInterval(point[4].x, point[17].x, y0, r, dev, minor);	
	// drawInterval(point[0].x, point[21].x, y0, r, dev, minor);
	// drawInterval(point[9].x, point[4].x, y0, r, dev, just);
	// y0=550;
	// drawScale(y0, 13, 8, false);
	// drawInterval(point[4].x, point[0].x, y0, r, dev, major);
	/*y0=300;
	//var dev=80;
	drawScale(y0, 13, 8, 0);
	drawInterval(point[0].x, point[2].x, y0, r, dev, major);
	drawInterval(point[2].x, point[4].x, y0, r, dev, major);
	drawInterval(point[4].x, point[5].x, y0, r, dev, minor);
	drawInterval(point[5].x, point[7].x, y0, r, dev, major);
	drawInterval(point[7].x, point[9].x, y0, r, dev, major);
	drawInterval(point[9].x, point[11].x, y0, r, dev, major);
	drawInterval(point[11].x, point[12].x, y0, r, dev, minor);
	
	// 3rds
	var y0=y[1];
	drawScale(y0, 15, 9);
	// drawInterval(point[0].x, point[4].x, y0, r, dev, major);
	// drawInterval(point[2].x, point[5].x, y0, r, dev, minor);
	// drawInterval(point[4].x, point[7].x, y0, r, dev, minor);
	// drawInterval(point[5].x, point[9].x, y0, r, dev, major);
	// drawInterval(point[7].x, point[11].x, y0, r, dev, major);
	// drawInterval(point[9].x, point[12].x, y0, r, dev, minor);
	drawInterval(point[11].x, point[14].x, y0, r, dev, minor);
	// 4ths
	var y0=y[2];
	drawScale(y0, 17, 10);
	//just=darkBrown;
	// just='yellow';
	// drawInterval(point[0].x, point[5].x, y0, r, dev, just);
	// drawInterval(point[2].x, point[7].x, y0, r, dev, just);
	// drawInterval(point[4].x, point[9].x, y0, r, dev, just);
	// drawInterval(point[5].x, point[11].x, y0, r, dev, aug);
	// drawInterval(point[7].x, point[12].x, y0, r, dev, just);
	// drawInterval(point[9].x, point[14].x, y0, r, dev, just);
	drawInterval(point[11].x, point[16].x, y0, r, dev, just);
	// 5ths
	var y0=y[3];*/
	//drawScale(y0, 18, 11);
	/*
	// drawInterval(point[0].x, point[7].x, y0, r, dev, just);
	// drawInterval(point[2].x, point[9].x, y0, r, dev, just);
	// drawInterval(point[4].x, point[11].x, y0, r, dev, just);
	// drawInterval(point[5].x, point[12].x, y0, r, dev, just);
	// drawInterval(point[7].x, point[14].x, y0, r, dev, just);
	// drawInterval(point[9].x, point[16].x, y0, r, dev, just);
	drawInterval(point[11].x, point[17].x, y0, r, dev, dim);
	// 6ths, true
	var y0=y[4];
	drawScale(y0, 20, 12);
	// drawInterval(point[0].x, point[9].x, y0, r, dev, major);
	// drawInterval(point[2].x, point[11].x, y0, r, dev, major);
	// drawInterval(point[4].x, point[12].x, y0, r, dev, minor);
	// drawInterval(point[5].x, point[14].x, y0, r, dev, major);
	// drawInterval(point[7].x, point[16].x, y0, r, dev, major);
	// drawInterval(point[9].x, point[17].x, y0, r, dev, minor);
	drawInterval(point[11].x, point[19].x, y0, r, dev, minor);
	// 7ths
	//dev=500;
	var y0=y[5];, true
	
	drawScale(y0, 22, 13);
	// drawInterval(point[0].x, point[11].x, y0, r, dev, major);
	// drawInterval(point[2].x, point[12].x, y0, r, dev, minor);
	// drawInterval(point[4].x, point[14].x, y0, r, dev, minor);
	// drawInterval(point[5].x, point[16].x, y0, r, dev, major);
	// drawInterval(point[7].x, point[17].x, y0, r, dev, minor);
	// drawInterval(point[9].x, point[19].x, y0, r, dev, minor);
	//drawInterval(point[11].x, point[21].x, y0, r, dev, minor); */
	
	/* FOR ASCENDING-DESCENDING IMAGE*/
	/*y0=250;
	drawScale(y0, 22, 13, false);
	drawInterval(point[0].x, point[2].x, y0, r, dev, major);
	drawInterval(point[2].x, point[5].x, y0, r, dev, minor);
	drawInterval(point[4].x, point[9].x, y0, r, dev, just);
	drawInterval(point[7].x, point[14].x, y0, r, dev, just);
	drawInterval(point[9].x, point[17].x, y0, r, dev, minor);
	drawInterval(point[11].x, point[21].x, y0, r, dev, minor);
	//rawInterval(point[11].x, point[23].x, y0, r, dev, just);
	//drawInterval(point[12].x, point[24].x, y0, r, dev, just);
	y0=550;
	drawScale(y0, 22, 13, false);
	drawInterval(point[2].x, point[0].x, y0, r, dev, major);
	drawInterval(point[5].x, point[2].x, y0, r, dev, minor);
	drawInterval(point[9].x, point[4].x, y0, r, dev, just);
	drawInterval(point[14].x, point[7].x, y0, r, dev, just);
	drawInterval(point[17].x, point[9].x, y0, r, dev, minor);
	drawInterval(point[21].x, point[11].x, y0, r, dev, minor);
	
	*/
}
function f1(){ // draw diatonic with tall intervals
	//alert('F1 not available yet');
	var y0=y[3];
	//var dev=500;// tall intervals
	drawScale(y0, 13, 8);
	// drawScale(y0, 24, 14);
	// drawInterval(point[0].x, point[2].x, y0, r, dev, major);
	// drawInterval(point[2].x, point[4].x, y0, r, dev, major);
	// drawInterval(point[4].x, point[5].x, y0, r, dev, minor);
	// drawInterval(point[5].x, point[7].x, y0, r, dev, major);
	// drawInterval(point[7].x, point[9].x, y0, r, dev, major);
	// drawInterval(point[9].x, point[11].x, y0, r, dev, major);
	// drawInterval(point[11].x, point[12].x, y0, r, dev, minor);
}
function f2(){ // draw simple scale with seconds in red
	//alert('F2 not available yet');	
	var y=300, steps=180, diatX=new Array(8), chromX=new Array(13), newDiatX=new Array(8), step=new Array(8);
	// write initial and final x's, steps. etc... 
	for(var i=0; i<diatX.length; i++){
		diatX[i]=sideMargin+(canvas.width-2*sideMargin)/(diatX.length-1)*i
		//console.log(diatX[i]);
	}
	for(var i=0; i<chromX.length; i++){
		chromX[i]=sideMargin+(canvas.width-2*sideMargin)/(chromX.length-1)*i
		console.log(chromX[i]);
	}
	newDiatX=[chromX[0], chromX[2], chromX[4], chromX[5], chromX[7], chromX[9], chromX[11], chromX[12]];
	for(var i=0;i<step.length; i++){
		step[i]=(newDiatX[i]-diatX[i])/steps;
		//console.log(step[i]);
	}
	function draw(){
		ctx.strokeRect(sideMargin-r-3, y-2*dev-r+1, canvas.width-2*sideMargin+2*r+6, 2*(dev+r)+2);
		ctx.beginPath();	
		for(var i=0; i<diatX.length; i++){
			ctx.moveTo(diatX[i]+r, y);	
			ctx.arc(diatX[i], y, r, 0, 2*Math.PI, true);
		}
		ctx.fillStyle=lightBrown;
		ctx.fill();
		ctx.strokeStyle=darkBrown;
		ctx.stroke();
		ctx.fillStyle=darkBrown;
		var name=new Array("Do","Re","Mi","Fa","Sol","La","Si","Do","Re","Mi","Fa","Sol","La","Si","Do");
		for(var i=0; i<diatX.length; i++){
			ctx.fillText(name[i], diatX[i], y);
		}
		var color=darkBrown;
		drawInterval(diatX[0], diatX[1], y, r, dev, color);
		drawInterval(diatX[1], diatX[2], y, r, dev, color);
		drawInterval(diatX[2], diatX[3], y, r, dev, color);
		drawInterval(diatX[3], diatX[4], y, r, dev, color);
		drawInterval(diatX[4], diatX[5], y, r, dev, color);
		drawInterval(diatX[5], diatX[6], y, r, dev, color);
		drawInterval(diatX[6], diatX[7], y, r, dev, color);
	}
	draw();
	animate.callback=function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(steps<=1){
			ctx.fillStyle=darkBrown; 
			for(var i=0; i<chromX.length; i++){
				ctx.beginPath();
				ctx.arc(chromX[i], y, 6, 0, 2*Math.PI, true);
				ctx.fillStyle=lightBrown;
				ctx.fill();
				ctx.stroke();
			}			
		}
		for(var i=0; i<diatX.length; i++){
			diatX[i]+=step[i];
		}
		draw();
		if(--steps==0){
			cancelAnimationFrame(raf);
		}
	}
	animate();	
	if(true)return;
	for(var i=0; i<chrom; i++){
		point[i]= new Point(sideMargin+(canvas.width-2*sideMargin)/(chrom-1)*i, y);
	}
}
function f3(){
	alert('F3 not available yet');
}
function f4(){
	alert('F4 not available yet');
}
function f5(){
	alert('F5 not available yet');
}
// specific functions
function drawScale(y, chrom, diat, fake){
	for(var i=0; i<chrom; i++){
		point[i]= new Point(sideMargin+(canvas.width-2*sideMargin)/(chrom-1)*i, y);
	}
	ctx.fillStyle=darkBrown;
	// recording frame
	//ctx.strokeRect(sideMargin-r-3, y-2*dev-r+1, canvas.width-2*sideMargin+2*r+6, 2*(dev+r)+2);
	
	if(fake)return;
	//draw accidentals
	for(var i=0; i<point.length; i++){
		ctx.beginPath();
		ctx.arc(point[i].x, y, 6, 0, 2*Math.PI, true);
		ctx.fillStyle=lightBrown;
		ctx.fill()
		ctx.stroke();
	}
	ctx.beginPath();	
	for(var i=0; i<diat; i++){
		var p=point[diatPoint[i]];
		ctx.moveTo(p.x+r, y);	
		ctx.arc(p.x, p.y, r, 0, 2*Math.PI, true);
	}
	ctx.fillStyle=lightBrown;
	ctx.fill();
	ctx.strokeStyle=darkBrown;
	ctx.stroke();
	ctx.fillStyle=darkBrown;
	var name=new Array("Do","Re","Mi","Fa","Sol","La","Si","Do","Re","Mi","Fa","Sol","La","Si","Do");
	for(var i=0; i<diat; i++){
		var p=point[diatPoint[i]];
		ctx.fillText(name[i], p.x, p.y);
	}
}	
function drawInterval(x1, x2, y, r, arrowDeviationBase, color){
	var distance=x2-x1;
	var sign=Math.sign(distance);
	var arrowDeviation=arrowDeviationBase+(Math.abs(distance))/15; //it was 5
	var angleOffset=(Math.abs(distance)/30+20)*sign;
	var angleStart=(90-angleOffset)*Math.PI/180;
	var angleEnd=(90+angleOffset)*Math.PI/180;
	var xStart=x1+r*Math.cos(angleStart);
	var xEnd=  x2+r*Math.cos(angleEnd);
	var y0=y-r*Math.sin(angleStart);
	var ctrlX=xStart+(xEnd-xStart)/2;
	var ctrlY=y0-arrowDeviation;
	var angleArrowRef=Math.atan(arrowDeviation/(ctrlX-xEnd));
	if(angleArrowRef<0){angleArrowRef+=Math.PI;}
	var angleArrowBack=angleArrowRef+Math.PI/2;
	if(angleArrowBack<0){angleArrowBack+=Math.PI;}
	if(angleArrowBack>Math.PI){angleArrowBack-=Math.PI;}
	var xRef=xEnd+tipDepth*Math.cos(angleArrowRef);
	var yRef=y0-tipDepth*Math.sin(angleArrowRef);
	var cornerAngDev=10*Math.PI/180;
	var tipAngDev=20*Math.PI/180;
	var devLinCorner=r*Math.tan(cornerAngDev);
	var devLinTip=r*Math.tan(tipAngDev);
	var cornerOffsetX=devLinCorner*Math.cos(angleArrowBack);
	var cornerOffsetY=devLinCorner*Math.sin(angleArrowBack);
	var tipOffsetX=devLinTip*Math.cos(angleArrowBack);
	var tipOffsetY=devLinTip*Math.sin(angleArrowBack);
	var lowerCornerX=xRef+cornerOffsetX;
	var lowerCornerY=yRef-cornerOffsetY;
	var upperCornerX=xRef-cornerOffsetX;
	var upperCornerY=yRef+cornerOffsetY;
	var lowerTipX=xRef+tipOffsetX;
	var lowerTipY=yRef-tipOffsetY;
	var upperTipX=xRef-tipOffsetX;
	var upperTipY=yRef+tipOffsetY;	
	ctx.beginPath();
	ctx.moveTo(xStart, y0);
	ctx.quadraticCurveTo(ctrlX, ctrlY-arrowFatness, lowerCornerX, lowerCornerY);
	ctx.lineTo(lowerTipX, lowerTipY);
	ctx.lineTo(xEnd, y0);
	ctx.lineTo(upperTipX, upperTipY);
	ctx.lineTo(upperCornerX, upperCornerY);
	ctx.quadraticCurveTo(ctrlX, ctrlY+arrowFatness, xStart, y0);
	ctx.fillStyle=color;
	ctx.fill();
	ctx.strokeStyle=darkBrown;
	ctx.stroke();
}

function drawInterval2(x1, x2, y, r){
	//console.log(180*Math.atan(2/2)/Math.PI);
	var distance=x2-x1;
	var sign=Math.sign(distance);
	var arrowFatness=7;
	var arrowDeviation=60+(Math.abs(distance))/20;
	var angleOffset=(Math.abs(distance)/20+20)*sign;
	var angleStart=(90-angleOffset)*Math.PI/180;
	var angleEnd=(90+angleOffset)*Math.PI/180;
	var xStart=x1+r*Math.cos(angleStart);
	var xEnd=  x2+r*Math.cos(angleEnd);
	var y0=y-r*Math.sin(angleStart);
	var ctrlX=xStart+(xEnd-xStart)/2;
	var ctrlY=y0-arrowDeviation;
	var tipDepth=10;//+(distance/80)
	var angleArrowRef=Math.atan(arrowDeviation/(ctrlX-xEnd));
	if(angleArrowRef<0){angleArrowRef+=Math.PI;}
	var angleArrowBack=angleArrowRef+Math.PI/2;
	if(angleArrowBack<0){angleArrowBack+=Math.PI;}
	if(angleArrowBack>Math.PI){angleArrowBack-=Math.PI;}
	var xRef=xEnd+tipDepth*Math.cos(angleArrowRef);
	var yRef=y0-tipDepth*Math.sin(angleArrowRef);
	var cornerAngDev=10*Math.PI/180;
	var tipAngDev=20*Math.PI/180;
	ctx.fillStyle='#ffcc99';
	ctx.lineWidth=2;
	ctx.strokeStyle='black';
	var devLinCorner=r*Math.tan(cornerAngDev);
	var devLinTip=r*Math.tan(tipAngDev);
	var cornerOffsetX=devLinCorner*Math.cos(angleArrowBack);
	var cornerOffsetY=devLinCorner*Math.sin(angleArrowBack);
	var tipOffsetX=devLinTip*Math.cos(angleArrowBack);
	var tipOffsetY=devLinTip*Math.sin(angleArrowBack);
	var lowerCornerX=xRef+cornerOffsetX;
	var lowerCornerY=yRef-cornerOffsetY;
	var upperCornerX=xRef-cornerOffsetX;
	var upperCornerY=yRef+cornerOffsetY;
	var lowerTipX=xRef+tipOffsetX;
	var lowerTipY=yRef-tipOffsetY;
	var upperTipX=xRef-tipOffsetX;
	var upperTipY=yRef+tipOffsetY;
	ctx.beginPath();
	ctx.moveTo(xStart, y0);
	ctx.quadraticCurveTo(ctrlX, ctrlY-arrowFatness, lowerCornerX, lowerCornerY);
	ctx.lineTo(lowerTipX, lowerTipY);
	ctx.lineTo(xEnd, y0);
	ctx.lineTo(upperTipX, upperTipY);
	ctx.lineTo(upperCornerX, upperCornerY);
	ctx.quadraticCurveTo(ctrlX, ctrlY+arrowFatness, xStart, y0);
	ctx.fill();
	ctx.stroke();
}
function Point(x, y){
	this.x=x;
	this.y=y;
}