import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // languages = ['English', 'Spanish', 'Other'];
  languages = [];
  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster) {
    this.formPoster.getLanguages()
    .subscribe(
      data=>this.languages=data.languages,
      err=>console.log('get error: ',err)
    );

  }
  submitForm(form: NgForm) {
    //validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError)
      return;
    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
      data => console.log('sucess: ', data),
      err => console.log('error: ', err)
      )
  }
  validatePrimaryLanguage(value) {
    if (value === 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }
  firstNameToUpperCase(value: string) {
    if (value.length > 0)
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
      this.model.firstName = value;
  }
}
