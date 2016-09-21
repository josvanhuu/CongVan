/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/global-declare/global-declare.d.ts" />
require.config({
    baseUrl: "/Scripts",
    paths: {
        jquery: "jquery-3.1.0.min",
        jqueryValidate: "jquery.validate.min",
        jqueryValidateUnobtrusive: "jquery.validate.unobtrusive.min",
        jqueryCookie: "jquery.cookie-1.4.1.min",
        jqueryPager: "jquery.pager",
        bootstrap: "bootstrap.min",
        respond: "respond.min",
        knockout: "knockout-3.4.0",
        knockoutMap: "knockout.mapping-latest",
        //amplify: "amplify.min",
        lodash: "lodash.min",
        toastr: "toastr.min",
    },
    shim: {
        bootstrap: ["jquery"],
        amplify: {
            deps: ["jquery"],
            exports: "amplify"
        },
        jqueryValidate: ["jquery"],
        jqueryValidateUnobtrusive: ["jquery", "jqueryValidate"],
        jqueryPager: ["jquery"],
        jqueryCookie: ["jquery"],
        adminApp: ["jquery", "bootstrap", "respond"],
        adminLayout: ["jqueryCookie", "adminApp"],
        globalize: ["globalizeCore"]
    }
});
//# sourceMappingURL=require-config.js.map