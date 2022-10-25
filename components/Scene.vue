<template>
  <div class="container-canvas">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, render, onUnmounted } from 'vue';
import WebGL from '@/classes/WebGL';


export default defineComponent({
  setup() {
    onMounted(() => {

      const raf = useRAF();
      const emitter = useEmitter();
      
  
  
      const webGL = new WebGL({ emitter });
      raf.subscribe('WebGL', () => { 
        webGL.update();

       
      });

    });

    onUnmounted(() => {
      const raf = useRAF();
      raf.unsubscribe('WebGL');
    });
  },
});
</script>

<style lang="sass" scoped>
  
.container-canvas
  position: fixed
  top: 0
  left: 0
  height: 100vh
  width: 100vw
  

  canvas
    height: 100%
    width: 100%
    // opacity: 0.03
</style>
