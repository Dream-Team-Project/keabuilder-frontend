import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ScrumboardService } from 'src/app/_services/scrumboard.service';

@Component({
  selector: 'app-scrum-boards',
  templateUrl: './scrum-boards.component.html',
  styleUrls: ['./scrum-boards.component.css']
})
export class ScrumBoardsComponent implements OnInit {
 
  @ViewChild('createboard') createboard!: TemplateRef<any>;

  boards:any ;
  deldata:any;
  fetching=false;
  boardNameFormControl = new FormControl('', Validators.required);
  boardDescriptionFormControl = new FormControl('', Validators.required);
  boarddata:any={id:'',uniqueid:'',boardName:'',description:'',created_at:'',updated_at:''};

  constructor(private dialog: MatDialog, 
    public scrumboardService: ScrumboardService,
     private _general: GeneralService,) { }

  ngOnInit(): void {
   this.fetchdata();
  }

  fetchdata(){
    this.fetching=true;
  this.scrumboardService.getAllBoards().subscribe(
    (result:any) => {
      this.boards = result.data;
      this.fetching=false;
    },
    errr => {
      console.error(errr);
      this.fetching=false;
    }
  )
  }
  resetobj(){
    this.boarddata.id='';
    this.boarddata.uniqueid='';
    this.boarddata.boardName='';
    this.boarddata.description='';
    this.boarddata.created_at='';
    this.boarddata.updated_at='';
    // this.boardNameFormControl.reset();
    // this.boardDescriptionFormControl.reset();
    this.deldata=[];
    this.fetchdata();
    this.dialog.closeAll();
  }

  // DELETE BOARD
  deleteBoard(board:any){
    this.fetching=true;
    this.scrumboardService.deleteBoard(board).subscribe(
    (result:any) => {
      this._general.openSnackBar(false,"Board Deleted",'OK','center','top');
      this.fetchdata();
      this.fetching=false;
    },
    (err:any) => {
      this.fetching=false;
      console.error(err);
    }
    )
  }

  openDialog(templateRef: TemplateRef<any>,board:any) {
    this.deldata=board;
    this.boarddata=board;
    this.dialog.open(templateRef).afterClosed().subscribe((data:any) => {
    })
  }


  handleIconClick(event: Event): void {
    console.log('Icon clicked!');
    event.stopPropagation();
  }
    // CREATE BOARD 
    createBoard(){
      this.fetching=true;
      this.scrumboardService.createBoard(this.boarddata).subscribe(
        result => {
          this._general.openSnackBar(false,"Board Created Succesfully!",'OK','center','top');
          this.resetobj();
          this.fetchdata();
          this.fetching=false;
        },
        err => {
          this.fetching=false;
          console.log(err);
        }
      )
    }
  
  
    // UPDATE BOARD DETAILS
    updateBoardDetails(){
      this.fetching=true;
      this.scrumboardService.updateBoardDetails(this.boarddata).subscribe(
        result => {
          this._general.openSnackBar(false,"Board Details Updated!",'OK','center','top');
          this.resetobj();
          this.fetchdata();
          this.fetching=false;
        },
        err => {
          this.fetching=false;
          console.log(err);
        }
      )
  
    }  
}
