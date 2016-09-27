define(["require", "exports", "jquery", "knockout", "sweetalert", "../../models/document/document-model"], function (require, exports, $, ko, swal, document_model_1) {
    "use strict";
    //declare var listdeparments;
    var DocumentViewModel = (function () {
        function DocumentViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = window.pageSize;
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listRolesSetting = ko.observableArray([]);
            this.eid = ko.observable("");
            this.code = ko.observable("");
            this.name = ko.observable("");
            this.address = ko.observable("");
            this.email = ko.observable("");
            this.phone = ko.observable("");
            this.description = ko.observable("");
            this.isFocusName = ko.observable(false);
            this.isSending = ko.observable(false);
            this.isAdd = ko.observable(false);
            this.closeAddOrEdit = function () {
                _this.isShowAddOrEdit(false);
            };
            this.showEdit = function (item, updateCallback) {
                _this.isAdd(false);
                _this.eid(item.EID);
                _this.code(item.Code);
                _this.name(item.Name);
                _this.phone(item.Phone);
                _this.email(item.Email);
                _this.address(item.Address);
                _this.description(item.Description);
                _this.updateCallback = updateCallback;
                $("#addOrEditForm").modal('show');
            };
            this.delete = function (item) {
                swal({
                    title: "Delete item",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        //this.common.blockUI({ target: "#list", animate: true });
                        _this.model.delete(item.id, window.token, function (data) {
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
            };
            this.model = new document_model_1.DocumentModel();
            $(function () {
                //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
                _this.search(1);
            });
            //this.model = new DepartmentsModel();
            //$(() => {
            //    this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            //    this.listSalons(listSalons.result);
            //});
        }
        DocumentViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DocumentViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(function (data) {
                //console.log(data);
                _this.isSearching(false);
                _this.listRolesSetting(data);
                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        DocumentViewModel.prototype.save = function () {
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
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
            //return;
        };
        DocumentViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        DocumentViewModel.prototype.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        DocumentViewModel.prototype.resetForm = function () {
            this.eid("");
            this.code("");
            this.name("");
            this.email("");
            this.phone("");
            this.description("");
            this.address("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        return DocumentViewModel;
    }());
    window.viewModel = new DocumentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=document-viewmodel.js.map