import { $LitElement } from '@mixins/index'
import '@schmancy/index'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@lit-labs/virtualizer'
import { fullHeight } from '../../src/directives/height'
import './features/index'
import { DemoInput } from './features/index'
@customElement('schmancy-demo')
export default class SchmancyDemo extends $LitElement() {
	connectedCallback(): void {
		super.connectedCallback()
	}

	render() {
		return html`
			<schmancy-theme root>
				<schmancy-surface ${fullHeight()} type="container">
					<schmancy-nav-drawer>
						<schmancy-nav-drawer-navbar width="220px">
							<demo-nav> </demo-nav>
						</schmancy-nav-drawer-navbar>
						<schmancy-nav-drawer-content class="pl-2">
							<schmancy-nav-drawer-appbar .toggler=${true} class="py-2">
								<schmancy-typography>Title</schmancy-typography>
							</schmancy-nav-drawer-appbar>
							<schmancy-surface class="px-4 py-6 mb-12" type="surface" rounded="left">
								<schmancy-area name="main" .default=${DemoInput}></schmancy-area>
							</schmancy-surface>
						</schmancy-nav-drawer-content>
					</schmancy-nav-drawer>
				</schmancy-surface>
			</schmancy-theme>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'schmancy-demo': SchmancyDemo
	}
}
