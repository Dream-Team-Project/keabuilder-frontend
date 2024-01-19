import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { ScrumBoardsComponent } from '../_components/scrumboard/scrum-boards/scrum-boards.component';
import { ScrumBoardListComponent } from '../_components/scrumboard/scrum-board-list/scrum-board-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: 'scrumboard', component:ScrumBoardsComponent, canActivate: [AuthGuard] },
  { path: 'scrumboardlist/:id', component:ScrumBoardListComponent, canActivate: [AuthGuard] },
 
];

@NgModule({
  declarations: [
    ScrumBoardsComponent,
    ScrumBoardListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    DragDropModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [RouterModule]
})
export class ScrumboardModule { }
