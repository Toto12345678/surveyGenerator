import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import * as Query from '../query'; //to import everything from file

@Component({
  selector: 'app-editable-surveys',
  templateUrl: './editable-surveys.component.html',
  styleUrls: ['./editable-surveys.component.css']
})
export class EditableSurveysComponent implements OnInit {
  surveys: any = [];

  constructor(private apollo: Apollo) { 
  }

  ngOnInit() {
    console.log('entra')
    this.getSurveys();
  }

  getSurveys(){
    console.log('Toto')
    this.apollo.watchQuery({ query: Query.readSurveys }).valueChanges
      .subscribe(response => {
        this.surveys = response.data['readSurveys'];
        console.log(this.surveys);
      });
  }

}
