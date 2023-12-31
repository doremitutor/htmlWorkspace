const FUNCTION=(function(){
	const instance={};
	//instance.showNotesInLine=showNotesInLine;
	/* instance.rotateLastThreeAndWindThemAll=rotateLastThreeAndWindThemAll;
	instance.windNotes=windNotes;
	instance.moveNotes=moveNotes;
	instance.makeThemDiatonic=makeThemDiatonic;
	instance.showIntermediate=showIntermediate; */
	/* instance.=;
	instance.=;
	instance.=; */
	return instance;
})();
function showNotesInLine(){
	let point;
	for(let i=0; i<naturalNotes.length; i++){
	point=pointsInLine[i];
	naturalNotes[i].showUp(point, true);
	}
	//keepOn(rotateLastThreeAndWindThemAll, 1000);
}
function rotateLastThreeAndWindThemAll(){
	let steps=[70, 100, 130];//140, 200, 260
	let origin=[pointsInLine[4], pointsInLine[5], pointsInLine[6]];
	let ending=[pointsByAngle7ths[1], pointsByAngle7ths[2],pointsByAngle7ths[3]];
	let chord=new Array(3), middlePoint=new Array(3), chordAngle=new Array(3), bisectAngle=new Array(3),//[100, 300, 550]
		 radiusSegment=new Array(3), rotCenter=new Array(3), originAngle=new Array(3),
		 endingAngle=new Array(3), angleStep=new Array(3), running=[true, true, true], note, point, newX, newY;
	//$cl('origin', origin);
	//$cl('ending', ending);
	for(let i=0; i<chord.length; i++){
		chord[i]=Math.sqrt(Math.pow(ending[i].x-origin[i].x, 2)+Math.pow(ending[i].y-origin[i].y, 2));
		//$cl(`chord ${i}`, chord);
	}
	for(let i=0; i<middlePoint.length; i++){
		middlePoint[i]=new Point((origin[i].x+ending[i].x)/2, (origin[i].y+ending[i].y)/2);
	}
	//$cl('middlePoint', middlePoint);
	for(let i=0; i<chordAngle.length; i++){
		a=chordAngle[i]=(Math.asin((origin[i].y-ending[i].y)/chord[i]));
		if(a<0){
			chordAngle[i]=2*Math.PI+chordAngle[i];
		}
		//$cl(`chordAngle ${i}`, chordAngle[i]*180/Math.PI);
	}
	for(let i=0; i<bisectAngle.length; i++){
		bisectAngle[i]=chordAngle[i]+Math.PI/2;
		if(bisectAngle[i]>Math.PI*2){
			bisectAngle[i]-=Math.PI*2;
		}
		//$cl(`bisectAngle ${i}`, bisectAngle[i]*180/Math.PI);
	}
	for(let i=0; i<radiusSegment.length; i++){
		radiusSegment[i]=Math.sqrt(Math.pow(chord[i], 2)-Math.pow(chord[i]/2, 2));
		//$cl(`radiusSegment ${i}`, radiusSegment[i] );
	}
	for(let i=0; i<rotCenter.length; i++){
		rotCenter[i]=new Point(middlePoint[i].x-radiusSegment[i]*Math.cos(bisectAngle[i]),
							   middlePoint[i].y-radiusSegment[i]*Math.sin(bisectAngle[i]));
		//$cl(`rotCenter ${i}`, rotCenter[i]);
	}
	for(let i=0; i<originAngle.length;i++){
		originAngle[i]=Math.atan((origin[i].y-rotCenter[i].y)/(origin[i].x-rotCenter[i].x));
		//$cl(`originAngle ${i}`, originAngle[i]*180/Math.PI);
	}
	for(let i=0; i<endingAngle.length;i++){
		endingAngle[i]=Math.atan((ending[i].y-rotCenter[i].y)/(ending[i].x-rotCenter[i].x));
		if(endingAngle[i]<0){
			endingAngle[i]=-endingAngle[i];
		}
		//$cl('endingAngle', endingAngle[i]*180/Math.PI);
	}
	for(let i=0; i<angleStep.length; i++){
		angleStep[i]=(endingAngle[i]-originAngle[i])/steps[i];
		//$cl('angleStep', angleStep[i]*180/Math.PI);
	}
	let notes=[4, 5, 6];
	function moveNote0(){
		let round=0;
		if(!running[round]){
			return;
		}
		angle=originAngle[round]+angleStep[round];
		if(angle>=endingAngle[round]){
			angle=endingAngle[round];
			running[round]=false;
		}
		originAngle[round]=angle;
		newX=rotCenter[round].x+chord[round]*Math.cos(angle);
		newY=rotCenter[round].y+chord[round]*Math.sin(angle);
		point=new Point(newX, newY);
		note=naturalNotes[notes[round]];
		note.move(point);
		raf=window.requestAnimationFrame(moveNote0);
	}
	function moveNote1(){
		let round=1;
		if(!running[round]){
			return;
		}
		angle=originAngle[round]+angleStep[round];
		if(angle>=endingAngle[round]){
			angle=endingAngle[round];
			running[round]=false;
		}
		originAngle[round]=angle;
		newX=rotCenter[round].x+chord[round]*Math.cos(angle);
		newY=rotCenter[round].y+chord[round]*Math.sin(angle);
		point=new Point(newX, newY);
		note=naturalNotes[notes[round]];
		note.move(point);
		raf=window.requestAnimationFrame(moveNote1);
	}
	function moveNote2(){
		let round=2;
		if(!running[round]){
			windNotes();
			return;
		}
		angle=originAngle[round]+angleStep[round];
		if(angle>=endingAngle[round]){
			angle=endingAngle[round];
			running[round]=false;
		}
		originAngle[round]=angle;
		newX=rotCenter[round].x+chord[round]*Math.cos(angle);
		newY=rotCenter[round].y+chord[round]*Math.sin(angle);
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
	/* if(timer){
		window.clearTimeout(timer);
	} */
	let angle, totalStepCount, points=new Array(7), step=0, phase=0,
		stepsPerPhase=50, numPhases=3, running=true;
	linearAdvance=lineSegment/stepsPerPhase;
	angularAdvance=circle7th/stepsPerPhase;
	function moveNotes(){
		if(!running){
			//$cl(running, ' - ', timer )
			//keepOn(makeThemDiatonic, 1000);
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
				break;
		}
		for(let i=0; i<points.length; i++){//
			naturalNotes[i].move(points[i]);
		}
		//showCount(totalStepCount);
		if(step++>=stepsPerPhase){
			step=0;
			if(++phase>=numPhases){
			running=false;
			}
		}
		if(typeof moveNotes.frameRate!='number'||moveNotes.frameRate<1){
			animate(moveNotes);
		}
		//$cl(moveNotes.raf, moveNotes.timer);
		if(moveNotes.raf>=100){
			//cancelRAF(moveNotes);
		}		
	}
	//$cl('timer ', timer);
	moveNotes.frameRate=false;
	moveNotes.callback=moveNotes;
	animate(moveNotes);
}
function makeThemDiatonic(){
	/* if(timer){
		//alert(timer);
		window.clearTimeout(timer);
	} */
	let running=true, angularAdvance=new Array(7), step=0, diatonizingSteps=200, angle= new Array(7);
	angularAdvance[1]=(anglesBy12ths[2]-anglesBy7ths[1])/diatonizingSteps;
	angularAdvance[2]=(anglesBy12ths[4]-anglesBy7ths[2])/diatonizingSteps;
	angularAdvance[3]=(anglesBy12ths[5]-anglesBy7ths[3])/diatonizingSteps;
	angularAdvance[4]=(anglesBy12ths[7]-anglesBy7ths[4])/diatonizingSteps;
	angularAdvance[5]=(anglesBy12ths[9]-anglesBy7ths[5])/diatonizingSteps;
	angularAdvance[6]=(anglesBy12ths[11]-anglesBy7ths[6])/diatonizingSteps;
	function rotate(){
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
		if(++step>=diatonizingSteps){
			running=false;
			cancelRAF(rotate);
		}
		showCount(step);
		if(running&&(typeof rotate.frameRate!='number'||rotate.frameRate<1)){
			animate(rotate);
		}			
	};
	rotate.frameRate=0;
	rotate.callback=rotate;
	animate(rotate);
}
function showIntermediate(){
	/* if(timer){
		window.clearTimeout(timer);
	} */
	let running=true, opacity=0, maxOpacity=100;
	function show(){
		if(!running){
			//stopOrClear();
			//keepOn(showAlteredNames, 1000);
			return;
		}
		ctx.globalAlpha=opacity/100;
		for(let i=0; i<alteredNotes.length; i++){
			alteredNotes[i].showUp(pointsAltered[i], false);
		}
		if(opacity++>maxOpacity){
			running=false;
			cancelRAF(show);
			return;
		}
		showCount(ctx.globalAlpha);//opacity
		if((typeof show.frameRate!='number'||show.frameRate<1)&&running==true){
			animate(show);
		}
		
	};
	show.frameRate=0;
	show.callback=show;
	animate(show);
}
function showAlteredNames(){
	let running=true, opacity=0, finalOpacity=1.0;
	for(let i=0; i<alteredNotes.length; i++){
		alteredNotes[i].locate(pointsAltered[i]);
	}
	function show(){
		if(!running){
			//stopOrClear();
			ctx.globalAlpha=1.0;
			//keepOn(showDiatonic, 1000);
			return;
		}
		ctx.globalAlpha=opacity;
		for(let i=0; i<alteredNotes.length; i++){
			alteredNotes[i].clear();
			ctx.globalAlpha=1.0;
			alteredNotes[i].createShape();
			alteredNotes[i].paintBackground();
			alteredNotes[i].paintBorder();
			ctx.globalAlpha=opacity;
			alteredNotes[i].paintNames();
		}
		showCount(Math.floor(opacity*100)+1);
		if((ctx.globalAlpha=opacity+=0.01)>finalOpacity){
			running=false;
		}
		animate(show);
	}
	show.frameRate=0;
	show.callback=show;
	animate(show);
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
	keepOn(showDiatonic, 1000);
}
showDiatonic.phase=0;
function showChromatics(){ //also for Fifths
		if(showChromatics.phase==0){
			//stopOrClear();
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
			//showOrHideCenteringMark();
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
	let note=new Note(['foo'], pointsDiatonic[0]);
	note.createShape();
	ctx.fillStyle='yellow';
	ctx.fill();
}
function showDiatonicMask(){
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
	//keepOn(showDiatonicSectors.showTones, 1000);
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
	if(true){
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
	//console.log('? '+guide.x+' '+guide.y+' '+guide.length);
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
		ctx.clearRect(canvas.width/2-50,canvas.height/2-50, 100, 100);
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