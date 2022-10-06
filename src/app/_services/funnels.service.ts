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
  uniqueuserid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
    // console.log(this.tokenStorage.getUser());
  }

  saveondb(funnelname: any, funnelfirststep: any, badgecolor: any, funneltype:any):Observable<any> {
      return this.http.post("./api/savefunnel/"+this.uniqueuserid, {
          funnelname,
          funnelfirststep,
          badgecolor,
          funneltype
      }, httpOptions);
    }

    getuniquefunnelstep(id:string, method:string): Observable<any> {
      return this.http.post('./api/getuniquefunnelstep/'+this.uniqueuserid,{
        id,
        method
      });
    }

    getSingleFunnelpage(uniqueid:string): Observable<any> {
      return this.http.get('./api/getsinglefunnelstep/'+this.uniqueuserid+'/'+uniqueid);
    }

    setfunnelstep(id:string):Observable<any> {
      return this.http.post("./api/selectedtemplate/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    updatefunnelpage(data:any):Observable<any> {
      return this.http.post("./api/updatefunnelpage/"+this.uniqueuserid, {
        data
      }, httpOptions);
    }

    setfunnelvariation(id:string):Observable<any> {
      return this.http.post("./api/selectedvariation/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    setfunnelvariationdeclare(id:string):Observable<any> {
      return this.http.post("./api/selectedvariationdeclare/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    setfunneladd(id:string,data:any):Observable<any> {
      return this.http.post("./api/createnewstep/"+this.uniqueuserid, {
        id,
        data
      }, httpOptions);
    }

    setfunnelselect(id:string):Observable<any> {
      return this.http.post("./api/selectnewstep/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    addnewtags(id:string,tags:string):Observable<any> {
      return this.http.post("./api/addnewtags/"+this.uniqueuserid, {
        id,
        tags
      }, httpOptions);
    }

    namepathchanges(id:string,name:string,which:string):Observable<any> {
      return this.http.post("./api/namepathchanges/"+this.uniqueuserid, {
        id,
        name,
        which
      }, httpOptions);
    }

    getfunnelcontacts(id:string, showing:string, steps:string):Observable<any> {
      return this.http.post("./api/selectfunnelcontacts/"+this.uniqueuserid, {
        id,
        showing,
        steps,
      }, httpOptions);
    }

    getfunnelexportcontacts(id:string):Observable<any> {
      return this.http.post("./api/selectfunnelexportcontacts/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    deletefunnelcontacts(id:string):Observable<any> {
      return this.http.post("./api/deletefunnelcontacts/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    getfunnelsales(id:string, showing:string, steps:string):Observable<any> {
      return this.http.post("./api/selectfunnelsales/"+this.uniqueuserid, {
        id,
        showing,
        steps,
      }, httpOptions);
    }

    getfunnelexportsale(id:string):Observable<any> {
      return this.http.post("./api/selectfunnelexportsale/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    updatebasicdetails(id:string, funnelname:string,domain:string ,tags:string ,faviconurl:string ,headertracking:string ,bodytracking:string):Observable<any> {
      return this.http.post("./api/updatefunnelsetting/"+this.uniqueuserid, {
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
      return this.http.post("./api/selectfunnelsetting/"+this.uniqueuserid, {
        id
      }, httpOptions);
    }

    archivefunnelstep(id:string, reason:string):Observable<any> {
      return this.http.post("./api/archivefunnelstep/"+this.uniqueuserid, {
        id,
        reason
      }, httpOptions);
    }

    getarchivefunnel(showing:string):Observable<any> {
      return this.http.post("./api/getarchivefunnel/"+this.uniqueuserid, {
        showing,
      }, httpOptions);
    }

    getallfunnelandstep():Observable<any> {
      return this.http.post("./api/getallfunnelandstep/"+this.uniqueuserid, {
      }, httpOptions);
    }

    makefunnelsettings(value:string, id:string, type:string):Observable<any> {
      return this.http.post("./api/makefunnelsettings/"+this.uniqueuserid, {
        value,
        id,
        type
      }, httpOptions);
    }

    restoredeletefunnel(id:string, type:string):Observable<any> {
      return this.http.post("./api/restoredeletefunnel/"+this.uniqueuserid, {
        id,
        type
      }, httpOptions);
    }

    makefunnelstepduplicate(id:string, type:string):Observable<any> {
      return this.http.post("./api/makefunnelstepduplicate/"+this.uniqueuserid, {
        id,
        type
      }, httpOptions);
    }

    funnelandstepshorting(data:string, type:string):Observable<any> {
      return this.http.post("./api/funnelandstepshorting/"+this.uniqueuserid, {
        data,
        type
      }, httpOptions);
    }

    funneltemplates():Observable<any> {
      return this.http.post("./api/funneltemplates/"+this.uniqueuserid, {
      }, httpOptions);
    }

    funneladdeditproduct(data:any):Observable<any> {
      return this.http.post("./api/funneladdeditproduct/"+this.uniqueuserid, {
        data,
      }, httpOptions);
    }

    
    
    
    

        
}