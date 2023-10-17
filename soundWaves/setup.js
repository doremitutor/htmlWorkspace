onload=setUp;
function setUp(){
	setUpCommonalities('Sound Waves');
    sinusoidY=canvas.height/2;
    wavesCenter={'x':-canvasPaddingLeft, 'y':sinusoidY};
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
        waves[i]=new Wave(1-i*1/waves.length, canvasPaddingLeft*2+i*wavesSeparation, 3);
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
        /* ctx.lineWidth=1;
        ctx.strokeStyle='green'; */  
        sinusoidLeftmostX=waves[1].getDefaultRadius()-canvasPaddingLeft;
        angleRadLeadWave=anglesSinusoid[animationStep];
        for(let i=waves.length-1; i>=1; i--){
            if(waves[i].getOscillatingRadius()){
                sinusoidRightmostX=waves[i].getDefaultRadius()-canvasPaddingLeft;
                break;               
            }
        }
        sinusoidTempWidth=sinusoidRightmostX?Math.floor(sinusoidRightmostX-sinusoidLeftmostX):0;
        ctx.beginPath();       
        for (let i=1; i<sinusoidTempWidth; i++){
            if(i==1){
                sinusoidLeftmostY=sinusoidY-sinusoidPeak*Math.sin(angleRadLeadWave);
                ctx.moveTo(sinusoidLeftmostX, sinusoidLeftmostY);
                angleRadLeadWave=angleRadLeadWave-angleRadStep;
            }else{
                sinusoidTempX=sinusoidLeftmostX+i;
                sinusoidTempY=sinusoidY-sinusoidPeak*Math.sin(angleRadLeadWave-i*angleRadStep);
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
		if(go.raf>=97){
		    cancelRAF(go);
		}		
    }
    go.frameRate=30;
    go.callback=go;
    animate(go);
}