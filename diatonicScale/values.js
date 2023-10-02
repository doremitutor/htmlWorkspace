/* CLASSES */
function Point(x, y){
	this.x=x;
	this.y=y;
}
function Note(name, point){
	this.name1=name[0];
	if(name[1]){
		this.name2=name[1];
	}
	this.x=point.x;
	this.y=point.y;
}
Note.prototype.showUp=function(point, showNames){
	this.locate(point);
	this.createShape();
	this.paintBackground();
	this.paintBorder();
	if(showNames!=undefined){
		this.namesVisible=showNames;
	}
	if(this.namesVisible){
		this.paintNames();
	}
}
Note.prototype.locate=function(point){
	this.x=point.x;
	this.y=point.y;
};
Note.prototype.createShape=function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, Note.RADIUS, 0, Math.PI*2, true);
	ctx.closePath();
}
Note.prototype.paintBackground=function(){
	ctx.fillStyle='#ffcc99';
	ctx.fill();
};
Note.prototype.paintBorder=function(){
	ctx.strokeStyle='#3b2c1d';
	ctx.lineWidth=4;
	ctx.stroke();
};
Note.prototype.paintNames=function(){
	ctx.fillStyle="#3b2c1d";
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	if(this.name2){
		ctx.font='bold '+canvas.height/26+'px sans-serif';
		let offsetY=canvas.height/70;
		ctx.fillText(this.name1, this.x, this.y-offsetY+1);
		ctx.fillText(this.name2, this.x, this.y+offsetY+3);
	}
	else if(sharpNames.hasIt(this.name1)||flatNames.hasIt(this.name1)){
		ctx.font='bold '+canvas.height/23+'px sans-serif';
		ctx.fillText(this.name1, this.x, this.y);
	}
	else{
		ctx.font='bold '+canvas.height/20+'px sans-serif';
		ctx.fillText(this.name1, this.x, this.y);
	}
};
Note.prototype.move=function(point){
	this.clear();
	this.showUp(point);
	// ctx.clearRect(this.x-Note.RADIUS-4, this.y-Note.RADIUS-4, Note.RADIUS*2+8, Note.RADIUS*2+8);
	// this.draw(x, y);
};
Note.prototype.clear=function(){
	ctx.clearRect(this.x-Note.RADIUS-3, this.y-Note.RADIUS-3, Note.RADIUS*2+6, Note.RADIUS*2+6);
};
let maskRadius;
let fontSizeLarge;
let fontSizeSmall;
let circle;
let guide;
let lineSegment;
let circle7th;
let circle12th;
let initAngle=Math.PI/2;

let naturalNotes=new Array(7);
let alteredNotes=new Array(5);
let flatNotes=new Array(5);
let sharpNotes=new Array(5);
let chromaticNotes=new Array(12);
let circleOfFifthsNotes=new Array(12);
let scratchChromaticNotes=new Array(12);
let scratchFifthsNotes=new Array(12);
let sharpSeriesNotes=new Array(8);
let flatSeriesNotes=new Array(8);

let pointsSharpSeries=new Array(8);
let pointsFlatSeries=new Array(8);
let pointsInLine=new Array(7);
let pointsByAngle7ths=new Array(7);
let pointsChromatic=new Array(12);
let pointsDiatonic=new Array(7);
let pointsAltered=new Array(5);

let anglesBy7ths=new Array(7);
let anglesBy12ths=new Array(12);

let flat=String.fromCharCode(0x266d);
let sharp=String.fromCharCode(0x266f);
let	noteNames=[["Do"], ["Re"], ["Mi"], ["Fa"], ["Sol"], ["La"], ["Si"]];
let	flatNames=[["Re"+flat], ["Mi"+flat], ["Sol"+flat], ["La"+flat], ["Si"+flat], ["Do"+flat], ["Fa"+flat]];
let	sharpNames=[["Do"+sharp], ["Re"+sharp], ["Fa"+sharp], ["Sol"+sharp], ["La"+sharp], ["Mi"+sharp], ["Si"+sharp]];
let	alteredNames=[["Do"+sharp, "Re"+flat], ["Re"+sharp, "Mi"+flat], ["Fa"+sharp, "Sol"+flat],
				["Sol"+sharp, "La"+flat], ["La"+sharp, "Si"+flat]];
let chromaticNames=[noteNames[0], alteredNames[0], noteNames[1], alteredNames[1],
					noteNames[2], noteNames[3], alteredNames[2], noteNames[4],
					alteredNames[3], noteNames[5], alteredNames[4], noteNames[6]];
let circleOfFifthsNames=[noteNames[0], noteNames[4], noteNames[1], noteNames[5],
						 noteNames[2], noteNames[6], alteredNames[2], flatNames[0],
						 flatNames[3], flatNames[1],flatNames[4] ,noteNames[3]];					
let scratchChromaticNames=[noteNames[0], flatNames[0], noteNames[1], flatNames[1],
					noteNames[2], noteNames[3], flatNames[2], noteNames[4],
					flatNames[3], noteNames[5], flatNames[4], flatNames[5]];					
let scratchChromaticNames2=[sharpNames[6], sharpNames[0], noteNames[1], sharpNames[1],
					noteNames[2], sharpNames[5], sharpNames[2], noteNames[4],
					sharpNames[3], noteNames[5], sharpNames[4], noteNames[6]];
let scratchFifthsNames=[noteNames[0], noteNames[4], noteNames[1], noteNames[5],
						 noteNames[2], noteNames[6], flatNames[2], flatNames[0],
						 flatNames[3], flatNames[1],flatNames[4] ,noteNames[3]];
let sharpSeriesNames=[["Do"], ["Sol"], ["Re"], ["La"], ["Mi"], ["Si"], ["Fa"+sharp], ["Do"+sharp]];
let flatSeriesNames=[["Do"], ["Fa"], ["Si"+flat], ["Mi"+flat], ["La"+flat], ["Re"+flat], ["Sol"+flat], ["Do"+flat]];
//let wrapStepsFactor=Math.floor(8);
//let diatonizingSteps=200;