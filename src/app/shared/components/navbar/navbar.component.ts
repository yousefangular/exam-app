import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  user :any = null

  constructor(private service :StudentsService){}

ngOnInit(): void {
  this.getuser()
}

getuser(){
this.service.user.subscribe((res:any)=>{
  if(res.role){

    this.user = res
  }
  
})}

logout(){
  let model = {}
  this.service.login(model).subscribe((res)=>{
    this.user = null
    this.service.user.next(res)
  })
}
}
