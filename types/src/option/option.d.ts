export type SchmancyOptionChangeEvent = CustomEvent<{
    value: string;
    label: string;
}>;
declare const SchmancyOption_base: import("@mixins/index").Constructor<CustomElementConstructor> & import("@mixins/index").Constructor<import("@mixins/index").ITailwindElementMixin> & import("@mixins/index").Constructor<import("lit").LitElement> & import("@mixins/index").Constructor<import("@mixins/index").IBaseMixin>;
export default class SchmancyOption extends SchmancyOption_base {
    value: string;
    label: string | undefined;
    selected: boolean;
    private handleOptionClick;
    focus(): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-option': SchmancyOption;
    }
}
export {};
