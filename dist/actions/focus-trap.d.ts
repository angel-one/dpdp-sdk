export declare function focusTrap(node: HTMLElement, initialSelector?: string): {
    update(nextInitialSelector?: string): void;
    destroy(): void;
};
export declare function focusElement(selector: string, root?: ParentNode): HTMLElement | null;
