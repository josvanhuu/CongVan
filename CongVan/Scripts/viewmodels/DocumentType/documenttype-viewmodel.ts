import * as $ from "jquery";
import * as ko from "knockout";
import * as toastr from "toastr";
import * as swal from "sweetalert";


import { DocumentTypeModel, IDocumentType } from "../../models/documenttype/documenttype-model";

declare var listdeparments;

class DocumenttypeViewModel {
    private totalPage: number = 0;
    private currentPage: number = 1;
    private recordPerPage: number = window.pageSize;

    keyword: KnockoutObservable<string> = ko.observable("");
    isSearching: KnockoutObservable<boolean> = ko.observable(false);
    isShowAddOrEdit: KnockoutObservable<boolean> = ko.observable(false);

    listDocumentType: KnockoutObservableArray<IDocumentType> = ko.observableArray([]);

    eid: KnockoutObservable<string> = ko.observable("");
    code: KnockoutObservable<string> = ko.observable("");
    name: KnockoutObservable<string> = ko.observable("");
    des: KnockoutObservable<string> = ko.observable("");

    isFocusName: KnockoutObservable<boolean> = ko.observable(false);
    isSending: KnockoutObservable<boolean> = ko.observable(false);
    isAdd: KnockoutObservable<boolean> = ko.observable(false);

    private model: DocumentTypeModel;
    private updateCallback: Function;

    constructor() {
        this.model = new DocumentTypeModel();
        //this.listDocumentType(listdeparments);

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
        this.model.load(1, (data) => {
            //console.log(data);
            this.isSearching(false);
            this.listDocumentType(data);
            //console.log(this.listDocumentType());
            //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
        });
    }

    save() {
        if (!$("#addOrEditForm form").valid()) {
            return;
        }

        this.isSending(true);

        this.model.update({
            eid: this.eid(), code: this.code(), name: this.name(), des: this.des(), command: "insert"
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
        this.isAdd(false);
        this.eid(item.EID);
        this.code(item.Code);
        this.name(item.Name);
        this.des(item.Des);
        this.updateCallback = updateCallback;
        $("#addOrEditForm").modal('show');
    }

    delete = (item) => {
        swal({
            title: "Delete item", //this.common.stringFormat(window.resources.common.message.confirmDelete, this.title),
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "OK", //window.resources.common.button.ok,
            cancelButtonText: "Cancel", //window.resources.common.button.cancel,
            closeOnConfirm: true,
            closeOnCancel: true
        }, (isConfirm) => {
            if (isConfirm) {
                //this.common.blockUI({ target: "#list", animate: true });

                this.model.delete(item.id, window.token, (data) => {
                    //if (data === -1) {
                    //    toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, this.title));
                    //    return;
                    //}
                    //if (data > 0) {
                    //    toastr.success(this.common.stringFormat(window.resources.common.message.deleteSuccess, this.title));
                    //}
                });
            }
        });
    }
    resetForm() {
        this.eid("");
        this.code("");
        this.name("");
        this.des("");
        //setTimeout(() => { this.isFocusName(true); }, 100);
    }
}

window.viewModel = new DocumenttypeViewModel();
ko.applyBindings(window.viewModel, document.getElementById("page-content"));