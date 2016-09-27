import * as amplify from "amplify";

//amplify.request.define("Search", "ajax", {
//    url: "/Admin/Departments/Search",
//    dataType: "json",
//    type: "GET"
//});

amplify.request.define("Load", "ajax", {
    url: "/Admin/Document/Load",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Insert", "ajax", {
    url: "/Admin/Document/Insert",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Update", "ajax", {
    url: "/Admin/Document/Update",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Delete", "ajax", {
    url: "/Admin/Document/Delete",
    dataType: "json",
    type: "POST"
});

export interface IDocument {
    address: string,
    code: string,
    description: string,
    eid: string
    email: string,
    isnew: boolean,
    name: string,
    phone: string
}

export interface IInsertDocument extends IDocument {
    command: string;
    //__RequestVerificationToken: string;
}

export class DocumentModel {

    search(name: string, page: number, pageSize: number, callback: (data: IListWithTotalRecord<IDocument>) => void) {
        amplify.request("Search", { name: name, page: page, pageSize: pageSize },
            (result) => {
                callback(result);
            });
    }

    load(callback: (data) => void) {
        amplify.request("Load", {},
            (result) => {
                callback(result);
            });
    }

    insert(model: IInsertDocument, callback: (data) => void) {
        amplify.request("Insert", model,
            (result) => {
                callback(result);
            });
    }

    update(model: IInsertDocument, callback: (data) => void) {
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
