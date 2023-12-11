const SchmancyTheme = {
	sys: {
		color: {
			outline: 'var(--schmancy-sys-color-outline)',
			surface: {
				default: 'var(--schmancy-sys-color-surface-default)',
				low: 'var(--schmancy-sys-color-surface-low)',
				high: 'var(--schmancy-sys-color-surface-high)',
				highest: 'var(--schmancy-sys-color-surface-highest)',
				lowest: 'var(--schmancy-sys-color-surface-lowest)',
				on: 'var(--schmancy-sys-color-surface-on)',
				onVariant: 'var(--schmancy-sys-color-surface-onVariant)',
			},
			primary: {
				default: 'var(--schmancy-sys-color-primary-default)',
				on: 'var(--schmancy-sys-color-primary-on)',
				container: 'var(--schmancy-sys-color-primary-container)',
				onContainer: 'var(--schmancy-sys-color-primary-onContainer)',
			},
			secondary: {
				default: 'var(--schmancy-sys-color-secondary-default)',
				on: 'var(--schmancy-sys-color-secondary-on)',
				container: 'var(--schmancy-sys-color-secondary-container)',
				onContainer: 'var(--schmancy-sys-color-secondary-onContainer)',
			},
			tertiary: {
				default: 'var(--schmancy-sys-color-tertiary-default)',
				on: 'var(--schmancy-sys-color-tertiary-on)',
				container: 'var(--schmancy-sys-color-tertiary-container)',
				onContainer: 'var(--schmancy-sys-color-tertiary-onContainer)',
			},
			error: {
				default: 'var(--schmancy-sys-color-error-default)',
				on: 'var(--schmancy-sys-color-error-on)',
				container: 'var(--schmancy-sys-color-error-container)',
				onContainer: 'var(--schmancy-sys-color-error-onContainer)',
			},
			success: {
				default: 'var(--schmancy-sys-color-success-default)',
				on: 'var(--schmancy-sys-color-success-on)',
				container: 'var(--schmancy-sys-color-success-container)',
				onContainer: 'var(--schmancy-sys-color-success-onContainer)',
			},
		},
		elevation: {
			0: 'var(--schmancy-sys-elevation-0)',
			1: 'var(--schmancy-sys-elevation-1)',
			2: 'var(--schmancy-sys-elevation-2)',
			3: 'var(--schmancy-sys-elevation-3)',
			4: 'var(--schmancy-sys-elevation-4)',
			5: 'var(--schmancy-sys-elevation-5)',
		},
		outline: {
			1: 'var(--schmancy-sys-outline-1)',
		},
	},
}
const theme = {
	theme: SchmancyTheme,
}

export type TSchmancyTheme = (typeof theme)[keyof typeof theme]

export { SchmancyTheme }