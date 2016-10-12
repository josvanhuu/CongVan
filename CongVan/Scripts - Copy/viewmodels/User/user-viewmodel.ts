import * as $ from "jquery";
import * as ko from "knockout";
import * as toastr from "toastr";
import * as swal from "sweetalert";
import * as lodash from "lodash";

import { Common } from "../../common/common";

import "jqueryPager";
import "resourceCommon";

import { UserModel, IUser } from "../../models/user/user-model";

declare var listdeparments;

class DepartmentViewModel {
    private totalPage: number = 0;
    private currentPage: number = 1;
    private recordPerPage: number = window.pageSize;
    private common: Common;

    keyword: KnockoutObservable<string> = ko.observable("");
    isSearching: KnockoutObservable<boolean> = ko.observable(false);
    isShowAddOrEdit: KnockoutObservable<boolean> = ko.observable(false);

    listdeparments: KnockoutObservableArray<any> = ko.observableArray([]);

    listUsers: KnockoutObservableArray<IUser> = ko.observableArray([]);
    listDeparments: KnockoutObservableArray<any> = ko.observableArray([]);
    title: string = " 'Người Dùng' ";

    eid: KnockoutObservable<string> = ko.observable("");
    username: KnockoutObservable<string> = ko.observable("");
    password: KnockoutObservable<string> = ko.observable("");
    fullname: KnockoutObservable<string> = ko.observable("");
    email: KnockoutObservable<string> = ko.observable("");
    department: KnockoutObservable<string> = ko.observable("");
    membercode: KnockoutObservable<string> = ko.observable("");
    address: KnockoutObservable<string> = ko.observable("");
    position: KnockoutObservable<string> = ko.observable("");
    image: KnockoutObservable<string> = ko.observable("");
    phone: KnockoutObservable<string> = ko.observable("");

    isFocusName: KnockoutObservable<boolean> = ko.observable(false);
    isSending: KnockoutObservable<boolean> = ko.observable(false);
    isAdd: KnockoutObservable<boolean> = ko.observable(false);

    private model: UserModel;
    private updateCallback: Function;

    constructor() {
        this.model = new UserModel();
        this.common = new Common();
        this.listDeparments(listdeparments);

        $(() => {
            //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            this.search(1);
        });

        //this.model = new DepartmentsModel();
        //$(() => {
        //    this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
        //    this.listSalons(listSalons.result);
        //});
    }

    formSearch() {
        this.search(1);
    }

    search(page: number) {
        this.currentPage = page;
        this.isSearching(true);
        this.model.load(this.currentPage, (data) => {
            this.isSearching(false);
            this.listUsers(data.listUsers);
            //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
        });
    }

    RentDepartment(DepartmentId: string) {
        //console.log(DepartmentId);
        //_.find(users, ['active', false]);
        //_.find(users, { 'age': 1, 'active': true });
        //console.log(lodash.find(this.listDeparments(), { 'id': DepartmentId }).name); // function (x) { return x.EID: DepartmentId; }).name);
        return lodash.find(this.listDeparments(), { 'id': DepartmentId }).name;
    }

    save() {
        if (!$("#addOrEditForm form").valid()) {
            return;
        }

        this.isSending(true);

        this.model.update({
            eid: this.eid(), username: this.username(), password: this.password(), fullname: this.fullname(),
            email: this.email(), department: this.department(), membercode: this.membercode(), address: this.address(),
            position: this.position(), image: this.image(), phone: this.phone()
        }, (data) => {
            this.isSending(false);

            if ($.isArray(data)) {
                toastr.error((<string[]>data).join("<br>"));
                return;
            }

            if (data === -2) {
                //toastr.warning(this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                return;
            }
            if (data === -3) {
                //toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
                return;
            }
            if (data > 0) {
                toastr.success('Succefull');
                this.resetForm();
                //this.updateCallback();
                $("#addOrEditForm").modal('hide');
                this.search(1);
            }
        });
        return;
    }

    pageClickSearch(pageclickednumber: number) {
        this.search(pageclickednumber);
    }

    showAdd(updateCallback: Function) {
        this.isAdd(true);
        this.resetForm();
        this.updateCallback = updateCallback;
        $("#addOrEditForm").modal('show');
    }

    closeAddOrEdit = () => {
        this.isShowAddOrEdit(false);
    }

    showEdit = (item, updateCallback: Function) => {
        this.eid(item.EID);
        this.email(item.Email);
        this.phone(item.Phone);
        this.address(item.Phone);
        this.username(item.UserName);
        this.password(item.Password);
        this.fullname(item.FullName);
        this.email(item.Email);
        this.department(item.DepartmentId);
        this.membercode(item.MemberCode);
        this.address(item.Address);
        this.position(item.Position);
        this.image("");
        this.phone(item.Phone);

        this.isAdd(false);
        this.updateCallback = updateCallback;
        $("#addOrEditForm").modal('show');
    }

    delete = (item) => {
        swal({
            title: this.common.stringFormat(window.resources.common.message.confirmDelete, this.title),
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: window.resources.common.button.ok,
            cancelButtonText: window.resources.common.button.cancel,
            closeOnConfirm: true,
            closeOnCancel: true
        }, (isConfirm) => {
            if (isConfirm) {
                //this.common.blockUI({ target: "#list", animate: true });

                this.model.delete(item.id, window.token, (data) => {
                    if (data === -1) {
                        toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, this.title));
                        return;
                    }
                    if (data > 0) {
                        toastr.success(this.common.stringFormat(window.resources.common.message.deleteSuccess, this.title));
                    }
                });
            }
        });
    }
    resetForm() {
        this.eid("");
        this.email("");
        this.phone("");
        this.address("");
        this.username("");
        this.password("");
        this.fullname("");
        this.email("");
        this.department("");
        this.membercode("");
        this.address("");
        this.position("");
        this.image("");
        this.phone("");
        //setTimeout(() => { this.isFocusName(true); }, 100);
    }
}

window.viewModel = new DepartmentViewModel();
ko.applyBindings(window.viewModel, document.getElementById("page-content"));