import Labs from './Labs';

class ScrollUI extends PIXI.Container {
    private _scrollWidth: number = 100;
    private _scrollHeight: number = 100;
    private _contentWidth: number = 100;
    private _contentHeight: number = 200;
    private _contentDirect: string = 'vertical';
    private _scrollBarType: string = 'default';
    private _scrollBarWidth: number = 20;
    private _scrollBarHeight: number = 20;
    private _scrollBarY:number = 0;

    private _scrollBarWidthHor:number = 20;
    private _scrollBarHeightHor:number = 20;

    private _scrollTop:number = 0;
    private _scrollLeft:number = 0;




    private scrollMask!: PIXI.Graphics;
    private scrollBar!: PIXI.Graphics;
    private scrollHorBar!:PIXI.Graphics;
    private scrollBar_touched: Boolean = false;//垂直情况,正常的情况;
    private scrollBar_Hortouched:Boolean = false;//水平情况;
    private scrollBar_touchPos: any = { x: 0, y: 0 };
    private scrollBar_HortouchPos: any = { x: 0, y: 0 };


    private scrollRatio: number = 0;//移动过程中的比率;
    private scrollHorRatio:number = 0;
    private scrolledDist: number = 0;//移动的距离
    private scrolledHorDist:number = 0;
    private scrollDist: number = 0;
    private scrollHorDist:number = 0;

    private contentOveredDist: number = 0;//内容部分多出去的长度;
    private contentOveredHorDist:number = 0;


    public scrollbarVerOffset:number = 0;
    public scrollbarHorOffset:number = 0;

    public scrollBg!: PIXI.Graphics;//滑动背景;
    public scrollContent!: PIXI.Graphics;//滑动内容
    constructor(option: any = { direction: 'vertical' }) {
        super();
        this._contentDirect = option.direction || 'vertical';
        this.on('added', this.addedToStage, this);
    }


    public set scrollTop(n:number){
        this._scrollTop = n;
        // let scrollBarY = this.scrollBar.y
        // if (scrollBarY > this._scrollHeight - this.scrollBar.height) {
        //     scrollBarY = this._scrollHeight - this.scrollBar.height;
        // } else if (scrollBarY < this.scrollBg.y) {
        //     scrollBarY = this.scrollBg.y;

        // }
        // this.scrolledDist += this._scrollTop;

        // this.scrollRatio = this.scrolledDist / this.scrollDist;//移动比率;
        // this.scrollContent.y = -1 * (this.scrollRatio * this.contentOveredDist);
        // console.log(this.scrollRatio * this.contentOveredDist, 'juli');
        // this.scrollBar.y += this._scrollTop;


        this._scrollBarY += -n;
        if (  this._scrollBarY  > this._scrollHeight - this.scrollBar.height) {
            this._scrollBarY  = this._scrollHeight - this.scrollBar.height;
        } else if (  this._scrollBarY  < this.scrollBg.y) {
            this._scrollBarY  = this.scrollBg.y;

        }
        this.scrolledDist =   this._scrollBarY ;

        this.scrollRatio = this.scrolledDist / this.scrollDist;//移动比率;
        this.scrollContent.y = -1 * (this.scrollRatio * this.contentOveredDist);
        console.log(this.scrollRatio * this.contentOveredDist, 'juli');
        this.scrollBar.y =   this._scrollBarY ;





        // this.scrollContent.y+=n;

     //   this.updateAll();


   
    }
    public get scrollTop():number{
        return this._scrollTop;
    }
    public get scrollLeft():number{
        return this._scrollLeft;

    }
    public set scrollLeft(n:number){
        this._scrollLeft = n;
    }



    public set scrollWidth(n: number) {
        this._scrollWidth = n;
        if (this.scrollBg) {
            this.scrollBg.width = n;
            this.scrollMask.width = n;
            this.updateAll();


        }

    }
    public get scrollWidth() {
        return this._scrollWidth;

    }

    public set scrollHeight(n: number) {
        this._scrollHeight = n;
        if (this.scrollBg) {
            this.scrollBg.height = n;
            this.scrollMask.height = n;
            this.updateAll();


        }
    }
    public get scrollHeight() {
        return this._scrollHeight;
    }
    public set contentWidth(n: number) {
        this._contentWidth = n;
        if (this.scrollContent) {
            this.scrollContent.width = n;
            this.updateAll();


        }

    }
    public get contentWidth() {
        return this._contentWidth;

    }

    public set contentHeight(n: number) {
        this._contentHeight = n;
        if (this.scrollContent) {
            this.scrollContent.height = n;
            this.updateAll();


        }
    }
    public get contentHeight() {
        return this._contentHeight;
    }

    public updateData(_data: any) {

    }
    private addedToStage() {
        this.scrollContent = new PIXI.Graphics();

        this.scrollMask = new PIXI.Graphics();

        this.scrollBg = new PIXI.Graphics();
        this.scrollBar = new PIXI.Graphics();
        this.scrollHorBar = new PIXI.Graphics();
        this.scrollContent = new PIXI.Graphics();
        this.scrollBg.beginFill(0x70b08f).drawRect(0, 0, this._scrollWidth, this._scrollHeight).endFill();

        this.scrollMask.beginFill(0x767676).drawRect(0, 0, this._scrollWidth, this._scrollHeight).endFill();
        this.scrollContent.beginFill(0x1e88e1).drawRect(0, 0, this._contentWidth, this._contentHeight).endFill();


        this.scrollBar.beginFill(0x71e11e).drawRect(0, 0, this._scrollBarWidth, this._scrollBarHeight).endFill();


        this.scrollHorBar.beginFill(0x71e11e).drawRect(0, 0, this._scrollBarWidthHor, this._scrollBarHeightHor).endFill();




        this.addChild(this.scrollBg);
        this.addChild(this.scrollMask);


        this.addChild(this.scrollContent);

        this.scrollContent.mask = this.scrollMask;

        this.updateAll();



        if (this._contentDirect === 'vertical' && this._contentHeight > this._scrollHeight) {

            this.addChild(this.scrollBar);
            this.scrollBar.interactive = true;
            this.scrollBar.buttonMode = true;
            this.scrollBar.on('pointerdown', this.scrollBarVertical_down_handle, this);

            this.scrollBar.on('pointerup', this.scrollBarVertical_up_handle, this);
            this.scrollBar.on('pointermove', this.scrollBarVertical_move_handle, this);
            this.scrollBar.on('pointerupoutside', this.scrollBarVertical_up_handle, this);
        }
        if(this._contentDirect === 'horizontal' && this._contentWidth > this._scrollWidth){
            this.addChild(this.scrollHorBar);
            this.scrollHorBar.interactive = true;
            this.scrollHorBar.buttonMode = true;
            this.scrollHorBar.on('pointerdown', this.scrollBarHorizontal_down_handle, this);

            this.scrollHorBar.on('pointerup', this.scrollBarHorizontal_up_handle, this);
            this.scrollHorBar.on('pointermove', this.scrollBarHorizontal_move_handle, this);
            this.scrollHorBar.on('pointerupoutside', this.scrollBarHorizontal_up_handle, this);
        }
        if(this._contentDirect === 'all' && this._contentWidth > this._scrollWidth && this._contentHeight > this._scrollHeight){
            this.addChild(this.scrollBar);
            this.scrollBar.interactive = true;
            this.scrollBar.buttonMode = true;
            this.scrollBar.on('pointerdown', this.scrollBarVertical_down_handle, this);

            this.scrollBar.on('pointerup', this.scrollBarVertical_up_handle, this);
            this.scrollBar.on('pointermove', this.scrollBarVertical_move_handle, this);
            this.scrollBar.on('pointerupoutside', this.scrollBarVertical_up_handle, this);
            //
            this.addChild(this.scrollHorBar);
            this.scrollHorBar.interactive = true;
            this.scrollHorBar.buttonMode = true;
            this.scrollHorBar.on('pointerdown', this.scrollBarHorizontal_down_handle, this);

            this.scrollHorBar.on('pointerup', this.scrollBarHorizontal_up_handle, this);
            this.scrollHorBar.on('pointermove', this.scrollBarHorizontal_move_handle, this);
            this.scrollHorBar.on('pointerupoutside', this.scrollBarHorizontal_up_handle, this);
            console.log('!22!!!!',this._contentWidth > this._scrollWidth, this._contentHeight > this._scrollHeight)
        }
        console.log('!!!!!',this._contentWidth > this._scrollWidth, this._contentHeight > this._scrollHeight)

    }
    public addContent(_child: any) {
        this.scrollContent.addChild(_child);
        this.updateAll();

    }
    public updateAll() {
        this._contentHeight = this.scrollContent.height;//更新宽和高;
        this._contentWidth = this.scrollContent.width;
        if(this._contentDirect === 'vertical'){
            this.updateVerticalScrollBar.call(this);
        }
        if(this._contentDirect === 'horizontal'){
            this.updateHorizontalScrollBar.call(this);
        }
        if(this._contentDirect === 'all'){
            this.updateVerticalScrollBar.call(this);
            this.updateHorizontalScrollBar.call(this);

        }

     
        console.log('高度多少', this.scrollContent.height)



    }
    private updateHorizontalScrollBar() {
        let scrollBarHeight;

     
            // this.scrollBar.beginFill(0x71e11e).drawRect(0,0,this._scrollBarWidth,this._scrollBarHeight).endFill();
            this.scrollHorBar.width = this._scrollWidth/this._contentWidth*this._scrollWidth;


            scrollBarHeight = this._scrollBarHeight;//this._scrollHeight / this._contentHeight * this._scrollHeight;
            this.scrollHorDist = this.scrollBg.height - scrollBarHeight;
            this.scrollHorBar.height = scrollBarHeight;
            this.contentOveredHorDist = this._contentHeight - this._scrollHeight;
  
            this.scrollHorBar.y = this.scrollBg.height+this.scrollbarHorOffset;
      
    }
    private updateVerticalScrollBar() {
        let scrollBarHeight;

    
            // this.scrollBar.beginFill(0x71e11e).drawRect(0,0,this._scrollBarWidth,this._scrollBarHeight).endFill();
            this.scrollBar.width = this._scrollBarWidth;


            scrollBarHeight = this._scrollHeight / this._contentHeight * this._scrollHeight;
            this.scrollDist = this.scrollBg.height - scrollBarHeight;
            this.scrollBar.height = scrollBarHeight;
            this.contentOveredDist = this._contentHeight - this._scrollHeight;
            console.log('scrollBarHeight', this.scrollDist, this.contentOveredDist)
            this.scrollBar.x = this.scrollBg.width+this.scrollbarVerOffset;
     
    }

    private scrollBarVertical_down_handle(event: any) {
        this.scrollBar_touched = true;
        //this.scrollBg_glpos = this.scrollBg.toGlobal(new PIXI.Point(0, 0));
        let scrollBar_glPos = this.scrollBar.toGlobal(new PIXI.Point(0, 0));
        let scrollDistY = event.data.global.y - scrollBar_glPos.y;
        this.scrollBar_touchPos.y = scrollDistY;


    }
    private scrollBarVertical_up_handle() {
        this.scrollBar_touched = false;

    }
    private scrollBarVertical_move_handle(event: any) {
        if (this.scrollBar_touched) {
            //vertical;

            this._scrollBarY = event.data.global.y - this.scrollBar_touchPos.y;
            if (  this._scrollBarY  > this._scrollHeight - this.scrollBar.height) {
                this._scrollBarY  = this._scrollHeight - this.scrollBar.height;
            } else if (  this._scrollBarY  < this.scrollBg.y) {
                this._scrollBarY  = this.scrollBg.y;

            }
            this.scrolledDist =   this._scrollBarY ;

            this.scrollRatio = this.scrolledDist / this.scrollDist;//移动比率;
            this.scrollContent.y = -1 * (this.scrollRatio * this.contentOveredDist);
            console.log(this.scrollRatio * this.contentOveredDist, 'juli');
            this.scrollBar.y =   this._scrollBarY ;




        }
    }
    private scrollBarHorizontal_down_handle(event:any){
        this.scrollBar_Hortouched = true;
      //  this.scrollBg_glpos = this.scrollBg.toGlobal(new PIXI.Point(0, 0));
        let scrollBar_glPos = this.scrollHorBar.toGlobal(new PIXI.Point(0, 0));
        let scrollDistX = event.data.global.x - scrollBar_glPos.x;
        this.scrollBar_HortouchPos.x = scrollDistX;
    }
    private scrollBarHorizontal_up_handle(){
        this.scrollBar_Hortouched = false;
    }
    private scrollBarHorizontal_move_handle(event:any){
        if(this.scrollBar_Hortouched ){
            let scrollBarX = event.data.global.x - this.scrollBar_HortouchPos.x;
            if (scrollBarX > this._scrollWidth - this.scrollHorBar.width) {
                scrollBarX = this._scrollWidth- this.scrollHorBar.width;
            } else if (scrollBarX < this.scrollBg.x) {
                scrollBarX= this.scrollBg.x;

            }
            this.scrolledHorDist = scrollBarX;

            this.scrollHorRatio = this.scrolledHorDist / this.scrollHorDist;//移动比率;
            this.scrollContent.x = -1 * (this.scrollHorRatio * this.contentOveredHorDist);
            console.log(this.scrollHorRatio * this.contentOveredHorDist, 'juli');
            this.scrollHorBar.x = scrollBarX;
            console.log('hah',this.scrollHorDist)


        }
    }
    private removedFromStage() {

    }
}
export default ScrollUI;
/**
 * var myscroll = new ScrollUI();
 * myscroll.contentWidth = 300;
 * myscroll.contentHeight = 200;
 * scrollHeight;
 * scrollWidth;
 * myscroll.content.addChild()
 *
 */