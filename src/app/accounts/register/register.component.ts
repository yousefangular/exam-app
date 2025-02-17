import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../shared/services/students.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  form!:FormGroup;
  students :any[] = []

  constructor(private formBuilder :FormBuilder ,
     private studentService :StudentsService,
    private router :Router,
    private toaster :ToastrService
    ){}

  ngOnInit(): void {
    this.getDataForm();
    this.getStudents()
  }

getDataForm(){
 this.form = this.formBuilder.group({
username : ['',[Validators.required]],
email : ['',[Validators.required,Validators.email]],
password : ['',[Validators.required]],
confirmPassword : ['',[Validators.required]],
 })
}

getStudents(){
  this.studentService.getStudents('students').subscribe((res:any)=>{
    this.students = res
  })
}

register(){
  const model = {
    username : this.form.value.username,
    email : this.form.value.email,
    password : this.form.value.password
  }
let index = this.students.findIndex(item => item.email == this.form.value.email)

if(index !== -1){
this.toaster.error("الايميل بالفعل موجود")
}else{
  this.studentService.register(model).subscribe((res :any)=>{
    this.toaster.success("تم تسجيل الدخول بنجاح")
    this.router.navigate(['/login'])
  })
}

  
}


}
