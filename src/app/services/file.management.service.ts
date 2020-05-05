import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../shared/models/folder.model';

@Injectable()
export class FileManagementService {
    constructor(private http: HttpClient) {

    }

    public getProject() {
        return this.http.get('http://localhost:8080/file-management/get-project/project1&testuser@gmail.com');
    }

    public createFolder(value: string) {
        return this.http.post('http://localhost:8080/file-management/create-folder', {
            userEmail: 'testuser@gmail.com',
            folderName: value
        });
    }

    public getFileContent(path: string){
        let newPath = path.replace(/\//g, "%2F").replace(/\./g, '%2E');
        return this.http.get(`http://localhost:8080/file-management/get-file-content/${newPath}&testuser@gmail.com`);
    }

    public pasteCode(file: Folder) {
        return this.http.put('http://localhost:8080/file-management/paste-code', {
            code: file.code,
            path: file.path,
            userEmail: 'testuser@gmail.com'
        })
    }
}