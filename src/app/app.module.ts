import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditableSurveysComponent } from './editable-surveys/editable-surveys.component';
import { SurveyGeneratorComponent } from './survey-generator/survey-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableSurveysComponent,
    SurveyGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
