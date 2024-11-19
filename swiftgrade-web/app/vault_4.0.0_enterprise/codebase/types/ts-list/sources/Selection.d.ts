import { IEventSystem } from "../../ts-common/events";
import { SelectionEvents, ISelectionEventsHandlersMap } from "../../ts-common/types";
import { DataCollection, DataEvents, IDataEventsHandlersMap, IDataItem } from "../../ts-data";
import { ISelectionConfig, ISelection } from "./types";
export declare class Selection implements ISelection {
    config: ISelectionConfig;
    events: IEventSystem<SelectionEvents | DataEvents, ISelectionEventsHandlersMap & IDataEventsHandlersMap>;
    private _disable;
    private _selected;
    private _data;
    private _lastSelectedIndex;
    private _lastShiftSelectedIndexes;
    constructor(config: ISelectionConfig, data: DataCollection);
    getId(): string | string[] | undefined;
    getItem(): IDataItem | IDataItem[];
    contains(id?: string): boolean;
    remove(id?: string): boolean;
    add(id?: string, isCtrl?: boolean, isShift?: boolean, silent?: boolean): any;
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
    private _addMulti;
    private _addWithShift;
    private _addSingle;
    private _isSelected;
    private _selectItem;
    private _unselectItem;
}
