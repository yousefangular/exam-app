import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorServiceService } from '../../shared/services/doctor-service.service';

@Component({
  selector: 'app-new-exam',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.scss'
})
export class NewExamComponent implements OnInit{
  name = new FormControl("");
  subjectNme :any
  questions :any[]= [];
  selectedIndex = 0
  questionForm!:FormGroup;
  startAdd:boolean = false
  prevew:boolean = false
  correctAns:any;
  id:any
  // clearRadioBtn :boolean = true

  constructor(private formBuilder :FormBuilder ,
              private toaster:ToastrService,
              private doctorService:DoctorServiceService
    ){}

  ngOnInit(): void {
    this.createForm()
  }

start(){
  if(this.name.value == ""){
    this.toaster.error("يرجى ادخال اسم المادة")
  }else{
    this.startAdd = true
    this.subjectNme = this.name.value
    this.selectedIndex = 1
  }

}

createForm(){
  this.questionForm = this.formBuilder.group({
    question : ["",Validators.required],
    answer1 : ["",Validators.required],
    answer2 : ["",Validators.required],
    answer3 : ["",Validators.required],
    answer4 : ["",Validators.required],
  })
}

clearForm(){
  this.questionForm.reset()
}

cancel(){
  this.questionForm.reset();
  this.questions = [];
  this.subjectNme = "";
  this.name.reset()
  this.selectedIndex = 0;
  this.startAdd = false
}

getAnswerCorect(event:any){
  this.correctAns = event.value
  
  
}

createQuestion(){
// this.clearRadioBtn = true
  if(this.correctAns){
    const model = {
      question : this.questionForm.value.question,
      answer1 : this.questionForm.value.answer1,
      answer2 : this.questionForm.value.answer2,
      answer3 : this.questionForm.value.answer3,
      answer4 : this.questionForm.value.answer4,
      correctAnswer :this.questionForm.value[this.correctAns]
    }
    this.questions.push(model)
    this.questionForm.reset()
    // this.clearRadioBtn = false
  }else{
    this.toaster.error("يرجى ادخال الاجابة الصحيحة")
  }
  console.log(this.questions);
  
}


submit(){
  const model = {
    name : this.subjectNme,
    questions : this.questions
  }


  if(this.prevew == true){
    this.selectedIndex = 2
  }else{
    this.doctorService.createQuestions(model).subscribe((res :any)=>{
      this.prevew = true
      this.id = res.id
    })
  }
}

delete (index:any){
  this.questions.splice(index , 1);
  const model = {
    name : this.subjectNme,
    questions : this.questions
  }

  this.doctorService.updateQuestion(model,this.id).subscribe((res)=>{
    this.toaster.success("تم حذف السؤال بنجاح")
  })
}
}
