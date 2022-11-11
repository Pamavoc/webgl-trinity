<template>
    <div class="ui">   
        <div class="debug-menu">
            <NuxtLink to="/">HOME</NuxtLink>
            <NuxtLink to="/studio">STUDIO</NuxtLink>
        </div>

        <div class="end-credit">
            <NuxtLink to="https://twitter.com/polygon1993" target="_blank" rel="noopener">@polygon1993</NuxtLink> 
            for Trinity video assets and scenography. 

            <p>Laylow Live experience from Olympia, Paris - 5 March 2020</p>
            <img src="/images/trinity-logo.svg" alt="">
            <img src="/images/gobelins.svg" alt="">
            <img src="/images/lay-logo.svg" alt=""> 
        </div>

        <button class="button-start" @click="startAudio">
            <div class="border-top"></div>
            <p>START</p>
            <div class="border-bottom"></div>
        </button>
        <!-- <button class="button-fullscreen" @click="toggle">
            <img src="/images/fullscreen.svg" alt="">
        </button>     -->
    </div>
</template>
<script setup>
const { toggle } = useFullscreen()
const emitter = useEmitter()
const audio = useHowler()

const audio_started = ref(false)

const startAudio = () => {
     console.log('started')
     audio.start()
     toggle()
     audio_started.value = true
    
     emitter.emit('audio_started')

     setTimeout(() => {
        audio.play('sound_hillz')
     }, 2000);
}
</script>

<style lang="scss">

//@import url('http://fonts.cdnfonts.com/css/matrix');


.webgl-infos {
	position: absolute;
	left: 10px;
	bottom: 10px;
	font-size: 8px;
	opacity: 0.5;
	color: #fff;
}



.hide {
    display: none;
}

.ui {
    font-family: 'Matrix Code NFI', sans-serif;
    //font-family: 'Matrix Code NFI', sans-serif;
    position: fixed;
    top: 50px;
    // z-index: 99999;
    width: 100vw;


    .end-credit {
        padding:2rem;
        overflow: hidden;
        
        img {
            width: 100px;
        }
    }
    
    .debug-menu {
        display: flex;
        justify-content: center;

        a {
            color:#1ECA9A;
            font-size: 14px;
            text-decoration: none;
            margin: 0.5rem;
        }
    }
    .button-fullscreen {
        background: none;
        border: none;
        position: fixed;
        top: 90%;
        left: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
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
        font-size: 16px;
        letter-spacing: 0.345em;
        background: none;
        width: 200px;
        border:none;
        
        color: #1ECA9A;
        transition: all 0.35s ease-in-out;
        border-radius: 5.38462px;

        .border-bottom, .border-top {
            height: 1px;
            width: 100%;
            background: #1ECA9A;
        }

        p {
            margin:0;
            padding: 6px 22px 12px 22px;
        }

        &:hover {

            .button-start p {
                letter-spacing: 0.65em;

            }
            transform: translate(-50%, -50%) scale(0.98);
        }
    }
}

</style>