import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
providedIn: 'root'
})

export class FunnelService {

    constructor(private http:HttpClient) { }

  saveondb(funnelname: any, funnelfirststep: any, badgecolor: any):Observable<any> {
      return this.http.post("/api/savefunnel", {
          funnelname,
          funnelfirststep,
          badgecolor
      }, httpOptions);
    }

    getuniquefunnelstep(id:string, method:string): Observable<any> {
      return this.http.post('/api/getuniquefunnelstep',{
        id,
        method
      });
    }

    setfunnelstep(id:string):Observable<any> {
      return this.http.post("/api/selectedtemplate", {
        id
      }, httpOptions);
    }

    setfunnelvariation(id:string):Observable<any> {
      return this.http.post("/api/selectedvariation", {
        id
      }, httpOptions);
    }

    setfunnelvariationdeclare(id:string):Observable<any> {
      return this.http.post("/api/selectedvariationdeclare", {
        id
      }, httpOptions);
    }

    setfunneladd(id:string):Observable<any> {
      return this.http.post("/api/createnewstep", {
        id
      }, httpOptions);
    }

    setfunnelselect(id:string):Observable<any> {
      return this.http.post("/api/selectnewstep", {
        id
      }, httpOptions);
    }

    addnewtags(id:string,tags:string):Observable<any> {
      return this.http.post("/api/addnewtags", {
        id,
        tags
      }, httpOptions);
    }

    namepathchanges(id:string,name:string,which:string):Observable<any> {
      return this.http.post("/api/namepathchanges", {
        id,
        name,
        which
      }, httpOptions);
    }

    getfunnelcontacts(id:string, showing:string, steps:string):Observable<any> {
      return this.http.post("/api/selectfunnelcontacts", {
        id,
        showing,
        steps,
      }, httpOptions);
    }

    getfunnelexportcontacts(id:string):Observable<any> {
      return this.http.post("/api/selectfunnelexportcontacts", {
        id
      }, httpOptions);
    }

    deletefunnelcontacts(id:string):Observable<any> {
      return this.http.post("/api/deletefunnelcontacts", {
        id
      }, httpOptions);
    }

    getfunnelsales(id:string, showing:string, steps:string):Observable<any> {
      return this.http.post("/api/selectfunnelsales", {
        id,
        showing,
        steps,
      }, httpOptions);
    }

    getfunnelexportsale(id:string):Observable<any> {
      return this.http.post("/api/selectfunnelexportsale", {
        id
      }, httpOptions);
    }

    updatebasicdetails(id:string, funnelname:string,domain:string ,tags:string ,faviconurl:string ,headertracking:string ,bodytracking:string):Observable<any> {
      return this.http.post("/api/updatefunnelsetting", {
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
      return this.http.post("/api/selectfunnelsetting", {
        id
      }, httpOptions);
    }

    archivefunnelstep(id:string, reason:string):Observable<any> {
      return this.http.post("/api/archivefunnelstep", {
        id,
        reason
      }, httpOptions);
    }

    getarchivefunnel(showing:string):Observable<any> {
      return this.http.post("/api/getarchivefunnel", {
        showing,
      }, httpOptions);
    }

    getallfunnelandstep():Observable<any> {
      return this.http.post("/api/getallfunnelandstep", {
      }, httpOptions);
    }

    makefunnelsettings(value:string, id:string, type:string):Observable<any> {
      return this.http.post("/api/makefunnelsettings", {
        value,
        id,
        type
      }, httpOptions);
    }

    restoredeletefunnel(id:string, type:string):Observable<any> {
      return this.http.post("/api/restoredeletefunnel", {
        id,
        type
      }, httpOptions);
    }

    makefunnelstepduplicate(id:string, type:string):Observable<any> {
      return this.http.post("/api/makefunnelstepduplicate", {
        id,
        type
      }, httpOptions);
    }

    
    
    

        
}