import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { FunnelService } from 'src/app/_services/funnels.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-funnel-step-archive',
  templateUrl: './funnel-step-archive.component.html',
  styleUrls: ['./funnel-step-archive.component.css']
})
export class FunnelStepArchiveComponent implements OnInit {

  archivesteps:any[] = [];
  searching = false;
  delstep:any;
  uniqueid:any;

  constructor(private funnelService: FunnelService,
    public _general: GeneralService,
    public dialog: MatDialog,
    public _image: ImageService,
    private _snackBar: MatSnackBar,         
    private fileuploadService: FileUploadService, 
    private route: ActivatedRoute,) {
      this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
        this.uniqueid = params.get('funnel_id');
      })
     }

  ngOnInit(): void {
    this.archivedsteps('archivefunnelstep',this.uniqueid);
  }

  archivedsteps(value:any,selectedid:any){
    // console.log(this.panelOpenState);
    if(value=='archivefunnelstep'){
        this.searching = true;
        
        this.funnelService.getuniquefunnelstep(this.uniqueid, value).subscribe({
          next: data => {
            this.searching = false;
            // console.log(data);
            this.archivesteps = data.data;
          }
        });
      

    }else if(value=='unarchiveit'){
        this.funnelService.getuniquefunnelstep(selectedid, value).subscribe({
          next: data => {
            this.archivedsteps('archivefunnelstep',this.uniqueid);
          }
        });
    }

  }
  openDialog(templateRef: TemplateRef<any>, page:any): void {
    this.delstep = page;
    this.dialog.open(templateRef);
  }
  deletefunnelstep(selectdata:any){
    this.searching = true;
    this.funnelService.getuniquefunnelstep(selectdata.id, 'deleteit').subscribe({
      next: data => {
        if(data.status==1){
          
          var newpathobj:any = {website_id:this.uniqueid, path:data.path};
          this.fileuploadService.deletepage(newpathobj).subscribe({
            next: data => {
              // console.log(data);
            }
          });

          var genscrn = 'keaimage-'+selectdata.uniqueid+'-screenshot.png';
          this.fileuploadService.validateimg(genscrn).subscribe({
            next: data => {

             if(data.data==1){
                this.fileuploadService.deleteimage(genscrn).subscribe({
                  next: data => {
                    // console.log(data);
                  }
                });
              }

            }
          });
          
          this.searching = false;
          this.archivedsteps('archivefunnelstep',this.uniqueid);
          this.dialog.closeAll();
        this._general.openSnackBar(
            false,'Funnel Step Deleted Successfully!','OK','center','top');

        }
      }
    });
  }

  searchfunnels(search: any, filter: any) {
    this.searching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      archive:'1',
      funnelid:this.uniqueid,
    }
    this.funnelService.searchqueryFunnelsteps(obj).subscribe((data:any) => {
      this.searching = false;
        if(data.success){ 
          this.archivesteps = data?.data;
        }
        
    });
    
  }

}
