
/**
 * 
 *    let ham = new PIXIHammer({
            wrapper:g
        });
        ham.touchedItems.push({item:ball});
        ham.swipeToLeft = function(){
            console.log(8888)
        }
        ham.start();
        ham.inspectObj();
 */
class Hammer{
    private wrapperCta:any;
    private mousePosX:number = 0;
    private mousePosY:number = 0;
    private timeStamp:any;
    private timeStamp_touched:any;//点击某个item

    private touchedPos:any = {x:0,y:0}
    public  touchedItems:any[] = [];//{item:graphic,container , handler:fn}
    private currentTouchedIndex:number = 0;

    public swipeToLeft:any;
    public swipeToRight:any;
    public swipeToTop:any;
    public swipeToDown:any;
    public lock = false;
    // private _isStart:boolean = false;
    // private _isInspect:boolean = 


    constructor(_option:any){
        this.wrapperCta = _option.wrapper;

    }
    public detachEvents(){
        this.wrapperCta.removeAllListeners();
    }

    public destroyed(){
        this.touchedItems.length = 0;
        this.wrapperCta.removeAllListeners();
        delete this.timeStamp;
        delete this.timeStamp_touched;
        delete this.touchedItems;
        delete this.currentTouchedIndex;

    }
    public start(){
        if(!this.wrapperCta)return;
        this.wrapperCta.interactive = true;
        this.wrapperCta.on('pointerdown',this.pointerdown_handler,this);
        this.wrapperCta.on('pointerup',this.pointerup_handler,this);
        this.wrapperCta.on('pointerupoutside',this.pointerup_handler,this);

    }
    public inspectObj(){
        this.wrapperCta.on('pointerdown',this.inspectObjDown_handler,this);
        this.wrapperCta.on('pointerup',this.inspectObjUp_handler,this);
    }
    private inspectObjDown_handler(event:any){
        if(this.lock)return;
        this.touchedPos.x = event.data.global.x;
        this.touchedPos.y = event.data.global.y;
        this.timeStamp_touched = new Date().getTime();
       
    }
    private inspectObjUp_handler(event:any){
        if(this.lock)return;
        let distX =   event.data.global.x - this.touchedPos.x
        let distY =   event.data.global.y-  this.touchedPos.y ;
        let vectorDist =Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));//偏移向量
        this.timeStamp_touched = new Date().getTime()- this.timeStamp_touched;
        if(this.timeStamp_touched<300 && vectorDist<5){
            console.log('this touchedItems',this.touchedItems)
            if(this.touchedItems && this.touchedItems.length>0){
                for(let i =0;i<this.touchedItems.length;i++){
                    if( this.touchedItems[i].item.containsPoint(event.data.global)){
                       this.currentTouchedIndex = i;
                       if(this.touchedItems[i].handler){
                        this.touchedItems[i].handler();
                       }
        
                    }
                
                }
            }
   
        }
    }
    private pointerdown_handler(event:any){
        if(this.lock)return;
        this.timeStamp = new Date().getTime();
        this.mousePosX = event.data.global.x;
    }
    private pointerup_handler(event:any){
        if(this.lock)return;
        this.timeStamp = new Date().getTime()-this.timeStamp;
        let dist = event.data.global.x - this.mousePosX;
        if(this.timeStamp<500 &&  dist <-10){
          //  console.log('turn to left');
            if(this.swipeToLeft){
                this.swipeToLeft();
            }

        }
        if(this.timeStamp<500 &&  dist >=10){
           // console.log('turn to right');
            if(this.swipeToRight){
                this.swipeToRight();
            }

        }
    }
}
export default Hammer;