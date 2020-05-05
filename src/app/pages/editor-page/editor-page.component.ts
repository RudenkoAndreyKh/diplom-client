import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FileManagementService } from 'src/app/services/file.management.service';
import { Folder } from 'src/app/shared/models/folder.model';
import { FileObserver } from '../../services/file.observable.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit, OnChanges {
  public isContextMenuOpen = false;
  public contextMenuPosition = {
    x: '0px',
    y: '0px',
  }
  public folderContextMenu = false;
  public fileContextMenu = false;
  public projectContextMenu = false;
  public projectName = '';
  public projectDirectory: Folder = {
    path: '',
    name: '',
    type: '',
    children: [],
    hierarchyNumber: 0,
    folderOpen: true,
    isEditing: false
  }
  public files: Folder[] = [];
  public selectedFile: Folder;
  public selectedFileInFM: Folder;
  constructor(private fmService: FileManagementService, private fileObserver: FileObserver) { }

  ngOnInit() {
    if (document.addEventListener) {
      document.addEventListener('contextmenu', (e: MouseEvent) => {
        this.contextMenuPosition.x = `${e.clientX + 5}px`;
        this.contextMenuPosition.y = `${e.clientY - 45 > 5 ? e.clientY - 45 : e.clientY + 20}px`;
        this.isContextMenuOpen = true;
        if (e.toElement.className === 'folder') {
          this.folderContextMenu = true;
        } else if (e.toElement.className === 'file') {
          this.fileContextMenu = true;
        } else {
          this.projectContextMenu = true;
        }
        e.preventDefault();
      });
    }
    this.fmService.getProject()
      .subscribe((res: Folder) => {
        this.files = JSON.parse(localStorage.getItem('files')) || [];
        this.selectedFile = JSON.parse(localStorage.getItem('selectedFile')) || undefined;
        this.projectDirectory = JSON.parse(localStorage.getItem('projectDirectory')) ?
          _.merge(JSON.parse(localStorage.getItem('projectDirectory')), res) : res;
        this.selectedFileInFM = JSON.parse(localStorage.getItem('selectedFileInFM')) || undefined;
      });
    this.fileObserver.fileCodeSubscriber$
      .subscribe(code => {
        this.selectedFile.code = code;
      })
  }

  ngOnChanges() {

  }

  public getFileContent(file: Folder) {
    this.fmService.getFileContent(file.path)
      .subscribe((res: string) => {
        if (this.files.length < 1 || this.files.filter(existFile => existFile.path === file.path).length < 1) {
          this.files.push({
            ...file,
            code: res
          });
        }
        this.selectedFile = {
          ...file,
          code: res
        };
        localStorage.setItem('files', JSON.stringify(this.files));
        localStorage.setItem('selectedFile', JSON.stringify(this.selectedFile));
        localStorage.setItem('selectedFileInFM', JSON.stringify(this.selectedFileInFM));
      })
  }

  public onKeyDown(e: any) {
    if (e.keyCode == 83 && e.ctrlKey) {
      e.preventDefault();
      alert('Ctrl+s');
      localStorage.setItem('selectedFile', JSON.stringify(this.selectedFile));
      this.fmService.pasteCode(this.selectedFile)
        .subscribe(res => {
          console.log(res);
        })
    }
  }

  public selectFile(file: Folder) {
    file.type === 'file' ? this.getFileContent(file) : null;
    this.selectedFileInFM = file;
    localStorage.setItem('projectDirectory', JSON.stringify(this.projectDirectory));
    localStorage.setItem('selectedFile', JSON.stringify(this.selectedFile));
    localStorage.setItem('selectedFileInFM', JSON.stringify(this.selectedFileInFM));
    const splittedPath = file.path.split('/');

    const openFolders = (i, children: Folder[]) => {
      let ind = -1;
      children.find(item => item.name === splittedPath[i]) &&
        children.find(item => item.name === splittedPath[i]).name !== file.name ?
        children.find((item, index) => {
          ind = index
          return item.name === splittedPath[i]
        }).folderOpen = true : null;
      children[ind] && children[ind].children ? openFolders(i + 1, children[ind].children) : null;
    }

    openFolders(5, this.projectDirectory.children);

  }

  public closeFile(file: Folder) {
    this.files = this.files.filter(item => item.path !== file.path);
  }

  public closeContextMenu() {
    this.isContextMenuOpen = false;
    this.fileContextMenu = false;
    this.folderContextMenu = false;
    this.projectContextMenu = false;
  }

  public blurCreatingFolderInput(event: { index: number, value: string }) {
    if (event.value.length > 0) {
      this.fmService.createFolder(event.value)
        .subscribe(res => {
          if (!res) {
            console.log('Folder with same name already exist');
            // this.projectDirectory.splice(event.index, 1);
          } else {
            console.log('Folder created successufully');
            this.projectDirectory[event.index].folderName = event.value;
          }
        })
    } else {
      // this.projectDirectory.splice(event.index, 1);
    }
  }

}
