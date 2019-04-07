declare interface panic {
    (error: Error): panic;
    toggle (visible: boolean): panic;
    configure (config: {
        projectRoot?: string,
        handleErrors?: boolean,
        stackEntryClicked?: (entry: object) => void;
    }): panic;
}

declare const panic: panic

export = panic;