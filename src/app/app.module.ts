import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditableSurveysComponent } from './editable-surveys/editable-surveys.component';
import { SurveyGeneratorComponent } from './survey-generator/survey-generator.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PublishedSurveysComponent } from './published-surveys/published-surveys.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableSurveysComponent,
    SurveyGeneratorComponent,
    PublishedSurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
