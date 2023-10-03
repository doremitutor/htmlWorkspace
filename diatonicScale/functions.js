function showNotesInLine(){
	if(timer||raf){		
		return;
	}
	stopOrClear();
	let point;
	for(let i=0; i<naturalNotes.length; i++){
	point=pointsInLine[i];
	naturalNotes[i].showUp(point, true);
	}
	//keepOn(rotateLastNotes, 100);
}
function rotateLastThreeAndWindThemAll(){
	let steps=[140, 200, 260];
	let origin=[pointsInLine[4], pointsInLine[5], pointsInLine[6]];
	let ending=[pointsByAngle7ths[1], pointsByAngle7ths[2],pointsByAngle7ths[3]];
	let chordAndRadius=[100, 300, 550], middlePoint=new Array(3), angleChord=new Array(3), bisectAngle=new Array(3),
		 radiusSegment=new Array(3), rotCenter=new Array(3), angleOrigin=new Array(3),
		 angleEnding=new Array(3), angleStep=new Array(3), running=[true, true, true], note, point, newX, newY;
	for(let i=0; i<middlePoint.length; i++){
		middlePoint[i]=new Point((origin[i].x+ending[i].x)/2, (origin[i].y+ending[i].y)/2);
	}
	for(let i=0; i<chordAndRadius.length; i++){
		chordAndRadius[i]=Math.sqrt(Math.pow(ending[i].x-origin[i].x, 2)+Math.pow(ending[i].y-origin[i].y, 2));
	}
	for(let i=0; i<angleChord.length; i++){
		a=angleChord[i]=(Math.asin((origin[i].y-ending[i].y)/chordAndRadius[i]));
		if(a<0){
			angleChord[i]=2*Math.PI+angleChord[i];
		}
	}
	for(let i=0; i<bisectAngle.length; i++){
		bisectAngle[i]=angleChord[i]+Math.PI/2;
		if(bisectAngle[i]>Math.PI*2){
			bisectAngle[i]-=Math.PI*2;
		}
	}
	for(let i=0; i<radiusSegment.length; i++){
		radiusSegment[i]=Math.sqrt(Math.pow(chordAndRadius[i], 2)-Math.pow(chordAndRadius[i]/2, 2));
	}
	for(let i=0; i<rotCenter.length; i++){
		rotCenter[i]=new Point(middlePoint[i].x-radiusSegment[i]*Math.cos(bisectAngle[i]),
							   middlePoint[i].y-radiusSegment[i]*Math.sin(bisectAngle[i]));
	}
	for(let i=0; i<angleOrigin.length;i++){
		angleOrigin[i]=Math.atan((origin[i].y-rotCenter[i].y)/(origin[i].x-rotCenter[i].x));
	}
	for(let i=0; i<angleEnding.length;i++){
		angleEnding[i]=Math.atan((ending[i].y-rotCenter[i].y)/(ending[i].x-rotCenter[i].x));
		if(angleEnding[i]<0){
			angleEnding[i]=-angleEnding[i];
		}
	}
	for(let i=0; i<angleStep.length; i++){
		angleStep[i]=(angleEnding[i]-angleOrigin[i])/steps[i];
	}
	let notes=[4, 5, 6];
	function moveNote0(){
		let round=0;
		if(!running[round]){
			running[round]=true;
			return;
		}
		angle=angleOrigin[round]+angleStep[round];
		if(angle>=angleEnding[round]){
			angle=angleEnding[round];
			running[round]=false;
		}
		angleOrigin[round]=angle;
		newX=rotCenter[round].x+chordAndRadius[round]*Math.cos(angle);
		newY=rotCenter[round].y+chordAndRadius[round]*Math.sin(angle);
		point=new Point(newX, newY);
		note=naturalNotes[notes[round]];
		note.move(point);
		raf=window.requestAnimationFrame(moveNote0);
	}
	function moveNote1(){
		let round=1;
		if(!running[round]){
			running[round]=true;
			return;
		}
		angle=angleOrigin[round]+angleStep[round];
		if(angle>=angleEnding[round]){
			angle=angleEnding[round];
			running[round]=false;
		}
		angleOrigin[round]=angle;
		newX=rotCenter[round].x+chordAndRadius[round]*Math.cos(angle);
		newY=rotCenter[round].y+chordAndRadius[round]*Math.sin(angle);
		point=new Point(newX, newY);
		note=naturalNotes[notes[round]];
		note.move(point);
		raf=window.requestAnimationFrame(moveNote1);
	}
	function moveNote2(){
		let round=2;
		if(!running[round]){
			window.cancelAnimationFrame(raf);
			running[round]=true;
			windNotes();
			return;
		}
		angle=angleOrigin[round]+angleStep[round];
		if(angle>=angleEnding[round]){
			angle=angleEnding[round];
			running[round]=false;
		}
		angleOrigin[round]=angle;
		newX=rotCenter[round].x+chordAndRadius[round]*Math.cos(angle);
		newY=rotCenter[round].y+chordAndRadius[round]*Math.sin(angle);
		point=new Point(newX, newY);
		note=naturalNotes[notes[round]];
		note.move(point);
		raf=window.requestAnimationFrame(moveNote2);
	}
	window.setTimeout(moveNote2, 500);
	window.setTimeout(moveNote1, 1000);
	window.setTimeout(moveNote0, 1500);
}
function windNotes(){
	if(timer){
		window.clearTimeout(timer);
	}
	let angle, totalStepCount, points=new Array(7), step=0, phase=0,
		stepsPerPhase=100, numPhases=3, running=true;
	linearAdvance=lineSegment/stepsPerPhase;
	angularAdvance=circle7th/stepsPerPhase;
	function moveNotes(){
		if(!running){
			window.cancelAnimationFrame(raf);
			//keepOn(makeDiatonic, 1000);
			return;
		}
		totalStepCount=step+(phase*stepsPerPhase);
		points[0]=new Point(guide.x+totalStepCount*linearAdvance, guide.y);//
		angle=anglesBy7ths[0]+totalStepCount*angularAdvance;
		points[3]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));	
		angle=anglesBy7ths[1]+totalStepCount*angularAdvance;
		points[4]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));
		angle=anglesBy7ths[2]+totalStepCount*angularAdvance;
		points[5]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));
		angle=anglesBy7ths[3]+totalStepCount*angularAdvance;
		points[6]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));
		switch(phase){
			case 0:
				points[1]=new Point(guide.x+totalStepCount*linearAdvance+lineSegment, guide.y);
				points[2]=new Point(guide.x+totalStepCount*linearAdvance+lineSegment*2, guide.y);
				break;
			case 1:
				points[1]=new Point(guide.x+totalStepCount*linearAdvance+lineSegment, guide.y);
				angle=anglesBy7ths[6]+totalStepCount*angularAdvance;
				points[2]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));
				break;
			case 2:
				angle=anglesBy7ths[5]+totalStepCount*angularAdvance;
				points[1]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));
				angle=anglesBy7ths[6]+totalStepCount*angularAdvance;
				points[2]=new Point(circle.x+circle.radius*Math.cos(angle), circle.y+circle.radius*Math.sin(angle));
				break;
			default:
		}
		for(let i=0; i<points.length; i++){//
			naturalNotes[i].move(points[i]);
		}
		showCount(totalStepCount);
		if(step++>=stepsPerPhase){
			step=0;
			if(++phase>=numPhases){
			running=false;
			}
		}
	}
	animate.callback=moveNotes;
	animate();
}
function makeThemDiatonic(){
	if(timer){
		window.clearTimeout(timer);
	}
	let running=true, angularAdvance=new Array(7), step=0, diatonizingSteps=200, angle= new Array(7);
	angularAdvance[1]=(anglesBy12ths[2]-anglesBy7ths[1])/diatonizingSteps;
	angularAdvance[2]=(anglesBy12ths[4]-anglesBy7ths[2])/diatonizingSteps;
	angularAdvance[3]=(anglesBy12ths[5]-anglesBy7ths[3])/diatonizingSteps;
	angularAdvance[4]=(anglesBy12ths[7]-anglesBy7ths[4])/diatonizingSteps;
	angularAdvance[5]=(anglesBy12ths[9]-anglesBy7ths[5])/diatonizingSteps;
	angularAdvance[6]=(anglesBy12ths[11]-anglesBy7ths[6])/diatonizingSteps;
	let rotate=function(){
		if(!running){
			window.cancelAnimationFrame(raf);
			//keepOn(showAlteredNotes, 1000);			
		}
		for(let i=1; i<7; i++){
			angle[i]=anglesBy7ths[i]+angularAdvance[i]*step;
		}
		for(let i=1; i<7; i++){
			naturalNotes[i].move(new Point(circle.x+circle.radius*Math.cos(angle[i]),
								 circle.y+circle.radius*Math.sin(angle[i])));
		}
		if(++step>=diatonizingSteps){running=false;}
		//if(!running){$cl(running);}
		showCount(step);
	};
	animate.callback=rotate;
	animate();
}
function showIntermediate(){
	if(timer){
		window.clearTimeout(timer);
	}
	let running=true, raisingOpacity=0, maxOpacity=100;
	let show=function(){
		if(!running){
			stopOrClear();
			//keepOn(showAlteredNames, 1000);
			return;
		}
		//showCount(raisingOpacity);
		ctx.globalAlpha=raisingOpacity/100;
		for(let i=0; i<alteredNotes.length; i++){
			alteredNotes[i].showUp(pointsAltered[i], false);
		}
		if((raisingOpacity++)>=maxOpacity){
			running=false;
		}
	};
	animate.callback=show;
	animate();
}
function showAlteredNames(){
	if(timer){
		window.clearTimeout(timer);
	}
	let running=true, globalAlpha=0, maxGlobalAlpha=1.0;
	for(let i=0; i<alteredNotes.length; i++){
		alteredNotes[i].locate(pointsAltered[i]);
	}
	let	show=function(){
		if(!running){
			stopOrClear();
			ctx.globalAlpha=1.0;
			keepOn(showDiatonic, 1000);
			return;
		}
		ctx.globalAlpha=globalAlpha;
		for(let i=0; i<alteredNotes.length; i++){
			alteredNotes[i].clear();
			ctx.globalAlpha=1.0;
			alteredNotes[i].createShape();
			alteredNotes[i].paintBackground();
			alteredNotes[i].paintBorder();
			ctx.globalAlpha=globalAlpha;
			alteredNotes[i].paintNames();
		}
		showCount(Math.floor(globalAlpha*100)+1);
		if((ctx.globalAlpha=globalAlpha+=0.01)>maxGlobalAlpha){
			running=false;
		}
	}
	animate.callback=show;
	animate();
}
function showDiatonic(){
	if(timer){
		window.clearTimeout(timer);
	}
	if(showDiatonic.phase==0){
	stopOrClear();
	}			
	showCount(showDiatonic.phase);
	switch(showDiatonic.phase){
	case 0:
		for(let i=0; i<naturalNotes.length; i++){
			naturalNotes[i].createShape();
			naturalNotes[i].paintBackground();
		}
		break;
	case 1:
		for(let i=0; i<naturalNotes.length; i++){
			naturalNotes[i].createShape();
			naturalNotes[i].paintBorder();
		}
		break;
	case 2:
		for(let i=0; i<naturalNotes.length; i++){
			naturalNotes[i].paintNames();
		}
		break;
	default:
		showDiatonic.phase=0;
		keepOn(showChromatics, 1000);
		return;
	}
	showCount(++showDiatonic.phase);
	keepOn(showDiatonics, 1000);
}
showDiatonic.phase=0;
function showChromatics(){ //also for Fifths
	if(timer){
		window.clearTimeout(timer);
	}
		if(showChromatics.phase==0){
			stopOrClear();
		}			
		showCount(showChromatics.phase);
		switch(showChromatics.phase){
		case 0:
			for(let i=0; i<chromaticNotes.length; i++){
				chromaticNotes[i].createShape();
				chromaticNotes[i].paintBackground();
			}
			break;
		case 1:
			for(let i=0; i<chromaticNotes.length; i++){
				chromaticNotes[i].createShape();
				chromaticNotes[i].paintBorder();
			}
			break;
		case 2:
			for(let i=0; i<chromaticNotes.length; i++){
				chromaticNotes[i].paintNames();
			}
			break;
		default:
			showChromatics.phase=0;
			//keepOn(showAltered, 1000);
			showOrHideCenteringMark();
			return;
		}	
	++showChromatics.phase;
	keepOn(showChromatics, 1000);
}
showChromatics.phase=0;
function showAlterationSeries(){
	for(let i=1; i<sharpSeriesNotes.length; i++){
		sharpSeriesNotes[i]=new Note(sharpSeriesNames[i], pointsSharpSeries[i]);
		sharpSeriesNotes[i].createShape();
		sharpSeriesNotes[i].paintBackground();
		sharpSeriesNotes[i].paintBorder();
		sharpSeriesNotes[i].paintNames();
	}
	for(let i=0; i<flatSeriesNotes.length; i++){
		flatSeriesNotes[i]=new Note(flatSeriesNames[i], pointsFlatSeries[i]);
		flatSeriesNotes[i].createShape();
		flatSeriesNotes[i].paintBackground();
		flatSeriesNotes[i].paintBorder();
		flatSeriesNotes[i].paintNames();
	}
}
function showAltered(){
	if(timer){
		window.clearTimeout(timer);
	}
		if(showAltered.phase==0){
			stopOrClear();
			for(let i=0; i<alteredNotes.length; i++){
				alteredNotes[i].locate(pointsAltered[i]);
			}
		}
		switch(showAltered.phase){
		case 0:
			for(let i=0; i<alteredNotes.length; i++){
				alteredNotes[i].clear();
				alteredNotes[i].createShape();
				alteredNotes[i].paintBackground();
			}
			break;
		case 1:
			for(let i=0; i<alteredNotes.length; i++){
				alteredNotes[i].clear();
				alteredNotes[i].createShape();
				alteredNotes[i].paintBorder();
			}
			break;
		case 2:
			for(let i=0; i<flatNotes.length; i++){
				flatNotes[i].locate(pointsAltered[i]);
			}
			for(let i=0; i<flatNotes.length; i++){
				alteredNotes[i].clear();
				flatNotes[i].paintNames();
			}
			break;
		case 3:
			for(let i=0; i<sharpNotes.length; i++){
				sharpNotes[i].locate(pointsAltered[i]);
			}
			for(let i=0; i<sharpNotes.length; i++){
				sharpNotes[i].clear();
				sharpNotes[i].paintNames();
			}
			break;
		default:
			showAltered.phase=0;
			keepOn(showLightningSpot, 1000);
			return;
		}
	++showAltered.phase;
	keepOn(showAltered, 1000);
}
showAltered.phase=0;
function showLightningSpot(){
	stopOrClear();
	let note=new Note(['foo'], pointsDiatonic[0]);
	note.createShape();
	ctx.fillStyle='yellow';
	ctx.fill();
	//keepOn(showDiatonicMask, 1000);
}
function showDiatonicMask(){
	stopOrClear();
	ctx.fillStyle='#3b2c1d';
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, 230, 0, 2*Math.PI, true);
	ctx.fill();
	ctx.fillStyle='#b8e4fa';
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, 130, 0, 2*Math.PI, true);
	ctx.fill();
	ctx.fillStyle='#b8e4fa';
	for(let i=0; i<pointsDiatonic.length; i++){
		ctx.beginPath();
		ctx.arc(pointsDiatonic[i].x, pointsDiatonic[i].y, maskRadius, 0, 2*Math.PI, true);
		ctx.fill();
	}
	keepOn(showDiatonicSectors.showTones, 1000);
}
function showDiatonicSectors(){
	let x=circle.x, y=circle.y;
	let sectors=new Array(7), steps=new Array(5), halfSteps=new Array(2);
	ctx.lineWidth=2; ctx.lineWidth=3; ctx.strokeStyle='#3b2c1d';
	sectors[0]=new Path2D;
	sectors[1]=new Path2D;
	sectors[2]=new Path2D;
	sectors[3]=new Path2D;
	sectors[4]=new Path2D;
	sectors[5]=new Path2D;
	sectors[6]=new Path2D;
	for(let i=0; i<sectors.length; i++){
		sectors[i].moveTo(x, y);
	}
	sectors[0].arc(x, y, circle.radius, anglesBy12ths[0], anglesBy12ths[2], false);
	sectors[1].arc(x, y, circle.radius, anglesBy12ths[2], anglesBy12ths[4], false);
	sectors[2].arc(x, y, circle.radius, anglesBy12ths[4], anglesBy12ths[5], false);
	sectors[3].arc(x, y, circle.radius, anglesBy12ths[5], anglesBy12ths[7], false);
	sectors[4].arc(x, y, circle.radius, anglesBy12ths[7], anglesBy12ths[9], false);
	sectors[5].arc(x, y, circle.radius, anglesBy12ths[9], anglesBy12ths[11], false);
	sectors[6].arc(x, y, circle.radius, anglesBy12ths[11], anglesBy12ths[0], false);
	for(let i=0; i<sectors.length; i++){
		sectors[i].closePath();
	}
	steps=[sectors[0], sectors[1], sectors[3], sectors[4], sectors[5]];
	halfSteps=[sectors[2], sectors[6]];
	let p=showDiatonicSectors.properties;
	p.alphaDelta=0.008; p.steps=steps; p.halfSteps=halfSteps;
}
showDiatonicSectors.clear=function(){
	ctx.clearRect(circle.x-circle.radius-3, circle.y-circle.radius-3, circle.radius*2+6, circle.radius*2+6);
}
showDiatonicSectors.properties={};
showDiatonicSectors.running=false;
showDiatonicSectors.properties;
showDiatonicSectors.showTones=function(){
	if(!raf){
		stopOrClear();
		showDiatonicSectors();
		showDiatonicSectors.running=true;
		ctx.globalAlpha=0;
	}
	let p=showDiatonicSectors.properties;
	ctx.fillStyle='#ff0000';
	let tempAlpha;
	function show(){
		if(showDiatonicSectors.running=false){
			stopOrClear();
			return;
		}
		tempAlpha=ctx.globalAlpha+p.alphaDelta;
		if(tempAlpha>1){
			ctx.globalAlpha=1;
		}else{
			ctx.globalAlpha=ctx.globalAlpha+p.alphaDelta;
		}
		showDiatonicSectors.clear();
		for(let i=0; i<p.steps.length;i++){
			ctx.fill(p.steps[i]);
			ctx.stroke(p.steps[i]);
		}
		showCount(Math.floor(ctx.globalAlpha*100));
		if(ctx.globalAlpha==1){
			showDiatonicSectors.running=false;
			showDiatonicSectors.properties={};
			stopOrClear();
			keepOn(showDiatonicSectors.showSemiTones, 1000);
		}
	}
	animate.callback=show;
	animate();
}
showDiatonicSectors.showSemiTones=function(){
	if(!raf){
		showDiatonicSectors();
		showDiatonicSectors.running=true;
		ctx.globalAlpha=0;
	}
	let p=showDiatonicSectors.properties;
	ctx.fillStyle='green';
	let tempAlpha;
	function show(){
		if(showDiatonicSectors.running=false){
			stopOrClear();
			return;
		}
		tempAlpha=ctx.globalAlpha+p.alphaDelta;
		if(tempAlpha>1){
			ctx.globalAlpha=1;
		}else{
			ctx.globalAlpha=ctx.globalAlpha+p.alphaDelta;
		}
		showDiatonicSectors.clear();
		for(let i=0; i<p.halfSteps.length;i++){
			ctx.fill(p.halfSteps[i]);
			ctx.stroke(p.halfSteps[i]);
		}
		showCount(Math.floor(ctx.globalAlpha*100));
		if(ctx.globalAlpha==1){
			showDiatonicSectors.running=false;
			showDiatonicSectors.properties={};
			stopOrClear();
			keepOn(function(){
				if(timer){
					clearTimeout(timer);
				}
				stopOrClear()
			}, 1000);
		}
	}
	animate.callback=show;
	animate();
}
function drawLine(){
	console.log('? '+guide.x+' '+guide.y+' '+guide.length);
	ctx.beginPath();
	ctx.moveTo(guide.x, guide.y);
	ctx.lineTo(guide.x+guide.length, guide.y);
	ctx.stroke();
}
function drawCircle(){
	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2, true);
	ctx.stroke();
}
function showOrHideCenteringMark(){
	if(showOrHideCenteringMark.isVisible){
		ctx.clearRect(0,0, canvas.width, canvas.height);
		showOrHideCenteringMark.isVisible=!showOrHideCenteringMark.isVisible;
		return;
	}
	ctx.lineWidth=1;
	ctx.strokeStyle='black';
	ctx.beginPath(),
	ctx.moveTo(canvas.width/2-50, canvas.height/2+0.5);
	ctx.lineTo(canvas.width/2-10, canvas.height/2+0.5);
	ctx.moveTo(canvas.width/2+10, canvas.height/2+0.5);
	ctx.lineTo(canvas.width/2+50, canvas.height/2+0.5);
	ctx.moveTo(canvas.width/2+0.5, canvas.height/2-50);
	ctx.lineTo(canvas.width/2+0.5, canvas.height/2-10);
	ctx.moveTo(canvas.width/2+0.5, canvas.height/2+10);
	ctx.lineTo(canvas.width/2+0.5, canvas.height/2+50);
	ctx.stroke();
	showOrHideCenteringMark.isVisible=!showOrHideCenteringMark.isVisible;
}
showOrHideCenteringMark.isVisible=false;