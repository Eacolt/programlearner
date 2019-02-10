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
    private _scrollBarY: number = 0;



    private _scrollGlobalPos: any = { x: 0, y: 0 };

    private _scrollBarWidthHor: number = 20;
    private _scrollBarHeightHor: number = 20;

    private _scrollTop: number = 0;
    private _scrollLeft: number = 0;

    private contentOffsetNum_arr: number[] = [];//上或者下偏移量，用来计算内容的便宜
    //点击内容部分滑动

    private scrollContent_touched: boolean = false;
    private scrollContent_overed: boolean = false;//鼠标触碰到滑动区域;
    private scrollContent_vectorDist: any = { x: 0, y: 0 }




    private scrollMask!: PIXI.Graphics;
    private scrollBar!: PIXI.Graphics;
    private scrollHorBar!: PIXI.Graphics;

    private scrollBar_touched: Boolean = false;//垂直情况,正常的情况;
    private scrollBar_Hortouched: Boolean = false;//水平情况;
    private scrollBar_touchPos: any = { x: 0, y: 0 };
    private scrollBar_HortouchPos: any = { x: 0, y: 0 };


    private scrollRatio: number = 0;//移动过程中的比率;
    private scrollHorRatio: number = 0;
    private scrolledDist: number = 0;//滚动条移动的距离
    private scrolledHorDist: number = 0;
    private scrollDist: number = 0;
    private scrollHorDist: number = 0;

    //内容部分移动距离
    //垂直部分;
    private contentVerScrolledDist: number = 0;
    private contentVerScrollDist: number = 0;//内容部分总滑动长度
    private contentVerScrollRatio: number = 0;//内容部分滑动比率

    // private contentVerScrollDist: number = 0;//内容部分多出去的长度;
    private contentOveredHorDist: number = 0;



    public scrollbarVerOffset: number = 0;
    public scrollbarHorOffset: number = 0;
    public initContentHeight:number = 0;//最初的内容高度

    public scrollBg!: PIXI.Graphics;//滑动背景;
    public scrollContent!: PIXI.Graphics;//滑动内容；
    public minScrollLen: number = 200;//最小滑动条长度


    private _lock:boolean = false;//禁止一切滑动;
    constructor() {
        super();

        this.on('added', this.addedToStage, this);
    }



    public set lock(_b:boolean){
        if(_b === true){
            this.scrollContent.interactive = false;
            this.scrollBar.interactive= false;

        }else{
            this.scrollContent.interactive = true;
            this.scrollBar.interactive= true;
        }
        this._lock = _b;
    }
    public get lock(){
        return this._lock;
    }

    public set scrollTop(n: number) {

        let scrollContentY;

        scrollContentY = n;

        if (scrollContentY > this.contentVerScrollDist) {
            scrollContentY = this.contentVerScrollDist

        } else if (scrollContentY <= 0) {
            scrollContentY = 0;
        }

        this.contentVerScrollRatio = scrollContentY / this.contentVerScrollDist;//移动比率;
        this.scrollContent.y = -1 * (this.contentVerScrollRatio * this.contentVerScrollDist);


        console.log(scrollContentY, this.contentVerScrollDist, this.contentVerScrollRatio, 'juli');
        this.scrollBar.y = this.contentVerScrollRatio * this.scrollDist;
        this._scrollTop = scrollContentY;



    }
    public get scrollTop(): number {
        return this._scrollTop;
    }
    public get scrollLeft(): number {
        return this._scrollLeft;

    }
    public set scrollLeft(n: number) {
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
        this.scrollBg.beginFill(0x70b08f, 0).drawRect(0, 0, this._scrollWidth, this._scrollHeight).endFill();

        this.scrollMask.beginFill(0x767676).drawRect(0, 0, this._scrollWidth, this._scrollHeight).endFill();
        this.scrollContent.beginFill(0x1e88e1, 0).drawRect(0, 0, this._contentWidth, this._contentHeight).endFill();


        this.scrollBar.beginFill(0x71e11e).drawRect(0, 0, this._scrollBarWidth, this._scrollBarHeight).endFill();


        this.scrollHorBar.beginFill(0x71e11e).drawRect(0, 0, this._scrollBarWidthHor, this._scrollBarHeightHor).endFill();




        this.addChild(this.scrollBg);
        this.addChild(this.scrollMask);


        this.addChild(this.scrollContent);

        this.scrollContent.mask = this.scrollMask;

        this.updateAll();



        if (this._contentHeight > this._scrollHeight) {
            this._contentDirect = 'vertical'


        }
        //  if(this._contentHeight>)
        this.addChild(this.scrollBar);
        this.scrollBar.interactive = true;
        this.scrollBar.buttonMode = true;
        this.scrollBar.on('pointerdown', this.scrollBarVertical_down_handle, this);

        this.scrollBar.on('pointerup', this.scrollBarVertical_up_handle, this);
        this.scrollBar.on('pointermove', this.scrollBarVertical_move_handle, this);
        this.scrollBar.on('pointerupoutside', this.scrollBarVertical_up_handle, this);
        if (this._contentHeight <= this._scrollHeight) {
            this.scrollBar.interactive = false;
            this.scrollBar.renderable = false;
        }
        // if(this._contentDirect === 'horizontal' && this._contentWidth > this._scrollWidth){
        //     this.addChild(this.scrollHorBar);
        //     this.scrollHorBar.interactive = true;
        //     this.scrollHorBar.buttonMode = true;
        //     this.scrollHorBar.on('pointerdown', this.scrollBarHorizontal_down_handle, this);

        //     this.scrollHorBar.on('pointerup', this.scrollBarHorizontal_up_handle, this);
        //     this.scrollHorBar.on('pointermove', this.scrollBarHorizontal_move_handle, this);
        //     this.scrollHorBar.on('pointerupoutside', this.scrollBarHorizontal_up_handle, this);
        // }
        // if(this._contentDirect === 'all' && this._contentWidth > this._scrollWidth && this._contentHeight > this._scrollHeight){
        //     this.addChild(this.scrollBar);
        //     this.scrollBar.interactive = true;
        //     this.scrollBar.buttonMode = true;
        //     this.scrollBar.on('pointerdown', this.scrollBarVertical_down_handle, this);

        //     this.scrollBar.on('pointerup', this.scrollBarVertical_up_handle, this);
        //     this.scrollBar.on('pointermove', this.scrollBarVertical_move_handle, this);
        //     this.scrollBar.on('pointerupoutside', this.scrollBarVertical_up_handle, this);
        //     //
        //     this.addChild(this.scrollHorBar);
        //     this.scrollHorBar.interactive = true;
        //     this.scrollHorBar.buttonMode = true;
        //     this.scrollHorBar.on('pointerdown', this.scrollBarHorizontal_down_handle, this);

        //     this.scrollHorBar.on('pointerup', this.scrollBarHorizontal_up_handle, this);
        //     this.scrollHorBar.on('pointermove', this.scrollBarHorizontal_move_handle, this);
        //     this.scrollHorBar.on('pointerupoutside', this.scrollBarHorizontal_up_handle, this);


        //     console.log('!22!!!!',this._contentWidth > this._scrollWidth, this._contentHeight > this._scrollHeight)
        // }
        console.log('!!!!!', this._contentWidth > this._scrollWidth, this._contentHeight > this._scrollHeight)
        this.startVerContentTouch();





        this.windowAddMouseWheel();
    }
    public addContent(_child: any) {
        this.scrollContent.addChild(_child);
        this.updateAll();

    }
    public updateAll() {
        this._contentHeight = this.scrollContent.height;//更新宽和高;
        this._contentWidth = this.scrollContent.width;
        if (this._contentDirect === 'vertical') {
            this.updateVerticalScrollBar.call(this);
        }
        // if(this._contentDirect === 'horizontal'){
        //     this.updateHorizontalScrollBar.call(this);
        // }


    }
    private updateHorizontalScrollBar() {
        let scrollBarHeight;


        // this.scrollBar.beginFill(0x71e11e).drawRect(0,0,this._scrollBarWidth,this._scrollBarHeight).endFill();
        this.scrollHorBar.width = this._scrollWidth / this._contentWidth * this._scrollWidth;


        scrollBarHeight = this._scrollBarHeight;//this._scrollHeight / this._contentHeight * this._scrollHeight;
        this.scrollHorDist = this.scrollBg.height - scrollBarHeight;
        this.scrollHorBar.height = scrollBarHeight;
        this.contentOveredHorDist = this._contentHeight - this._scrollHeight;

        this.scrollHorBar.y = this.scrollBg.height + this.scrollbarHorOffset;

    }
    private updateVerticalScrollBar() {
        let scrollBarHeight;
       // this.initContentHeight 

   
        console.log("是多少",  this.scrollContent.y)
        if (this.contentOffsetNum_arr.length > 2) {
            let offsetVer = this.contentOffsetNum_arr[this.contentOffsetNum_arr.length - 1] - this.contentOffsetNum_arr[this.contentOffsetNum_arr.length - 2];
            if (offsetVer < 0 && this.scrollContent.y < 0) {
                this.scrollContent.y += Math.abs(offsetVer);
    
            }
            if (this.scrollContent.getBounds().height <= this.initContentHeight) {
                this.scrollContent.y = 0;
            }
           
            if (this.scrollContent.y > 300) {
                // this.scrollContent.y -= Math.abs(offsetVer);
            }
        }

        this.scrollBar.width = this._scrollBarWidth;

        // this.contentVerScrolledDist = event.data.global.y-(this.scrollContent_vectorDist.y+this.getGlobalPosition().y);
        // // console.log('我看看啊啊啊',this.contentVerScrolledDist,this.contentVerScrollDist)
        //  if( this.contentVerScrolledDist >0 ){
        //      this.contentVerScrolledDist = 0

        //  }
        //  if( this.contentVerScrolledDist<-1*this.contentVerScrollDist){
        //      this.contentVerScrolledDist = -1*this.contentVerScrollDist
        //  }


        scrollBarHeight = this._scrollHeight / this._contentHeight * this._scrollHeight;

        this.scrollBar.height = scrollBarHeight < this.minScrollLen ? this.minScrollLen : scrollBarHeight;//滚动条最低的限度200
        this.contentVerScrollDist = this._contentHeight - this._scrollHeight <= 0 ? 0 : this._contentHeight - this._scrollHeight;

        this.scrollDist = this.scrollBg.height - this.scrollBar.height <= 0 ? 0 : this.scrollBg.height - this.scrollBar.height;

        console.log('scrollBarHeight', this.scrollDist, this.contentVerScrollDist)
        this.scrollBar.x = this.scrollBg.width + this.scrollbarVerOffset;

        let scrollBarGlPos = this.scrollBar.getGlobalPosition();
        //滚动条溢出下部分的时候，处理
        if (scrollBarGlPos.y + this.scrollBar.height > this.scrollBg.getGlobalPosition().y + this._scrollHeight) {
            console.log('滚动条溢出', scrollBarGlPos.y);
            this.scrollBar.y -= Math.abs((this.scrollBg.getGlobalPosition().y + this._scrollHeight) - (scrollBarGlPos.y + this.scrollBar.height));
            this.contentVerScrollDist += Math.abs((this.scrollBg.getGlobalPosition().y + this._scrollHeight) - (scrollBarGlPos.y + this.scrollBar.height));
        }
        //  this.scrollContent.y +=  -1*this.scrolledDist;

        //console.log('多少', -1*this.scrolledDist)

        if (this._contentHeight <= this._scrollHeight) {
            this.scrollBar.interactive = false;
            this.scrollBar.renderable = false;
            this.scrollContent.interactive = false;

        } else {
            this.scrollBar.interactive = true;
            this.scrollBar.renderable = true;
            this.scrollContent.interactive = true;

        }
        this.contentOffsetNum_arr.push(this.scrollContent.getBounds().height);

        if (this.contentOffsetNum_arr.length > 4) {
            this.contentOffsetNum_arr.shift();
        }


        console.log('擦擦pianyi', this.contentOffsetNum_arr)



    }


    private startVerContentTouch() {
        this.interactive = true;


        this.scrollContent.interactive = true;
        this.scrollContent.on('pointerdown', this.scrollVer_down_handler, this);
        this.scrollContent.on('pointerup', this.scrollVer_up_handler, this);
        this.scrollContent.on('pointerupoutside', this.scrollVer_up_handler, this);
        this.scrollContent.on('pointermove', this.scrollVer_move_handler, this);
        this.on('mouseover', this.scrollVer_over_handler, this);
        this.on('mouseout', this.scrollVer_out_handler, this);

        if (this._contentHeight <= this._scrollHeight) {
            this.scrollContent.interactive = false;

        }
    }
    //滚动条滑入。。
    private scrollVer_over_handler(event: any) {
        this.scrollContent_overed = true;
        console.log('moving!')


    }
    private scrollVer_out_handler(event: any) {
        this.scrollContent_overed = false;
        console.log('movingout!')
    }

    private scrollVer_down_handler(event: any) {

        this.scrollContent_touched = true;
        this.scrollContent_vectorDist.y = Math.abs(event.data.getLocalPosition(this.scrollContent).y - 0);
        console.log('怎么会是是是', event.data.getLocalPosition(this.scrollContent).y);
    }
    private scrollVer_up_handler() {
        this.scrollContent_touched = false;
        // this.scrollTop = this._scrollTop;
    }
    private scrollVer_move_handler(event: any) {
        if (this.scrollContent_touched && this._contentHeight > this._scrollHeight) {


            this.contentVerScrolledDist = event.data.global.y - (this.scrollContent_vectorDist.y + this.getGlobalPosition().y);
            // console.log('我看看啊啊啊',this.contentVerScrolledDist,this.contentVerScrollDist)
            if (this.contentVerScrolledDist > 0) {
                this.contentVerScrolledDist = 0

            }
            if (this.contentVerScrolledDist < -1 * this.contentVerScrollDist) {
                this.contentVerScrolledDist = -1 * this.contentVerScrollDist
            }
            this.contentVerScrollRatio = Math.abs(this.contentVerScrolledDist) / (this._contentHeight - this._scrollHeight);//>= 1 ? 1 : Math.abs(this.contentVerScrolledDist)/(this._contentHeight-this._scrollHeight);
            console.log('....', this.scrollDist)
            this.scrollContent.y = this.contentVerScrolledDist;
            this.scrollBar.y = 1 * (this.contentVerScrollRatio * this.scrollDist);

            console.log(this.scrollRatio * this.contentVerScrollDist, 'juli');
            ///   this.scrollBar.y =   this._scrollBarY ;
            //    this._scrollTop = -1*this._scrollBarY;


            this._scrollTop = -1 * this.contentVerScrolledDist;

            // this.scrollTop = -1*scrollVector;
            //    console.log("hahah",scrollVector)
        }

    }

    private scrollBarVertical_down_handle(event: any) {
        this.scrollBar_touched = true;
        //this.scrollBg_glpos = this.scrollBg.toGlobal(new PIXI.Point(0, 0));
        let scrollBar_glPos = this.scrollBar.toGlobal(new PIXI.Point(0, 0));
        let scrollDistY = event.data.global.y - scrollBar_glPos.y + (this.getGlobalPosition().y);//记得加上当前对象的全局坐标Y值
        this.scrollBar_touchPos.y = scrollDistY;


    }
    private scrollBarVertical_up_handle() {
        this.scrollBar_touched = false;


    }
    private scrollBarVertical_move_handle(event: any) {
        if (this.scrollBar_touched) {
            //vertical;

            this._scrollBarY = event.data.global.y - this.scrollBar_touchPos.y;
            if (this._scrollBarY > this._scrollHeight - this.scrollBar.height) {
                this._scrollBarY = this._scrollHeight - this.scrollBar.height;
            } else if (this._scrollBarY < this.scrollBg.y) {
                this._scrollBarY = this.scrollBg.y;

            }
            this.scrolledDist = this._scrollBarY;

            this.scrollRatio = this.scrolledDist / this.scrollDist >= 1 ? 1 : this.scrolledDist / this.scrollDist;//移动比率;
            this.scrollContent.y = -1 * (this.scrollRatio * this.contentVerScrollDist);
            console.log(this.scrollRatio * this.contentVerScrollDist, 'juli');
            this.scrollBar.y = this._scrollBarY;
            this._scrollTop = -1 * this.scrollContent.y;




        }
    }
    private scrollBarHorizontal_down_handle(event: any) {
        this.scrollBar_Hortouched = true;
        //  this.scrollBg_glpos = this.scrollBg.toGlobal(new PIXI.Point(0, 0));
        let scrollBar_glPos = this.scrollHorBar.toGlobal(new PIXI.Point(0, 0));
        let scrollDistX = event.data.global.x - scrollBar_glPos.x;
        this.scrollBar_HortouchPos.x = scrollDistX;
    }
    private scrollBarHorizontal_up_handle() {
        this.scrollBar_Hortouched = false;
    }
    private scrollBarHorizontal_move_handle(event: any) {
        if (this.scrollBar_Hortouched) {
            let scrollBarX = event.data.global.x - this.scrollBar_HortouchPos.x;
            if (scrollBarX > this._scrollWidth - this.scrollHorBar.width) {
                scrollBarX = this._scrollWidth - this.scrollHorBar.width;
            } else if (scrollBarX < this.scrollBg.x) {
                scrollBarX = this.scrollBg.x;

            }
            this.scrolledHorDist = scrollBarX;

            this.scrollHorRatio = this.scrolledHorDist / this.scrollHorDist;//移动比率;
            this.scrollContent.x = -1 * (this.scrollHorRatio * this.contentOveredHorDist);
            console.log(this.scrollHorRatio * this.contentOveredHorDist, 'juli');
            this.scrollHorBar.x = scrollBarX;
            console.log('hah', this.scrollHorDist)


        }
    }
    private removedFromStage() {
        Labs.clearAllChildren(this);
        this.removeAllListeners();
        this.removeChildren();
    }

    private windowAddMouseWheel() {
        var self = this;
        var scrollFunc = function (e: any) {
            e = e || window.event;

            // if ( this._contentHeight > this._scrollHeight) {
            //     this._contentDirect = 'vertical'


            // }
            let islong = self._contentHeight > self._scrollHeight
            if (e.wheelDelta && self.scrollContent_overed && islong && !self.lock) {  //判断浏览器IE，谷歌滑轮事件

                self.scrollTop += e.wheelDelta;
            } else if (e.detail && self.scrollContent_overed && islong && !self.lock) {  //Firefox滑轮事件
                self.scrollTop += e.wheelDelta;
            }
        };
        //给页面绑定滑轮滚动事件
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法
        window.onmousewheel = (window.document as any).onmousewheel = scrollFunc;
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