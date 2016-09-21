interface IListWithTotalRecord<T> {
    result: T[];
    totalRecord: number;
}

interface Window {
    //currentCulture: string;
    //currentCultureShort: string;
    //resources: ResourcesModule.Resources;
    //token: string;
    returnUrl: string;
    pageSize: number;
    viewModel: any;
}

declare var window: Window;