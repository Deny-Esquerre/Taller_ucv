declare global {
    function route(name: string, parameters?: any, absolute?: boolean): string;
}

export {};