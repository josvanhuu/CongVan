import * as amplify from "amplify";

amplify.request.define("Search", "ajax", {
    url: "/Admin/Departments/Search",
    dataType: "json",
    type: "GET"
});

amplify.request.define("Load", "ajax", {
    url: "/Admin/Departments/Load",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Insert", "ajax", {
    url: "/Admin/Departments/Insert",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Update", "ajax", {
    url: "/Admin/Departments/Update",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Delete", "ajax", {
    url: "/Admin/Departments/Delete",
    dataType: "json",
    type: "POST"
});

export interface IDeparment {
    code: string,
    name: string,
    address: string,
    email: string,
    phone: string,
    description: string,
    eid: string
}

export interface IInsertDeparment extends IDeparment {
    command: string;
    //__RequestVerificationToken: string;
}

export class DeparmentModel {

    search(name: string, page: number, pageSize: number, callback: (data: IListWithTotalRecord<IDeparment>) => void) {
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

    insert(model: IInsertDeparment, callback: (data) => void) {
        amplify.request("Insert", model,
            (result) => {
                callback(result);
            });
    }

    update(model: IInsertDeparment, callback: (data) => void) {
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
