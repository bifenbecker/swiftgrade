import { IEventSystem } from "../../ts-common/events";
import { SelectionEvents, ISelection } from "../../ts-common/types";
import { DataCollection } from "./datacollection";
export declare class Selection implements ISelection {
    events: IEventSystem<SelectionEvents>;
    private _selected;
    private _data;
    private _disable;
    constructor(_config: any, data?: DataCollection, events?: IEventSystem<any>);
    getId(): string;
    getItem(): any;
    remove(id?: string): boolean;
    add(id: string): void;
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
}
