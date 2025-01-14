import { LitElement } from 'lit';
declare const SchmancyInput_base: import("@mixins/index").Constructor<CustomElementConstructor> & import("@mixins/index").Constructor<import("@mixins/index").ITailwindElementMixin> & import("@mixins/index").Constructor<LitElement> & import("@mixins/index").Constructor<import("@mixins/index").IBaseMixin>;
export default class SchmancyInput extends SchmancyInput_base {
    protected static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    static formAssociated: boolean;
    internals: ElementInternals | undefined;
    inputRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    /**
     * The label of the control.
     * @attr
     * @type {string} label
     * @default ''
     * @public
     */
    label: string;
    /**
     * The type of the control.
     * @attr
     * @type {'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'date' | 'datetime' | 'time' | 'month' | 'week' | 'color' | 'file'}
     * @default 'text'
     * @public
     **/
    type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'date' | 'datetime' | 'time' | 'month' | 'week' | 'color' | 'file';
    clickable: boolean;
    /**
     * The name of the control.
     * @attr name
     * @type {string} name
     * @default 'name_' + Date.now()
     * @public
     */
    name: string;
    /**
     * The placeholder of the control.
     * @attr placeholder
     * @type {string}
     * @default ''
     * @public
     */
    placeholder: string;
    /**
     * The value of the control.
     * @attr {string} value - The value of the control.
     * @type {string}
     * @default ''
     * @public
     */
    value: string;
    /**
     * The pattern attribute of the control.
     * @attr
     * @type {string}
     * @default undefiend
     * @public
     */
    pattern: any;
    required: boolean;
    disabled: boolean;
    readonly: boolean;
    spellcheck: boolean;
    align: 'left' | 'center' | 'right';
    /**
     * The inputmode attribute of the control.
     * @attr
     * @type {'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'}
     * @default 'none'
     * @public
     */
    inputmode: 'none' | 'txt' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /**
     * The minlength attribute of the control.
     * @attr
     */
    minlength: number | undefined;
    /**
     * The maxlength attribute of the control.
     * @attr
     */
    maxlength: number;
    /**
     * The min attribute of the control.
     * @attr
     */
    min: string;
    /**
     * The max attribute of the control.
     * @attr
     */
    max: string;
    /**
     * The step attribute of the control.
     * @attr
     */
    step: number;
    /**
     * The autofocus attribute of the control.
     * @attr
     * @type {boolean}
     * @default false
     * @public
     */
    autofocus: boolean;
    /**
     * The autocomplete attribute of the control.
     * @attr
     */
    autocomplete: AutoFill;
    tabIndex: number;
    inputElement: HTMLInputElement;
    hint: string | undefined;
    error: boolean;
    constructor();
    firstUpdated(): void;
    get form(): HTMLFormElement;
    /** Checks for validity of the control and shows the browser message if it's invalid. */
    reportValidity(): boolean;
    /** Checks for validity of the control and emits the invalid event if it invalid. */
    checkValidity(): boolean;
    /** Sets a custom validity message. */
    setCustomValidity(message: string): void;
    /** Selects all text within the input. */
    select(): void;
    validity(): ValidityState | undefined;
    focus(options?: FocusOptions): void;
    click(): void;
    blur(): void;
    protected render(): unknown;
}
type EventDetails = {
    value: string;
};
export type SchmancyInputChangeEvent = CustomEvent<EventDetails>;
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-input': SchmancyInput;
    }
}
export {};
