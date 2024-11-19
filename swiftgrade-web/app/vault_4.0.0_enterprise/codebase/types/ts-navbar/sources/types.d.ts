import { IDataItem, TreeCollection } from "../../ts-data";
export { DataEvents } from "../../ts-data";
export interface INavbar {
    paint(): void;
    disable(ids: string | string[]): void;
    enable(ids: string | string[]): void;
    isDisabled(id: string): boolean;
    show(ids: string | string[]): void;
    hide(ids: string | string[]): void;
    destructor(): void;
    select(id: string, unselect: boolean): void;
    unselect(id?: string): void;
    isSelected(id: string): boolean;
    getSelected(): string[];
}
export declare type ItemType = "button" | "imageButton" | "selectButton" | "customButton" | "input" | "separator" | "title" | "spacer" | "menuItem" | "block" | "navItem" | "customHTML" | "customHTMLButton";
export interface IItem extends IDataItem {
    type?: ItemType;
    parent?: string;
    css?: string | string[];
    hidden?: boolean;
    disabled?: boolean;
}
export declare type IMenuElement = IMenuItem | ISeparator | ISpacer;
export interface IMenuItem extends IItem, IHtmlExtendable {
    type?: "menuItem";
    $openIcon?: string;
    icon?: string;
    items?: IMenuElement[];
    value?: string;
    hotkey?: string;
    count?: number | string;
    countColor?: "danger" | "secondary" | "primary" | "success";
}
export interface IHtmlExtendable {
    html?: string;
}
export interface IState {
    [key: string]: string;
}
export interface IPopup {
    data: any[];
    mode: "bottom" | "other";
    position: any;
    width: number;
    height: number;
}
export interface ISpacer extends IItem {
    type: "spacer";
}
export interface ISeparator extends IItem {
    type: "separator";
}
export declare enum NavigationBarEvents {
    inputCreated = "inputCreated",
    click = "click",
    openMenu = "openmenu",
    beforeHide = "beforeHide",
    afterHide = "afterHide",
    inputFocus = "inputfocus",
    inputBlur = "inputblur"
}
export declare type NavigationType = "pointer" | "click";
export interface IGroups {
    [key: string]: {
        active?: string;
        elements: string[];
    };
}
export interface INavbarEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [NavigationBarEvents.inputCreated]: (id: string, input: HTMLInputElement) => any;
    [NavigationBarEvents.openMenu]: (id: string) => any;
    [NavigationBarEvents.click]: (id: string, e: Event) => any;
    [NavigationBarEvents.beforeHide]: (id: string, e: Event) => void | boolean;
    [NavigationBarEvents.afterHide]: (e: Event) => any;
    [NavigationBarEvents.inputBlur]: (id: string) => any;
    [NavigationBarEvents.inputFocus]: (id: string) => any;
}
export interface INavbarConfig {
    navigationType?: NavigationType;
    css?: string;
    menuCss?: string;
    data?: any[] | TreeCollection<any>;
}
