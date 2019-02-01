import * as PIXI from 'pixi.js'
export default class Rats extends PIXI.Container{
    private rat!:PIXI.Graphics;
    public speed:number = 2;
    constructor(){
        super();
        this.on('added',this.addedToStage,this);
        this.on('removed',this.removedFromStage,this);
    }
    private addedToStage(){
        this.rat  = new PIXI.Graphics();
        this.rat.beginFill(0xff0000).drawCircle(0,0,100).endFill();
        this.addChild(this.rat);

    }
    private removedFromStage(){
        this.removeAllListeners();
        this.removeChildren();

    }

}