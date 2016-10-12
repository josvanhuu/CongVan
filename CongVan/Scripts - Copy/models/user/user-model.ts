import * as amplify from "amplify";

//amplify.request.define("Search", "ajax", {
//    url: "/Admin/Departments/Search",
//    dataType: "json",
//    type: "GET"
//});

amplify.request.define("Load", "ajax", {
    url: "/Admin/Users/Load",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Update", "ajax", {
    url: "/Admin/Users/Update",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Delete", "ajax", {
    url: "/Admin/Users/Delete",
    dataType: "json",
    type: "POST"
});

amplify.request.define("Logout", "ajax", {
    url: "/Admin/Users/Logout",
    //dataType: "json",
    type: "POST"
});

amplify.request.define("Login", "ajax", {
    url: "/Admin/Login",
    type: "GET"
});

export interface IUser {
    eid: string,
    username: string,
    password: string,
    fullname: string,
    email: string,
    department: string,
    membercode: string,
    address: string,
    position: string,
    image: string,
    phone: string
}

export interface IInsertUser extends IUser {
    //command: string;
    //__RequestVerificationToken: string;
}

export class UserModel {

    //search(name: string, page: number, pageSize: number, callback: (data: IListWithTotalRecord<IUser>) => void) {
    //    amplify.request("Search", { name: name, page: page, pageSize: pageSize },
    //        (result) => {
    //            callback(result);
    //        });
    //}

    load(pageIndex: number, callback: (data) => void) {
        amplify.request("Load", { pageIndex: pageIndex },
            (result) => {
                callback(result);
            });
    }

    insert(model: IInsertUser, callback: (data) => void) {
        amplify.request("Insert", model,
            (result) => {
                callback(result);
            });
    }

    update(model: IInsertUser, callback: (data) => void) {
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
    logout() { amplify.request("Logout"); };
}
