import * as PIXI from 'pixi.js'
import Labs from '@/labs/Labs';

import ScrollUI from '@/labs/ScrollUI.ts'
import ButtonUI from '@/labs/ButtonUI';
import KeyBoard from '@/pixicomponent/KeyBoard';
import InputBar from '@/pixicomponent/InputBar'


export default class GameMainScene extends PIXI.Container {
    
    private gamebg!: PIXI.Sprite;
    private keyBoard!:KeyBoard;
    private keyInputBar!:InputBar;
    private scrollUI!: ScrollUI
    private upperCode!: PIXI.Sprite;
    private downerCode!: PIXI.Sprite;
    private scrollWheelArea!:PIXI.Graphics;
    private leftpadding: number = 110;
    private downerCodePaddingUp: number = 436;
    private startcoding!: PIXI.Sprite;
    private bottomChoosedBtn_arr!: PIXI.Sprite[];//下部按钮4个;
    private movedChoosedBtn_arr!: PIXI.Sprite[];
    private addedAction_arr!:PIXI.Sprite[];//所存放的命令代码块;
    private pickedUpActionBar!:PIXI.Sprite;//所选中的命令绿色块
    private actionUpper_arr:string[] = ['codebtn_up_over', 'codebtn_down_over', 'codebtn_left_over', 'codebtn_right_over'];
    private actionDown_arr:string[] = ['codebtn_up', 'codebtn_down', 'codebtn_left', 'codebtn_right'];

    private movingStep_arr =['up','up','left','left','down','down','down'];// _arr;
    private digitalText!: PIXI.Text;
    private _digitalLine: number = 12;
    private choosedBarIndex:number = 0;//所选中的指令索引;

    private firstActionPos:number = 418;
    private firstScrollHeight:number = 700;//初始化滑动高度：
    //flyUFO;
    private ufo!: PIXI.Sprite;
    private ufoBoxes_biArr!: any[];
    private ufoInitPos = {x:4,y:4}
    private ufoRoutes_arr!:any[];//存放路径中的UFO
    //buttons;
    private submitBtn!: ButtonUI;
    private againBtn!:ButtonUI;
    private runBtn!:ButtonUI;

    private clearroute_btn!: ButtonUI;
    //points;
    private distVerLine:number = 62;
    private bottomTouchOffset:any = {x:0,y:0};//底部按钮的点击坐标差

    constructor() {
        super();
        this.on('added', this.addedToStage, this);
        this.on('removed', this.removedFromStage, this);
    }
    
    //代码区域减去一行
    private codeMinus() {
        // this.scrollUI.contentHeight+=100;
        if (this._digitalLine <= 13) return;
        let digitalStr = '';
        this._digitalLine--
        for (let i = 1; i < this._digitalLine; i++) {
            digitalStr += i + '\n';


        }
        this.digitalText.text = digitalStr;

        this.downerCode.y -= this.distVerLine;
    
        if(this._digitalLine>12){
         
            if(this.addedAction_arr.length>0){
                    let pops:PIXI.Sprite = this.addedAction_arr.pop() as PIXI.Sprite;
                    pops.parent.removeChild(pops);
                   

                    if(this.addedAction_arr.length<=0){
                        this.startcoding.y = this.firstActionPos
                    }else{
                        this.startcoding.y = this.addedAction_arr[this.addedAction_arr.length-1].y+this.distVerLine;
                    }

            
                }
        }

      
        console.log('llll>>>>>',this.scrollUI.scrollContent.getBounds())
    }
//代码区域增加一行
    private codeAdded() {
      
        // this.scrollUI.contentHeight+=100;
        let digitalStr = '';
        this._digitalLine++;
        for (let i = 1; i < this._digitalLine; i++) {
            digitalStr += i + '\n';


        }
        this.digitalText.text = digitalStr;

        this.downerCode.y += this.distVerLine;
        if(this._digitalLine>13){
            //命令块拖曳程序
            let bar = new PIXI.Sprite(Labs.getTexture(this.actionDown_arr[this.choosedBarIndex]));
            bar.interactive = true;
         
            this.scrollUI.addContent(bar);
            this.addedAction_arr.push(bar);
            if(this.addedAction_arr.length>1){

                this.addedAction_arr[this.addedAction_arr.length-1].y = this.addedAction_arr[this.addedAction_arr.length-2].y+this.distVerLine;
                this.addedAction_arr[this.addedAction_arr.length-1].x = this.addedAction_arr[this.addedAction_arr.length-2].x;

                this.startcoding.y =   this.addedAction_arr[this.addedAction_arr.length-1].y+this.distVerLine;
            }else{
                bar.x = this.startcoding.x;
                bar.y = this.firstActionPos;
                this.startcoding.y+=this.distVerLine;
            }


            bar.on('pointerdown',this.actionBar_downHandler,this);
          
         
            bar.on('pointerup',this.actionBar_upHandler,this);
            bar.on('pointerupoutside',this.actionBar_upHandler,this);

        }
        console.log('this.ddd',this._digitalLine)



     //   console.log(this.scrollUI.scrollContent.get)
    }
    //命令模块按下时
    private actionBar_downHandler(event:any){
        event.currentTarget.on('pointermove',this.actionBar_moveHandler,this);
    };
    private actionBar_moveHandler(event:any){
       // event.currentTarget.x = event.data.global.x;
        //event.currentTarget.y = event.data.global.y;

    };
    private actionBar_upHandler(event:any){
        event.currentTarget.off('pointermove');

    };
    //  private get digitalLine(){}
    private add_overflowed_bottomBtns() {
        this.movedChoosedBtn_arr = [];
       
        for (let i = 0; i < 4; i++) {
            let btn = new PIXI.Sprite(Labs.getTexture(this.actionUpper_arr[i]));
            this.addChild(btn);
            this.movedChoosedBtn_arr.push(btn);
            this.movedChoosedBtn_arr[i].renderable = false;

        };

    }
    private add_bottomChooseBtn(_x: number = 0, _y: number = 0, _w = 500, _h = 100) {
        let initX = _x, initY = _y, distW = _w, distH = _h;
        this.bottomChoosedBtn_arr = [];
      
        for (let i = 0; i < 4; i++) {
            let btn = new PIXI.Sprite(Labs.getTexture(this.actionDown_arr[i]));
            this.addChild(btn);
            this.bottomChoosedBtn_arr.push(btn);
            // _x+=200;
            // if(i>2){
            //     _y += 100;
            //     _x = 0;
            // }
            // let distX = 300,distY = 200;

            if (i > 0 && i < 2) {
                initX += distW;
                //_y = 0;
            }
            if (i === 2) {
                initX = _x;
                initY += distH;
            } else if (i > 2 && i <= 4) {
                initX += distW;
            }



            this.bottomChoosedBtn_arr[i].x = initX;
            this.bottomChoosedBtn_arr[i].y = initY;

            // if(i==2){
            //     this.bottomChoosedBtn_arr[i].x =  0;
            //     this.bottomChoosedBtn_arr[i].y =  _y+100;
            // }
            this.bottomChoosedBtn_arr[i].interactive = true;
         
          //  let distX = 
            this.bottomChoosedBtn_arr[i].on('pointerdown',this.bottomBtn_downHandler.bind(this,{index:i}),this);
            this.bottomChoosedBtn_arr[i].on('pointerup',this.bottomBtn_upHandler.bind(this,i),this);
            this.bottomChoosedBtn_arr[i].on('pointerupoutside',this.bottomBtn_upHandler.bind(this,i),this);

        }
    }

    //Events;
    private bottomBtn_upHandler(index:number,event:any){
        console.log('hwaawawa',index);
        this.movedChoosedBtn_arr[index].renderable = false;
        this.bottomChoosedBtn_arr[index].off('pointermove');
        let ball = new PIXI.Graphics();
        ball.beginFill(0xff0000).drawCircle(0,0,10).endFill();
        this.addChild(ball)
        var centerX  =   event.data.global.x-this.bottomTouchOffset.x;
        var centerY = event.data.global.y-this.bottomTouchOffset.y;

       // event.data.global.x+this.bottomTouchOffset.x,event.data.global.y+this.bottomTouchOffset.y

        if(this.startcoding.containsPoint(new PIXI.Point(centerX,centerY))){
         //   console.log('uuuuuuu')
         this.codeAdded();
         this.scrollUI.updateAll();
        };

        

    }
    private bottomBtn_downHandler(data:any,event:any) {
        this.movedChoosedBtn_arr[data.index].renderable = true;
        this.choosedBarIndex = data.index;
        this.movedChoosedBtn_arr[data.index].x = this.bottomChoosedBtn_arr[data.index].x //event.data.global.x- this.movedChoosedBtn_arr[index].width/2;
        this.movedChoosedBtn_arr[data.index].y = this.bottomChoosedBtn_arr[data.index].y //event.data.global.y- this.movedChoosedBtn_arr[index].height/2;
       // this.movedChoosedBtn_arr[index]
       let distX = event.data.global.x -  this.bottomChoosedBtn_arr[data.index].getGlobalPosition().x;
       let distY = event.data.global.y -  this.bottomChoosedBtn_arr[data.index].getGlobalPosition().y;
       this.bottomTouchOffset.x = event.data.global.x -  (this.bottomChoosedBtn_arr[data.index].getGlobalPosition().x+this.bottomChoosedBtn_arr[data.index].width/2);
       this.bottomTouchOffset.y = event.data.global.y -  (this.bottomChoosedBtn_arr[data.index].getGlobalPosition().y+this.bottomChoosedBtn_arr[data.index].height/2);
       this.bottomChoosedBtn_arr[data.index].on('pointermove',this.movedChoosed_move.bind(this,{
            index:data.index,
            offsetX:distX,
            offsetY:distY


       }),this);
       console.log("don",data.index)
        
    }
    private movedChoosed_move(data:any,event:any){
        console.log(888)
        this.movedChoosedBtn_arr[data.index].x= event.data.global.x-data.offsetX;
        this.movedChoosedBtn_arr[data.index].y = event.data.global.y-data.offsetY;

    }
    //UFO矩阵
    private addUfoMatrix(_x: number = 600, _y: number = 50) {
        for (let row = 0; row < 9; row++) {
            this.ufoBoxes_biArr[row] = [];
            for (let col = 0; col < 9; col++) {
                this.ufoBoxes_biArr[row][col] = {
                    y: _y + row * (91 + 2.8),
                    x:_x+col*(91+3.2),
                    stable:false
                }

            }
        }

    }
    private addedToStage() {
        this.ufoBoxes_biArr = [];
        this.addedAction_arr = [];
        this.ufoRoutes_arr = [];
        this.scrollWheelArea = new PIXI.Graphics();
        this.submitBtn = new ButtonUI('submit_btn');
        this.againBtn = new ButtonUI('again_btn');
        this.runBtn = new ButtonUI('run_btn');
        this.keyInputBar = new InputBar();

        this.digitalText = new PIXI.Text('1\n2\n3', { fill: 0x000000,padding:0, fontSize: 31, lineHeight: 62, align: 'right' });
        this.gamebg = new PIXI.Sprite(Labs.getTexture('bg'));
        this.clearroute_btn = new ButtonUI('clearroute_btn')
        this.scrollUI = new ScrollUI();
        this.keyBoard = new KeyBoard();
        // let mybox = new PIXI.Graphics();
        // mybox.beginFill(0xff0000).drawRect(0,0,200,10).endFill();

        this.scrollWheelArea.beginFill(0xff0000,0.5).drawRect(0,0,1090,900).endFill();
        this.pickedUpActionBar = new PIXI.Sprite(Labs.getTexture('codebtn_up'));

        this.upperCode = new PIXI.Sprite(Labs.getTexture('codeup'));
        this.downerCode = new PIXI.Sprite(Labs.getTexture('codedown'));
        this.startcoding = new PIXI.Sprite(Labs.getTexture('startcoding'))
        this.upperCode.x = this.leftpadding;
        this.downerCode.x = this.leftpadding;
        this.downerCode.y = this.downerCodePaddingUp;

        this.startcoding.y = this.firstActionPos;
        this.startcoding.x = this.leftpadding + 100;


        this.scrollUI.scrollHeight = 720;
        this.scrollUI.contentHeight = this.firstScrollHeight;
        this.scrollUI.scrollWidth = 1920 / 2 + 50;
        this.scrollUI.contentWidth = 1920 / 2 + 50;

        // this.digitalText.y = 123;
        this.digitalText.x = 30;
        this.digitalText.y = 0;

      
        this.gamebg.interactive = true;

        this.scrollUI.y = 125;
        this.scrollUI.x = 0;



        this.addChild(this.gamebg);
        this.addChild(this.scrollUI);

        this.submitBtn.setStatusTexture('submit_over_btn', 'submit_down_btn');
        this.submitBtn.buttonStatus = ['over', 'down']
        this.addChild(this.submitBtn);
        this.submitBtn.buttonTapHandler = this.submitBtn_clickHandler.bind(this);//

        //again
        this.againBtn.setStatusTexture('again_over_btn','again_down_btn');
        this.againBtn.buttonStatus = ['over','down'];
        this.addChild(this.againBtn);
        this.againBtn.x = 589;
        this.againBtn.y = 14;
        this.againBtn.buttonTapHandler = this.againBtn_clickHandler.bind(this)
    //run 
    this.runBtn.setStatusTexture('run_over_btn','run_down_btn');
    this.runBtn.buttonStatus = ['over','down'];
    this.addChild(this.runBtn);
    this.runBtn.x = this.againBtn.x+this.againBtn.width+14;
    this.runBtn.y = 14;
    this.runBtn.buttonTapHandler = this.runBtn_clickHandler.bind(this);

     


        // this.scrollUI.updateAll();

        this.scrollUI.addContent(this.digitalText);


        this.addChild(this.pickedUpActionBar)


        this.scrollUI.addContent(this.upperCode);
        this.scrollUI.addContent(this.downerCode);

        this.scrollUI.addContent(this.startcoding);
        //this.scrollUI.addContent(this.keyBoard);
        //this.scrollUI.addContent(this.keyInputBar);

        this.keyBoard.x = this.leftpadding+50;
        this.keyBoard.y = 375;
     //   this.scrollUI.updateAll();


        this.codeAdded();
        this.addChild(this.pickedUpActionBar)
        // let borders = new PIXI.Graphics();
        // borders.lineStyle(2,0xff0000).drawRect(0,0,this.digitalText.getBounds().width,this.digitalText.getBounds().height).endFill();
        // this.scrollUI.addContent(borders)



        this.scrollUI.updateAll();
        this.addChild(this.clearroute_btn);

        //console.log('最初多少sss',this.scrollUI.scrollContent.height);
        this.scrollUI.initContentHeight = this.scrollUI.scrollContent.height;
     

        this.clearroute_btn.x = 1336;
        this.clearroute_btn.y = 18;
         this.submitBtn.x = this.clearroute_btn.x+this.clearroute_btn.width+14;
         this.submitBtn.y = 18;
         console.log('wwww',this.clearroute_btn.width)
        // this.submitBtn.y = this.clearroute_btn.y;
        this.clearroute_btn.buttonTapHandler = this.clearRout_clickHandler.bind(this)

  
        this.addUfoMatrix(1058, 142);
       // this.ufoBoxes_biArr[2][2].alpha = 1;
       let box = new PIXI.Sprite(Labs.getTexture('routebox'));
       box.x = this.ufoBoxes_biArr[4][4].x;
       box.y = this.ufoBoxes_biArr[4][4].y;
       console.log('x:::',box.x,'y:::',box.y)
       this.addChild(box);
      // this.addChild(this.scrollWheelArea)


        this.add_bottomChooseBtn(20, 880);
        this.add_overflowed_bottomBtns();

      


        this.firstScrollHeight  = this.scrollUI.contentHeight
        console.log('how height',this.firstScrollHeight)
    }
    //路径移动
    private routeMoving(_arr:string[] = []){
        var self = this;
        let arr = _arr.concat();
        let ticker:any = null;
        let step:number = 0;
        let direct:any;
        function moving(){
            ticker = setTimeout(()=>{
                if(step>=arr.length){
                    clearTimeout(ticker);
                    return;
                }
               
                switch(arr[step]){
                    case 'up':
                    direct = self.ufoBoxes_biArr[self.ufoInitPos.y-=1][self.ufoInitPos.x];
                    console.log('up')
                    break;
                    case 'left':
                    direct = self.ufoBoxes_biArr[self.ufoInitPos.y][self.ufoInitPos.x-=1];
                    console.log('left')
                    break;
                    case 'down':
                    direct = self.ufoBoxes_biArr[self.ufoInitPos.y+=1][self.ufoInitPos.x];
                    console.log('down')
                    break;
                    case 'right':
                    direct = self.ufoBoxes_biArr[self.ufoInitPos.y][self.ufoInitPos.x+=1];
                    console.log('right')
                    break;
                    default:
                    break;
                }
             //   self.ufo[]
             let newUfo = new PIXI.Sprite(Labs.getTexture('routebox'));
                self.addChild(newUfo);
                newUfo.x = direct.x;
                newUfo.y = direct.y;
                self.ufoRoutes_arr.push(newUfo);
                step++;
                moving();
               

            },1000)

        };
        moving();
      

    }
    private runBtn_clickHandler(){
        this.routeMoving(this.movingStep_arr);

    }
    private againBtn_clickHandler(){
        this.addedAction_arr.forEach(child=>child.parent.removeChild(child));
        this.addedAction_arr.length = 0;
        this._digitalLine = 12;
        this.codeAdded();
      
        this.startcoding.y = this.firstActionPos;
        this.downerCode.y = this.downerCodePaddingUp+this.distVerLine;
      //  this.scrollUI.contentHeight = this.firstScrollHeight+100;
       this.scrollUI.updateAll();
     //  this.scrollUI.contentHeight = 740;
    }
    private submitBtn_clickHandler(){
        this.codeMinus();
        this.scrollUI.updateAll();

        console.log(this.scrollUI.scrollContent.y,'KKKKK')
       // if(this.scrollUI.scrollContent.y)

       // this.scrollUI.scrollContent.y += this.distVerLine;

    }

    private clearRout_clickHandler() {
        console.log('funck')

        this.codeAdded();
        this.scrollUI.updateAll();

        console.log('我的位置',this.startcoding.getGlobalPosition().y)
        if(this.startcoding.getGlobalPosition().y>800){
            this.scrollUI.scrollContent.y-=this.distVerLine;
        }

       

        this.publicClickHandler();
    }
    private publicClickHandler() {

    }


    private removedFromStage() {

    }
}
