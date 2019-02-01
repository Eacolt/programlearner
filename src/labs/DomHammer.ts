class DomHammer{
    private domTarget:any;
    private mouseDownX:number = 0;
    private timeStamp:number = 0;
    private mouseDownY:number = 0;
    public swipeToLeft:any;
    public swipeToRight:any;
    public swipeToDown:any;
    public swipeToUp:any;
    constructor(_option:any){
        this.domTarget = _option.target;

    }
    public destroyed(){
        this.domTarget.onmousedown = null;
        this.domTarget.onmouseup = null;
        this.timeStamp = 0;
        delete this.mouseDownX;
        delete this.domTarget;
        delete this.timeStamp;
        delete this.swipeToDown;
        delete this.swipeToLeft;
        delete this.swipeToRight;
        delete this.swipeToUp;
    }
    public startSwipe(option:any=null){
        if(!this.domTarget)return;
        this.domTarget.onmousedown = this.mousedown_handler.bind(this);
        this.domTarget.onmouseup = this.mouseup_handler.bind(this);
    }


    private mousedown_handler(event:any){
        this.timeStamp = new Date().getTime();
        this.mouseDownX = event.screenX;
        this.mouseDownY = event.screenY;
        console.log('ev',event)
        console.log('是多少',event.screenX)
    }
    private mouseup_handler(event:any){
        this.timeStamp = new Date().getTime() -  this.timeStamp ;

        console.log('end',event.screenX,'__','start:',this.mouseDownX);
        if(this.timeStamp>300)return;
        if(event.screenX-this.mouseDownX>10){

            if(this.swipeToRight){
                this.swipeToRight();
            }
            console.log('向右')
        }
        
        
        if(event.screenX-this.mouseDownX<-10){
            console.log('向左')
            if(this.swipeToLeft){
                this.swipeToLeft();
            }
        }

        if(event.screenY-this.mouseDownY>0){
            console.log('向下')
            if(this.swipeToDown){
                this.swipeToDown()
            }
        }else{
            console.log('向上')
            if(this.swipeToUp){
                this.swipeToUp();
            }
        }

        this.timeStamp = 0;

    }
}
export default DomHammer;