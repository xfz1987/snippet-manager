import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				main: {
					900: '#0A0B0F',
					800: '#141519',
					700: '#1A1B1F',
					600: '#2E2F34',
					500: '#404145',
					400: '#525357',
					300: '#646569',
					200: '#76777C',
					100: '#88898D',
					50: '#AAAAAF',
				},
			},
		},
	},
	plugins: [],
};
export default config;
