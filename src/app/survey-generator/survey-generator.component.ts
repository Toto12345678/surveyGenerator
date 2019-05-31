import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-survey-generator',
  templateUrl: './survey-generator.component.html',
  styleUrls: ['./survey-generator.component.css']
})

export class SurveyGeneratorComponent implements OnInit {
  title = 'SurveyGenerator';
  formNewQuestion : FormGroup
  questions : any = []
  options : any = []
  isEdit: Boolean = false
  questionId: number = 0

  isMultiple : boolean = false

  constructor(
    private formBuilder : FormBuilder,
  ) {}

  ngOnInit() {
    this.formNewQuestion = this.formBuilder.group({
      'type': ['text', Validators.required],
      'title' : ['', Validators.required],
      'placeholder' : [''],
      'options':[[]]
    })
  }

  addQuestion(){
    if(this.formNewQuestion.valid){
      if(this.formNewQuestion.get('type').value != 'text' && this.formNewQuestion.get('type').value != 'textarea'){
        if(this.options.length>0){
          this.formNewQuestion.get('options').setValue(this.options.slice())
        } else { return 'No options for multiple selection' }
      }
      this.questions.push(this.formNewQuestion.value)
      console.log(this.questions)
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

  checkOptions(){
    //let 
    this.options.forEach(option => {
      if(option === ''){
        
        return
      }
    });
  }

  resetForm(){
    this.formNewQuestion.get('type').setValue('text')
    this.formNewQuestion.get('title').setValue('')
    this.formNewQuestion.get('placeholder').setValue('')
    this.formNewQuestion.get('options').setValue([])
  }

  deleteQuestion(question:any){
    let id = this.questions.indexOf(question);
    this.questions.splice(id, 1)
  }

  setEditQuestion(question:any){
    this.questionId = this.questions.indexOf(question);
    this.formNewQuestion.get('type').setValue(question.type)
    this.formNewQuestion.get('title').setValue(question.title)
    this.formNewQuestion.get('placeholder').setValue(question.placeholder)
    this.formNewQuestion.get('options').setValue(question.options)
    this.isEdit = true
  }

  editQuestion(){
    this.questions[this.questionId] = this.formNewQuestion.value
    this.questionId = 0
    this.isEdit = false
  }

  deleteSurvey(){
    this.questions.splice(0,this.questions.length)
  }

}
