import { Howl, Howler } from 'howler';



export default class Audio {
	sounds: any
	audio_manager: any

	constructor() {

	
		
		this.load()		
	}
	
	
	start(){
		this.play('trinity_intro')

	}

	load() {
		this.sounds = {
			trinity_intro: new Howl({
				src: ['/sounds/Initialisation.mp3'],
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