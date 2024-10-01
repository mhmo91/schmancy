import { provide } from '@lit/context'
import TailwindElement from '@schmancy/mixin/tailwind/tailwind.mixin'
import { TSurfaceColor } from '@schmancy/types/surface'
import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SchmancyListTypeContext } from './context'

/**
 * @slot - The default slot.
 */
@customElement('schmancy-list')
export class List extends TailwindElement(css`
	:host {
		display: block;
		padding-top: 8px;
		padding-bottom: 8px;
	}
`) {
	/**
	 * The type of list.
	 * @attr type
	 * @type {SchmancyListType}
	 * @default 'surface'
	 */
	@provide({ context: SchmancyListTypeContext })
	@property()
	surface: TSurfaceColor = 'container'

	render() {
		return html`
			<schmancy-surface type=${this.surface}>
				<ul>
					<slot></slot>
				</ul>
			</schmancy-surface>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'schmancy-list': List
	}
}
