import { consume } from '@lit/context'
import { $LitElement } from '@mhmo91/lit-mixins/src'
import anime from 'animejs'
import { css, html } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { SchmancyEvents, SchmancyTheme, color } from '..'
import {
	SchmancyDrawerSidebarMode,
	SchmancyDrawerSidebarState,
	TSchmancyDrawerSidebarMode,
	TSchmancyDrawerSidebarState,
} from './context'
@customElement('schmancy-drawer-sidebar')
export class SchmancyDrawerSidebar extends $LitElement(css``) {
	@consume({ context: SchmancyDrawerSidebarMode, subscribe: true })
	@state()
	mode: TSchmancyDrawerSidebarMode

	@consume({ context: SchmancyDrawerSidebarState, subscribe: true })
	@state()
	private state: TSchmancyDrawerSidebarState

	@query('#overlay') overlay!: HTMLElement

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('state')) {
			if (this.mode === 'overlay') {
				if (this.state === 'close') {
					this.closeOverlay()
				} else if (this.state === 'open') {
					this.openOverlay()
				}
			} else if (this.mode === 'push') {
				this.overlay.style.display = 'none'
			}
		}
	}

	openOverlay() {
		anime({
			targets: this.overlay,
			opacity: 0.4,
			duration: 500,
			easing: 'cubicBezier(0.5, 0.01, 0.25, 1)',
			begin: () => {
				this.overlay.style.display = 'block'
			},
		})
	}

	closeOverlay() {
		anime({
			targets: this.overlay,
			opacity: [0.4, 0],
			duration: 500,
			easing: 'cubicBezier(0.5, 0.01, 0.25, 1)',
			complete: () => {
				this.overlay.style.display = 'none'
			},
		})
	}

	protected render() {
		const animate = {
			'transition-all transform-gpu duration-[500ms] ease-[cubicBezier(0.5, 0.01, 0.25, 1)]': true,
		}

		const sidebarClasses = {
			'p-[16px] max-w-[360px] w-fit': true,
			block: this.mode === 'push',
			'fixed inset-0 translate-x-[-100%] z-50 min-w-[360px]': this.mode === 'overlay',
			'translate-x-0': this.mode === 'overlay' && this.state === 'open',
			'translate-x-[-100%]': this.mode === 'overlay' && this.state === 'close',
		}
		const overlayClass = {
			'fixed inset-0 z-[49] hidden': true,
		}

		return html`
			<nav
				class="${this.classMap({ ...sidebarClasses, ...animate })}"
				${color({
					bgColor: SchmancyTheme.sys.color.surface.container,
				})}
			>
				<slot></slot>
			</nav>
			<div
				id="overlay"
				${color({
					bgColor: SchmancyTheme.sys.color.scrim,
				})}
				@click=${() => {
					this.dispatchEvent(
						new CustomEvent(SchmancyEvents.DRAWER_TOGGLE, {
							detail: { state: 'close' },
							bubbles: true,
						}),
					)
				}}
				class="${this.classMap({ ...overlayClass })}"
			></div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'schmancy-drawer-sidebar': SchmancyDrawerSidebar
	}
}
