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

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
    // console.log(this.tokenStorage.getUser());
  }

  saveondb(funnelname: any, funnelfirststep: any, badgecolor: any, funneltype:any):Observable<any> {
      return this.http.post("./api/savefunnel/"+this.uuid, {
          funnelname,
          funnelfirststep,
          badgecolor,
          funneltype
      }, httpOptions);
    }

    getuniquefunnelstep(id:string, method:string): Observable<any> {
      return this.http.post('./api/getuniquefunnelstep/'+this.uuid,{
        id,
        method
      });
    }

    getSingleFunnelpage(uniqueid:string): Observable<any> {
      return this.http.get('./api/getsinglefunnelstep/'+this.uuid+'/'+uniqueid);
    }

    setfunnelstep(id:string):Observable<any> {
      return this.http.post("./api/selectedtemplate/"+this.uuid, {
        id
      }, httpOptions);
    }

    updatefunnelpage(data:any):Observable<any> {
      return this.http.post("./api/updatefunnelpage/"+this.uuid, {
        data
      }, httpOptions);
    }

    setfunnelvariation(id:string):Observable<any> {
      return this.http.post("./api/selectedvariation/"+this.uuid, {
        id
      }, httpOptions);
    }

    setfunnelvariationdeclare(id:string):Observable<any> {
      return this.http.post("./api/selectedvariationdeclare/"+this.uuid, {
        id
      }, httpOptions);
    }

    setfunneladd(id:string,data:any):Observable<any> {
      return this.http.post("./api/createnewstep/"+this.uuid, {
        id,
        data
      }, httpOptions);
    }

    setfunnelselect(id:string):Observable<any> {
      return this.http.post("./api/selectnewstep/"+this.uuid, {
        id
      }, httpOptions);
    }

    addnewtags(id:string,tags:string):Observable<any> {
      return this.http.post("./api/addnewtags/"+this.uuid, {
        id,
        tags
      }, httpOptions);
    }

    namepathchanges(id:string,name:string,which:string):Observable<any> {
      return this.http.post("./api/namepathchanges/"+this.uuid, {
        id,
        name,
        which
      }, httpOptions);
    }

    getfunnelcontacts(id:string, showing:string, steps:string):Observable<any> {
      return this.http.post("./api/selectfunnelcontacts/"+this.uuid, {
        id,
        showing,
        steps,
      }, httpOptions);
    }

    getfunnelexportcontacts(id:string):Observable<any> {
      return this.http.post("./api/selectfunnelexportcontacts/"+this.uuid, {
        id
      }, httpOptions);
    }

    deletefunnelcontacts(id:string):Observable<any> {
      return this.http.post("./api/deletefunnelcontacts/"+this.uuid, {
        id
      }, httpOptions);
    }

    getfunnelsales(id:string, showing:string, steps:string):Observable<any> {
      return this.http.post("./api/selectfunnelsales/"+this.uuid, {
        id,
        showing,
        steps,
      }, httpOptions);
    }

    getfunnelexportsale(id:string):Observable<any> {
      return this.http.post("./api/selectfunnelexportsale/"+this.uuid, {
        id
      }, httpOptions);
    }

    updatebasicdetails(id:string, funnelname:string,domain:string ,tags:string ,faviconurl:string ,headertracking:string ,bodytracking:string):Observable<any> {
      return this.http.post("./api/updatefunnelsetting/"+this.uuid, {
        id,
        funnelname,
        domain,
        tags,
        faviconurl,
        headertracking,
        bodytracking
      }, httpOptions);
    }

    getfunnelsetting(id:string):Observable<any> {
      return this.http.post("./api/selectfunnelsetting/"+this.uuid, {
        id
      }, httpOptions);
    }

    archivefunnelstep(id:string, reason:string):Observable<any> {
      return this.http.post("./api/archivefunnelstep/"+this.uuid, {
        id,
        reason
      }, httpOptions);
    }

    getarchivefunnel(showing:string):Observable<any> {
      return this.http.post("./api/getarchivefunnel/"+this.uuid, {
        showing,
      }, httpOptions);
    }

    getallfunnelandstep():Observable<any> {
      return this.http.post("./api/getallfunnelandstep/"+this.uuid, {
      }, httpOptions);
    }

    makefunnelsettings(value:string, id:string, type:string):Observable<any> {
      return this.http.post("./api/makefunnelsettings/"+this.uuid, {
        value,
        id,
        type
      }, httpOptions);
    }

    restoredeletefunnel(id:string, type:string):Observable<any> {
      return this.http.post("./api/restoredeletefunnel/"+this.uuid, {
        id,
        type
      }, httpOptions);
    }

    makefunnelstepduplicate(id:string, type:string):Observable<any> {
      return this.http.post("./api/makefunnelstepduplicate/"+this.uuid, {
        id,
        type
      }, httpOptions);
    }

    funnelandstepshorting(data:string, type:string):Observable<any> {
      return this.http.post("./api/funnelandstepshorting/"+this.uuid, {
        data,
        type
      }, httpOptions);
    }

    funneltemplates():Observable<any> {
      return this.http.post("./api/funneltemplates/"+this.uuid, {
      }, httpOptions);
    }

    funneladdeditproduct(data:any):Observable<any> {
      return this.http.post("./api/funneladdeditproduct/"+this.uuid, {
        data,
      }, httpOptions);
    }

    
    
    
    

        
}