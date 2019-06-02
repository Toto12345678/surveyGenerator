import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import * as Query from '../query'; //to import everything from file
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-generator',
  templateUrl: './survey-generator.component.html',
  styleUrls: ['./survey-generator.component.css']
})

export class SurveyGeneratorComponent implements OnInit {
  title = 'SurveyGenerator';
  formNewQuestion : FormGroup
  survey: any = {
    'name':'',
    'description':'',
    'questions': []
  }
  //questions : any = []
  options : any = []
  isEdit: boolean = false
  questionId: number = 0
  surveyId : any = null
  isMultiple : boolean = false

  constructor(
    private formBuilder : FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get("id")
    if(this.surveyId != null){
      console.log('pasa')
      this.getSurvey(+this.surveyId)
    }
    this.formNewQuestion = this.formBuilder.group({
      'type': ['text', Validators.required],
      'title' : ['', Validators.required],
      'placeholder' : [''],
      'options':[[]]
    })
  }

  getSurvey(id: number){
    this.apollo.watchQuery({ query: Query.readSurvey , variables: { id: id }}).valueChanges
      .subscribe(response => {
        this.survey = response.data['readSurvey'];
        console.log(this.survey)
        this.survey.questions = JSON.parse(this.survey.questions)
      });
  }

  addQuestion(){
    if(this.formNewQuestion.valid){
      if(this.formNewQuestion.get('type').value != 'text' && this.formNewQuestion.get('type').value != 'textarea'){
        if(this.options.length>0){
          this.formNewQuestion.get('options').setValue(this.options.slice())
        } else { return 'No options for multiple selection' }
      }
      this.survey.questions.push(this.formNewQuestion.value)
      console.log(this.survey.questions)
      this.resetForm()
    } else {return 'Error'}
  }

  checkChoosen(){
    this.options.splice(0,this.options.length)
    if(this.formNewQuestion.get('type').value != 'text' && this.formNewQuestion.get('type').value != 'textarea'){
      this.isMultiple = true
    } else {
      this.isMultiple = false
    }
  }

  addOption(){
    this.options.push({'value':''})
  }

  resetForm(){
    this.formNewQuestion.get('type').setValue('text')
    this.formNewQuestion.get('title').setValue('')
    this.formNewQuestion.get('placeholder').setValue('')
    this.formNewQuestion.get('options').setValue([])
  }

  deleteQuestion(question:any){
    let id = this.survey.questions.indexOf(question);
    this.survey.questions.splice(id, 1)
  }

  setEditQuestion(question:any){
    this.questionId = this.survey.questions.indexOf(question);
    this.formNewQuestion.get('type').setValue(question.type)
    this.formNewQuestion.get('title').setValue(question.title)
    this.formNewQuestion.get('placeholder').setValue(question.placeholder)
    this.formNewQuestion.get('options').setValue(question.options)
    this.isEdit = true
  }

  editQuestion(){
    this.survey.questions[this.questionId] = this.formNewQuestion.value
    this.questionId = 0
    this.isEdit = false
  }

  deleteSurvey(){
    this.survey.name = ''
    this.survey.description = ''
    this.survey.questions.splice(0,this.survey.questions.length)
  }

  saveSurvey(draft: boolean){
    console.log(this.survey.questions)
    if(this.survey.name != '' && this.survey.description != '' && this.survey.questions.length > 0){
      //this.survey.questions = this.survey.questions.slice()
      this.apollo.mutate({
        mutation: Query.createSurvey,
        variables: {
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
    } else {console.log('Es inválido')}
  }

  editSurvey(draft: boolean){
    console.log('Se hace')
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
      console.log('No hay error')
      console.log(data);
    },
    error => {
      console.log('Hay error')
      console.log(error);
    })
  }
}
