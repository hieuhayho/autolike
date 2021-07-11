import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {EventService} from "../service/event-service";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        NgMultiSelectDropDownModule,
    ],
    providers: [EventService],
    bootstrap: [AppComponent],
    exports: [
    ]
})
export class AppModule {
}
