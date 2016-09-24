interface ProviewEditorUploadImage {
    url: string;
    callback?: any;
    closePopupAfterUpload?: boolean;
    placeholder?: string;
}

interface ProviewEditorFileUpload {
    url: string;
    callback?: Function;
    closePopupAfterUpload?: boolean;
    selectImageLabel: string;
    allowFilesType: string[];
}

interface ProviewEditorSubmit {
    title: string;
    image: string;
    classes: string;
}

interface ProviewEditorOptions {
    classes?: string;
    isUseFileUpload?: boolean;
    isShowMenuOnSelect?: boolean;
    enableEmoticonFilter?: boolean;
    isShowArrow?: boolean;
    uploadImage?: ProviewEditorUploadImage;
    fileUpload?: ProviewEditorFileUpload;
    autocomplete?: any;
    height: number;
    submit?: ProviewEditorSubmit;
    toolbarButtons?: string[];
    onKeydown?: Function;
    onKeyPress?: Function;
    onKeyUp?: Function;
}

interface JQuery {
    proviewEditor(options: ProviewEditorOptions);

    proviewEditor(functionName: string);

    proviewEditor(functionName: string, content: string);
}