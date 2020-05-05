import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges } from '@angular/core';
import { Folder } from '../../models/folder.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.scss']
})
export class FolderViewComponent implements OnInit, OnChanges {
  @Input() projectDirectory: Folder;
  @Input() selectedFile: Folder;
  @Output() blurToEmit = new EventEmitter<{ index: number, value: string }>();
  @Output() fileToEmit = new EventEmitter<Folder>();

  public folderView: Folder = {
    name: '',
    children: [],
    folderOpen: false,
    hierarchyNumber: 0,
    path: '',
    type: '',
    isEditing: false
  };

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.folderView = this.projectDirectory;
  }

  public handleClick(e) {
    this.folderView.children.map(file => {
      if (file.name === e.target.innerText || '〉\n' + file.name === e.target.innerText) {
        file.folderOpen = !file.folderOpen;
      }
    })
  }

  public selectFile(file, e) {
    this.fileToEmit.next(file);
  }

  public blurCreatingFolderInput(index: number, value: string) {
    this.blurToEmit.next({ index, value });
  }

  public drop(event: CdkDragDrop<string[]>) {
    console.log('sdasd',event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
