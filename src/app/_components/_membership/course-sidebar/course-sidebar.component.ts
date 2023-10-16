import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ModuleService } from 'src/app/_services/_membership/module.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-course-sidebar',
  templateUrl: './course-sidebar.component.html',
  styleUrls: ['./course-sidebar.component.css']
})
export class CourseSidebarComponent implements OnInit {
  @Input () course: any;
  constructor() { }

  ngOnInit(): void {
  }
  Gotohref(url :any){
    window.open(url,'_self');
  }
}
