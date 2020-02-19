import { Component, OnInit } from '@angular/core';
import 'ngx-monaco-editor'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  public editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    defaultOptions: {
      scrollBeyondLastLine: false
    },
  };

  constructor() { }

  ngOnInit() {

  }

  public click(e) {
    console.log(e)
  }

}
