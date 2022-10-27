import { Howl, Howler } from 'howler';



export default class Audio {
	sounds: any

	constructor() {		
		this.load()		
	}
	
	
	start(){
		this.play('sound_intro')
	}

	load() {
		this.sounds = {
			sound_intro: new Howl({
				src: ['/sounds/sound-reco.mp3'],
			}),
			sound_hillz: new Howl({
				src: ['/sounds/sound-hillz.mp3'],
			}),
		}
	}

	play(sound: string) {
		this.sounds[sound].play()
	}

	stop(sound: string) {

		this.sounds[sound].stop()
	}

	
}