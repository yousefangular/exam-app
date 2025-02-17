import { Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ExamComponent } from './student/exam/exam.component';
import { NewExamComponent } from './doctor/new-exam/new-exam.component';
import { StudentsComponent } from './doctor/students/students.component';
import { SubjectsComponent } from './doctor/subjects/subjects.component';
import { NotFountPageComponent } from './shared/not-fount-page/not-fount-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component :LoginComponent
    },
    {
        path :'register',
        component : RegisterComponent
    },
    {
        path:'exam/:id',
        component :ExamComponent
    },
    {
        path: 'new-exam',
        component : NewExamComponent
    },
    {
        path: 'students',
        component:StudentsComponent
    },
    {
        path: 'subjects',
        component :SubjectsComponent
    },
    {
        path: '',
        redirectTo :'login',
        pathMatch : 'full'
    },
    {
        path : '**',
        pathMatch : 'full',
        component : NotFountPageComponent
    }

];
