import Labs from "./Labs";
import { Sprite } from 'pixi.js';
/*
v.1.0
*/
class ButtonUI extends PIXI.Container{
    private _normalTexture!:PIXI.Texture;
    private _overTexture!:PIXI.Texture;
    private _downTexture!:PIXI.Texture;
    private _disableTexture!:PIXI.Texture;
    private _buttonStatus:string[] = [];
    private buttonBody!:PIXI.Sprite;

    public buttonDownHandler:any;
    public buttonTapHandler:any;
    public buttonOverHandler:any;
    public buttonOutHandler:any;
    constructor(textName:any=null){
        super();
        if(textName){
            this._normalTexture = PIXI.loader.resources[textName].texture;
        }
      
        this.on('added',this.addedToStage,this);
        this.on('removed',this.removedFromStage,this);
    }
    private addedToStage(){
        this.buttonBody = new Sprite(this._normalTexture);
        this.addChild(this.buttonBody);
        this.buttonBody.interactive = true;
        this.buttonBody.buttonMode = true;
 
        if(this.buttonStatus.indexOf('over')>-1){
        
            this.buttonBody.on('pointerover',this.buttonPointerOver_handler,this);
            this.buttonBody.on('pointerout',this.buttonPointerOut_handler,this);
        };
        if(this.buttonStatus.indexOf('down')>-1){
            this.buttonBody.on('pointerdown',this.buttonPointerdown_handler,this);
            this.buttonBody.on('pointerup',this.buttonPointerOut_handler,this)
            this.buttonBody.on('pointerupoutside',this.buttonPointerOut_handler,this)
        };
      
        this.buttonBody.on('pointertap',this.buttonTap_handler,this);
        
      
      

    }
    public setEnabled(_disable:boolean=true,_useTexture:boolean=false){
        this.buttonBody.interactive = _disable;
        if(_useTexture){
            if(this.buttonStatus.indexOf('disable')>-1){
                this.buttonBody.texture = this._disableTexture;
            }
         
        }
    }
    private buttonPointerdown_handler(){
        this.buttonBody.texture = this._downTexture;
        if(this.buttonDownHandler){
            this.buttonDownHandler()
        }
    }
    private buttonPointerOver_handler(){
        console.log('over!!')
      
        this.buttonBody.texture = this._overTexture;
        if(this.buttonOverHandler){
            this.buttonOverHandler();
        }
    }
    private buttonPointerOut_handler(){
        this.buttonBody.texture = this._normalTexture;
        if(this.buttonOutHandler){
            this.buttonOutHandler();
        }
        
    }
    private buttonTap_handler(){
        console.log(777,this.buttonTapHandler)
        if(this.buttonTapHandler){
            console.log('why')
            this.buttonTapHandler();
        }
    }
    public setStatusTexture(_over:string="",_down:string="",_disable:string=""){
        if(_over){
            this._overTexture = PIXI.loader.resources[_over].texture;
        }
        if(_down){
            this._downTexture = PIXI.loader.resources[_down].texture;
        };
        if(_disable){
            this._disableTexture = PIXI.loader.resources[_disable].texture;
        }

    }
    //over , down,  disable ,
    public set buttonStatus(_arr:string[]){
        if(this._buttonStatus){
           for(let i=0;i<_arr.length;i++){
               if(this._buttonStatus.indexOf(_arr[i]) === -1){
                   this._buttonStatus.push(_arr[i]);

               }
           }
        }
        this._buttonStatus = _arr;
    }
    public get buttonStatus(){
        return this._buttonStatus;
    }
    private removedFromStage(){
        Labs.clearAllChildren(this);
        this.removeAllListeners();
        this.removeChildren();
    }
}
export default ButtonUI;