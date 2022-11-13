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
	app: {
		head: {
			charset: 'utf-16',
			title: 'LAYLOW - OLYMPIA LIVE EXPERIENCE',
			meta: [
				{ name: 'description', content: "Rediscover Laylow's concert stage at @L'Olympia which took place on March 5, 2020" },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://webgl-trinity.vercel.app/' },
				{ property: 'og:title', content: '' },
				{ property: 'og:description', content: '' },
				{ property: 'og:image', content: '/meta.jpg' },
				{ property: 'twitter:card', content: 'summary_large_image' },
				{ property: 'twitter:url', content: 'https://webgl-trinity.vercel.app/' },
				{ property: 'twitter:title', content: 'LAYLOW - OLYMPIA LIVE EXPERIENCE' },
				{ property: 'twitter:description', content: '' },
				{ property: 'twitter:image', content: '/meta.jpg' }
			],
		}
	},

	vite: {
		plugins: [glsl()],
		define: {
			"process.env.TESS_ENV": process.env.ENV,
		},
		css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/assets/styles/main.scss";`
                },
            },
        },
	} 
})
