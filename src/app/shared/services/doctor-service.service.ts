import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  constructor(private http:HttpClient) { }

  createQuestions(model:any){
    return this.http.post('http://localhost:3000/subject' , model)
  }

  updateQuestion(model:any , id:number){
     return this.http.put('http://localhost:3000/subject/' +id ,model)
  }

  getAllSubjects(){
    return this.http.get('http://localhost:3000/subject');
  }
  deletSubjects(id:any){
    return this.http.delete('http://localhost:3000/subject/' + id);
  }

  getSubjectById(id:any){
   return this.http.get('http://localhost:3000/subject/' + id)
  }
}
