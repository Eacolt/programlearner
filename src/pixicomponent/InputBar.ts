import Labs from '@/labs/Labs';

class InputBar extends PIXI.Container{
    private bg!:PIXI.Sprite;
    constructor(){
        super();
        this.on('added',this.addedToStage,this);
    }
    private addedToStage(){
        this.bg = new PIXI.Sprite(Labs.getTexture('keyselect_btn'));
        this.addChild(this.bg)
        console.log('????')

    }
}
export default InputBar;