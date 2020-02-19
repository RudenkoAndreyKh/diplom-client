import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import SharedModule from './shared/shared.module';
import CoreModule from './core/core.module';
import { FileManagementService } from './services/file.management.service';

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
  ],
  providers: [FileManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
