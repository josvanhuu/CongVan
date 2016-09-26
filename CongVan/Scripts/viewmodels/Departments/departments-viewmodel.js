define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../models/department/deparment-model"], function (require, exports, $, ko, toastr, swal, deparment_model_1) {
    "use strict";
    var DepartmentViewModel = (function () {
        function DepartmentViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = window.pageSize;
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listDeparments = ko.observableArray([]);
            //listDeparments: KnockoutObservableArray<any>;
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
            this.model = new deparment_model_1.DeparmentModel();
            this.listDeparments(listdeparments);
            $(function () {
                //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
                //this.search(1);
            });
            //this.model = new DepartmentsModel();
            //$(() => {
            //    this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            //    this.listSalons(listSalons.result);
            //});
        }
        DepartmentViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DepartmentViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(function (data) {
                _this.isSearching(false);
                _this.listDeparments(data);
                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        DepartmentViewModel.prototype.save = function () {
            var _this = this;
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
            this.model.update({
                eid: this.eid(), code: this.code(), name: this.name(), address: this.address(), email: this.email(),
                description: this.description(), phone: this.phone(), command: "insert"
            }, function (data) {
                _this.isSending(false);
                if ($.isArray(data)) {
                    toastr.error(data.join("<br>"));
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
                    _this.resetForm();
                    //this.updateCallback();
                    $("#addOrEditForm").modal('hide');
                    _this.formSearch();
                }
            });
            return;
        };
        DepartmentViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        DepartmentViewModel.prototype.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        DepartmentViewModel.prototype.resetForm = function () {
            this.eid("");
            this.code("");
            this.name("");
            this.email("");
            this.phone("");
            this.description("");
            this.address("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        return DepartmentViewModel;
    }());
    window.viewModel = new DepartmentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=departments-viewmodel.js.map