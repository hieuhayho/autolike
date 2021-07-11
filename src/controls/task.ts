export interface Task {
    onProgressGetData(nameTask: string, data: any);

    onDoneGetData(nameTask: string);

    onErrorGetData(nameTask: string, e: any);
}
