import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DoctorServiceService } from '../../shared/services/doctor-service.service';
import { StudentsService } from '../../shared/services/students.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit{
  allSubjects:any[]=[]
  user:any= []

  constructor(private doctorService:DoctorServiceService,
              private userService:StudentsService,
              private toaster:ToastrService
  ){}

  ngOnInit(): void {
    this.getAllSubject()
    this.getRole()
  }

  getAllSubject(){
    this.doctorService.getAllSubjects().subscribe((res:any)=>{
      this.allSubjects = res
    })
  }

  getRole(){
    this.userService.getLogin().subscribe((res:any)=>{
      this.user = res
    })
  }

  delete(index:any){
    let id = this.allSubjects[index].id;
    this.allSubjects.splice(index,1);
    this.doctorService.deletSubjects(id).subscribe((res)=>{
      this.toaster.success("تم الحذف بنجاح")
    })
  }
}
