/// <reference types="node" />
import { TemplateResult } from 'lit';
import { HISTORY_STRATEGY, RouteAction } from './router.types';
declare const SchmancyArea_base: CustomElementConstructor & import("@mhmo91/lit-mixins/src").Constructor<import("lit").LitElement> & import("@mhmo91/lit-mixins/src").Constructor<import("@mhmo91/lit-mixins/src").IBaseMixin>;
export declare class SchmancyArea extends SchmancyArea_base {
    /**
     * The name of the router outlet
     * @attr
     * @type {string}
     * @public
     * @required
     */
    name: string;
    default: string | Promise<NodeModule> | CustomElementConstructor | TemplateResult<1>;
    /**
     *
     * @param pathname pathname from the browser location API
     * @param historyStrategy  the history strategy to use for the route like PUSH, REPLACE, or SILENT
     * @returns rxjs pipes that will return the component to render and the history strategy to use
     */
    getComponentFromPathname(pathname: string, historyStrategy: HISTORY_STRATEGY): import("rxjs").Observable<RouteAction>;
    protected firstUpdated(): void;
    newPath(tag: string): string;
    checkForTeleportationRequests(): import("rxjs").Observable<any[]>;
    disconnectedCallback(): void;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-area': SchmancyArea;
    }
}
export {};