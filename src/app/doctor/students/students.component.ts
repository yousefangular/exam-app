import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentsService } from '../../shared/services/students.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  dataSource:any
  dataStudentBySubjects:any
  displayedColumns:any

  constructor(private studentService:StudentsService) {
    this.displayedColumns = ['index', 'name', 'subject', 'degree'];
   }

   ngOnInit(): void {
     this.getStudents()
   }
   getStudents(){
    this.studentService.getStudents('students').subscribe((res:any)=>{
      this.dataSource = res?.map((student:any)=>{
        if(student?.subjects){
          return student?.subjects?.map((subjec:any)=>{
            return {
              name: student.username,
              subject: subjec.name,
              degree: subjec.degree
            }
          })
        }else{
          return[ {
            name: student.username,
            subject: '-',
            degree: '-'
          }]
        }
       
      })
      // console.log(this.dataSource);
      this.dataStudentBySubjects = []
      this.dataSource.forEach((element:any )=> {
        element.forEach((item:any)=>{
          this.dataStudentBySubjects.push({
            name: item.name,
            subject: item.subject,
            degree: item.degree
          })
        })
      });

      console.log(this.dataStudentBySubjects);
    })
      }

}
