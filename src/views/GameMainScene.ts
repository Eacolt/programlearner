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

    private upperCode!:PIXI.Sprite;
    private downerCode!:PIXI.Sprite;
    private leftpadding:number = 30;
    private downerCodePaddingUp:number = 500;
    private startcoding!:PIXI.Sprite;
    private bottomChoosedBtn_arr!:PIXI.Sprite[];//下部按钮4个;
    
    constructor(){
        super();
        this.on('added',this.addedToStage,this);
        this.on('removed',this.removedFromStage,this);
    }
    private publicClickHandler(){

    }
    private add_bottomChooseBtn(){
        let arr = ['codebtn_up','codebtn_down','codebtn_left','codebtn_right']
        for(let i=0;i<4;i++){
            let btn = new PIXI.Sprite(Labs.getTexture(arr[i]));
            this.addChild(btn)
        }

    }
    private addedToStage(){
        this.gamebg = new PIXI.Sprite(Labs.getTexture('bg'));
        this.clearroute_btn = new ButtonUI('clearroute_btn')
        this.scrollUI = new ScrollUI({direction:'vertical'});
        // let mybox = new PIXI.Graphics();
        // mybox.beginFill(0xff0000).drawRect(0,0,200,10).endFill();
        
        this.upperCode = new PIXI.Sprite(Labs.getTexture('codeup'));
        this.downerCode = new PIXI.Sprite(Labs.getTexture('codedown'));
        this.startcoding = new PIXI.Sprite(Labs.getTexture('startcoding'))
        this.upperCode.x = this.leftpadding;
        this.downerCode.x = this.leftpadding;
        this.downerCode.y = this.downerCodePaddingUp;

        this.startcoding.y = this.upperCode.y+420;
        this.startcoding.x = this.leftpadding+100;

     
       this.scrollUI.scrollHeight = 720;
       this.scrollUI.contentHeight = 1300;
       this.scrollUI.scrollWidth= 1920/2+50;
       this.scrollUI.contentWidth = 1920/2+50;


        this.gamebg.interactive = true;
        this.addChild(this.gamebg);
        this.scrollUI.y = 125;
        this.scrollUI.x = 0;

     


        this.addChild(this.scrollUI);
  

       // this.scrollUI.updateAll();
       
     //   this.gamebg.on('pointerdown',this.gamebg_downHandler,this);
  

     //   mybox2.y = this.scrollUI.scrollContent.height+240;//mybox2.height;

        console.log(this.scrollUI.scrollContent.height,'高度')
      //  this.scrollUI.addContent(mybox);
       // this.scrollUI.addContent(mybox2);
        this.scrollUI.addContent(this.upperCode);
        this.scrollUI.addContent(this.downerCode);

        this.scrollUI.addContent(this.startcoding)





    //     setTimeout(()=>{
      
    //    // this.scrollUI.contentHeight=3500;
    //    mybox2.y = this.scrollUI.scrollContent.height+240;//mybox2.height;
    //    this.scrollUI.contentHeight = 1200;
    //        this.scrollUI.updateAll();


    //        setTimeout(()=>{
    //         this.scrollUI.contentHeight = 400;
              
    //            },4000)

       
    //     },2000)

   

 
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