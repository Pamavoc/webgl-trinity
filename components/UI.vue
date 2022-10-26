<template>
    <div class="ui">
        <button class="button-start" @click="startAudio">Start</button>
       <!-- <AudioManager v-if="audio_started.value === true"></AudioManager>   -->
    </div>
</template>
<script setup>
const emitter = useEmitter()
const audio_started = ref(false)

function startAudio() {
     console.log('started')
    audio_started.value = true
    emitter.emit('audio_started')
}

</script>


<style lang="scss">
.ui {
    position: fixed;
    top: 50px;
    z-index: 99999;
}

</style>