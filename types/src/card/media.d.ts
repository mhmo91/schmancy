declare const SchmancyCardMedia_base: import("..").Constructor<CustomElementConstructor> & import("..").Constructor<import("@schmancy/mixin/tailwind/tailwind.mixin").ITailwindElementMixin> & import("..").Constructor<import("lit").LitElement> & import("..").Constructor<import("..").IBaseMixin>;
/**
 * @element schmancy-card-media
 */
export default class SchmancyCardMedia extends SchmancyCardMedia_base {
    src: string;
    fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    protected render(): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-card-media': SchmancyCardMedia;
    }
}
export {};
