<template>
  <div id="app">
    <GameMain/>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import GameMain from '@/views/GameMain.vue'
@Component({
  components:{GameMain}
})
export default class App extends Vue{
  
  
}
</script>


<style lang="scss">
#app {
  position: relative;
  width:19.2rem;
  height:10.8rem;
  margin:0 auto;
  top:50%;
  transform: translate(0,-50%);
  background-color: gray;
}

</style>
