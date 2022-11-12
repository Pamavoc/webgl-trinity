<template>
    <div class="ui-permanent">
    
        <div class="ui-content">
            <img src="/images/tr.svg" alt="">
    
            <nav>
                <NuxtLink to="/">HOME</NuxtLink>
                <NuxtLink to="/studio">STUDIO</NuxtLink>
            </nav>
    
            <button class="button-fullscreen" @click="toggle">
                <img src="/images/fullscreen.svg" alt="">
            </button>
        </div>
    
    </div>

    <div class="ui">   
        
        <div class="end-credit">
            <NuxtLink class="txt_uppercase" to="https://twitter.com/polygon1993" target="_blank" rel="noopener">@polygon1993 for Trinity video assets and scenography. </NuxtLink> 
            <p class="txt_uppercase">Laylow Live experience from Olympia, Paris - 5 March 2020</p>
            <img src="/images/trinity-logo.svg" alt="">
            <img src="/images/gobelins.svg" alt="">
            <img src="/images/lay-logo.svg" alt=""> 
        </div>

        <button class="button-start" @click="startAudio">
            <div class="border-top"></div>
            <p>START</p>
            <div class="border-bottom"></div>
        </button>
       
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
     // toggle()
     audio_started.value = true
    

     emitter.emit('audio_started')

     setTimeout(() => {
        audio.play('sound_hillz')
     }, 2000);
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Matrix Code NFI';
}

.txt_uppercase {
    text-transform: uppercase;
}
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


.ui-permanent {

    position: fixed;
    top: 0px;
    width: 100%;
   

    .ui-content {
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;

        nav {
            a {
                color: #1ECA9A;
                font-size: 14px;
                text-decoration: none;
                margin: 0.5rem;
            }
        }

        .button-fullscreen {
            background: none;
            border: none;
            cursor: pointer;
        
        }
    }




}

.ui {
    position: fixed;
    top: 0px;
    // z-index: 99999;
    width: 100vw;


    .end-credit {
        padding:2rem;
        overflow: hidden;
        
        img {
            width: 100px;
        }
    }
    
    
    .button-start {
        position: fixed;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        font-family: 'Matrix Code NFI', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 0.345em;
        background: none;
        width: 200px;
        border:none;
        // padding: 6px 22px 12px 22px;
        color: #1ECA9A;
        transition: all 0.35s ease-in-out;
        border-radius: 5.38462px;

        .border-bottom, .border-top {
            height: 1px;
            width: 100%;
            background: #1ECA9A;
        }

        p {

            padding-top: 9px;
            padding-bottom: 12px;
            //padding: 6px 22px 12px 22px;
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