import { Injectable } from "@angular/core";
import { ICourse } from './courses';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    private courseUrl = 'https://www.udemy.com/api-2.0/courses/';
    
    constructor(private http: HttpClient){}
   
    getCourses(): Observable<ICourse[]>{
        return this.http.get<ICourse[]>(this.courseUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        return throwError(errorMessage);
    }
}

