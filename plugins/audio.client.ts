import AudioManager from "@/classes/utils/audio";

export default defineNuxtPlugin(() => {
	return {
	  provide: {
		audio_manager: new AudioManager()
	  }
	}
})