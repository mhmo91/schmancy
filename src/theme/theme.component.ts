import { argbFromHex, themeFromSourceColor } from '@material/material-color-utilities'
import { TailwindElement } from '@mixins/tailwind.mixin'
import { html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Observable, startWith } from 'rxjs'
import { formateTheme } from './theme.format'
import { TSchmancyTheme } from './theme.interface'
import style from './theme.style.css?inline'
export const tailwindStyles = unsafeCSS(style)
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const $colorScheme = new Observable<string>(subscriber => {
	const handler = (e: MediaQueryListEvent) => {
		const newColorScheme = e.matches ? 'dark' : 'light'
		subscriber.next(newColorScheme)
	}
	mediaQuery.addEventListener('change', handler)

	// Emit the initial value
	const initialColorScheme = mediaQuery.matches ? 'dark' : 'light'

	subscriber.next(initialColorScheme)

	// On unsubscribe, remove the event listener
	return () => mediaQuery.removeEventListener('change', handler)
})

@customElement('schmancy-theme')
export class SchmancyThemeComponent extends TailwindElement(tailwindStyles) {
	@property({ type: String }) color: string = this.generateRandomColor()
	@property({ type: String }) scheme: 'dark' | 'light' = 'light'

	connectedCallback(): void {
		super.connectedCallback()
		// Trigger any other effects you have

		$colorScheme.pipe(startWith(this.scheme)).subscribe(scheme => {
			this.scheme = scheme as 'dark' | 'light'
			this.registerTheme()
		})
	}
	registerTheme() {
		let theme = formateTheme(themeFromSourceColor(argbFromHex(this.color)), this.scheme === 'dark' ? true : false)

		this.registerThemeValues('schmancy', '', theme)
	}

	registerThemeValues(prefix = 'schmancy', path: string, value: Partial<TSchmancyTheme>): string | undefined {
		// if the value is an object
		if (typeof value === 'object') {
			// generate the code for each property of the object
			return Object.keys(value)
				.map(key => {
					// if the path is empty, don't add a dash
					return this.registerThemeValues(
						prefix,
						path + `${path ? '-' : ''}` + key,
						// @ts-ignore
						value[key],
					)
				})
				.join('\n')
		} else {
			;(this.shadowRoot.host as HTMLElement).style.setProperty(`--${prefix}-${path}`, value)

			return
		}
	}
	generateRandomColor() {
		// Generates a random hexadecimal color code
		const randomColor = Math.floor(Math.random() * 16777215).toString(16)
		// Pad with leading zeros if necessary to ensure 6 characters
		return '#' + randomColor.padStart(6, '0')
	}

	protected render(): unknown {
		return html`<slot></slot>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'schmancy-theme': SchmancyThemeComponent
	}
}
