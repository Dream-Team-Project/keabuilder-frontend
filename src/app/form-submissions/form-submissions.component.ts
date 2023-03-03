import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileUploadService } from '../_services/file-upload.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-form-submissions',
  templateUrl: './form-submissions.component.html',
  styleUrls: ['./form-submissions.component.css']
})
export class FormSubmissionsComponent implements OnInit {

  submissions:any[] = [];
  fetching:boolean = true;
  form_id:any = '';
  step = -1;
  delsubm:any;
  icons:any = {
    'full-name': 'fas fa-user',
    'name': 'far fa-user',
    'email': 'fas fa-envelope-open-text',
    'phone': 'fas fa-phone',
    'address': 'fas fa-address-card',
    'short-text': 'fas fa-text-width',
    'long-text': 'fas fa-text-height',
    'checkbox': 'far fa-check-square',
    'radio': 'far fa-dot-circle',
    'select': 'far fa-list-alt',
    'number': 'fas fa-hashtag',
    'split-text': 'far fa-hand-scissors',
  }

  constructor(
    private route: ActivatedRoute,
    private _file: FileUploadService,
    public _general: GeneralService,
    public dialog: MatDialog,
  ) {
      route.paramMap.subscribe((params: ParamMap) => {
        this.form_id = params.get('form_id');
        this.fetchSubm();
      })
   }

  ngOnInit(): void {
  }

  fetchSubm() {
    this._file.singleform_subm(this.form_id).subscribe((resp:any)=>{
      this.setSubmissions(resp.data);
    })
  }

  openDialog(templateRef: TemplateRef<any>, subm:any ): void {
    this.delsubm = subm;
    this.dialog.open(templateRef);
  }

  deletesubm(subm:any) {
    this.fetching = true;
    this._file.deleteform_subm(subm.id).subscribe((resp:any)=>{
      this.fetchSubm();
    })

  }

  showDetails(i:number) {
    this.submissions[i].data = this._general.decodeJSON(this.submissions[i].json);
    this.step = i;
    // var temp:any = new Object();  
    // this.submissions[i].data.forEach((sub:any)=>{
    //   if(sub.name == 'select') temp[sub.label] = sub.value;
    //   else if(sub.split && sub.name != 'select') {
    //       var value:any = [];
    //       sub.split?.forEach((spl:any)=>{
    //       if(spl.type == 'checkbox' && spl.selected) {
    //           value.push(spl.value);
    //           temp[sub.label] = value.join(', ');
    //       }
    //       else if(spl.type == 'radio' && spl.selected) temp[sub.label] = spl.value;
    //       else if(spl.subsplit) {
    //         spl.subsplit?.forEach((subspl:any)=>{
    //           temp[subspl.placeholder] = subspl.value;
    //         })
    //       }
    //     })
    //   } 
    //   else temp[sub.label] = sub.value;
    // })
    // console.log(temp);
    // var originalData:any = [];
    // this.submissions[i].data.forEach((sub:any)=>{
    //   if(sub.split) {
    //     sub.split?.forEach((spl:any)=>{
    //       if(spl.subsplit) {
    //         spl.subsplit?.forEach((subspl:any)=>{
    //           var temp:any = new Object();  
    //           temp[subspl.placeholder] = subspl.value;
    //           originalData.push(temp);
    //         })
    //       }
    //       else {
    //         var temp:any = new Object();
    //         temp[spl.placeholder] = spl.value;
    //         originalData.push(temp);
    //       }
    //     })
    //   } 
    //   else {
    //     var temp:any = new Object();
    //     temp[sub.label] = sub.value;
    //     originalData.push(temp);
    //   }
    // })
    // console.log(originalData);
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
