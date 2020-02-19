import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileManagementService {
    constructor(private http: HttpClient) {

    }

    public getProject() {
        return this.http.get('http://localhost:3000/file-management/get-project/project1&testuser@gmail.com');
    }

    public createFolder(value: string) {
        return this.http.post('http://localhost:3000/file-management/create-folder', {
            userEmail: 'testuser@gmail.com',
            projectName: 'project1',
            folderName: value
        });
    }
}