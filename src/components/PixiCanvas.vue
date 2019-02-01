<template>
    <div ref="pixicanvas" class="PIXICanvasComponent">

    </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'
import * as PIXI from 'pixi.js'
var CanvasApp:any;
@Component
export default class PixiCanvas extends Vue{
    @Prop({default:1920})
    canvasWidth!:number;
    @Prop({default:1080})
    canvasHeight!:number;

    @Prop({default:19.20})
    widthRem!:number;
    @Prop({default:10.80})
    heightRem!:number;


    mounted(){
        var self = this;
         CanvasApp = new PIXI.Application({
             width:self.canvasWidth,
             height:self.canvasHeight,
             transparent:true
         });
        let pixicanvas:HTMLDivElement = this.$refs.pixicanvas as HTMLDivElement;
        CanvasApp.view.style.position = 'absolute';
        CanvasApp.view.style.left = '0px';
        CanvasApp.view.style.top = '0px';
        CanvasApp.view.style.width = '100%';
        CanvasApp.view.style.height = '100%';
        pixicanvas.appendChild(CanvasApp.view);  

        pixicanvas.style.position = 'relative';
        pixicanvas.style.width = self.widthRem+'rem';
        pixicanvas.style.height = self.heightRem+'rem';
    }
    getApplication(){
        return CanvasApp;
    }
    // canvasInited(){
    //      let pixicanvas:HTMLDivElement = this.$refs.pixicanvas as HTMLDivElement;
    //     return new Promise((resolve:any,reject:any)=>{
    //         let st = setInterval(()=>{
    //             if(pixicanvas.children.length>=1){
    //                 clearInterval(st);
    //                 resolve();
    //             }
    //         },10)
    //     })

    // }
    loadedResource(){
        return new Promise((resolve:any,reject:any)=>{
            resolve();
        })
    }
    async inited(){
        await this.loadedResource();


    }
};
</script>
<style lang="scss" scoped>
.PIXICanvasComponent{
    position: relative;
  
    padding:0;
    margin:0;
    box-sizing: border-box;
    overflow: hidden;
}
</style>
