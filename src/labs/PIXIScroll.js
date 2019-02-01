/**
 * PIXIScroll用法：
 *
 * var myscroll = new PIXIScroll({
 *   content:viewContent,
 *   width:200,
 *   height:400,
 *   stage:canvasStage
 * })
 */

class PIXIScroll extends PIXI.Container {
  constructor($options = {}) {
    super();

    this.scrollContent = $options.content || null;
    this.scrollArea = null;
    this.scrollBarVertical = null;
    this.scrollBarHorizontal = null;

    this.scrollBgVertical = null;
    this.scrollBgHorizontal = null;


    this.scrollWidth = $options.width || 100;
    this.scrollHeight = $options.height || 100;



    this.stage = $options.stage;

    this.allowScrollDir = $options.allowScrollDir || 'vertical';

    this.setVertical = true;
    this.setHorizontal = false;


    this.canDragScrollerVer = false;
    this.canDragScrollerHor = false;
    this.canDragContentVertical = false;
    this.canDragContentHorizontal = false;

    this.cursorDistPosVer = null; //鼠标指针和滑动条的位置距离
    this.cursorDistPosHor = null;
    this.scrollContentDistPosVertical = null; //滑动内容与指针的位置距离；
    this.scrollContentDistPosHorizontal = null;

    this.scaleDiffVertical = 1; //长度比值;scroll高度与页面长度的比
    this.scaleDiffHorizontal = 1; //横向的长度比值；

    this.maxDraggedDistVertical = null;
    this.maxDraggedDistHorizontal = null;

    this.maxContentDraggedDistVertical = null; //内容区域最大可拖动距离
    this.maxContentDraggedDistHorizontal = null; //横轴;
    this.scrollProgressVertical = 0; //浏览的进度条;
    this.scrollProgressHorizontal = 0;

    //回调函数


    // this.setScrollBarVerticalStyle = null;
    // this.setScrollBarHorizontalStyle = null;

    // this.setScrollBgVerticalStyle = null;
    // this.setScrollBgHorizontalStyle = null;





    this.on('added', this.addedToStage, this);
  }

  addedToStage() {


    if (!this.scrollContent) {
      // console.warn('scroll 必须要有内容！')
      return;
    };
    if (this.scrollContent) {
      this.scrollArea = new PIXI.Graphics();
      this.scrollArea.beginFill(0x6d3dc8);
      this.scrollArea.drawRect(0, 0, this.scrollWidth, this.scrollHeight);
      this.scrollArea.endFill();



      this.scrollContent.mask = this.scrollArea;
      this.addChild(this.scrollArea);
      this.addChild(this.scrollContent);

    


      //设置纵向滚动条;
      this.scaleDiffVertical = (this.scrollHeight / this.scrollContent.height) < 1 ? (this.scrollHeight / this.scrollContent.height) : 1;

      //设置垂直滚动条;
      this.scrollBarVertical = new PIXI.Graphics();
      this.scrollBarVertical.beginFill(0xffffff, 0.75);

      this.scrollBarVertical.drawRoundedRect(0, 0, 30, this.scaleDiffVertical * this.scrollHeight, 15);
      this.scrollBarVertical.endFill();
      //设置垂直滚动条的背景;
      this.scrollBgVertical = new PIXI.Graphics();
      this.scrollBgVertical.beginFill(0xb3b294);
      this.scrollBgVertical.drawRoundedRect(0, 0, 30, this.scrollHeight, 15);
      this.scrollBgVertical.endFill();




      //滚动条可以拖动的最大距离;
      this.maxDraggedDistVertical = Math.abs(this.scrollHeight - this.scrollBarVertical.height);
      this.maxContentDraggedDistVertical = Math.abs(this.scrollHeight - this.scrollContent.height);




      this.scrollBarVertical.x = this.scrollWidth;
      this.scrollBgVertical.x = this.scrollWidth;

      //设置横向滚动条;
      this.scaleDiffHorizontal = (this.scrollWidth / this.scrollContent.width) < 1 ? (this.scrollWidth / this.scrollContent.width) : 1;


      //设置横向滚动条样式;
      this.scrollBarHorizontal = new PIXI.Graphics();
      this.scrollBarHorizontal.beginFill(0xffffff, 0.75);
      this.scrollBarHorizontal.drawRoundedRect(0, 0, this.scaleDiffHorizontal * this.scrollWidth, 20, 10);
      this.scrollBarHorizontal.endFill();

      this.scrollBgHorizontal = new PIXI.Graphics();
      this.scrollBgHorizontal.beginFill(0xb3b294);
      this.scrollBgHorizontal.drawRoundedRect(0, 0, this.scrollWidth, 20, 10);
      this.scrollBgHorizontal.endFill();


      this.maxDraggedDistHorizontal = Math.abs(this.scrollWidth - this.scrollBarHorizontal.width);
      this.maxContentDraggedDistHorizontal = Math.abs(this.scrollWidth - this.scrollContent.width);
      this.scrollBarHorizontal.y = this.scrollHeight;
      this.scrollBgHorizontal.y = this.scrollHeight;



      if (this.setVertical && !this.setHorizontal && this.scaleDiffVertical < 1) {
        this.addChild(this.scrollBgVertical);
        this.addChild(this.scrollBarVertical);

        this.scrollBarVertical.interactive = true;
        this.scrollContent.interactive = true;
        this.scrollBarVertical.buttonMode = true;
        this.scrollBarVertical.on('pointerdown', this.scrollBarPointerDown_handler, this);
        this.scrollBarVertical.on('pointerup', this.scrollBarPointerUp_handler, this);
        this.scrollBarVertical.on('pointerupoutside', this.scrollBarPointerUp_handler, this);
        this.scrollBarVertical.on('pointermove', this.scrollBarPointerMove_handler, this);
        //滑动的内容;
        this.scrollContent.on('pointerdown', this.scrollContentPointerDown_handler, this);
        this.scrollContent.on('pointerup', this.scrollContentPointerUp_handler, this);
        this.scrollContent.on('pointerupoutside', this.scrollContentPointerUp_handler, this);
        this.scrollContent.on('pointermove', this.scrollContentPointerMove_handler, this);

      } else if (!this.setVertical && this.setHorizontal && this.scaleDiffHorizontal < 1) {
        this.addChild(this.scrollBgHorizontal);
        this.addChild(this.scrollBarHorizontal);
        this.scrollBarHorizontal.interactive = true;
        this.scrollContent.interactive = true;

        this.scrollBarHorizontal.on('pointerdown', this.scrollBarPointerDownHor_handler, this);
        this.scrollBarHorizontal.on('pointerup', this.scrollBarPointerUpHor_handler, this);
        this.scrollBarHorizontal.on('pointerupoutside', this.scrollBarPointerUpHor_handler, this);
        this.scrollBarHorizontal.on('pointermove', this.scrollBarPointerMoveHor_handler, this);

        //滑动的内容;
        this.scrollContent.on('pointerdown', this.scrollContentPointerDownHor_handler, this);
        this.scrollContent.on('pointerup', this.scrollContentPointerUpHor_handler, this);
        this.scrollContent.on('pointerupoutside', this.scrollContentPointerUpHor_handler, this);
        this.scrollContent.on('pointermove', this.scrollContentPointerMoveHor_handler, this);

      } else if (this.setVertical && this.setHorizontal) {

        if (this.scaleDiffVertical < 1) {
          this.addChild(this.scrollBgVertical);
          this.addChild(this.scrollBarVertical);
          this.scrollBarVertical.interactive = true;
          this.scrollContent.interactive = true;
          this.scrollBarVertical.buttonMode = true;
          this.scrollBarVertical.on('pointerdown', this.scrollBarPointerDown_handler, this);
          this.scrollBarVertical.on('pointerup', this.scrollBarPointerUp_handler, this);
          this.scrollBarVertical.on('pointerupoutside', this.scrollBarPointerUp_handler, this);
          this.scrollBarVertical.on('pointermove', this.scrollBarPointerMove_handler, this);
          //滑动的内容;
          this.scrollContent.on('pointerdown', this.scrollContentPointerDown_handler, this);
          this.scrollContent.on('pointerup', this.scrollContentPointerUp_handler, this);
          this.scrollContent.on('pointerupoutside', this.scrollContentPointerUp_handler, this);
          this.scrollContent.on('pointermove', this.scrollContentPointerMove_handler, this);

        }




        if (this.scaleDiffHorizontal < 1) {
          this.addChild(this.scrollBgHorizontal);
          this.addChild(this.scrollBarHorizontal);
          this.scrollBarHorizontal.interactive = true;
          this.scrollContent.interactive = true;

          this.scrollBarHorizontal.on('pointerdown', this.scrollBarPointerDownHor_handler, this);
          this.scrollBarHorizontal.on('pointerup', this.scrollBarPointerUpHor_handler, this);
          this.scrollBarHorizontal.on('pointerupoutside', this.scrollBarPointerUpHor_handler, this);
          this.scrollBarHorizontal.on('pointermove', this.scrollBarPointerMoveHor_handler, this);

          //滑动的内容;
          this.scrollContent.on('pointerdown', this.scrollContentPointerDownHor_handler, this);
          this.scrollContent.on('pointerup', this.scrollContentPointerUpHor_handler, this);
          this.scrollContent.on('pointerupoutside', this.scrollContentPointerUpHor_handler, this);
          this.scrollContent.on('pointermove', this.scrollContentPointerMoveHor_handler, this);
        }


      }



    }


  }




  //横向的;
  scrollBarPointerDownHor_handler(event) {
    this.canDragScrollerHor = true;


    this.cursorDistPosHor = this.scrollBarHorizontal.toLocal(event.data.global, this.stage);

  }
  scrollBarPointerUpHor_handler(event) {
    this.canDragScrollerHor = false;

  }
  scrollBarPointerMoveHor_handler(event) {

    if (this.canDragScrollerHor) {


      this.scrollBarHorizontal.x = event.data.global.x - this.cursorDistPosHor.x - this.x;
      //限制滚动条可拖动范围
      if (this.scrollBarHorizontal.x <= 0) {
        this.scrollBarHorizontal.x = 0;
      }
      if (this.scrollBarHorizontal.x > this.maxDraggedDistHorizontal) {
        this.scrollBarHorizontal.x = this.maxDraggedDistHorizontal
      }
      //设置滚动条进度
      this.scrollProgressHorizontal = this.scrollBarHorizontal.x / this.maxDraggedDistHorizontal;

      //设置滚动内容的位置；
      this.scrollContent.x = this.scrollProgressHorizontal * (this.maxContentDraggedDistHorizontal) * -1;


    }

  }
  //


  scrollBarPointerDown_handler(event) {
    this.canDragScrollerVer = true;


    this.cursorDistPosVer = this.scrollBarVertical.toLocal(event.data.global, this.stage);


  }

  scrollBarPointerUp_handler() {
    this.canDragScrollerVer = false;


  }

  scrollBarPointerMove_handler(event) {
    if (this.canDragScrollerVer) {


      this.scrollBarVertical.y = event.data.global.y - this.cursorDistPosVer.y - this.y;
      //限制滚动条可拖动范围
      if (this.scrollBarVertical.y <= 0) {
        this.scrollBarVertical.y = 0;
      }
      if (this.scrollBarVertical.y > this.maxDraggedDistVertical) {
        this.scrollBarVertical.y = this.maxDraggedDistVertical
      }
      //设置滚动条进度
      this.scrollProgressVertical = this.scrollBarVertical.y / this.maxDraggedDistVertical;

      //设置滚动内容的位置；
      this.scrollContent.y = this.scrollProgressVertical * (this.maxContentDraggedDistVertical) * -1;


    }
  }

  //内容滑动条
  scrollContentPointerDown_handler(event) {
    this.canDragContentVertical = true;

    this.scrollContentDistPosVertical = this.scrollContent.toLocal(event.data.global, this.stage);


  }

  scrollContentPointerUp_handler() {
    this.canDragContentVertical = false;


  }

  scrollContentPointerMove_handler(event) {
    if (this.canDragContentVertical) {
      this.scrollContent.y = event.data.global.y - this.scrollContentDistPosVertical.y - this.y;

      if (this.scrollContent.y > 0) {
        this.scrollContent.y = 0
      }
      if (this.scrollContent.y < this.maxContentDraggedDistVertical * -1) {
        this.scrollContent.y = this.maxContentDraggedDistVertical * -1
      }
      //进度总路程;
      let percents = this.scrollContent.y / this.maxContentDraggedDistVertical;
      this.scrollBarVertical.y = (percents * this.maxDraggedDistVertical) * -1;


    }

  }
  //内容滑动条--横
  scrollContentPointerDownHor_handler(event) {
    this.canDragContentHorizontal = true;
    this.scrollContentDistPosHorizontal = this.scrollContent.toLocal(event.data.global, this.stage);
  }
  scrollContentPointerUpHor_handler() {
    this.canDragContentHorizontal = false;
  }
  scrollContentPointerMoveHor_handler(event) {
    if (this.canDragContentHorizontal) {
      this.scrollContent.x = event.data.global.x - this.scrollContentDistPosHorizontal.x - this.x;

      if (this.scrollContent.x > 0) {
        this.scrollContent.x = 0
      }
      if (this.scrollContent.x < this.maxContentDraggedDistHorizontal * -1) {
        this.scrollContent.x = this.maxContentDraggedDistHorizontal * -1
      }
      //进度总路程;
      let percents = this.scrollContent.x / this.maxContentDraggedDistHorizontal;
      this.scrollBarHorizontal.x = (percents * this.maxDraggedDistHorizontal) * -1;


    }

  }
  destroyed() {

    super.destroy();
    if (this.setHorizontal) {
      this.scrollBarHorizontal.destroy();
    }
    if (this.setVertical) {
      this.scrollBarVertical.destroy();
    }
    this.scrollContent.destroy();


    this.destroy();


    this.scrollContent = null;
    this.scrollArea = null;
    this.scrollBarVertical = null;
    this.scrollBarHorizontal = null;

    this.scrollWidth = null;
    this.scrollHeight = null;
    this.stage = null;
    this.allowScrollDir = null;
    this.setVertical = null;
    this.setHorizontal = null;

    this.canDragScrollerVer = null;
    this.canDragScrollerHor = null;
    this.canDragContentVertical = null;
    this.canDragContentHorizontal = null;

    this.cursorDistPosVer = null; //鼠标指针和滑动条的位置距离
    this.cursorDistPosHor = null;
    this.scrollContentDistPosVertical = null; //滑动内容与指针的位置距离；
    this.scrollContentDistPosHorizontal = null;

    this.scaleDiffVertical = null; //长度比值;scroll高度与页面长度的比
    this.scaleDiffHorizontal = null; //横向的长度比值；

    this.maxDraggedDistVertical = null;
    this.maxDraggedDistHorizontal = null;

    this.maxContentDraggedDistVertical = null; //内容区域最大可拖动距离
    this.maxContentDraggedDistHorizontal = null; //横轴;
    this.scrollProgressVertical = null; //浏览的进度条;
    this.scrollProgressHorizontal = null;


  }
}

export default PIXIScroll;
