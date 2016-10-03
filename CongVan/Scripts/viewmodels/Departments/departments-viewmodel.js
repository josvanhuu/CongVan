define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../common/common", "../../models/department/deparment-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, common_1, deparment_model_1) {
    "use strict";
    //declare var listDeparments: IListWithTotalRecord<any>; //: IListWithTotalRecord<IDeparment>;
    //declare var totalCount: number;
    var DepartmentViewModel = (function () {
        function DepartmentViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = 10; //window.pageSize;
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listdeparments = ko.observableArray([]);
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
            this.title = " 'Phòng ban' "; // window.resources.admin.salon.title.name;
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
                    title: _this.common.stringFormat(window.resources.common.message.confirmDelete, _this.title),
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: window.resources.common.button.ok,
                    cancelButtonText: window.resources.common.button.cancel,
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        //this.common.blockUI({ target: "#list", animate: true });
                        _this.model.delete(item.id, window.token, function (data) {
                            if (data === -1) {
                                toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, _this.title));
                                return;
                            }
                            if (data > 0) {
                                toastr.success(_this.common.stringFormat(window.resources.common.message.deleteSuccess, _this.title));
                            }
                        });
                    }
                });
            };
            this.model = new deparment_model_1.DeparmentModel();
            this.common = new common_1.Common();
            $(function () {
                _this.search(1);
            });
        }
        DepartmentViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DepartmentViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listdeparments(data.listDepartments);
                _this.common.renderPage(_this.title, page, _this.recordPerPage, data.totalRecord, _this.pageClickSearch);
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
                    _this.search(1);
                }
            });
            return;
        };
        DepartmentViewModel.prototype.pageClickSearch = function (page) {
            this.formSearch();
            //this.search(page);
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
        DepartmentViewModel.prototype.renderPage = function (page, totalRecord) {
            this.totalPage = Math.ceil(totalRecord / this.recordPerPage);
            var from = (this.currentPage - 1) * this.recordPerPage + 1;
            var to = (this.currentPage * this.recordPerPage < totalRecord ? this.currentPage * this.recordPerPage : totalRecord);
            $("#sumarypager").html(totalRecord === 0 ? this.common.stringFormat(window.resources.common.pager.noRecord, this.title) : this.common.stringFormat(window.resources.common.pager.description, from, to, totalRecord, this.title));
            $("#pager").pager({ pagenumber: page, pagecount: this.totalPage, totalrecords: totalRecord, buttonClickCallback: this.pageClickSearch });
        };
        return DepartmentViewModel;
    }());
    window.viewModel = new DepartmentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=departments-viewmodel.js.map