import * as $ from "jquery";
import * as ko from "knockout";
import * as toastr from "toastr";
import * as swal from "sweetalert";

class DepartmentViewModel {
    private totalPage: number = 0;
    private currentPage: number = 1;
    private recordPerPage: number = window.pageSize;

    keyword: KnockoutObservable<string> = ko.observable("");
    isSearching: KnockoutObservable<boolean> = ko.observable(false);
    isShowAddOrEdit: KnockoutObservable<boolean> = ko.observable(false);

    //addEditSalonPartial: KnockoutObservable<AddEditSalonViewModel> = ko.observable(null);

    //constructor() {
    //    this.model = new SalonModel();
    //    this.common = new Common();

    //    $(() => {
    //        this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
    //        this.listSalons(listSalons.result);
    //    });
    //}

    private requirePartial(callback: Function) {
        debugger;
        //if (!this.addEditSalonPartial()) {
        //    //this.common.blockUI({ target: "#list", animate: true });
        //}

        require(["text!/Admin/Salon/PartialAddSalon", "validate"], (template: string) => {
            //if (!this.addEditSalonPartial()) {
            //    $("#addOrEdit").append(template);
            //    //this.addEditSalonPartial(new AddEditSalonViewModel());
                ko.applyBindingsToNode($("#addOrEditForm")[0], null, window.viewModel);

                $.validator.unobtrusive.parse("#addOrEditForm form");

            //    //this.common.unblockUI("#list");
            //}

            callback();
        });
    }

    formSearch() {
        this.search(1);
    }

    search(page: number) {
        this.currentPage = page;
        this.isSearching(true);
        //this.model.search(this.keyword(), page, this.recordPerPage, (data) => {
        //    this.isSearching(false);
        //    this.listSalons(data.result);
        //    this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
        //});
    }

    pageClickSearch(pageclickednumber: number) {
        this.search(pageclickednumber);
    }
    
    showAdd() {
        this.requirePartial(() => {
            //this.addEditSalonPartial().add(() => {
            //    this.search(1);
            //});
            this.isShowAddOrEdit(true);
        });
    }

    closeAddOrEdit = () => {
        this.isShowAddOrEdit(false);
    }

    //showEdit = (item: ISalon) => {
    //    this.requirePartial(() => {
    //        this.addEditSalonPartial().edit(item, () => {
    //            this.closeAddOrEdit();
    //            this.search(this.currentPage);
    //        });
    //        this.isShowAddOrEdit(true);
    //    });
    //}

    //delete = (item: ISalon) => {
    //    swal({
    //        title: this.common.stringFormat(window.resources.common.message.confirmDelete, this.title),
    //        text: "",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonText: window.resources.common.button.ok,
    //        cancelButtonText: window.resources.common.button.cancel,
    //        closeOnConfirm: true,
    //        closeOnCancel: true
    //    }, (isConfirm) => {
    //        if (isConfirm) {
    //            this.common.blockUI({ target: "#list", animate: true });

    //            this.model.delete(item.id, window.token, (data) => {
    //                if (data === -1) {
    //                    toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, this.title));
    //                    return;
    //                }
    //                if (data > 0) {
    //                    toastr.success(this.common.stringFormat(window.resources.common.message.deleteSuccess, this.title));
    //                }
    //            });
    //        }
    //    });
    //}
}

window.viewModel = new DepartmentViewModel();
ko.applyBindings(window.viewModel, document.getElementById("page-content"));