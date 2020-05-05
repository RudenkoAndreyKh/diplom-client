import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import SharedModule from './shared/shared.module';
import CoreModule from './core/core.module';
import { FileManagementService } from './services/file.management.service';
import { FileObserver } from './services/file.observable.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { DragAndDropModule } from 'angular-draggable-droppable';

@NgModule({
  declarations: [
    AppComponent,
    EditorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DragAndDropModule
  ],
  providers: [FileManagementService, FileObserver],
  bootstrap: [AppComponent]
})
export class AppModule { }
