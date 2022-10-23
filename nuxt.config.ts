// https://v3.nuxtjs.org/api/configuration/nuxt.config
import glsl from 'vite-plugin-glsl';


export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
    ],
    build: {
		transpile: ['three'],
	},

	buildModules: [
		'@vueuse/nuxt',
	],

	vite: {
		plugins: [glsl()],
		define: {
			"process.env.TESS_ENV": process.env.ENV,
		},
	} 
})
