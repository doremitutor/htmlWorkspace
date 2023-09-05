window.onload=setUp;
window.addEventListener('load', setUp, false);
function setUp(){
	setUpCommonalities();
	Note.RADIUS=canvas.height/20;
	maskRadius=canvas.height/18;
	fontSizeLarge=canvas.height/22;
	fontSizeSmall=canvas.height/28;
	fontLarge='bold '+fontSizeLarge+'px sans-serif';
	fontSmall='bold '+fontSizeSmall+'px sans-serif';
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	/* GRAPHICS */
	circle={x:canvas.width/2, y:canvas.height/2, radius:canvas.height/4};
	guide={y:circle.y-circle.radius, length:2*Math.PI*circle.radius};
	guide.x=circle.x-guide.length/2;
	lineSegment=2*Math.PI*circle.radius/6;
	for(let i=0; i<pointsInLine.length; i++){
		pointsInLine[i]=new Point(guide.x+lineSegment*i, guide.y);
	}
	circle7th=2*Math.PI/7;
	for(let i=0; i<anglesBy7ths.length; i++){
		anglesBy7ths[i]=i*circle7th-initAngle;
	}
	for(let i=0; i<pointsByAngle7ths.length; i++){
		pointsByAngle7ths[i]=new Point(circle.x+circle.radius*Math.cos(anglesBy7ths[i]),
									circle.y+circle.radius*Math.sin(anglesBy7ths[i]));
	}
	circle12th=2*Math.PI/12;
	for(let i=0; i<anglesBy12ths.length; i++){
		anglesBy12ths[i]=i*circle12th-initAngle;
	}
	for(let i=0; i<pointsChromatic.length; i++){
		pointsChromatic[i]=new Point(circle.x+circle.radius*Math.cos(anglesBy12ths[i]),
									circle.y+circle.radius*Math.sin(anglesBy12ths[i]));
	}
	pointsDiatonic[0]=pointsChromatic[0];
	pointsDiatonic[1]=pointsChromatic[2];
	pointsDiatonic[2]=pointsChromatic[4];
	pointsDiatonic[3]=pointsChromatic[5];
	pointsDiatonic[4]=pointsChromatic[7];
	pointsDiatonic[5]=pointsChromatic[9];
	pointsDiatonic[6]=pointsChromatic[11];
	pointsAltered[0]=pointsChromatic[1];
	pointsAltered[1]=pointsChromatic[3];
	pointsAltered[2]=pointsChromatic[6];
	pointsAltered[3]=pointsChromatic[8];
	pointsAltered[4]=pointsChromatic[10];
	let offset6X=57;
	let offset6Y=56;
	let offset7X=39;
	let offset7Y=140;
	let seriesOffSetY=150;
	pointsSharpSeries[0]=pointsChromatic[0];
	pointsSharpSeries[1]=pointsChromatic[1];
	pointsSharpSeries[2]=pointsChromatic[2];
	pointsSharpSeries[3]=pointsChromatic[3];
	pointsSharpSeries[4]=pointsChromatic[4];
	pointsSharpSeries[5]=pointsChromatic[5];
	pointsSharpSeries[6]=new Point(pointsChromatic[6].x+offset6X, pointsChromatic[6].y+offset6Y);
	pointsSharpSeries[7]=new Point(pointsChromatic[6].x+offset7X, pointsChromatic[6].y+offset7Y)
	pointsFlatSeries[0]=pointsChromatic[0];
	pointsFlatSeries[1]=pointsChromatic[11];
	pointsFlatSeries[2]=pointsChromatic[10];
	pointsFlatSeries[3]=pointsChromatic[9];
	pointsFlatSeries[4]=pointsChromatic[8];
	pointsFlatSeries[5]=pointsChromatic[7];
	pointsFlatSeries[6]=new Point(pointsChromatic[6].x-offset6X, pointsChromatic[6].y+offset6Y);
	pointsFlatSeries[7]=new Point(pointsChromatic[6].x-offset7X, pointsChromatic[6].y+offset7Y)
	/* pointsSharpSeries[0]=pointsChromatic[1];
	pointsSharpSeries[1]=pointsChromatic[3];
	pointsSharpSeries[2]=pointsChromatic[4];
	pointsSharpSeries[3]=pointsChromatic[5];
	pointsSharpSeries[4]=pointsChromatic[6];
	pointsSharpSeries[5]=pointsChromatic[7];
	pointsSharpSeries[6]=pointsChromatic[8];
	pointsSharpSeries[7]=pointsChromatic[9];
	pointsFlatSeries[0]=pointsChromatic[1];
	pointsFlatSeries[1]=pointsChromatic[2];
	pointsFlatSeries[2]=pointsChromatic[3];
	pointsFlatSeries[3]=pointsChromatic[4];
	pointsFlatSeries[4]=pointsChromatic[5];
	pointsFlatSeries[5]=pointsChromatic[6];
	pointsFlatSeries[6]=pointsChromatic[7];
	pointsFlatSeries[7]=pointsChromatic[8]; */
	for(let i=0; i<naturalNotes.length; i++){
		naturalNotes[i]=new Note(noteNames[i], pointsDiatonic[i]);
	}
	for(i=0; i<alteredNotes.length;i++){
		alteredNotes[i]=new Note(alteredNames[i], pointsAltered[i]);
	}
	for(i=0; i<flatNotes.length;i++){
		flatNotes[i]=new Note(flatNames[i], pointsFlatSeries[i]);
	}
	for(i=0; i<sharpNotes.length;i++){
		sharpNotes[i]=new Note(sharpNames[i], pointsSharpSeries[i]);
	}
	for(let i=0; i<chromaticNotes.length; i++){
		chromaticNotes[i]=new Note(chromaticNames[i], pointsChromatic[i]);
	}
	for(let i=0; i<circleOfFifthsNotes.length; i++){
		circleOfFifthsNotes[i]=new Note(circleOfFifthsNames[i], pointsChromatic[i]);
	}
	// listeners
	document.getElementById('a0-start').addEventListener('click', startAnimation);
	document.getElementById('a1-altered').addEventListener('click', showAlteredNotes);
	document.getElementById('a2-alteredNames').addEventListener('click', showAlteredNames);
	document.getElementById('a3-showDiatonics').addEventListener('click', showDiatonics);
	document.getElementById('a4-showChromatics').addEventListener('click', showChromatics);
	document.getElementById('a5-showAltered').addEventListener('click', showAltered);
	document.getElementById('a6-lightningSpot').addEventListener('click', showLightningSpot);
	document.getElementById('a7-diatMask').addEventListener('click', showDiatonicMask);
	document.getElementById('a8-diatSectors').addEventListener('click', showDiatonicSectors.showTones);
	document.getElementById('a9-rotate3').addEventListener('click', rotateLastNotes);
	document.getElementById('aa-centerGuide').addEventListener('click', showOrHideCenteringMark);
	//document.getElementById('ab-currentTest').addEventListener('click', );
	// document.getElementById('ac-sharpNames').addEventListener('click', showSharpNames);
	// document.getElementById('adline').addEventListener('click', drawLine);
	// document.getElementById('ae-circle').addEventListener('click', drawCircle);
	// document.getElementById('af-alert').addEventListener('click', function(){alert('Available!!!');});
	document.getElementById('b0-resume').addEventListener('click', resume);
	document.getElementById('b1-pause').addEventListener('click', stopOrClear);
	// document.getElementById('b2').addEventListener('click', );
	// document.getElementById('b3').addEventListener('click', );
	// document.getElementById('b4').addEventListener('click', );
	// document.getElementById('b5').addEventListener('click', ); /*  */
	
	//startAnimation();
	// showAlteredNotes();
	// showChromatics();
	// showDiatonics();
	// showLightningSpot();
	// showDiatonicMask();
	// drawCircle();
	// showAlterationSeries();
	// showOrHideCenteringMark();	
}
	/* //scratches here!
	for(let i=0; i<scratchChromaticNotes.length; i++){
		scratchChromaticNotes[i]=new Note(scratchChromaticNames[i], pointsChromatic[i]);
	}
	for(let i=0; i<scratchFifthsNotes.length; i++){
		scratchFifthsNotes[i]=new Note(scratchFifthsNames[i], pointsChromatic[i]);
	} */