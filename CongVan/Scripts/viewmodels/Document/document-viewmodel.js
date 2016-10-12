define(["require", "exports", "jquery", "knockout", "toastr", "lodash", "sweetalert", "../../models/document/document-model", "moment", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, lodash, swal, document_model_1, moment) {
    "use strict";
    function DocumentViewModel() {
        var _this = this;

        _this.doctype = doctype;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = window.pageSize;
        _this.title = doctype == 0 ? "Công Văn Đến" : "Công Văn Đi"; //ko.observable("Document");
        _this.keyword = ko.observable("");
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);
        _this.type = ko.observable();

        _this.listDocumentType = ko.observableArray([]);
        _this.listDepartment = ko.observableArray([]);
        _this.listUser = ko.observableArray(listuser);
        _this.listOrganization = ko.observableArray(listorganization);
        _this.arrUser = ko.observableArray([]);


        _this.listDocument = ko.observableArray([]);
        _this.listfiles = ko.observableArray([]);
        _this.eid = ko.observable("");
        //Document Field
        _this.documentcode = ko.observable("");
        _this.documentname = ko.observable("");
        _this.documentdes = ko.observable("");
        _this.documentdate = ko.observable("");
        _this.documentdateaction = ko.observable("");
        _this.documenttype = ko.observable("");
        _this.documentdepartment = ko.observable("");
        _this.documentuser = ko.observable("");
        _this.documentorganization = ko.observable("");
        //File Field
        _this.name = ko.observable("");
        _this.filename = ko.observable("");
        _this.filedescription = ko.observable("");
        _this.filepath = ko.observable("");
        _this.filetype = ko.observable("");
        _this.filedirect = ko.observable("");
        _this.filedatecreated = ko.observable("");
        _this.isFocusName = ko.observable(false);
        _this.isSending = ko.observable(false);
        _this.isAdd = ko.observable(false);
        _this.closeAddOrEdit = function () {
            _this.isShowAddOrEdit(false);
        };
        _this.showEdit = function (item, updateCallback) {
            _this.isAdd(false);
            _this.eid(item.EID);
            _this.documentcode(item.DocumentCode);
            _this.documentname(item.DocumentName);
            _this.documentdes(item.DocumentDes);
            _this.documentdate(moment(item.DocumentDate).format("YYYY-MM-DD"));
            _this.documentdateaction(moment(item.DocumentDateAction).format("YYYY-MM-DD"));
            _this.documenttype(item.DocumentType);
            _this.documentdepartment(item.DocumentDepartment);
            _this.documentuser(item.DocumentUser);
            _this.documentorganization(item.DocumentOrganization);

            //_this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        _this.delete = function (item) {
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
                    //_this.common.blockUI({ target: "#list", animate: true });
                    _this.model.delete(item.id, window.token, function (data) {
                        //if (data === -1) {
                        //    toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, _this.title));
                        //    return;
                        //}
                        //if (data > 0) {
                        //    toastr.success(_this.common.stringFormat(window.resources.common.message.deleteSuccess, _this.title));
                        //}
                    });
                }
            });
        };
        _this.model = new document_model_1.DocumentModel();

        $(function () {
            _this.listDocumentType(listdocumenttype);
            _this.listDepartment(listdepartment);
            _this.listUser(listuser);
            _this.listDocument(listdocument);
            //_this.listOrganization(listorganization);

            _this.totalPage = Math.ceil(_this.listDocument().length / _this.recordPerPage);
            $("#pager").pager({ pagenumber: 1, pagecount: _this.totalPage, totalrecords: _this.listDocument().length, buttonClickCallback: _this.pageClickSearch });
        });
        _this.model = new document_model_1.DocumentModel();

        _this.formSearch = function () {
            _this.search(1);
        };

        _this.search = function (page) {
            _this.currentPage = page;
            _this.isSearching(true);
            _this.model.load(_this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listDocument(data);

                _this.totalPage = Math.ceil(_this.listDocument().length / _this.recordPerPage);
                $("#pager").pager({ pagenumber: _this.currentPage, pagecount: _this.totalPage, totalrecords: data.length, buttonClickCallback: _this.pageClickSearch });

            });
        };
        _this.documentdepartment.subscribe(function (newValue) {
            if (newValue != undefined) {
                var listUsershort = _.find(_this.listUser(), function (o) { return o.departmentId == newValue; });
                var items = [];
                _.forEach(listUsershort, function (item) {
                    items.push(item);
                });
                _this.arrUser(listUsershort);
            }
        });

        _this.save = function () {
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            _this.isSending(true);
            //int type, string eid, string documentcode,
            //string documentname, string documentdes, string documentdate, string documentdateaction, string documenttype,
            //string documentdepartment, string documentorganization, string documentuser, string filedirect

            _this.model.update({
                type: _this.doctype, eid: _this.eid(), documentcode: _this.documentcode(), documentname: _this.documentname(),
                documentdes: _this.documentdes(), documentdate: _this.documentdate(), documentdateaction: _this.documentdateaction(),
                documenttype: _this.documenttype(),documentdepartment: _this.documentdepartment(), documentorganization: _this.documentorganization(),
                documentuser: _this.documentuser(), filedirect: ""
                //name: _this.name(), filename: _this.filename(), filedescription: _this.filedescription(), filepath: _this.filepath(),
                //filetype: _this.filetype(), filedirect: _this.filedirect(), filedatecreated: _this.filedatecreated()
            }, function (data) {
                _this.isSending(false);
                if ($.isArray(data)) {
                    toastr.error(data.join("<br>"));
                    return;
                }
                if (data === -2) {
                    toastr.warning(_this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                    return;
                }
                if (data === -3) {
                    toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
                    return;
                }
                if (data > 0) {
                    toastr.success('Succefull');
                    _this.resetForm();
                    //_this.updateCallback();
                    $("#addOrEditForm").modal('hide');
                    _this.search(_this.currentPage);
                }
            });
            return;
        };

        _this.pageClickSearch = function (pageclickednumber) {
            _this.search(pageclickednumber);
        };

        _this.showAdd = function (updateCallback) {
            _this.isAdd(true);
            _this.resetForm();
            _this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };

        _this.resetForm = function () {
            _this.eid("");
            _this.name("");
            //setTimeout(() => { _this.isFocusName(true); }, 100);
        };

        _this.formatDate = function (date) {
            return moment(date).format(window.resources.common.defaultFormat.date);
        };

        _this.getDocumentType = function (documenttype) {
            return _.find(_this.listDocumentType(), ['id', documenttype]).name;
        };

        _this.getDocumentOrganization = function (documentorganization) {
            console.log(_this.listOrganization());
            return _.find(_this.listOrganization(), ['id', documentorganization]).name;
        };

        _this.getDocumentDepartment = function (documentdepartment) {
            return _.find(_this.listDepartment(), ['id', documentdepartment]).name;
        };

        //$("#UploadFileDocument").fileupload({
        //    url: "/Upload/UploadAttachment",
        //    sequentialUploads: false,
        //    dataType: "json",
        //    dropZone: null,
        //    pasteZone: null,
        //    add: function (e, data) {
        //        var file = data.files[0];
        //        var msg = "";
        //        if (maxFileLength && file.size > maxFileLength) {
        //            if (msg.length > 0) {
        //                msg += "<br/>";
        //            }
        //            msg += file.name + ": " + resources.common.message.maxFileLengthUpload;
        //        } else if (!validateBlackListExtensions(file.name)) {
        //            if (msg.length > 0) {
        //                msg += "<br/>";
        //            }
        //            msg += file.name + ": " + resources.common.message.fileNotAllowUpload;
        //        }
        //        if (msg !== "") {
        //            toastr.error(msg);
        //        } else {
        //            data.submit();
        //            self.isUploading(true);
        //        }
        //    },
        //    done: function (e, data) {
        //        self.isUploading(false);
        //        if (data.result != undefined) {
        //            data.result[0].isDelete = ko.observable(false);
        //            data.result[0].CreatedDate = moment(data.result[0].CreatedOnDate).format(resources.common.defaultFormat.dateTime);
        //            data.result[0].CreatedOnDate = moment(data.result[0].CreatedOnDate).format(resources.common.defaultFormat.date);
        //            self.listPosmAttachment.push(data.result[0]);
        //        }
        //    }
        //});

    }

    window.viewModel = new DocumentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});