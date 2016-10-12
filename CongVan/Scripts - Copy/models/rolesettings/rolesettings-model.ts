import * as amplify from "amplify";

//amplify.request.define("Search", "ajax", {
//    url: "/Admin/Departments/Search",
//    dataType: "json",
//    type: "GET"
//});

amplify.request.define("Load", "ajax", {
    url: "/Admin/RolesSetting/Load",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Insert", "ajax", {
    url: "/Admin/RolesSetting/Insert",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Update", "ajax", {
    url: "/Admin/RolesSetting/Update",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Delete", "ajax", {
    url: "/Admin/RolesSetting/Delete",
    dataType: "json",
    type: "POST"
});

export interface IRolesSetting {
    eid: string,
    name: string,
    code: string,
    description: string,
    status: boolean
}

export interface IInsertRolesSetting extends IRolesSetting {
    //command: string;
    //__RequestVerificationToken: string;
}

export class RolesSettingModel {

    search(name: string, page: number, pageSize: number, callback: (data: IListWithTotalRecord<IRolesSetting>) => void) {
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

    insert(model: IInsertRolesSetting, callback: (data) => void) {
        amplify.request("Insert", model,
            (result) => {
                callback(result);
            });
    }

    update(model: IInsertRolesSetting, callback: (data) => void) {
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
