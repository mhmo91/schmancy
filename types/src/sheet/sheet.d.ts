import { SchmancySheetPosition } from './sheet.service';
declare const SchmancySheet_base: CustomElementConstructor & import("@mixins/index").Constructor<import("lit").LitElement> & import("@mixins/index").Constructor<import("@mixins/index").IBaseMixin>;
export default class SchmancySheet extends SchmancySheet_base {
    uid: string;
    open: boolean;
    header: 'hidden' | 'visible';
    position: SchmancySheetPosition;
    persist: boolean;
    allowOverlyDismiss: boolean;
    title: string;
    sheet: HTMLElement | undefined;
    sheetAsync: Promise<HTMLElement> | undefined;
    sheetContents: HTMLElement | undefined;
    assignedElements: HTMLElement[];
    focusAttribute: string;
    sheetHeight: number;
    sheetWidth: number;
    dragPosition: number | undefined;
    onOpenChange(_old_value: boolean, new_value: boolean): void;
    connectedCallback(): Promise<void>;
    pxToVw(pxValue: number): number;
    pxToVh(pxValue: number): number;
    firstUpdated(): Promise<void>;
    disconnectedCallback(): void;
    setIsSheetShown(isShown: boolean): void;
    closeSheet(): void;
    private getFocusElement;
    focus(): void;
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-sheet': SchmancySheet;
    }
}
export {};
