type PortalTarget = HTMLElement | string;
export declare function portal(node: HTMLElement, target?: PortalTarget): {
    destroy?: undefined;
} | {
    destroy(): void;
};
export {};
