import * as PIXI from 'pixi.js'
import Labs from '@/labs/Labs';
import Rats from '@/pixicomponent/Rats.ts'
import ScrollUI from '@/labs/ScrollUI.ts'

export default class GameMainScene extends PIXI.Container{
    private gameTicker:any;
    private rat!:Rats;
    constructor(){
        super();
        this.on('added',this.addedToStage,this);
        this.on('removed',this.removedFromStage,this);
    }
    private addedToStage(){
        let scrollUI = new ScrollUI({direction:'all'});
        let mybox = new PIXI.Graphics();
        mybox.beginFill(0xff0000).drawRect(0,0,200,10).endFill();
        let mybox2 = new PIXI.Graphics();
        mybox2.beginFill(0x00ff00).drawRect(0,0,200,10).endFill();





       scrollUI.scrollHeight = 300;
       scrollUI.contentHeight = 800;
       scrollUI.scrollWidth= 300;
       scrollUI.contentWidth = 600;







        this.addChild(scrollUI);
  

        mybox2.y = scrollUI.scrollContent.height+240;//mybox2.height;

        console.log(scrollUI.scrollContent.height,'高度')
        scrollUI.addContent(mybox);
        scrollUI.addContent(mybox2);



        setTimeout(()=>{
          //  scrollUI.scrollTop = -100;
            // mybox2.y = scrollUI.scrollContent.height+440;//mybox2.height;
            // mybox2.x  = scrollUI.scrollContent.width+400;
            // scrollUI.updateAll();

            // setTimeout(()=>{
            //     mybox2.y = scrollUI.scrollContent.height-440;//mybox2.height;
            //     mybox2.x  = scrollUI.scrollContent.width-400;
            //     scrollUI.updateAll();
            // },2000)
        },2000)

 
  
  
        scrollUI.updateAll();
    }

    
    private removedFromStage(){

    }
}