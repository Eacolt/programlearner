import * as PIXI from 'pixi.js'
import Labs from '@/labs/Labs';
import Rats from '@/pixicomponent/Rats.ts'
import ScrollUI from '@/labs/ScrollUI.ts'
import ButtonUI from '@/labs/ButtonUI';



export default class GameMainScene extends PIXI.Container {
    private gameTicker: any;
    private gamebg!: PIXI.Sprite;
    private scrollUI!: ScrollUI


    private upperCode!: PIXI.Sprite;
    private downerCode!: PIXI.Sprite;
    private leftpadding: number = 110;
    private downerCodePaddingUp: number = 436;
    private startcoding!: PIXI.Sprite;
    private bottomChoosedBtn_arr!: PIXI.Sprite[];//下部按钮4个;
    private movedChoosedBtn_arr!: PIXI.Sprite[];

    private digitalText!: PIXI.Text;
    private _digitalLine: number = 12;
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


    constructor() {
        super();
        this.on('added', this.addedToStage, this);
        this.on('removed', this.removedFromStage, this);
    }
    private publicClickHandler() {

    }
    private codeMinus() {
        // this.scrollUI.contentHeight+=100;
        if (this._digitalLine <= 13) return;
        let digitalStr = '';
        this._digitalLine--
        for (let i = 1; i < this._digitalLine; i++) {
            digitalStr += i + '\n';


        }
        this.digitalText.text = digitalStr;

        this.downerCode.y -= 60;

        this.scrollUI.updateAll();
    }

    private codeAdded() {
        // this.scrollUI.contentHeight+=100;
        let digitalStr = '';
        this._digitalLine++;
        for (let i = 1; i < this._digitalLine; i++) {
            digitalStr += i + '\n';


        }
        this.digitalText.text = digitalStr;

        this.downerCode.y += 60;

        this.scrollUI.updateAll();
    }
    //  private get digitalLine(){}
    private add_overflowed_bottomBtns() {
        this.movedChoosedBtn_arr = [];
        let arr = ['codebtn_up_over', 'codebtn_down_over', 'codebtn_left_over', 'codebtn_right_over']
        for (let i = 0; i < 4; i++) {
            let btn = new PIXI.Sprite(Labs.getTexture(arr[i]));
            this.addChild(btn);
            this.movedChoosedBtn_arr.push(btn);

        };

    }
    private add_bottomChooseBtn(_x: number = 0, _y: number = 0, _w = 500, _h = 100) {
        let initX = _x, initY = _y, distW = _w, distH = _h;
        this.bottomChoosedBtn_arr = [];
        let arr = ['codebtn_up', 'codebtn_down', 'codebtn_left', 'codebtn_right']
        for (let i = 0; i < 4; i++) {
            let btn = new PIXI.Sprite(Labs.getTexture(arr[i]));
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

        }
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
        this.ufoRoutes_arr = [];
        this.submitBtn = new ButtonUI('submit_btn');
        this.againBtn = new ButtonUI('again_btn');
        this.runBtn = new ButtonUI('run_btn')

        this.digitalText = new PIXI.Text('1\n2\n3', { fill: 0x000000, fontSize: 31, lineHeight: 62, align: 'right' });
        this.gamebg = new PIXI.Sprite(Labs.getTexture('bg'));
        this.clearroute_btn = new ButtonUI('clearroute_btn')
        this.scrollUI = new ScrollUI();
        // let mybox = new PIXI.Graphics();
        // mybox.beginFill(0xff0000).drawRect(0,0,200,10).endFill();

        this.upperCode = new PIXI.Sprite(Labs.getTexture('codeup'));
        this.downerCode = new PIXI.Sprite(Labs.getTexture('codedown'));
        this.startcoding = new PIXI.Sprite(Labs.getTexture('startcoding'))
        this.upperCode.x = this.leftpadding;
        this.downerCode.x = this.leftpadding;
        this.downerCode.y = this.downerCodePaddingUp;

        this.startcoding.y = this.upperCode.y + 410;
        this.startcoding.x = this.leftpadding + 100;


        this.scrollUI.scrollHeight = 720;
        this.scrollUI.contentHeight = 1300;
        this.scrollUI.scrollWidth = 1920 / 2 + 50;
        this.scrollUI.contentWidth = 1920 / 2 + 50;

        // this.digitalText.y = 123;
        this.digitalText.x = 30;
        this.digitalText.y = -5;
        this.gamebg.interactive = true;

        this.scrollUI.y = 125;
        this.scrollUI.x = 0;



        this.addChild(this.gamebg);
        this.addChild(this.scrollUI);

        this.submitBtn.setStatusTexture('submit_over_btn', 'submit_down_btn');
        this.submitBtn.buttonStatus = ['over', 'down']
        this.addChild(this.submitBtn);
        this.submitBtn.buttonTapHandler = this.codeMinus.bind(this);

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


        this.scrollUI.addContent(this.upperCode);
        this.scrollUI.addContent(this.downerCode);

        this.scrollUI.addContent(this.startcoding)
        this.scrollUI.updateAll();


        this.codeAdded();
       
        this.addChild(this.clearroute_btn);
     

        this.clearroute_btn.x = 1336;
        this.clearroute_btn.y = 18;
         this.submitBtn.x = this.clearroute_btn.x+this.clearroute_btn.width+14;
         this.submitBtn.y = 18;
         console.log('wwww',this.clearroute_btn.width)
        // this.submitBtn.y = this.clearroute_btn.y;
        this.clearroute_btn.buttonTapHandler = this.gamebg_downHandler.bind(this)

  
        this.addUfoMatrix(1058, 142);
       // this.ufoBoxes_biArr[2][2].alpha = 1;
       let box = new PIXI.Sprite(Labs.getTexture('routebox'));
       box.x = this.ufoBoxes_biArr[4][4].x;
       box.y = this.ufoBoxes_biArr[4][4].y;
       console.log('x:::',box.x,'y:::',box.y)
       this.addChild(box);
      


        this.add_bottomChooseBtn(20, 880);
        this.add_overflowed_bottomBtns();
    }
    //路径移动
    private routeMoving(_arr = []){
        var self = this;
        let arr =['up','up','left','left','down','down','down'];// _arr;
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
        this.routeMoving();

    }
    private againBtn_clickHandler(){

    }

    private gamebg_downHandler() {
        console.log('funck')

        this.codeAdded();

        this.publicClickHandler();
    }


    private removedFromStage() {

    }
}
