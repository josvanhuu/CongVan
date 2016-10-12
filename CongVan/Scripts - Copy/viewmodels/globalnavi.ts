import * as $ from "jquery";
import * as ko from "knockout";

declare var naviactive: string;
class NavigationViewModel {
    naviactive: KnockoutObservable<string> = ko.observable(naviactive);
    constructor() {
        $("#" + this.naviactive()).addClass(" active");
    }
}
window.viewModel = new NavigationViewModel();
ko.applyBindings(window.viewModel, document.getElementById("navigation-main"));