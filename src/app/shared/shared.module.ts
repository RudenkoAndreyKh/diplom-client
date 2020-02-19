import { NgModule } from "@angular/core";
import { EditorComponent } from './components/editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
    declarations: [
        EditorComponent,
        FileInputComponent
    ],
    imports: [
        MonacoEditorModule.forRoot(),
        FormsModule
    ],
    exports: [
        EditorComponent,
        FileInputComponent
    ]
})

export default class SharedModule { }