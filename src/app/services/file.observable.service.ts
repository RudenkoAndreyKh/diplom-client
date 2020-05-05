import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Folder } from '../shared/models/folder.model';

@Injectable({
    providedIn: 'root',
})

export class FileObserver {
    private newFile = new Subject<Folder>();
    fileSubscriber$ = this.newFile;

    fileObserver(file: Folder) {
        this.newFile.next(file);
    }

    private fileCode = new Subject<string>();
    fileCodeSubscriber$ = this.fileCode;

    fileCodeObserver(code: string) {
        console.log(code);
        
        this.fileCode.next(code);
    }
} 