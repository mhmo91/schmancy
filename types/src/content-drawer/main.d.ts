import { PropertyValueMap } from 'lit';
import { SchmancyContentDrawerMinWidth, TSchmancyContentDrawerSheetMode } from './context';
declare const SchmancyContentDrawerMain_base: CustomElementConstructor & import("@mhmo91/lit-mixins/src").Constructor<import("lit").LitElement> & import("@mhmo91/lit-mixins/src").Constructor<import("@mhmo91/lit-mixins/src").IBaseMixin>;
export declare class SchmancyContentDrawerMain extends SchmancyContentDrawerMain_base {
    minWidth: any;
    drawerMinWidth: typeof SchmancyContentDrawerMinWidth.__context__;
    mode: TSchmancyContentDrawerSheetMode;
    maxHeight: any;
    connectedCallback(): void;
    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-content-drawer-main': SchmancyContentDrawerMain;
    }
}
export {};
