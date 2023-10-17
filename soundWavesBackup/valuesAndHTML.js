const canvasPaddingLeft=100;
const canvasPaddingRight=50;
const angleRadStarting=345*Math.PI/180;
const angleRadEnding=15*Math.PI/180;
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
    sinusoidTempWidth, sinusoidLeftmostY, sinusoidTempX, sinusoidTempY;
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
        ctx.clearRect(0, wavesCenter.y-60, 65, 120);
        ctx.fillStyle='rgb(120, 120, 120)';
        ctx.fillRect(canvasPaddingRight+1, wavesCenter.y-74, 19, 148);
        ctx.strokeRect(canvasPaddingRight, wavesCenter.y-75, 20, 150);
        ctx.fillStyle='rgb(100, 100, 100)';
        ctx.fillRect(canvasPaddingRight-20, wavesCenter.y-40, 19, 80);
        ctx.strokeRect(canvasPaddingRight-20, wavesCenter.y-40, 19, 80);
        ctx.restore();
        return;
    }
    ctx.globalAlpha=this.getOpacity();
    ctx.stroke();
}
function createHTML(){
    const button=$ce('button');
    button.textContent='stop';
    button.addEventListener('click', ()=>{alert('Wait!!');}, false);
    body.append(button);
};