/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/global-declare/global-declare.d.ts" />
//declare var window: Window;
require.config({
    baseUrl: "/Scripts",
    paths: {
        jquery: "jquery-3.1.0.min",
        jqueryOlder: "../assets/js/jquery-1.11.3.min",
        jqueryValidate: "jquery.validate.min",
        jqueryValidateUnobtrusive: "jquery.validate.unobtrusive.min",
        jqueryCookie: "jquery.cookie-1.4.1.min",
        jqueryPager: "jquery.pager",
        jqueryBlockUI: "jquery.blockUI",
        bootstrap: "bootstrap.min",
        bootstrapDatetimepicker: "bootstrap-datetimepicker",
        moment: "moment.min",
        respond: "respond.min",
        knockout: "knockout-3.4.0",
        knockoutMap: "knockout.mapping-latest",
        amplify: "amplify.min",
        lodash: "lodash.min",
        toastr: "toastr.min",
        text: "text",
        aceExtra: "../assets/js/ace-extra.min",
        aceElement: "../assets/js/ace-elements.min",
        ace: "../assets/js/ace.min",
        async: "plugins/requirejs-plugins/async",
        "blueimp-md5": "plugins/blueimp-md5/md5.min",
        //adminLayout: "../assets/layouts/layout2/scripts/layout.min",
        globalizeCore: "globalize.0.1.3/globalize",
        wysiwyg: "plugins/wysiwyg/src/wysiwyg",
        wysiwygEditor: "plugins/wysiwyg/src/wysiwyg-editor",
        //proviewEditor: "plugins/wysiwyg/src/proviewEditor",
        sweetalert: "plugins/sweetalert/sweetalert.min",
        globalize: "globalize.0.1.3/cultures/globalize.culture." + window.currentCulture,
    },
    shim: {
        //bootstrap: ["jquery"],
        //bootstrapDatetimepicker: ["jquery", "moment"],
        //amplify: {
        //    deps: ["jquery"],
        //    exports: "amplify"
        //},
        //jqueryValidate: ["jquery"],
        //jqueryValidateUnobtrusive: ["jquery", "jqueryValidate"],
        //jqueryPager: ["jquery"],
        //jqueryCookie: ["jquery"],
        //jqueryBlockUI: ["jquery"],
        //adminApp: ["jquery", "bootstrap", "respond"],
        //adminLayout: ["jqueryCookie", "adminApp"],
        //globalize: ["globalizeCore"],
        //wysiwygEditor: ["wysiwyg", "jquery"],
        //proviewEditor: ["wysiwygEditor"]
        bootstrap: ["jquery"],
        amplify: {
            deps: ["jquery"],
            exports: "amplify"
        },
        jqueryValidate: ["jquery"],
        jqueryValidateUnobtrusive: ["jquery", "jqueryValidate"],
        jqueryPager: ["jquery"],
        jqueryCookie: ["jquery"],
        aceElement: ["jquery"],
        ace: ["jquery", "aceExtra", "aceElement"],
        //adminLayout: ["jqueryCookie", "adminApp"],
        globalize: ["globalizeCore"]
    }
});
//# sourceMappingURL=require-config.js.map