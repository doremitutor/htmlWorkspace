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
Note.prototype.move=function(point){
	this.clear();
	this.showUp(point);
	// ctx.clearRect(this.x-Note.RADIUS-4, this.y-Note.RADIUS-4, Note.RADIUS*2+8, Note.RADIUS*2+8);
	// this.draw(x, y);
};
Note.prototype.createShape=function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, Note.RADIUS, 0, Math.PI*2, true);
	ctx.closePath();
}
Note.prototype.paintBorder=function(){
	ctx.strokeStyle='#3b2c1d';
	ctx.lineWidth=4;
	ctx.stroke();
};
Note.prototype.paintBackground=function(){
	ctx.fillStyle='#ffcc99';
	ctx.fill();
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
Note.prototype.clear=function(){
	ctx.clearRect(this.x-Note.RADIUS-3, this.y-Note.RADIUS-3, Note.RADIUS*2+6, Note.RADIUS*2+6);
};