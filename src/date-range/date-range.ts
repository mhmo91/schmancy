import { $LitElement } from '@mhmo91/lit-mixins/src'
import { SchmancyInputChangeEvent } from '@schmancy/input'
import SchmancyMenu from '@schmancy/menu/menu'
import { html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import moment from 'moment'

@customElement('schmancy-date-range')
export default class SwiftHRAdminDateRange extends $LitElement() {
	@property({ type: String }) type: 'datetime-local' | 'date' = 'date'
	@property({ type: Object }) dateFrom!: {
		label: string
		value: string
	}
	@property({ type: Object }) dateTo!: {
		label: string
		value: string
	}

	@query('#checkin') checkInInput!: HTMLInputElement
	@query('#checkout') checkOutInput!: HTMLInputElement

	@property({ type: String }) minDate: string | undefined
	@property({ type: String }) maxDate!: string | undefined
	@query('schmancy-menu') schmancyMenu!: SchmancyMenu

	presetRanges: Array<{
		label: string
		range: { dateFrom: moment.Moment; dateTo: moment.Moment }
	}> = [
		{
			label: 'Yesterday',
			range: {
				dateFrom: moment().subtract(1, 'days'),
				dateTo: moment().subtract(1, 'days'),
			},
		},
		{
			label: 'Today',
			range: {
				dateFrom: moment().startOf('day'),
				dateTo: moment().endOf('day'),
			},
		},
		{
			label: 'This Week',
			range: {
				dateFrom: moment().startOf('week'),
				dateTo: moment().endOf('week'),
			},
		},
		{
			label: 'This Month',
			range: {
				dateFrom: moment().startOf('month'),
				dateTo: moment().endOf('month'),
			},
		},
		// { label: "Custom", range: () => this.setCustomRange() },
	]

	setDateRange(fromDate: moment.Moment, toDate: moment.Moment) {
		this.dateFrom.value = fromDate.format('YYYY-MM-DD')
		this.dateTo.value = toDate.format('YYYY-MM-DD')
		this.dispatchEvent(
			new CustomEvent<TSchmancDateRangePayload>('change', {
				detail: {
					dateFrom: this.dateFrom.value,
					dateTo: this.dateTo.value,
				},
			}),
		)
		this.requestUpdate()
	}

	handlePresetChange(presetLabel: string) {
		const preset = this.presetRanges.find(range => range.label === presetLabel)
		if (preset) {
			const { dateFrom, dateTo } = preset.range
			this.setDateRange(dateFrom, dateTo)
		}
	}

	render() {
		return html`
			<div class="date-range-selector relative">
				<schmancy-menu class="z-100">
					<schmancy-button variant="outlined" slot="button" type="button">Select Date Range</schmancy-button>

					${this.presetRanges.map(
						preset => html`
							<schmancy-menu-item @click=${() => this.handlePresetChange(preset.label)}>
								${preset.label}
							</schmancy-menu-item>
						`,
					)}
					<schmancy-surface elevation="2">
						<schmancy-grid gap="sm" flow="row" class="p-4">
							<schmancy-input
								id="checkin"
								min=${ifDefined(this.minDate)}
								type=${this.type}
								label="${this.dateFrom.label}"
								.value=${this.dateFrom.value}
								@change=${(event: SchmancyInputChangeEvent) => {
									event.preventDefault()
									event.stopPropagation()
									const selectedDate = moment(event.detail.value)
									this.dateFrom.value = selectedDate.format('YYYY-MM-DD')
									const minDateStr = selectedDate.toISOString().split('T')[0]
									this.checkOutInput.setAttribute('min', minDateStr)
								}}
							></schmancy-input>
							<schmancy-input
								id="checkout"
								type=${this.type}
								label="${this.dateTo.label}"
								.value=${this.dateTo.value}
								@change=${(event: SchmancyInputChangeEvent) => {
									event.preventDefault()
									event.stopPropagation()
									this.dateTo.value = event.detail.value
								}}
							></schmancy-input>

							<schmancy-button
								variant="outlined"
								@click=${(e: Event) => {
									e.preventDefault()
									e.stopPropagation()
									this.setDateRange(moment(this.dateFrom.value), moment(this.dateTo.value))
									this.schmancyMenu.open = false
								}}
							>
								Apply
							</schmancy-button>
						</schmancy-grid>
					</schmancy-surface>
				</schmancy-menu>
			</div>
		`
	}
}

export type SchmancyDateRangeChangeEvent = CustomEvent<TSchmancDateRangePayload>
type TSchmancDateRangePayload = {
	dateFrom?: string
	dateTo?: string
}

declare global {
	interface HTMLElementTagNameMap {
		'schmancy-date-range': SwiftHRAdminDateRange
	}
}
