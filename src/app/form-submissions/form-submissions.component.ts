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
  fetching = true;

  constructor(
    private route: ActivatedRoute,
    private _file: FileUploadService,
    public _general: GeneralService
  ) {
      route.paramMap.subscribe((params: ParamMap) => {
        var prmObj = {
          user_id: params.get('user_id'),
          form_id: params.get('form_id')
        }
        this._file.fetchforms_subm().subscribe((res:any)=>{
          this.setSubmissions(res.data);
        })
      })
   }

  ngOnInit(): void {
  }

  searchSubmissions(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value
    }
    this._file.searchformsubm(obj).subscribe((res:any)=>{
      this.setSubmissions(res.data);
    });
  }

  setSubmissions(data:any) {
    console.log(data);
    this.submissions = data;
    this.fetching = false;
  }
}
