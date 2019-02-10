import Labs from '@/labs/Labs';
import ButtonUI from '@/labs/ButtonUI';

class KeyBoard extends PIXI.Container{
    private bg!:PIXI.Sprite;
    public keyboard:any = {};
    private keyDel!:ButtonUI;
    private inputBar:any;

    constructor(){
        super();

        this.on('added',this.addedToStage,this);
        this.on('removed',this.removedFromStage,this);
    }
    private addedToStage(){
        this.bg = new PIXI.Sprite(Labs.getTexture('keyboard'));
        this.addChild(this.bg);
        this.keyDel = new ButtonUI('keydel');// PIXI.Sprite(Labs.getTexture('keydel'))

  

        for(let row=0;row<2;row++){
            for(let col=0;col<5;col++){
                let key = new ButtonUI('key'+(col+(row*5)));
                key.x = col*95+30;
                key.y = row*95+20;
                this.addChild(key)

            }
        }
        this.addChild(this.keyDel);
        this.keyDel.x = this.bg.width-this.keyDel.width-18;
        this.keyDel.y = 28;


    }
    private removedFromStage(){}
}
export default KeyBoard;