import { $LitElement } from '@mhmo91/lit-mixins/src'
import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('demo-list')
export class DemoList extends $LitElement(css`
	:host {
		display: block;
	}
`) {
	render() {
		return html`
			<schmancy-grid gap="md">
				<schmancy-typography type="title">Standard list items</schmancy-typography>
				<schmancy-list class="rounded-full">
					<schmancy-list-item>
					<schmancy-icon slot="leading">book_online</schmancy-icon>
					Mahatma Gandhi
						<div slot="support">Be the change that you wish to see in the world.</div>
						<div slot="trailing"><img src="telephone.svg" /></div>
					</schmancy-list-item>
					<schmancy-list-item>
					<schmancy-icon slot="leading">book_online</schmancy-icon>
						J.K. Rowling
						<div slot="support">
							“If you want to know what a man's like, </br> take a good look at how he treats his inferiors, not his equals.”
						</div>
					</schmancy-list-item>
				</schmancy-list>

				<schmancy-divider></schmancy-divider>

				<schmancy-typography type="title">Rounded list items</schmancy-typography>
				<schmancy-list>
					<schmancy-list-item rounded selected>
					<schmancy-icon slot="leading">book_online</schmancy-icon>
					Bookings
					</schmancy-list-item>
					<schmancy-list-item rounded>
						Rooms
					</schmancy-list-item>
					<schmancy-list-item rounded>
						locks
					</schmancy-list-item>
				</schmancy-list>

			</schmancy-grid>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'demo-list': DemoList
	}
}
