import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileUploadService } from '../_services/file-upload.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-form-submissions',
  templateUrl: './form-submissions.component.html',
  styleUrls: ['./form-submissions.component.css']
})
export class FormSubmissionsComponent implements OnInit {

  submissions:any = [];
  fetching:boolean = true;
  form_id:any = '';
  step = -1;

  constructor(
    private route: ActivatedRoute,
    private _file: FileUploadService,
    public _general: GeneralService
  ) {
      route.paramMap.subscribe((params: ParamMap) => {
        this.form_id = params.get('form_id');
        this._file.singleform_subm(this.form_id).subscribe((resp:any)=>{
          this.setSubmissions(resp.data);
        })
      })
   }

  ngOnInit(): void {
  }

  showDetails(i:number) {
    console.log(this._general.decodeJSON(this.submissions[i].json))
    this.step = i;
  }

  searchSubmissions(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      form_id: this.form_id
    }
    this._file.searchformsubm(obj).subscribe((resp:any)=>{
      this.setSubmissions(resp.data);
    });
  }

  setSubmissions(data:any) {
    this.submissions = data;
    this.fetching = false;
  }
}
