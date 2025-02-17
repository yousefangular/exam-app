import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StudentsService {

   user = new Subject()

  constructor(private http :HttpClient) { }

  register(model :any){
    return this.http.post( 'http://localhost:3000/'+'students',model)
  }
  
  login(model :any){
    return this.http.put( 'http://localhost:3000/'+'login/4302',model)
  }

  getStudents(type:string){
    return this.http.get( 'http://localhost:3000/'+type)
  }

  getLogin(){
   return this.http.get('http://localhost:3000/'+'login/4302')
  }

  getStudentsById(id:any){
    return this.http.get('http://localhost:3000/'+'students/' + id )
  }
updateStudentData(id:any , model :any){
  return this.http.put('http://localhost:3000/'+'students/' + id , model)
}

}
