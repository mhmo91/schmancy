import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';
import { ChipSet } from '@material/web/chips/internal/chip-set';
declare const SchmancyChip_base: CustomElementConstructor & import("@mhmo91/lit-mixins/src").Constructor<import("lit").LitElement> & import("@mhmo91/lit-mixins/src").Constructor<import("@mhmo91/lit-mixins/src").IBaseMixin>;
export default class SchmancyChip extends SchmancyChip_base {
    chipSet: ChipSet;
    label: string;
    value: string;
    selected: boolean;
    icon: string;
    protected render(): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'schmancy-chip': SchmancyChip;
    }
}
export type SchmancyChipChangeEvent = {
    value: string;
    selected: boolean;
};
export {};