onload=setUp;
function setUp(){
	setUpCommonalities('Sound Waves');
    sinusoidY=canvas.height/2;
    wavesCenter={'x':canvas.width+canvasPaddingRight, 'y':sinusoidY};
    sinusoidFullWidth=canvas.width-canvasPaddingLeft-canvasPaddingRight;
    wavesSeparation=(sinusoidFullWidth)/(waves.length-1);
    angleRadStep=8*Math.PI/sinusoidFullWidth;
	createHTML();
    createWaves();
    sound();
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
		if(go.raf%96==0){
            now=Date.now();
            $cl(now-before);
            before=now;
		}
        const loops=10;
        if(go.raf>=1+(96*loops)){
            cancelRAF(go);
        }		
    }
    go.frameRate=31;
    go.callback=go;
    animate(go);
    let before=Date.now(), now;
}