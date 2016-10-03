import * as amplify from "amplify";

amplify.request.define("Load", "ajax", {
    url: "/Admin/DocumentType/Load",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Insert", "ajax", {
    url: "/Admin/DocumentType/Insert",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Update", "ajax", {
    url: "/Admin/DocumentType/Update",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Delete", "ajax", {
    url: "/Admin/DocumentType/Delete",
    dataType: "json",
    type: "POST"
});

export interface IDocumentType {
    eid: string,
    code: string,
    des: string,
    name: string
}

export interface IInsertDocumentType extends IDocumentType {
    //command: string;
    //__RequestVerificationToken: string;
}

export class DocumentTypeModel {

    load(pageIndex: number, callback: (data) => void) {
        amplify.request("Load", { pageIndex: pageIndex},
            (result) => {
                callback(result);
            });
    }

    insert(model: IInsertDocumentType, callback: (data) => void) {
        amplify.request("Insert", model,
            (result) => {
                callback(result);
            });
    }

    update(model: IInsertDocumentType, callback: (data) => void) {
        amplify.request("Update", model,
            (result) => {
                callback(result);
            });
    }

    delete(id: number, token: string, callback: (data: number) => void) {
        amplify.request("Delete", { id: id, __RequestVerificationToken: token },
            (result) => {
                callback(result);
            });
    }
}
