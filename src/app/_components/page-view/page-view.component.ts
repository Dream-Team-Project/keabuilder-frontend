import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { FunnelService } from 'src/app/_services/funnels.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ElementService } from 'src/app/_services/_builder/element.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { ImageService } from 'src/app/_services/image.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageViewComponent implements OnInit {

  @Input ('target') target:any = 'main';
  @Input ('target_id') target_id:any;

  req = {
    uid: '',
    wid: '',
    pid: '',
  }
  page_json:any = {
    sections: [],
    mainstyle: '',
    header: {id: ''},
    footer: {id: ''}
  };

  constructor(
    private route: ActivatedRoute, 
    private webpage: WebpagesService, 
    private funnel: FunnelService,
    private _general: GeneralService,
    private _element: ElementService,
    private _file: FileUploadService,
    public _style: StyleService,
    public _image: ImageService) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let param_target = params.get('view_target');
      let id = params.get('view_id')?.split('-');
      if(id && this.target == 'main') {
        this.req.uid = id[0];
        this.req.wid = id[1];
        this.req.pid = id[2];
        if(param_target == 'website') {
          this.webpage.getpreviewWebpage(this.req).subscribe((resp:any)=>{
            this.page_json = this._general.decodeJSON(resp.data);
            // console.log(this.page_json)
            this._general.fetchMenus().then(resp => {
              this.setMenu(this.page_json.sections, resp);
            })
          })
        }
        else if(param_target == 'funnel') {
          this.funnel.getSingleFunnelpage(this.req.pid).subscribe((resp:any)=>{
            console.log(resp);
          })
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['target_id']) this.fetchTarget();
  }

  fetchTarget() {
    if(this.target == 'header') {
      this._file.getheader(this.target_id).subscribe((resp:any)=>{
        this.page_json = this._general.decodeJSON(resp.data[0].json);
        this._general.fetchMenus().then(resp => {
          this.setMenu(this.page_json.sections, resp);
        })
      })
    }
    else if(this.target == 'footer') {
      this._file.getfooter(this.target_id).subscribe((resp:any)=>{
        this.page_json = this._general.decodeJSON(resp.data[0].json);
        this._general.fetchMenus().then(resp => {
          this.setMenu(this.page_json.sections, resp);
        })
      })
    }
  }

  setMenu(sections:any, menus:any) {
    sections.forEach((sec:any)=>{
      sec.rowArr.forEach((row:any)=>{
        row.columnArr.forEach((col:any)=>{
          col.elementArr.forEach((ele:any)=>{
            var cont = ele.content;
            if(cont.name == 'menu') {
              menus.forEach((menu:any)=>{
                if(menu.id == cont.data_id) {
                  var menuObj = JSON.parse(JSON.stringify(menu));
                  ele.content = this._element.setMenu(cont, menuObj);
                }
              })
            }
        })
      })
      })
    })
  }

}
