<template>
    <div class="ui">

        <button class="button-start" @click="startAudio">Start</button>
        <button class="fullscreen" @click="toggle"></button>
       <!-- <AudioManager v-if="audio_started.value === true"></AudioManager>   -->
        <p class="credit">
            @polygon1993 for Trinity video assets and scenography. <br>
        </p>
    </div>
</template>
<script setup>
const { toggle, isFullscreen } = useFullscreen(el)
const emitter = useEmitter()
const audio = useHowler()
const audio_started = ref(false)

const startAudio = () => {
     console.log('started')
     audio.start()
    
     audio_started.value = true
    
     emitter.emit('audio_started')

     setTimeout(() => {
        audio.play('sound_hillz')
     }, 2000);
}


</script>


<style lang="scss">

//@import url('http://fonts.cdnfonts.com/css/matrix');

.hide {
    display: none;
}

.ui {
    font-family: 'Matrix Code NFI', sans-serif;
    position: fixed;
    top: 50px;
   // z-index: 99999;
    //width: 100vw;
    //height: 100vh;

    .credit {

    }
    

    .button-start {
        position: fixed;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        font-family: 'Matrix Code NFI', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 15px;
        letter-spacing: 0.345em;
        background: none;
        padding: 12px 22px;
        border: 1px solid #1ECA9A;
        color: #1ECA9A;
        transition: all 0.35s ease-in-out;
        
        border-radius: 5.38462px;

        &:hover {
            border: 1px solid #c9fdff;
            letter-spacing: 0.465em;
            transform: translate(-50%, -50%) scale(0.98);
        }
    }
}

</style>