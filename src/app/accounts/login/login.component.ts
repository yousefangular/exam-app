import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../shared/services/students.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   loginForm!:FormGroup;
    users :any[] = []
    type:string = 'students'
  
    constructor(private formBuilder :FormBuilder ,
       private studentService :StudentsService,
      private router :Router,
      private toaster :ToastrService
      ){}
  
    ngOnInit(): void {
      this.getDataForm();
      this.getUsers()
    }

    getType(event:any){
      this.type = event.value
      this.getUsers()
    }
  
  getDataForm(){
   this.loginForm = this.formBuilder.group({
  type:[this.type],
  email : ['',[Validators.required,Validators.email]],
  password : ['',[Validators.required]],
  
   })
  }

  getUsers(){
    this.studentService.getStudents(this.type).subscribe((res:any)=>{
      this.users = res
    })
    
  }
  
  login(){
    
   
  let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)
  
  if(index == -1){
  this.toaster.error(" الايميل او كلمة السر غير صحيحة  ")
  }else{
    const model = {
      username :this.users[index].username,
      userId: this.users[index].id,
      role : this.type
    }

    this.studentService.login(model).subscribe((res :any)=>{
      this.studentService.user.next(res)
      this.toaster.success("تم تسجيل الدخول بنجاح")
      this.router.navigate(['/subjects'])
    })
  }
  
    
  }

}
