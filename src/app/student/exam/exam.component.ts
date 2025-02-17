import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { DoctorServiceService } from '../../shared/services/doctor-service.service';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../shared/services/students.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
id:any;
user:any
subject:any=[]
total :number = 0
showResult:boolean = false
studentInfo:any;
userSubjects:any[]= []
validExame:boolean = true

  constructor(private activatedRoute:ActivatedRoute , private doctorService:DoctorServiceService , private toaster :ToastrService , private userService:StudentsService){
   this.id =  this.activatedRoute.snapshot.paramMap.get("id"),
    // console.log(this.id);
    this.getSubjectById()
    this.getRole()
   
    
  }

  getSubjectById(){
    this.doctorService.getSubjectById(this.id).subscribe((res:any)=>{
      this.subject = res
      // console.log(this.subject);
      
    })
  }


  getRole(){
    this.userService.getLogin().subscribe((res:any)=>{
      this.user = res
      this.getStudentInfo()
    })
  }

  getStudentInfo(){
    this.userService.getStudentsById(this.user.userId).subscribe((res:any)=>{
      this.studentInfo = res
      this.userSubjects= res?.subjects ? res?.subjects : []
      // console.log(this.studentInfo);
      this.checkValidExam()
      
    })
  }



  delete(index :any){
    this.subject.questions.splice(index , 1);
    const model = {
      name : this.subject.name,
      questions : this.subject.questions
    }
  
    this.doctorService.updateQuestion(model,this.id).subscribe((res)=>{
      this.toaster.success("تم حذف السؤال بنجاح")
    })
  }

  getAnswer(event:any){
    let value = event.value
    let  questionIndex = event.source.name
    // console.log(questionIndex);
    this.subject.questions[questionIndex].studentAnswer = value

    
  }
getTotall(){
  this.total = 0
  for(let q in this.subject.questions){
      if(this.subject.questions[q].studentAnswer == this.subject.questions[q].correctAnswer ){
        this.total++
      }
  }
  // console.log(this.total);

  this.showResult = true
  this.userSubjects.push({
    name: this.subject.name,
    id:this.id,
    degree:this.total
  })
  const model ={
    username: this.studentInfo.username,
    email: this.studentInfo.email,
    password :this.studentInfo.password,
    subjects:this.userSubjects
  }
this.userService.updateStudentData(this.user.userId , model).subscribe((res:any)=>{
  this.toaster.success("تم تسجيل البيانات بنجاح")
})
  
}

checkValidExam(){
  for(let x in this.userSubjects){
    if(this.userSubjects[x].id == this.id){
      this.total = this.userSubjects[x].degree
      this.validExame = false
      this.toaster.warning("لقد اختبرت هذا الاختبار مسبقا")
    }
  }
}

  }
