import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ScrumboardService } from 'src/app/_services/scrumboard.service';


@Component({
  selector: 'app-scrum-board-list',
  templateUrl: './scrum-board-list.component.html',
  styleUrls: ['./scrum-board-list.component.css']
})
export class ScrumBoardListComponent implements OnInit {

  containers: any =[];

  containerOrder: any;
  fetching=false;
  addListInputShow = false;
  listTitleInput = null;
  titleInputFormControl = new FormControl('');
  listId: any = null;
  listNameFormControl = new FormControl('', Validators.required);
  listItemFormControl = new FormControl('', Validators.required);
  listItemId: any = null;
  listItemContainer: any = null;
  listItemEditFormControl = new FormControl('');
  boardId: any;
  dragContainer: any = null;
  dropContainer: any = null;
  boardName: any = '';
  listitems:any;


   
    
  constructor(private dialog: MatDialog, 
    private route: ActivatedRoute,
    public scrumboardService: ScrumboardService,
     private _general: GeneralService,) { 
      this.boardId = this.route.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata(){
    this.fetchBoard();
    this.fetchBoardlist();
  }
  fetchBoard(){
    this.fetching=true;
    this.scrumboardService.getBoardDetails({uniqueid: this.boardId}).subscribe(
      (result:any) => {
        this.boardName = result.data[0].boardName;
        this.fetching=false;
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
  }

  fetchBoardlist(){
    this.fetching=true;
    this.scrumboardService.getBoardLists({ board_id: this.boardId }).subscribe(
      (result: any) => {
        this.fetching=false;
        this.containers = result.data;
        this.containers.map((container: any) => {
          if(container.list_item){
            let temp_list=this._general.decodeJSON(container.list_item);
            container.list_item=temp_list;
          }
          else{
            container.list_item=[];
          }
        })
        
        this.containerOrder = this.containers.map((container: any) => container.uniqueid);
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
  }


  // DROP HANDLER FUNCTION
  drop(event: CdkDragDrop<string[]>, currentContainer: any, isContainerDrop = false): void {
    this.fetching=true;
    if (isContainerDrop) {
      moveItemInArray(this.containerOrder, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

    const updateListDetails = {
      firstList: this._general.encodeJSON(currentContainer),
      secondList: this._general.encodeJSON(this.dragContainer)
    }

    this.scrumboardService.updateListItemAfterTransfer(updateListDetails).subscribe(
      result => {
        this._general.openSnackBar(false,"List Updated",'OK','center','top');
        this.fetching=false;
      },
      err => {
        this.fetching=false;
        console.error(err);
      }
    )

  }



  // ADD LIST ITEM FUNCTION
  addListItem(container: any) {
    this.fetching=true;
    if (this.listItemFormControl.status == 'VALID') {
    container.list_item.push(this.listItemFormControl.value);
    let newListItem=this._general.encodeJSON(container.list_item);
    container.list_item=newListItem;
    this.scrumboardService.updateListItem(container).subscribe(
      (result: any) => {
        console.log(result)
        this._general.openSnackBar(false,"List Item Added",'OK','center','top');
        this.listItemFormControl.reset();
        this.listId = null;
        this.fetching=false;
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
    }
    else{
      this.fetching = false;
      return;
    }
  };



  // GET THE PREVIOUS CONTAINER ID OF DRAG ELEMENT
  onDragStart(container: any): void {
    this.dragContainer = container;
  }


  // SHOW INPUT BOX FOR ADDING LIST
  showAddListInput() {
    this.addListInputShow = !this.addListInputShow;
  }


  // SHOW INPUT BOX OF ADDING LIST ITEM
  showAddListItemInput(id: any) {
    if (this.listId === id) {
      this.listId = null;
    }
    else {
      this.listId = id;
    }
  }


  // SHOW LIST TITLE INPUT BOX
  showListTitleInput(id: any, listTitle: any) {
    this.listTitleInput = id;
    this.titleInputFormControl.setValue(listTitle);
  }


  // SHOW LIST ITEM EDIT INPUT
  showListItemEditInput(container: any, listItemIndex: any, item: any) {
    this.listItemContainer = container;
    this.listItemId = listItemIndex;
    this.listItemEditFormControl.setValue(item);
  }


  // UPDATE THE LIST ITEM TEXT
  updateListItemText() {
    this.fetching=true;
    this.listItemContainer.list_item[this.listItemId] = this.listItemEditFormControl.value;

    const updatedListItemDetails = {
      uniqueid: this.listItemContainer.uniqueid,
      list_item: this._general.encodeJSON(this.listItemContainer.list_item),
    }

    this.scrumboardService.updateListItem(updatedListItemDetails).subscribe(
      (result: any) => {
        this._general.openSnackBar(false,"List Item Updated",'OK','center','top');
        this.listItemContainer = null;
        this.listItemId = null;
        this.listItemEditFormControl.reset();
        this.fetching=false;
      },
      (err: any) => {
        this.fetching=false;
        console.log(err);
      }
    )
  }



  // ADD LIST FUNCTION
  addList() {
    this.fetching=true;
    let listDetails = {
      name: this.listNameFormControl.value,
      list_item: [],
      board_id: this.boardId,
    }

    this.scrumboardService.createBoardList(listDetails).subscribe(
      (result: any) => {
        this._general.openSnackBar(false,"List Created Successfully!",'OK','center','top');
        this.showAddListInput();
        this.fetchdata();
        this.fetching=false;
        this.titleInputFormControl.reset();
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
  }


  // DELETE LIST FUNCTION
  deleteList(list_id: any) {
    this.fetching=true;
    this.scrumboardService.deleteList({ uniqueid: list_id }).subscribe(
      (result: any) => {
        this._general.openSnackBar(false,"List Deleted Successfully!",'OK','center','top');
        this.fetchdata();
        this.fetching=false;
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
  }



  // UPDATE LIST TITLE 
  updateListTitle() {
    this.fetching=true;
    const updatedDetails = {
      name: this.titleInputFormControl.value,
      uniqueid: this.listTitleInput
    }

    this.scrumboardService.updateListTitle(updatedDetails).subscribe(
      (result: any) => {
        this._general.openSnackBar(false,"List Title Updated !",'OK','center','top');
        this.listTitleInput = null;
        this.fetchdata();
        this.titleInputFormControl.reset();
        this.fetching=false;
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
  }

  deleteListItem(container: any, index: any) {
    this.fetching=true;
    container.list_item.splice(index, 1);
    container.list_item=this._general.encodeJSON(container.list_item);
    this.scrumboardService.updateListItem(container).subscribe(
      (result: any) => {
        this._general.openSnackBar(false,"List Item Deleted!",'OK','center','top');
        this.fetchdata();
        this.fetching=false;
      },
      (err: any) => {
        this.fetching=false;
        console.error(err);
      }
    )
  }

}
