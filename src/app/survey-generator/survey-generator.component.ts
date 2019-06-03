import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import * as Query from '../query'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-generator',
  templateUrl: './survey-generator.component.html',
  styleUrls: ['./survey-generator.component.css']
})

export class SurveyGeneratorComponent implements OnInit {
  formNewQuestion: FormGroup

  survey: any = {
    'name':'',
    'description':'',
    'questions': []
  }
  options: any = []
  isMultiple: boolean = false

  questionId: number = 0
  isEdit: boolean = false
  
  surveyId: any = null

  constructor(private formBuilder : FormBuilder, private apollo: Apollo, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get("id")
    
    if(this.surveyId != null){
      this.getSurvey(+this.surveyId)
    }
    
    this.formNewQuestion = this.formBuilder.group({
      'type': ['text', Validators.required],
      'title': ['', Validators.required],
      'options': [[]]
    })
  }

  getSurvey(id: number) {
    this.apollo.watchQuery({ query: Query.readSurvey, variables: { id: id } }).valueChanges
      .subscribe(response => {
        this.survey = response.data['readSurvey'];
        this.survey.questions = JSON.parse(this.survey.questions)
      });
  }

  addQuestion() {
    if(this.formNewQuestion.valid){
      if(this.formNewQuestion.get('type').value != 'text' && this.formNewQuestion.get('type').value != 'textarea') {
        if(this.options.length > 0) {
          this.formNewQuestion.get('options').setValue(this.options.slice())
        }
      }

      this.survey.questions.push(this.formNewQuestion.value)
      this.resetForm()
    } 
  }

  resetForm() {
    this.formNewQuestion.get('type').setValue('text')
    this.formNewQuestion.get('title').setValue('')
    this.formNewQuestion.get('options').setValue([])
    this.isMultiple = false
  }

  checkChoosen() {
    this.options.splice(0, this.options.length)

    if(this.formNewQuestion.get('type').value != 'text' && this.formNewQuestion.get('type').value != 'textarea'){
      this.isMultiple = true
    } 
    else {
      this.isMultiple = false
    }
  }

  addOption(){
    this.options.push({'value': ''})
  }

  deleteQuestion(question: any) {
    let id = this.survey.questions.indexOf(question);
    this.survey.questions.splice(id, 1)
  }

  setEditQuestion(question: any) {
    this.questionId = this.survey.questions.indexOf(question);
    this.formNewQuestion.get('type').setValue(question.type)
    this.formNewQuestion.get('title').setValue(question.title)
    this.formNewQuestion.get('options').setValue(question.options)
    this.isEdit = true
  }

  editQuestion() {
    this.survey.questions[this.questionId] = this.formNewQuestion.value
    this.questionId = 0
    this.isEdit = false
  }

  deleteSurvey() {
    this.survey.name = ''
    this.survey.description = ''
    this.survey.questions.splice(0, this.survey.questions.length)
  }

  saveSurvey(draft: boolean){
    if(this.survey.name != '' && this.survey.description != '' && this.survey.questions.length > 0){
      this.survey.questions = this.survey.questions.slice()
      this.apollo.mutate({
        mutation: Query.createSurvey,
        variables: {
          name: this.survey.name,
          description: this.survey.description,
          questions: JSON.stringify(this.survey.questions),
          draft: draft
        }
      })
      .subscribe(data => {
        console.log(data);
        if(draft) {
          this.router.navigateByUrl('editable-surveys');
        }
        else {
          this.router.navigateByUrl('published-surveys');
        }
      },
      error => {
        console.log(error);
      })
    }
  }

  editSurvey(draft: boolean){
    this.apollo.mutate({
      mutation: Query.updateSurvey,
      variables: {
        id: +this.surveyId,
        name: this.survey.name,
        description: this.survey.description,
        questions: JSON.stringify(this.survey.questions),
        draft: draft
      },
    })
    .subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error);
    })
  }
}