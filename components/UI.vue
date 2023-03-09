<template>
    <div class="ui-permanent">
    
        <div class="ui-content">
            <img src="~/assets/images/tr.svg" alt="">
    
            <nav v-if="devMode">
                <NuxtLink to="/">HOME</NuxtLink>
                <NuxtLink to="/studio">STUDIO</NuxtLink>
            </nav>
    
            <button class="button-fullscreen" @click="toggle">
                <img src="~/assets/images/fullscreen.svg" alt="">
            </button>
        </div>
    
    </div>

    <div class="ui">   
        
        <div class="end-credit">
        
            <div class="top-credit">
                <p class="txt_uppercase">Thanks for watching </p>
                <p class="txt_uppercase">Laylow <NuxtLink class="txt_uppercase" to="https://www.olympiahall.com/" target="_blank" rel="noopener">@Olympia</NuxtLink></p>
            </div>

            <div class="border"></div>

            <div class="link"><NuxtLink class="txt_uppercase" to="https://twitter.com/polygon1993" target="_blank" rel="noopener">@polygon1993</NuxtLink> <p class="txt_uppercase">video assets</p></div>
            <div class="link"><NuxtLink class="txt_uppercase" to="https://eliottgrunewald.xyz/work" target="_blank" rel="noopener">@eliottgrunewald</NuxtLink> <p class="txt_uppercase">trinity typography</p></div>
            <div class="link"><NuxtLink class="txt_uppercase" to="https://www.instagram.com/jey.laylow/" target="_blank" rel="noopener">@laylow</NuxtLink>  <NuxtLink class="txt_uppercase" to="https://laylow.lnk.to/Trinity" target="_blank" rel="noopener">MUSIC</NuxtLink></div> 
            <div class="link"><NuxtLink class="txt_uppercase" to="https://twitter.com/pamavoc__" target="_blank" rel="noopener">@pamavoc</NuxtLink>  <p class="txt_uppercase" target="_blank" rel="noopener">3D AND DEVELOPMENT</p></div> 

            <div class="logos">
                <NuxtLink to="https://open.spotify.com/album/0JMZmkRaNLaGUWayBrHOMa"><img src="~/assets/images/trinity-logo.svg" alt=""></NuxtLink>
                <NuxtLink to="https://www.gobelins.fr/"><img src="~/assets/images/gobelins-light.svg" alt="Gobelins"></NuxtLink>
                <NuxtLink to="https://www.laylow.fr/"><img src="~/assets/images/lay-logo.svg" alt=""></NuxtLink>
            </div>

            <p class="txt_uppercase disclaimer">Project done as a class project, I don't have any rights for typography used for logos and videos assets. It's a proof of concept.</p>
        
            <button class="button-start mt-4" @click="startAudio()" id="restart">
                <div class="border-top"></div>
                <p>RE-PLAY</p>
                <div class="border-bottom"></div>
            </button>
        </div>
    </div>

    <button class="button-start" id="start" @click="startAudio">
            <div class="border-top"></div>
            <p>START</p>
            <div class="border-bottom"></div>
    </button>


</template>
<script setup>
const { toggle } = useFullscreen()
const emitter = useEmitter()
const audio = useHowler()
const devMode = useDevMode()
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
    z-index: 2;

  

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

.mt-4 {
    margin-top: 16px;
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

.ui {
    position: fixed;
    top: 120px;
    opacity: 0;
    

    @media screen and (min-width: 1024px) {
        top: 200px;
    }

    
        
    // z-index: 99999;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1ECA9A;

    a {
        color: #1ECA9A;
    }
    

    .end-credit {
        overflow: hidden;
        max-width: 1600px;
      
        @media screen and (max-width: 768px) {
            width: 100%;
        }

        @media screen and (min-width: 1024px) {
            width: 30%;
            max-width: 500px;
        }

        
        font-size: 12px;
        padding: 1rem 2rem;

        .top-credit {
            text-align: center;
            margin-bottom: 24px;
            font-size: 14px;
        }
    
    }

    .disclaimer  {
        font-size: 10px;
        margin-top: 24px;
    }

    .link {
        display: flex;
        justify-content: space-between;
        margin: 16px 0px;
    }

    .border {
            height: 1px;
            width: 100%;
            background: #1ECA9A;
    }

    .logos {
        padding-top: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        height: fit-content;
        border-top: #1ECA9A solid 1px;

        img {
           height: 36px;
        }
    }

}
</style>