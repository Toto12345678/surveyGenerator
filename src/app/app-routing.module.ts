import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditableSurveysComponent } from './editable-surveys/editable-surveys.component';
import { SurveyGeneratorComponent } from './survey-generator/survey-generator.component';
import { PublishedSurveysComponent } from './published-surveys/published-surveys.component';

const routes: Routes = [
  { path: 'editable-surveys', component: EditableSurveysComponent },
  { path: 'published-surveys', component: PublishedSurveysComponent },
  { path: '', redirectTo: '/survey-generator', pathMatch: 'full'},
  { path: 'survey-generator/:id', component: SurveyGeneratorComponent},
  { path: 'survey-generator', component: SurveyGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
