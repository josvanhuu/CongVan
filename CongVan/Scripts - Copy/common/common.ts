import * as $ from "jquery"
import "jqueryBlockUI"
import "resourceCommon";

export class Common {
    private strips: string[] = ["áàảãạăắằẳẵặâấầẩẫậ", "ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ", "đ", "Đ", "éèẻẽẹêếềểễệ", "ÉÈẺẼẸÊẾỀỂỄỆ", "íìỉĩị", "ÍÌỈĨỊ", "óòỏõọơớờởỡợôốồổỗộ", "ÓÒỎÕỌƠỚỜỞỠỢÔỐỒỔỖỘ", "ưứừửữựúùủũụ", "ƯỨỪỬỮỰÚÙỦŨỤ", "ýỳỷỹỵ", "ÝỲỶỸỴ"];
    private replacements: string[] = ["a", "A", "d", "D", "e", "E", "i", "I", "o", "O", "u", "U", "y", "Y"];
    private regex = new RegExp("^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$");

    stringFormat(str: string, ...args: any[]) {
        for (let i = 0; i < args.length; i++) {
            const reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, args[i]);
        }
        return str;
    }

    resetFormValidate(selector: string) {
        const form: JQuery = $(selector);

        form.validate().resetForm();
        form.find("[data-val]").removeClass("input-validation-error").addClass("valid");
        form.find("[data-valmsg-replace]").removeClass("field-validation-error").addClass("field-validation-valid").empty();

        return form;
    }

    stripVietnameseChars(input) {
        let stringBuilder: string[] = [];
        for (let k:number = 0; k < input.length; k++) {
            stringBuilder.push(input.charAt(k));
        }
        for (let i:number = 0; i < stringBuilder.length; i++) {
            for (let j:number = 0; j < this.strips.length; j++) {
                if (this.strips[j].indexOf(stringBuilder[i]) > -1) {
                    stringBuilder[i] = this.replacements[j];
                }
            }
        }
        return stringBuilder.join("");
    }

    checkEmailFormat(email: string) {
        return this.regex.test($.trim(email));
    }

    escapeRegExp(str: string) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    replaceAll(str: string, find: string, replace: string) {
        if (str == null || str === "")
            return "";

        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }

    romanize(num: number) {
        if (!+num)
            return "";
        let digits: string[] = String(+num).split("");
        let key: string[] = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        let roman: string = "";
        let i: number = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    blockUI(options: JQBlockUIProviewOptions) {
        options = $.extend(true, {}, options);
        let html = '';
        if (options.animate) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
        } else if (options.iconOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="fa fa-spinner fa-pulse fa-2x" />< /div>';
        } else if (options.textOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        } else {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="fa fa-spinner fa-pulse fa-2x" /><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        }

        if (options.target) { // element blocking
            let el = $(options.target);
            if (el.height() <= ($(window).height())) {
                options.cenrerY = true;
            }
            el.block({
                message: html,
                baseZ: options.zIndex ? options.zIndex : 1000,
                centerY: options.cenrerY !== undefined ? options.cenrerY : false,
                css: {
                    top: '10%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor ? options.overlayColor : 'none',
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        } else { // page blocking
            $.blockUI({
                message: html,
                baseZ: options.zIndex ? options.zIndex : 1000,
                css: {
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        }
    }

    unblockUI(target) {
        if (target) {
            $(target).unblock({
                onUnblock: function () {
                    $(target).css('position', '');
                    $(target).css('zoom', '');
                }
            });
        } else {
            $.unblockUI();
        }
    }

    renderPage(title: string, page: number, recordPerPage: number, totalRecord: number,
        pageClickCallback: (pageclickednumber: number) => void, selectorSumary?: string, selectorPage?: string) {

        let totalPage = Math.ceil(totalRecord / recordPerPage);

        const from: number = (page - 1) * recordPerPage + 1;
        const to: number = (page * recordPerPage < totalRecord ? page * recordPerPage : totalRecord);

        $(selectorSumary ? selectorSumary : "#sumarypager").html(totalRecord === 0 ? this.stringFormat(window.resources.common.pager.noRecord, title) : this.stringFormat(window.resources.common.pager.description, from, to, totalRecord, title));

        $(selectorPage ? selectorPage : "#pager").pager({ pagenumber: page, pagecount: totalPage, totalrecords: totalRecord, buttonClickCallback: pageClickCallback });
    }
}