import { Component, OnInit, Input } from '@angular/core';
import 'ngx-monaco-editor'
import { FileObserver } from 'src/app/services/file.observable.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() code: string;
  public editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    defaultOptions: {
      scrollBeyondLastLine: false
    },
  };

  constructor(private fileObs: FileObserver) { }

  ngOnInit() {

  }

  public onKeyDown(e) {
    if (e.keyCode) {
      this.fileObs.fileCodeObserver(this.code);
    }
  }

  public click(e) {
    console.log(e)
  }

}
