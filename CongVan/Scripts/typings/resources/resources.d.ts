declare namespace ResourcesModule {
    interface Admin {
        salon: ResourcesAdmin.Salon.SalonObject;
        user: ResourcesAdmin.User.UserObject;
        necessary: ResourcesAdmin.Necessary.NecessaryObject;
        necessary_manager: ResourcesAdmin.NecessaryManager.NecessaryManagerObject;
        payrollFormula: ResourcesAdmin.PayrollFormula.PayrollFormulaObject;
        service: ResourcesAdmin.Service.ServiceObject;
        salonRoom: ResourcesAdmin.SalonRoom.SalonRoomObject;
        adminGroupUser: ResourcesAdmin.AdminGroupUser.AdminGroupUserObject;
        salonRoomChair: ResourcesAdmin.SalonRoomChair.SalonRoomChairObject;
        salonRoomChairManager: ResourcesAdmin.SalonRoomChairManager.SalonRoomChairManagerObject;
    }

    interface Common {
        dateRangePicker: ResourcesCommon.DateRangePicker;
        defaultFormat: ResourcesCommon.DefaultFormat;
        mask: ResourcesCommon.Mask;
        pager: ResourcesCommon.Pager;
        message: ResourcesCommon.Message;
        allMonth: string[];
        allQuarter: string[];
        selectpicker: ResourcesCommon.Selectpicker;
        button: ResourcesCommon.Button;
        title: ResourcesCommon.Title;
    }

    interface Resources {
        common: Common;
        admin: Admin;
    }
}

declare namespace ResourcesCommon {
    interface DateRangePicker {
        applyLabel: string;
        cancelLabel: string;
        fromLabel: string;
        toLabel: string;
        weekLabel: string;
        customRangeLabel: string;
    }

    interface DefaultFormat {
        date: string;
        dateTime: string;
        dateTimeWithSecond: string;
        dateAndMonth: string;
        time: string;
        number: string;
        currency: string;
        dateAllFormat: string[];
        dateTimeAllFormat: string[];
    }

    interface Numeric {
        prefix: string;
        suffix: string;
        groupSeparator: string;
        radixPoint: string;
    }

    interface DateTime {
        date: string;
        dateTime: string;
    }

    interface Mask {
        numeric: Numeric;
        dateTime: DateTime;
    }

    interface Pager {
        noRecord: string;
        description: string;
    }

    interface Message {
        confirmDelete: string;
        addNewSuccess: string;
        updateSuccess: string;
        deleteSuccess: string;
        loginSuccess: string;
        loginFail: string;
        notExist: string;
        alreadyExist: string;
        notEnough: string;
    }

    interface Selectpicker {
        noneSelectedText: string;
        noneResultsText: string;
        selectAllText: string;
        deselectAllText: string;
    }

    interface Button {
        ok: string;
        cancel: string;
        upload: string;
        loadMore: string;
    }

    interface Title {
        add: string;
        edit: string;
    }
}

declare namespace ResourcesAdmin {
    namespace Salon {

        interface SalonObject {
            title: Title
        }

        interface Title {
            name: string;
            infoWindowTitle: string;
            infoWindowAddress: string;
            stateProvince: string;
            add: string;
            edit: string;
        }

    }

    namespace Necessary {

        interface NecessaryObject {
            title: Title
        }

        interface Title {
            name: string;
        }

    }

    namespace NecessaryManager {

        interface NecessaryManagerObject {
            title: Title
        }

        interface Title {
            name: string;
            namenecessary: string;
            namegrantor: string;
            namereceiver: string;
            namenumber: string;
        }

    }

    namespace User {
        interface UserObject {
            title: Title
        }

        interface Title {
            name: string;
            infoWindowTitle: string;
            infoWindowAddress: string;
        }
    }

    namespace PayrollFormula {

        interface PayrollFormulaObject {
            title: Title
        }

        interface Title {
            name: string;
            infoWindowTitle: string;
            infoWindowAddress: string;
            stateProvince: string;
            add: string;
            edit: string;
        }

    }

    namespace Service {

        interface ServiceObject {
            title: Title
        }

        interface Title {
            name: string;
            infoWindowTitle: string;
            infoWindowAddress: string;
            stateProvince: string;
            add: string;
            edit: string;
        }

    }

    namespace SalonRoom {
        interface SalonRoomObject {
            title: Title
        }

        interface Title {
            name: string;
        }
    }

    namespace AdminGroupUser {
        interface AdminGroupUserObject {
            title: Title
        }

        interface Title {
            name: string;
        }
    }

    namespace SalonRoomChair {
        interface SalonRoomChairObject {
            title: Title
        }

        interface Title {
            name: string;
        }
    }

    namespace SalonRoomChairManager {
        interface SalonRoomChairManagerObject {
            title: Title
        }

        interface Title {
            name: string;
        }
    }
}