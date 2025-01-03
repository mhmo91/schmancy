import { TailwindElement } from '@mixins/index'
import { color } from '@schmancy/directives'
import { SchmancyTheme } from '@schmancy/theme/theme.interface'
import { LitElement, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { createRef, ref } from 'lit/directives/ref.js'
import { when } from 'lit/directives/when.js'
import { distinctUntilChanged, filter, fromEvent, map } from 'rxjs'
import style from './input.scss?inline'
@customElement('schmancy-input')
export default class SchmancyInput extends TailwindElement(style) {
	protected static shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	}
	static formAssociated = true
	// private internals
	internals: ElementInternals | undefined
	inputRef = createRef<HTMLInputElement>()

	/**
	 * The label of the control.
	 * @attr
	 * @type {string} label
	 * @default ''
	 * @public
	 */
	@property() label = ''

	/**
	 * The type of the control.
	 * @attr
	 * @type {'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'date' | 'datetime' | 'time' | 'month' | 'week' | 'color' | 'file'}
	 * @default 'text'
	 * @public
	 **/
	@property({ reflect: true }) public type:
		| 'email'
		| 'number'
		| 'password'
		| 'search'
		| 'tel'
		| 'text'
		| 'url'
		| 'date'
		| 'datetime'
		| 'time'
		| 'month'
		| 'week'
		| 'color'
		| 'file' = 'text'

	@property({ type: Boolean, reflect: true }) public clickable = false

	/**
	 * The name of the control.
	 * @attr name
	 * @type {string} name
	 * @default 'name_' + Date.now()
	 * @public
	 */
	@property() name = 'name_' + Date.now()

	/**
	 * The placeholder of the control.
	 * @attr placeholder
	 * @type {string}
	 * @default ''
	 * @public
	 */
	@property() placeholder = ''

	/**
	 * The value of the control.
	 * @attr {string} value - The value of the control.
	 * @type {string}
	 * @default ''
	 * @public
	 */
	@property({ type: String, reflect: true }) public value = ''

	/**
	 * The pattern attribute of the control.
	 * @attr
	 * @type {string}
	 * @default undefiend
	 * @public
	 */
	@property({ type: String, reflect: true }) pattern
	@property({ type: Boolean, reflect: true }) required = false
	@property({ type: Boolean, reflect: true }) disabled = false
	@property({ type: Boolean, reflect: true }) readonly = false
	@property({ type: Boolean, reflect: true }) spellcheck = false

	@property({ type: String, reflect: true }) align: 'left' | 'center' | 'right' = 'left'
	/**
	 * The inputmode attribute of the control.
	 * @attr
	 * @type {'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'}
	 * @default 'none'
	 * @public
	 */
	@property() public inputmode!: 'none' | 'txt' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
	/**
	 * The minlength attribute of the control.
	 * @attr
	 */
	@property({ type: Number })
	public minlength: number | undefined

	/**
	 * The maxlength attribute of the control.
	 * @attr
	 */
	@property({ type: Number })
	public maxlength!: number

	/**
	 * The min attribute of the control.
	 * @attr
	 */
	@property()
	public min!: string

	/**
	 * The max attribute of the control.
	 * @attr
	 */
	@property()
	public max!: string

	/**
	 * The step attribute of the control.
	 * @attr
	 */
	@property({
		type: Number,
		reflect: true,
	})
	public step!: number

	/**
	 * The autofocus attribute of the control.
	 * @attr
	 * @type {boolean}
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	public override autofocus!: boolean

	/**
	 * The autocomplete attribute of the control.
	 * @attr
	 */
	@property()
	public autocomplete: AutoFill = 'off'
	@property({ type: Number })
	public override tabIndex = 0

	@query('input') inputElement!: HTMLInputElement

	@property() hint: string | undefined

	@property({ type: Boolean, reflect: true }) public error = false

	constructor() {
		super()
		try {
			this.internals = this.attachInternals()
		} catch {
			this.internals = undefined
		}
	}

	firstUpdated() {
		if (this.autofocus) {
			this.focus()
		}
		fromEvent(this.inputElement, 'input')
			.pipe(
				map(event => (event.target as HTMLInputElement).value),
				distinctUntilChanged(),
			)
			.subscribe(value => {
				this.value = value
				this.dispatchEvent(
					new CustomEvent<EventDetails>('change', {
						detail: { value },
						bubbles: true,
						composed: true,
					}),
				)
			})
		fromEvent(this.inputElement, 'change')
			.pipe(
				map(event => (event.target as HTMLInputElement).value),
				distinctUntilChanged(),
			)
			.subscribe(value => {
				this.value = value
				this.dispatchEvent(
					new CustomEvent<EventDetails>('change', {
						detail: { value },
						bubbles: true,
						composed: true,
					}),
				)
			})
		// emit on enter
		fromEvent<KeyboardEvent>(this.inputElement, 'keyup')
			.pipe(
				filter(event => event.key === 'Enter'),
				map(event => (event.target as HTMLInputElement).value),
				distinctUntilChanged(),
			)
			.subscribe(value => {
				this.value = value
				this.dispatchEvent(
					new CustomEvent<EventDetails>('change', {
						detail: { value },
						bubbles: true,
						composed: true,
					}),
				)
				this.dispatchEvent(
					new CustomEvent<EventDetails>('enter', {
						detail: { value },
						bubbles: true,
						composed: true,
					}),
				)
			})
		fromEvent<AnimationEvent>(this.inputElement, 'animationstart')
			.pipe(
				filter(event => (event as AnimationEvent).animationName === 'onAutoFillStart'),
				map(event => (event.target as HTMLInputElement).value),
			)
			.subscribe(value => {
				this.value = value
				this.dispatchEvent(
					new CustomEvent<EventDetails>('change', {
						detail: { value },
						bubbles: true,
						composed: true,
					}),
				)
			})
	}

	get form() {
		return this.internals?.form
	}

	/** Checks for validity of the control and shows the browser message if it's invalid. */
	public reportValidity() {
		return this.inputRef.value?.reportValidity()
	}

	/** Checks for validity of the control and emits the invalid event if it invalid. */
	public checkValidity() {
		return this.inputRef.value?.checkValidity()
	}

	/** Sets a custom validity message. */
	public setCustomValidity(message: string) {
		return this.inputRef.value?.setCustomValidity(message)
	}

	/** Selects all text within the input. */
	public select() {
		return this.inputRef.value?.select()
	}

	public validity(): ValidityState | undefined {
		return this.inputRef.value?.validity
	}

	public override focus(
		options: FocusOptions = {
			preventScroll: true,
		},
	) {
		this.inputRef.value?.focus(options)
		this.dispatchEvent(new Event('focus'))
	}

	public override click() {
		this.inputRef.value?.click()
		this.dispatchEvent(new Event('click'))
	}

	public override blur() {
		this.inputRef.value?.blur()
		this.dispatchEvent(new Event('blur'))
	}

	protected render(): unknown {
		const classes = {
			'w-full flex-1 h-[50px] rounded-[8px] border-0 px-[8px] sm:px-[12px] md:px-[16px]': true,
			'disabled:opacity-40 disabled:cursor-not-allowed': true,
			'placeholder:text-muted': true,
			'ring-0 ring-inset focus:ring-1 focus:ring-inset': true,
			'ring-primary-default ring-outline focus:ring-primary-default': !this.error,
			'ring-error-default focus:ring-error-default': this.error,
			'caret-transparent focus:outline-none cursor-pointer text-select-none': this.readonly,
			'cursor-pointer': this.clickable,
			'text-center': this.align === 'center',
			'text-right': this.align === 'right',
			// read only
		}
		const labelClasses = {
			'opacity-40': this.disabled,
			'block mb-[4px]': true,
		}
		return html`
			${when(
				this.label,
				() =>
					html`<label
						${color({
							color: this.error ? SchmancyTheme.sys.color.error.default : SchmancyTheme.sys.color.primary.default,
						})}
						class="${this.classMap(labelClasses)}"
						for=${this.id}
					>
						<schmancy-typography type="label" token="lg">${this.label}</schmancy-typography>
					</label>`,
			)}

			<input
				${color({
					bgColor: SchmancyTheme.sys.color.surface.highest,
					color: SchmancyTheme.sys.color.surface.on,
				})}
				${ref(this.inputRef)}
				.value=${this.value}
				.id=${this.id}
				.name=${this.name}
				.type=${this.type}
				step=${ifDefined(this.step)}
				.autocomplete=${this.autocomplete}
				.placeholder=${this.placeholder}
				.required=${this.required}
				inputmode=${ifDefined(this.inputmode)}
				class=${this.classMap(classes)}
				.disabled=${this.disabled}
				.readOnly=${this.readonly}
				min=${ifDefined(this.min)}
				max=${ifDefined(this.max)}
				minlength=${ifDefined(this.minlength)}
				maxlength=${ifDefined(this.maxlength)}
				.pattern=${ifDefined(this.pattern) ?? nothing}
			/>
			${when(
				this.hint,
				() => html`
					<schmancy-typography
						${color({
							color: this.error ? SchmancyTheme.sys.color.error.default : SchmancyTheme.sys.color.primary.default,
						})}
						class="pt-[4px]"
						type="body"
						token="sm"
					>
						${this.hint}
					</schmancy-typography>
				`,
			)}
		`
	}
}

type EventDetails = {
	value: string
}

export type SchmancyInputChangeEvent = CustomEvent<EventDetails>

declare global {
	interface HTMLElementTagNameMap {
		'schmancy-input': SchmancyInput
	}
}
