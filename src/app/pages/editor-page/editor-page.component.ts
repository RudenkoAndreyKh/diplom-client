import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FileManagementService } from 'src/app/services/file.management.service';

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
  public projectName = '';
  public projectDirectory = [

  ]

  constructor(private fmService: FileManagementService) { }

  ngOnInit() {
    if (document.addEventListener) {
      document.addEventListener('contextmenu', (e) => {
        this.contextMenuPosition.x = `${e.clientX + 5}px`;
        this.contextMenuPosition.y = `${e.clientY - 45 > 5 ? e.clientY - 45 : e.clientY + 20}px`;
        this.isContextMenuOpen = true;
        e.preventDefault();
      });
    }
    this.fmService.getProject()
    .subscribe(res => {
      console.log(res);
      this.projectName = res[0].name;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public createFolder() {
    // this.fmService.createFolder();
    this.projectDirectory.push({
      folderName: '',
      folders: [],
      files: [],
    });
    setTimeout(() => {
      // document.getElementById('input').focus();
    }, 1);
    // await document.getElementById("creating-folder-input").focus();
  }

  public blurCreatingFolderInput(event: { index: number, value: string }) {
    if (event.value.length > 0) {
      this.fmService.createFolder(event.value)
      .subscribe(res => {
        if(!res){
          console.log('Folder with same name already exist');
          this.projectDirectory.splice(event.index, 1);
        }else{
          console.log('Folder created successufully');
          this.projectDirectory[event.index].folderName = event.value;
        }
      })
    } else {
      this.projectDirectory.splice(event.index, 1);
    }
  }

}
