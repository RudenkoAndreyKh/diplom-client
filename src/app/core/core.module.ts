import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        HttpClient
    ]
})

export default class CoreModule { }