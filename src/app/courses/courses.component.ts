import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICourse} from './courses'
import { CourseService } from "./courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit, OnDestroy{
  title: string = "Udemy E-Learning";
  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _courseFilter: string = '';

  get courseFilter(): string{
    return this._courseFilter;
  }
  set courseFilter(value: string){
    this._courseFilter = value;
    console.log('In Setter', value);
    this.filteredCourses = this.performFilter(value);
}

  filteredCourses: ICourse[] = [];

  courses: ICourse[] = [];

  constructor(private courseService: CourseService){}

  performFilter(filterBy: string): ICourse[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.courses.filter((course: ICourse) =>
  course.title.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void{
    this.sub = this.courseService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
        this.filteredCourses = courses;
      },
      error: err => this.errorMessage = err
    });
    this.courseFilter = 'courses';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void{
    this.showImage = !this.showImage;
}


}
