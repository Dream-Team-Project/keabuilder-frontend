import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  fieldTypes:Array<any> = [
    { name: 'email', label: 'Email 2', type: 'email', placeholder: 'Email Address', icon: '<i class="far fa-envelope"></i>', value: '', required: true },
    { name: 'phone', label: 'Phone 2', type: 'tel', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: false },
    { name: 'short-text', label: 'Short Text', type: 'text', field_tag: '', placeholder: 'Short Text', icon: '<i class="fas fa-text-width"></i>', value: '', required: false},
    { name: 'long-text', label: 'Long Text', type: 'textarea', field_tag: '', placeholder: 'Long Text', icon: '<i class="fas fa-text-height"></i>', value: '', required: false},
    { name: 'multiple-choice', label: 'Multiple Choice', field_tag: '', type: 'checkbox', icon: '<i class="far fa-check-square"></i>', value: '', required: false, options: [
        { value: 'First option', type: 'checkbox-option', selected: false},
        { value: 'Second option', type: 'checkbox-option', selected: false },
        { value: 'Third option', type: 'checkbox-option', selected: false },
      ] },
    { name: 'single-choice', label: 'Single Choice', field_tag: '', type: 'radio', icon: '<i class="far fa-dot-circle"></i>', value: '', required: false, options: [
        { value: 'First option', type: 'radio-option', selected: false },
        { value: 'Second option', type: 'radio-option', selected: false },
        { value: 'Third option', type: 'radio-option', selected: false },
      ] },
    { name: 'dropdown', label: 'Dropdown', field_tag: '', type: 'select', placeholder: 'Choose Option', icon: '<i class="far fa-list-alt"></i>', value: 'none', required: false, options: [
      { value: 'First option', type: 'select-option', selected: false },
      { value: 'Second option', type: 'select-option', selected: false },
      { value: 'Third option', type: 'select-option', selected: false },
    ] },
    { name: 'number', label: 'Number', field_tag: '', type: 'number', placeholder: 'Number', icon: '<i class="fas fa-hashtag"></i>', value: '', required: false},
    { name: 'date', label: 'Date', field_tag: '', type: 'date', icon: '<i class="far fa-calendar-alt"></i>', value: '', required: false},
    { name: 'time', label: 'Time', field_tag: '', type: 'time', icon: '<i class="far fa-clock"></i>', value: '', required: false},
  ];

  defaultFields:Array<any> = [
    { name: 'first-name', label: 'First Name', type: 'text', field_tag: '%FIRST_NAME%', placeholder: 'First Name', icon: '<i class="fas fa-user"></i>', value: '', required: true, default_field: true },
    { name: 'last-name', label: 'Last Name', type: 'text', field_tag: '%LAST_NAME%', placeholder: 'Last Name', icon: '<i class="fas fa-user"></i>', value: '', required: true, default_field: true },
    { name: 'email', label: 'Email', type: 'email', field_tag: '%EMAIL%', placeholder: 'Email Address', icon: '<i class="fas fa-envelope"></i>', value: '', required: true, default_field: true },
    { name: 'phone', label: 'Phone', type: 'tel', field_tag: '%PHONE%', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: true, default_field: true },
  ];
  
  user_id:any = '';
  allfields = './api/allfields';
  addfields = './api/addfield';
  updatefields = './api/updatefield';
  deletefields = './api/deletefield';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  fetchfields(){
    return this.http.get(this.allfields+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }

  addfield(obj:any) {
    obj.user_id=this.user_id;
    return this.http.post(this.addfields, obj)
    .pipe(catchError(this.errorHandler));    
  }

  updatefield(obj:any){
    obj.user_id = this.user_id;
    return this.http.post(this.updatefields,obj)
    .pipe(catchError(this.errorHandler));
  }

  deletefield(id:any){
    return this.http.delete(this.deletefields+'/'+id)
    .pipe(catchError(this.errorHandler));
  }

  searchFields(obj:any){
    obj.user_id = this.user_id;
    return this.http.post('/api/searchFields',obj)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}

