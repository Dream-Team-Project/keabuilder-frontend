import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ImageService } from 'src/app/_services/image.service';
import { WebpagesService } from 'src/app/_services/webpages.service';
@Component({
  selector: 'app-webpages-archive',
  templateUrl: './webpages-archive.component.html',
  styleUrls: ['./webpages-archive.component.css']
})
export class WebpagesArchiveComponent implements OnInit {

  
  archivepages:any[] = [];
  searching = false;
  delpage:any;
  uniqueid:any;

  constructor(private webpagesService: WebpagesService,
    public _general: GeneralService,
    public dialog: MatDialog,
    private route: ActivatedRoute,) {
      this.route.parent?.paramMap?.subscribe((params: ParamMap) => { 
        this.uniqueid = params?.get('website_id');
      })
     }

  ngOnInit(): void {
    this.archivedwebpage();
  }

  archivedwebpage(){
    // console.log(this.panelOpenState);
    if(this.uniqueid){
        this.searching = true;
        this.webpagesService.getarchivepages({webid:this.uniqueid,showing:'all'}).subscribe({
          next: data => {
            this.searching = false;
            // console.log(data);
            this.archivepages = data.data;
          }
        });
      

    }else if(!this.uniqueid){
        this.webpagesService.getarchivepages({webid:'',showing:'allpages'}).subscribe({
          next: data => {
            this.archivepages = data.data;
          }
        });
    }

  }
  openDialog(templateRef: TemplateRef<any>, page:any): void {
    this.delpage = page;
    this.dialog.open(templateRef).afterClosed().subscribe((data:any)=>{
      
    })
  }
  deletepage(selectdata:any,type:any){
    this.searching = true;
    this.webpagesService.restoredeletepage({id:selectdata.id, type:type}).subscribe({
      next: data => {
        this.searching = false;
        if(data.success==1){
          
          // var newpathobj:any = {website_id:this.uniqueid, path:data.path};
          // this.fileuploadService.deletepage(newpathobj).subscribe({
          //   next: data => {
          //     // console.log(data);
          //   }
          // });

          // var genscrn = 'keaimage-'+selectdata.uniqueid+'-screenshot.png';
          // this.fileuploadService.validateimg(genscrn).subscribe({
          //   next: data => {

          //    if(data.data==1){
          //       this.fileuploadService.deleteimage(genscrn).subscribe({
          //         next: data => {
          //           // console.log(data);
          //         }
          //       });
          //     }

          //   }
          // });
          this.archivedwebpage();
          this.dialog.closeAll();
        this._general.openSnackBar(
            false,data?.message,'OK','center','top');

        }
      }
    });
  }

  searchpages(search: any, filter: any) {
    this.searching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      archive:'1',
      website_id:this.uniqueid,
    }
    this.webpagesService.searchquerywebpages(obj).subscribe((data:any) => {
      this.searching = false;
        if(data.success){ 
          this.archivepages = data?.data;
        }
    });
    
  }



}
