import { join } from 'path'
import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import forms from '@tailwindcss/forms';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import plugin from "tailwindcss";



export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		plugin(({addUtilities, addComponents, e, config}) => {
			const utilities = {};
			const colors = ['surface','primary','secondary','tertiary','success','warning','error'];
			const numbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
			for (const color of colors){
				utilities[`.neon-${color}`] = {
					boxShadow: `0 0 5px rgb(var(--color-${color}-500) / 1), 0 0 20px rgb(var(--color-${color}-700) / 1)`,
				};
				utilities[`.neon-text-${color}`] = {
					textShadow: `0 0 5px rgb(var(--color-${color}-500) / 1), 0 0 20px rgb(var(--color-${color}-700) / 1)`,
				};
			}
			addUtilities(utilities);
		}),
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
					{
						name: 'wintry',
						enhancements: true,
					},
					{
						name: 'crimson',
						enhancements: true,
					},
					{
						name: 'vintage',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;
