import { IEventSystem } from "./events";
export interface IHandlers {
    [key: string]: anyFunction | IHandlers;
}
export declare type fn<T extends any[], K> = (...args: T) => K;
export declare type anyFunction = fn<any[], any>;
export interface IAnyObj {
    [key: string]: any;
}
export interface ISelection {
    events: IEventSystem<SelectionEvents>;
    getId(): string;
    getItem(): any;
    add(id: string): void;
    remove(id?: string): boolean;
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
}
export declare enum SelectionEvents {
    beforeUnSelect = "beforeunselect",
    afterUnSelect = "afterunselect",
    beforeSelect = "beforeselect",
    afterSelect = "afterselect",
    beforeEnable = "beforeEnable",
    beforeDisable = "beforeDisable",
    afterEnable = "afterEnable",
    afterDisable = "afterDisable"
}
export interface ISelectionEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [SelectionEvents.afterSelect]: (id: string) => any;
    [SelectionEvents.afterUnSelect]: (id: string) => any;
    [SelectionEvents.beforeSelect]: (id: string) => void | boolean;
    [SelectionEvents.beforeUnSelect]: (id: string) => void | boolean;
    [SelectionEvents.afterEnable]: () => any;
    [SelectionEvents.afterDisable]: () => any;
    [SelectionEvents.beforeEnable]: () => void | boolean;
    [SelectionEvents.beforeDisable]: () => void | boolean;
}
export interface ITouchParam {
    duration?: number;
    timer?: any;
    start?: boolean;
    timeStamp?: number;
    dblDuration?: number;
}
