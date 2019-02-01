<template>
  <div ref="gameMain" id="gameMain">
    <PIXICanvas ref="pixicanvas"/>
  
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PIXICanvas from "@/components/PixiCanvas.vue";
import Labs from '@/labs/Labs'
import GameMainScene from '@/views/GameMainScene.ts'
import SwiperMain from '@/views/Main.vue'
import Axios from 'axios'
import * as PIXI from "pixi.js";

@Component({
  components: {
    PIXICanvas,
    SwiperMain
  }
})
export default class GameMain extends Vue {
  mounted() {
    console.log(this.$refs.pixicanvas, "<<<<");


    let canvas: PIXICanvas = this.$refs.pixicanvas as PIXICanvas;
    canvas.inited().then(() => {
      console.log("画布初始化成功");


      this.gameStart().then((res) => {
   
        

      Labs.SceneManager.Application = canvas.getApplication();
    
      Labs.SceneManager.stage = canvas.getApplication().stage;
      Labs.SceneManager.run(new GameMainScene())

      });
    });
  }
  promiseLoadGameConfig() {
    return new Promise((resolve: any, reject: any) => {
      Axios.get("./gameConfig.json").then((res: any) => {
        resolve(res.data);
      });
    });
  }
  promiseLoadGameRes(_reslist: any[]) {
    return new Promise((resolve: any) => {
      PIXI.loader.add(_reslist).load(() => {
        resolve();
      });
    });
  }
  async gameStart() {
    let gameConfig: any = await this.promiseLoadGameConfig();
    await this.promiseLoadGameRes(gameConfig.base);
    return gameConfig;
  }
}
</script>
<style>
.mycanvas {
  position: absolute;
  width: 19.2rem;
  height: 10.8rem;
}
</style>
