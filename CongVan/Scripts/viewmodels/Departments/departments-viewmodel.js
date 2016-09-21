define(["require", "exports", "jquery", "knockout"], function (require, exports, $, ko) {
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
            this.closeAddOrEdit = function () {
                _this.isShowAddOrEdit(false);
            };
        }
        //constructor() {
        //    this.model = new SalonModel();
        //    this.common = new Common();
        //    $(() => {
        //        this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
        //        this.listSalons(listSalons.result);
        //    });
        //}
        //private requirePartial(callback: Function) {
        //    if (!this.addEditSalonPartial()) {
        //        this.common.blockUI({ target: "#list", animate: true });
        //    }
        //    require(["text!/Admin/Salon/PartialAddSalon", "validate"], (template: string) => {
        //        if (!this.addEditSalonPartial()) {
        //            $("#addOrEdit").append(template);
        //            this.addEditSalonPartial(new AddEditSalonViewModel());
        //            ko.applyBindingsToNode($("#addOrEditForm")[0], null, window.viewModel);
        //            let form = $("#addOrEditForm form");
        //            $.validator.unobtrusive.parse("#addOrEditForm form");
        //            this.common.unblockUI("#list");
        //        }
        //        callback();
        //    });
        //}
        DepartmentViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DepartmentViewModel.prototype.search = function (page) {
            this.currentPage = page;
            this.isSearching(true);
            //this.model.search(this.keyword(), page, this.recordPerPage, (data) => {
            //    this.isSearching(false);
            //    this.listSalons(data.result);
            //    this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            //});
        };
        DepartmentViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        DepartmentViewModel.prototype.showAdd = function () {
            $("#myModal").show();
            //this.requirePartial(() => {
            //    this.addEditSalonPartial().add(() => {
            //        this.search(1);
            //    });
            //    this.isShowAddOrEdit(true);
            //});
        };
        return DepartmentViewModel;
    }());
    window.viewModel = new DepartmentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=departments-viewmodel.js.map