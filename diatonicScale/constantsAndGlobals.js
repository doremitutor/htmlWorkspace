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
let anglesBy7ths=new Array(7);
let anglesBy12ths=new Array(12);
let pointsByAngle7ths=new Array(7);
let pointsChromatic=new Array(12);
let pointsDiatonic=new Array(7);
let pointsAltered=new Array(5);
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
let wrapStepsFactor=Math.floor(8);
let diatonizingSteps=200;