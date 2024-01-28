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
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component:ScrumBoardsComponent, canActivate: [AuthGuard] },
  { path: 'list/:id', component:ScrumBoardListComponent, canActivate: [AuthGuard] },
 
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
    MatDialogModule,
    MatInputModule,
  ],
  exports: [RouterModule]
})
export class ScrumboardModule { }
