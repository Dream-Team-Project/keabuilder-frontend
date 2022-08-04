import { Component, OnInit } from '@angular/core';
import { FormService } from '../_services/_builderService/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  constructor(
    public _formS: FormService
  ) { }

  ngOnInit(): void {
  }

}
