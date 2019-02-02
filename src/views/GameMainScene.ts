import * as PIXI from 'pixi.js'
import Labs from '@/labs/Labs';
import Rats from '@/pixicomponent/Rats.ts'
import ScrollUI from '@/labs/ScrollUI.ts'
import ButtonUI from '@/labs/ButtonUI';

export default class GameMainScene extends PIXI.Container{
    private gameTicker:any;
    private gamebg!:PIXI.Sprite;
    private scrollUI!:ScrollUI
    private clearroute_btn!:ButtonUI;
    
    constructor(){
        super();
        this.on('added',this.addedToStage,this);
        this.on('removed',this.removedFromStage,this);
    }
    private publicClickHandler(){

    }
    private addedToStage(){
        this.gamebg = new PIXI.Sprite(Labs.getTexture('bg'));
        this.clearroute_btn = new ButtonUI('clearroute_btn')
        this.scrollUI = new ScrollUI({direction:'vertical'});
        let mybox = new PIXI.Graphics();
        mybox.beginFill(0xff0000).drawRect(0,0,200,10).endFill();
        let mybox2 = new PIXI.Graphics();
        mybox2.beginFill(0x00ff00).drawRect(0,0,200,10).endFill();


        let code = new PIXI.Sprite(Labs.getTexture('codeup'))


       this.scrollUI.scrollHeight = 900;
       this.scrollUI.contentHeight = 1900;
       this.scrollUI.scrollWidth= 1920/2+50;
       this.scrollUI.contentWidth = 1920/2+50;


        this.gamebg.interactive = true;
        this.addChild(this.gamebg);
      



        this.addChild(this.scrollUI);
       
     //   this.gamebg.on('pointerdown',this.gamebg_downHandler,this);
  

        mybox2.y = this.scrollUI.scrollContent.height+240;//mybox2.height;

        console.log(this.scrollUI.scrollContent.height,'高度')
        this.scrollUI.addContent(mybox);
        this.scrollUI.addContent(mybox2);
        this.scrollUI.addContent(code)



        setTimeout(()=>{
      
        //this.scrollUI.contentHeight=8500;
      
            this.scrollUI.updateAll();


            setTimeout(()=>{
      
                this.scrollUI.scrollTop -= 200;
              
                    this.scrollUI.updateAll();
        
               
                },4000)

       
        },2000)

   

 
        this.addChild(this.clearroute_btn);
        this.clearroute_btn.x = 400;
        this.clearroute_btn.buttonTapHandler = this.gamebg_downHandler.bind(this)
  
        this.scrollUI.updateAll();
    }
    private gamebg_downHandler(){
        console.log('funck')

        this.scrollUI.scrollTop+=20;
        this.publicClickHandler();
    }

    
    private removedFromStage(){

    }
}