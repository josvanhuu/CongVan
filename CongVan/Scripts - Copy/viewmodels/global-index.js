define(["require", "exports", "jquery", "knockout"], function (require, exports, $, ko) {
    "use strict";
    //declare var naviactive: string;
    var IndexViewModel = (function () {
        function IndexViewModel() {
            this.isFocusName = ko.observable(false);
            this.isSending = ko.observable(false);
            this.isAdd = ko.observable(false);
            //$("#" + this.naviactive()).addClass(" active");
        }
        IndexViewModel.prototype.ShowChangPass = function (updateCallback) {
            //this.isAdd(true);
            //this.resetForm();
            //this.updateCallback = updateCallback;
            $("#ChangePassForm").modal('show');
        };
        IndexViewModel.prototype.ShowProfile = function (updateCallback) {
            //this.isAdd(true);
            //this.resetForm();
            //this.updateCallback = updateCallback;
            $("#ChangePassForm").modal('show');
        };
        IndexViewModel.prototype.Logout = function () {
        };
        IndexViewModel.prototype.passwordsave = function () {
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
        };
        return IndexViewModel;
    }());
    window.viewModel = new IndexViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("navbar"));
});
//# sourceMappingURL=global-index.js.map