import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditableSurveysComponent } from './editable-surveys/editable-surveys.component';
import { SurveyGeneratorComponent } from './survey-generator/survey-generator.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  { path: 'editable-surveys', component: EditableSurveysComponent },
  {path: '', redirectTo: '/survey-generator', pathMatch: 'full'},
  { path: 'survey-generator', component: SurveyGeneratorComponent},
  { path: 'survey/:id', component: SurveyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
