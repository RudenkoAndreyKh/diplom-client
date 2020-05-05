import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Input() index: number;
  @Output() blurToEmit = new EventEmitter<{ index: number, value: string }>();

  constructor(private inputElement: ElementRef<HTMLInputElement>) {

  }

  ngOnInit() {
    document.getElementById('creatingFile').focus()
  }

  public blurCreatingFolderInput(index: number, value: string) {
    this.blurToEmit.next({ index, value });
  }

}
