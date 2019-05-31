import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../query'; //to import everything from file
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  survey: any
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSurvey(+this.route.snapshot.paramMap.get("id"))
  }
  
  getSurvey(id: number){
    this.apollo.watchQuery({ query: Query.readSurvey , variables: { id: id }}).valueChanges
      .subscribe(response => {
        //this.survey = response.data['readSurveys'];
        console.log(response);
      });

    // this.apollo.mutate({
    //   mutation: Query.readSurvey,
    //   variables: {
    //     id: id
    //   },
    // }).subscribe(({ data }) => {
    //   console.log(data);
    //   this.survey = data
    // }, (error) => {
    //   console.log(error);
    // });
  }
}
