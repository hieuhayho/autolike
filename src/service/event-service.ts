import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()

export class EventService {
    @Output() public eventExample: EventEmitter<any> = new EventEmitter();
}
