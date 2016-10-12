import * as $ from "jquery";
import * as ko from "knockout";
import * as toastr from "toastr";
import * as swal from "sweetalert";
import { Common } from "../common/common";

import { UserModel, IUser } from "../models/user/user-model";

//declare var naviactive: string;
class IndexViewModel {
    //naviactive: KnockoutObservable<string> = ko.observable(naviactive);
    private common: Common;

    isFocusName: KnockoutObservable<boolean> = ko.observable(false);
    isSending: KnockoutObservable<boolean> = ko.observable(false);
    isAdd: KnockoutObservable<boolean> = ko.observable(false);

    private model: UserModel;
    private updateCallback: Function;

    constructor() {
        this.model = new UserModel();
        this.common = new Common();

        //$(() => {
        //    //this.common.renderPage(this.title, 1, this.recordPerPage, 5, this.pageClickSearch);
        //    //this.search(1);
        //});
    }

    ShowChangPass(updateCallback: Function) {
        //this.isAdd(true);
        //this.resetForm();
        //this.updateCallback = updateCallback;
        $("#ChangePassForm").modal('show');
    }
    ShowProfile(updateCallback: Function) {
        //this.isAdd(true);
        //this.resetForm();
        //this.updateCallback = updateCallback;
        $("#ChangePassForm").modal('show');
    }
    Logout() {
        this.model.logout();
        window.location.href = "/Admin/Login";
    }
    passwordsave() {
        //if (!$("#addOrEditForm form").valid()) {
        //    return;
        //}

        //this.isSending(true);

        //this.model.update({
        //    eid: this.eid(), code: this.code(), name: this.name(), address: this.address(), email: this.email(),
        //    description: this.description(), phone: this.phone(), command: "insert"
        //}, (data) => {
        //    this.isSending(false);

        //    if ($.isArray(data)) {
        //        toastr.error((<string[]>data).join("<br>"));
        //        return;
        //    }

        //    if (data === -2) {
        //        //toastr.warning(this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
        //        return;
        //    }
        //    if (data === -3) {
        //        //toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
        //        return;
        //    }
        //    if (data > 0) {
        //        toastr.success('Succefull');
        //        this.resetForm();
        //        //this.updateCallback();
        //        $("#addOrEditForm").modal('hide');
        //        this.search(1);
        //    }
        //});
        return;
    }
}
window.viewModel = new IndexViewModel();
ko.applyBindings(window.viewModel, document.getElementById("navbar"));