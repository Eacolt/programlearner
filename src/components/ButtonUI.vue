<template>
  <div
    class="ButtonUIVue"
    :style="ButtonUIStyle"
    @mousedown="btn_mousedown()"
    @mouseup="btn_mouseup()"
    @mouseenter="btn_enter()"
    @mouseleave="btn_leave()"
  >
    <div ref="normal" class="normalstatus" v-if="normalUrl !== '#'" v-show="btnstatus===1">
      <img draggable="false" :src="normalUrl" width="100%" height="100%">
    </div>

    <div ref="enter" class="normalstatus" v-if="enterUrl !== '#'" v-show="btnstatus===2">
      <img draggable="false" :src="enterUrl" width="100%" height="100%">
    </div>

    <div ref="down" class="normalstatus" v-if="downUrl !== '#'" v-show="btnstatus===3">
      <img draggable="false" :src="downUrl" width="100%" height="100%">
    </div>

    <div ref="disable" class="normalstatus" v-if="disableUrl !== '#'" v-show="btnstatus===4">
      <img draggable="false" :src="disableUrl" width="100%" height="100%">
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
@Component
export default class ButtonUI extends Vue {
  @Prop({
    default: function() {
      return [];
    }
  })
  enableStatus!: string[];

  @Prop({default:1})
  status!:number;



  @Prop({ default: "#" })
  normalUrl!: string;

  @Prop({ default: "#" })
  downUrl!: string;

  @Prop({ default: "#" })
  enterUrl!: string;

  @Prop({default:'#'})
  disableUrl!:string;

  @Prop({ default: 1 })
  width!: number;
  @Prop({ default: 1 })
  height!: number;

  private btnstatus: number = -1;
  private clickedTime:number = 0;

  get ButtonUIStyle() {
    return {
      width: this.width + "rem",
      height: this.height + "rem"
    };
  }

  @Emit()
  buttonTap(){}
  @Emit()
  buttonDown(){}
  @Emit()
  buttonUp(){

  }
  @Emit()
  buttonEnter(){}
  @Emit()
  buttonLeave(){

  }
  btn_mousedown() {

    if(this.status === 4)return;
    this.clickedTime = new Date().getTime();
    if (this.enableStatus.indexOf("down") === -1 || this.downUrl === "#") {
      return;
    }

    this.btnstatus = 3;
    this.buttonDown();
    console.log("mouse down", this.downUrl);
  }
  btn_mouseup() {
      if(this.status === 4)return;
    this.clickedTime = new Date().getTime() - this.clickedTime;

    if(this.clickedTime<200){
        this.buttonTap();
    }
    this.btnstatus = 1;
    this.buttonUp();
    console.log("mouse up");
  }
  btn_enter() {
   
      if(this.status === 4)return;
    if (this.enableStatus.indexOf("enter") === -1 || this.enterUrl === "#") {
      return;
    }
    this.btnstatus = 2;
    this.buttonEnter();

  }
  btn_leave() {
      if(this.status === 4)return;
    this.btnstatus = 1;
    this.buttonLeave();

  }

  @Watch('status')
  enabledHandler(newval:any){
     this.btnstatus = this.status;
  }
  mounted() {
      let self = this;
       self.btnstatus = self.status;

  
  }
}
</script>
<style lang="scss" scoped>
img {
  position: relative;
  display: block;
}
.ButtonUIVue {
  position: relative;
  cursor: pointer;

  .normalstatus {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
