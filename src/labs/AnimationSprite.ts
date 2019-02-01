export class AnimationSprite extends PIXI.Container {
    public soundTrumpet:any;
    private _status:string = 'stoping';
    private resName:any = '';
    public alienImages:any[] = [];


   constructor(_resName:string) {
     super();
     this.resName = _resName;

     this.on('added', this.addedToStage, this);
   }

   public get status(){
       return this._status;
   }
 
   addedToStage() {
     const self = this;
     let textureArray = [];
     let sheet:any = PIXI.loader.resources[this.resName].spritesheet;
     this.alienImages =Object.keys(sheet.textures);
     for (let i = 0; i < this.alienImages.length; i++) {
       let texture:any = sheet.textures[self.alienImages[i]];
       textureArray.push(texture);
     };
 
     this.soundTrumpet = new PIXI.extras.AnimatedSprite(textureArray);
     this.soundTrumpet.animationSpeed = 0.08;
     this.stop();
     this.addChild(this.soundTrumpet)
   }
   play() {
     if (this.soundTrumpet) {
 
       this.soundTrumpet.play();
       this._status = 'playing';
     }
 
 
   }
 
   stop($num = 2) {
     this._status = 'stoping';
     this.soundTrumpet.gotoAndStop($num);
   }
   set speed($num:any) {
     this.soundTrumpet.animationSpeed = $num;
   }
 };