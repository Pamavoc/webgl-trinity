import { Howl, Howler } from 'howler';

export default class Audio {
	sounds: any

	constructor() {

		this.load()		
	}
	
	start(){
		this.play('backgroundMusic')
		this.play('crowd')
		this.play('nature')
		this.play('industry')

	}

	load() {
		this.sounds = {
			train: new Howl({
				src: ['@/assets/sounds/Train_sound.mp3'],
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