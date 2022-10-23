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
			backgroundMusic: new Howl({
				src: ['@/assets/sounds/Main_Soundtrack.mp3'],
				loop: true,
				volume: 0.5
			}),
			fireworks: new Howl({
				src: ['@/assets/sounds/fireworks_sound.mp3'],
			}),
			chrono: new Howl({
				src: ['@/assets/sounds/chrono_debate_sound.mp3'],
			}),
			train: new Howl({
				src: ['@/assets/sounds/Train_sound.mp3'],
			}),
			industry: new Howl({
				src: ['@/assets/sounds/Usine_sound.mp3'],
				loop: true,
			}),
			clock: new Howl({
				src: ['@/assets/sounds/horloge_hoteldeville_sound.mp3'],
			}),
			crowd: new Howl({
				src: ['@/assets/sounds/population_sound.mp3'],
				loop: true,
			}),
			nature: new Howl({
				src: ['@/assets/sounds/nature_champs_farm_sound.mp3'],
				loop: true,
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