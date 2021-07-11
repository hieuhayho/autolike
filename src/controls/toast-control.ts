export class ToastControl {
    public static showSuccessToast(text: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 5000;
        toastr.options.timeOut = 5000;
        toastr["success"](text);
    }

    public static showErrorToast(text: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 5000;
        toastr.options.timeOut = 5000;
        toastr["error"](text);
    }

    public static showErrorToastForAccountState(text: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 0;
        toastr.options.timeOut = 0;
        toastr["error"](text);
        return toastr;
    }
}
