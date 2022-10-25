import mitt from 'mitt'

export default defineNuxtPlugin(() => {
	return {
	  provide: {
		emitter: mitt()
	  }
	}
})