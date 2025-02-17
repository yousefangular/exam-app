import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { StudentsService } from './shared/services/students.service';
import { login } from './shared/interface/interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  constructor(private service:StudentsService){}
  ngOnInit(): void {
    this.getLogin()
  }

  getLogin(){
    this.service.getLogin().subscribe((res:any)=>{
      this.service.user.next(res)

      
    })
  }
}
