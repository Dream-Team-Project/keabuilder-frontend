import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
providedIn: 'root'
})

export class FunnelService {

  uniquestepId:any;
  uuid:any = '';
  funnelname:any = '';
  funnel_id:any;
  step_id:any;
  funnel:any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getSingleFunnel(uniqueid:string): Observable<any> {
    return this.http.get('/api/getsinglefunnnel/'+this.uuid+'/'+uniqueid);
  }

  savefunneldb(data:any):Observable<any> {
    return this.http.post("/api/savefunnel/"+this.uuid, {
      data
    }, httpOptions);
  }

  getuniquefunnelstep(id:string, method:string): Observable<any> {
    return this.http.post('/api/getuniquefunnelstep/'+this.uuid,{
      id,
      method
    });
  }

  getSingleFunnelpage(uniqueid:string): Observable<any> {
    return this.http.get('/api/getsinglefunnelstep/'+this.uuid+'/'+uniqueid);
  }
  getSingleFunnelpages(obj:any): Observable<any> {
    obj.user_id=this.uuid;
    return this.http.post('/api/getsinglefunnelsteps',obj);
  }
  setfunnelstep(id:string):Observable<any> {
    return this.http.post("/api/selectedtemplate/"+this.uuid, {
      id
    }, httpOptions);
  }

  updatefunnelpage(data:any):Observable<any> {
    return this.http.post("/api/updatefunnelpage/"+this.uuid, {
      data
    }, httpOptions);
  }

  setfunnelvariation(id:string):Observable<any> {
    return this.http.post("/api/selectedvariation/"+this.uuid, {
      id
    }, httpOptions);
  }

  setfunnelvariationdeclare(id:string):Observable<any> {
    return this.http.post("/api/selectedvariationdeclare/"+this.uuid, {
      id
    }, httpOptions);
  }

  setfunneladd(id:string,data:any):Observable<any> {
    return this.http.post("/api/createnewstep/"+this.uuid, {
      id,
      data
    }, httpOptions);
  }

  setfunnelselect(id:string):Observable<any> {
    return this.http.post("/api/selectnewstep/"+this.uuid, {
      id
    }, httpOptions);
  }

  addnewtags(id:string,tags:string):Observable<any> {
    return this.http.post("/api/addnewtags/"+this.uuid, {
      id,
      tags
    }, httpOptions);
  }

  namepathchanges(id:string,name:string,which:string):Observable<any> {
    return this.http.post("/api/namepathchanges/"+this.uuid, {
      id,
      name,
      which
    }, httpOptions);
  }
  
  updatesteppath(obj:any):Observable<any> {
    return this.http.post("/api/updatesteppath/"+this.uuid, obj, httpOptions);
  }
  getfunnelcontacts(id:string, showing:string, steps:string):Observable<any> {
    return this.http.post("/api/selectfunnelcontacts/"+this.uuid, {
      id,
      showing,
      steps,
    }, httpOptions);
  }

  getfunnelexportcontacts(id:string):Observable<any> {
    return this.http.post("/api/selectfunnelexportcontacts/"+this.uuid, {
      id
    }, httpOptions);
  }

  deletefunnelcontacts(id:string):Observable<any> {
    return this.http.post("/api/deletefunnelcontacts/"+this.uuid, {
      id
    }, httpOptions);
  }

  getfunnelsales(id:string, showing:string, steps:string):Observable<any> {
    return this.http.post("/api/selectfunnelsales/"+this.uuid, {
      id,
      showing,
      steps,
    }, httpOptions);
  }

  getfunnelexportsale(id:string):Observable<any> {
    return this.http.post("/api/selectfunnelexportsale/"+this.uuid, {
      id
    }, httpOptions);
  }

  updatebasicdetails(data:any):Observable<any> {
    return this.http.post("/api/updatefunnelsetting/"+this.uuid, data, httpOptions);
  }

  getfunnelsetting(id:string):Observable<any> {
    return this.http.post("/api/selectfunnelsetting/"+this.uuid, {
      id
    }, httpOptions);
  }

  archivefunnelstep(id:string, reason:string):Observable<any> {
    return this.http.post("/api/archivefunnelstep/"+this.uuid, {
      id,
      reason
    }, httpOptions);
  }

  getarchivefunnel(showing:string):Observable<any> {
    return this.http.post("/api/getarchivefunnel/"+this.uuid, {
      showing,
    }, httpOptions);
  }

  getallfunnelandstep():Observable<any> {
    return this.http.post("/api/getallfunnelandstep/"+this.uuid, {
    }, httpOptions);
  }

  makefunnelsettings(data:any):Observable<any> {
    return this.http.post("/api/makefunnelsettings/"+this.uuid, {
      data
    }, httpOptions);
  }

  restoredeletefunnel(data:any):Observable<any> {
    return this.http.post("/api/restoredeletefunnel/"+this.uuid, data, httpOptions);
  }

  makefunnelstepduplicate(data:any):Observable<any> {
    return this.http.post("/api/makefunnelstepduplicate/"+this.uuid, {
      data,
    }, httpOptions);
  }

  movecopyfunnel(data:any):Observable<any> {
    return this.http.post("/api/movecopyfunnel/"+this.uuid, {
      data,
    }, httpOptions);
  }
  
  funnelandstepshorting(data:string, type:string):Observable<any> {
    return this.http.post("/api/funnelandstepshorting/"+this.uuid, {
      data,
      type
    }, httpOptions);
  }

  funneltemplates():Observable<any> {
    return this.http.post("/api/funneltemplates/"+this.uuid, {
    }, httpOptions);
  }

  funneladdeditproduct(data:any):Observable<any> {
    return this.http.post("/api/funneladdeditproduct/"+this.uuid, {
      data,
    }, httpOptions);
  }

  querystringmanagefunnel(data:any):Observable<any> {
    return this.http.post("/api/querystringmanagefunnel/"+this.uuid, {
      data
    }, httpOptions);
  }
  searchqueryFunnel(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/searchqueryFunnel",data, httpOptions);
  }
  searchqueryFunnelsteps(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/searchqueryFunnelsteps",data, httpOptions);
  }
  shortbypaginatorfunnnel(data:any):Observable<any> {
    return this.http.post("/api/shortbypaginatorfunnel/"+this.uuid, {
      data
    }, httpOptions);
  }
        
}