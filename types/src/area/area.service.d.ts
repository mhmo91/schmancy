import { ReplaySubject, Subject } from 'rxjs';
import { SchmancyTeleportation } from '../teleport';
import { ActiveRoute, RouteAction } from './router.types';
export declare const routerHistory: Subject<RouteAction>;
export declare const FINDING_MORTIES = "FINDING_MORTIES";
export declare const HERE_RICKY = "HERE_RICKY";
export type HERE_RICKY_EVENT = CustomEvent<{
    component: SchmancyTeleportation;
}>;
export type FINDING_MORTIES_EVENT = CustomEvent<{
    component: SchmancyTeleportation;
}>;
declare class AreaService {
    private static instance;
    prettyURL: boolean;
    mode: 'SILENT' | 'HISTORY';
    request: ReplaySubject<RouteAction>;
    current: Map<string, ActiveRoute>;
    $current: ReplaySubject<Map<string, ActiveRoute>>;
    enableHistoryMode: boolean;
    private findingMortiesEvent;
    constructor();
    find(): import("rxjs").Observable<any>;
    push(r: RouteAction): void;
    pop(name: string): void;
    static getInstance(): AreaService;
    get state(): {};
}
export declare const area: AreaService;
export default area;
