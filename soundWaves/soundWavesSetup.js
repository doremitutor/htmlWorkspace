const canvasPaddingLeft=50;
const canvasPaddingRight=100;
const angleRadStarting=165*Math.PI/180;
const angleRadEnding=195*Math.PI/180;
const waves=new Array(97);
const anglesDeg=[15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 0];
const anglesRad=[];
for(i=0; i<anglesDeg.length; i++){
    anglesRad[i]=getRadFromDeg(anglesDeg[i]);
}
const dephaseFactor=-5;
const anglesSinusoid=anglesRad.slice(-dephaseFactor).concat(anglesRad.slice(0, -dephaseFactor));
const radiusOffsetFactor=[];
for(let i=0; i<anglesDeg.length; i++){
    radiusOffsetFactor[i]=Math.sin(anglesRad[i]);
}
const sinusoidPeak=50;
let wavesCenter, wavesSeparation,
    angleRadLeadWave, angleRadLeftmostWave, angleRadStep,
    sinusoidY, sinusoidFullWidth, sinusoidLeftmostX, sinusoidRightmostX,
    sinusoidTempWidth, sinusoidRightmostY, sinusoidTempX, sinusoidTempY;
function Wave(opacity, radius, width){
    this.opacity=opacity;  
    this.defaultRadius=radius;
    this.oscillatingRadius;
    this.drawingRadius;
    this.width=width;  
};
Wave.prototype.getDefaultRadius=function(){
    return this.defaultRadius;    
};
Wave.prototype.setOscillatingRadius=function(oscillatingRadius){
    this.oscillatingRadius=oscillatingRadius;
};
Wave.prototype.getOscillatingRadius=function(){
    return this.oscillatingRadius;
};
Wave.prototype.setRadius=function(radius){
    this.defaultRadius=radius;
}
Wave.prototype.getOpacity=function(){
    return this.opacity;    
}
Wave.prototype.setOpacity=function(opacity){
    this.opacity=opacity;
}
Wave.prototype.setWidth=function(width){
    this.width=width;
}
Wave.prototype.draw=function(oscillatingRadius, fill=false){
    this.drawingRadius=this.oscillatingRadius?this.oscillatingRadius:this.defaultRadius;
    ctx.beginPath();
    ctx.lineWidth=this.width;
    ctx.arc(wavesCenter.x, wavesCenter.y, this.drawingRadius, angleRadStarting, angleRadEnding, false);
    if(fill){
        ctx.save();
        ctx.lineWidth=2;
        ctx.lineTo(wavesCenter.x, wavesCenter.y);
        ctx.closePath();
        ctx.strokeStyle='rgb(70, 70, 70)';
        ctx.fillStyle='rgb(150, 150, 150)';
        ctx.fill();
        ctx.stroke();
        ctx.clearRect(canvas.width-65, wavesCenter.y-60, 65, 120);
        ctx.fillStyle='rgb(120, 120, 120)';
        ctx.fillRect(canvas.width-canvasPaddingRight+20, wavesCenter.y-74, 20, 148);
        ctx.strokeRect(canvas.width-canvasPaddingRight+20, wavesCenter.y-75, 20, 150);
        ctx.fillStyle='rgb(100, 100, 100)';
        ctx.fillRect(canvas.width-canvasPaddingRight+40, wavesCenter.y-40, 19, 80);
        ctx.strokeRect(canvas.width-canvasPaddingRight+40, wavesCenter.y-40, 19, 80);
        ctx.restore();
        return;
    }
    ctx.globalAlpha=this.getOpacity();
    ctx.stroke();
}
onload=setUp;
function setUp(){
	setUpCommonalities('Sound Waves');
    sinusoidY=canvas.height/2;
    wavesCenter={'x':canvas.width+canvasPaddingRight, 'y':sinusoidY};
    sinusoidFullWidth=canvas.width-canvasPaddingLeft-canvasPaddingRight;
    wavesSeparation=(sinusoidFullWidth)/(waves.length-1);
    angleRadStep=8*Math.PI/sinusoidFullWidth;
    createWaves();
	createButtons();
    sound();
};
function createButtons(){
    const button=$ce('button');
    button.textContent='stop';
    button.addEventListener('click', ()=>{alert('Wait!!');}, false);
    body.append(button);
};
function createWaves(){
    ctx.save();
    for(let i=0; i<waves.length; i++){
        waves[i]=new Wave(1-i*1/waves.length, canvasPaddingRight*2+i*wavesSeparation, 3);
        if(i==0){
            waves[i].draw(undefined, true);
        }else{
            waves[i].draw();
        }
    }
    ctx.restore();
};
function sound(){
    let animationStep=0;
    function go(){
        // create waves for each RAF
        for(let i=waves.length-1; i>=0; i--){
            if(i==0){
                const wave=waves[i];
                wave.setOscillatingRadius(wave.getDefaultRadius()+wavesSeparation*radiusOffsetFactor[animationStep]);
            }else{
                waves[i].setOscillatingRadius(waves[i-1].getOscillatingRadius()+wavesSeparation);          
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        // draw the waves
        for(let i=0; i<waves.length; i++){
            if(i==0){
                waves[i].draw('undefined', true);
            }else{
                waves[i].draw();
            }
            if(i==Math.ceil(waves.length/2)){
                wave=waves[i];
                ctx.save();
                ctx.strokeStyle='red';
                wave.setWidth(4);
                wave.setOpacity(1);
                wave.draw();
                ctx.restore();
                continue;
            };            
        }
        ctx.restore();
        ctx.save();
        ctx.lineWidth=2;
        ctx.strokeStyle='blue'; 
        sinusoidRightmostX=canvas.width-waves[0].getDefaultRadius()+canvasPaddingRight;
        angleRadLeadWave=anglesSinusoid[animationStep];
        for(let i=waves.length-1; i>=0; i--){
            if(waves[i].getOscillatingRadius()){
                sinusoidLeftmostX=canvas.width-waves[i].getDefaultRadius()+canvasPaddingRight;
                break;            
            }
        }
        sinusoidTempWidth=sinusoidRightmostX?Math.floor(sinusoidRightmostX-sinusoidLeftmostX):0;
        ctx.beginPath();       
        for (let i=sinusoidTempWidth; i>0; i--){
            if(i==sinusoidTempWidth){
                sinusoidRightmostY=sinusoidY-sinusoidPeak*Math.sin(angleRadLeadWave);
                ctx.moveTo(sinusoidRightmostX, sinusoidRightmostY);
                angleRadLeadWave=angleRadLeadWave-angleRadStep;
            }else{
                sinusoidTempX=sinusoidRightmostX-(sinusoidTempWidth-i);
                sinusoidTempY=sinusoidY-sinusoidPeak*Math.sin(angleRadLeadWave-(sinusoidTempWidth-i)*angleRadStep);
                ctx.lineTo(sinusoidTempX, sinusoidTempY);
            }
        }
        ctx.stroke();
        ctx.restore();
        if(++animationStep>=anglesDeg.length){
            animationStep=0;
        }
        if(typeof go.frameRate!='number'||go.frameRate<0.1){
			animate(go);
		}
		/* if(go.raf%96==0){
            now=Date.now();
            $cl(now-before);
            before=now;
		} */
        const loops=10;// 31 for 1 hertz, 0 or false for 2.5 hertz (aprox in both cases)
        if(go.raf>=1+(96*loops)){
            cancelRAF(go);
        }		
    }
    go.frameRate=0;
    go.callback=go;
    animate(go);
    let before=Date.now(), now;
}