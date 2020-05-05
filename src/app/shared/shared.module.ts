import { NgModule } from "@angular/core";
import { EditorComponent } from './components/editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { FolderViewComponent } from './components/folder-view/folder-view.component';
import { FileInputComponent } from './components/folder-view/file-input/file-input.component';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        MonacoEditorModule.forRoot(),
        FormsModule,
        CommonModule,
        MatSliderModule,
        DragDropModule
    ],
    declarations: [
        EditorComponent,
        FolderViewComponent,
        FileInputComponent
    ],
    exports: [
        EditorComponent,
        FolderViewComponent,
        FileInputComponent,
        FormsModule,
        CommonModule,
        MatSliderModule,
        DragDropModule
    ]
})

export default class SharedModule { }