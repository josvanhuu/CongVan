import * as $ from "jquery";
import * as ko from "knockout";
import * as toastr from "toastr";
import * as swal from "sweetalert";

import { Common } from "../../common/common";

import "jqueryPager";
import "resourceCommon";

import { DocumentModel, IDocument } from "../../models/document/document-model";

declare var listdocumenttype;
declare var listdepartment;

class DocumentSeachViewModel {
    private totalPage: number = 0;
    private currentPage: number = 1;
    private recordPerPage: number = window.pageSize;
    private common: Common;

    title: KnockoutObservable<string> = ko.observable("Document");

    keyword: KnockoutObservable<string> = ko.observable("");
    isSearching: KnockoutObservable<boolean> = ko.observable(false);
    isShowAddOrEdit: KnockoutObservable<boolean> = ko.observable(false);

    listDocumentType: KnockoutObservableArray<any> = ko.observableArray([]);
    listDepartment: KnockoutObservableArray<any> = ko.observableArray([]);

    listDocument: KnockoutObservableArray<IDocument> = ko.observableArray([]);

    eid: KnockoutObservable<string> = ko.observable("");

    //Document Field
    documentcode: KnockoutObservable<string> = ko.observable("");
    documentname: KnockoutObservable<string> = ko.observable("");
    documentdes: KnockoutObservable<string> = ko.observable("");
    documentdate: KnockoutObservable<string> = ko.observable("");
    documentdateaction: KnockoutObservable<string> = ko.observable("");
    documenttype: KnockoutObservable<string> = ko.observable("");
    documentdepartment: KnockoutObservable<string> = ko.observable("");

    //File Field
    name: KnockoutObservable<string> = ko.observable("");
    filename: KnockoutObservable<string> = ko.observable("");
    filedescription: KnockoutObservable<string> = ko.observable("");
    filepath: KnockoutObservable<string> = ko.observable("");
    filetype: KnockoutObservable<string> = ko.observable("");
    filedirect: KnockoutObservable<string> = ko.observable("");
    filedatecreated: KnockoutObservable<string> = ko.observable("");

    isFocusName: KnockoutObservable<boolean> = ko.observable(false);
    isSending: KnockoutObservable<boolean> = ko.observable(false);
    isAdd: KnockoutObservable<boolean> = ko.observable(false);

    private model: DocumentModel;
    private updateCallback: Function;

    constructor() {
        this.model = new DocumentModel();

        $(() => {
            //this.listDocumentType = ko.observableArray(listdocumenttype);
            //this.listDepartment = ko.observableArray(listdepartment);
            //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            this.search(1);
        });

        this.model = new DocumentModel();
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
            this.listDocument(data);
            console.log(this.listDocument());
            //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
        });
    }

    save() {
        if (!$("#addOrEditForm form").valid()) {
            return;
        }

        this.isSending(true);

        this.model.update({
            eid: this.eid(), documentcode: this.documentcode(), documentname: this.documentname(), documentdes: this.documentdes(),
            documentdate: this.documentdate(), documentdateaction: this.documentdateaction(), documenttype: this.documenttype(),
            documentdepartment: this.documentdepartment(),
            name: this.name(), filename: this.filename(), filedescription: this.filedescription(), filepath: this.filepath(),
            filetype: this.filetype(), filedirect: this.filedirect(), filedatecreated: this.filedatecreated(),
            command: "insert"
        }, (data) => {

            this.isSending(false);

            if ($.isArray(data)) {
                toastr.error((<string[]>data).join("<br>"));
                return;
            }

            if (data === -2) {
                toastr.warning(this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                return;
            }
            if (data === -3) {
                toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
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
        this.name(item.Name);
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
        this.name("");
        //setTimeout(() => { this.isFocusName(true); }, 100);
    }
}

window.viewModel = new DocumentSeachViewModel();
ko.applyBindings(window.viewModel, document.getElementById("page-content"));