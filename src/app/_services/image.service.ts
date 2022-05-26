import { Injectable } from '@angular/core';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { FileUploadService } from './file-upload.service';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imgPath: string = './assets/images/';  
  uploadImgPath: string = './assets/uploads/images/';  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  aspRatio:any = {w: '', r: '', toggle: false};
    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file:any = null; // Variable to store file
    imgSelection:boolean = false;
    selectedImg:any = {id:'', title: '', discription: '', alt: '', path: ''};
    galleryImg:any[] = [];
    galleryImgName:string[] = [];

  constructor(private fileUploadService: FileUploadService) { }

  checkAspVal(val:any) {
        if(val < 0 || val == '-') {
            this.aspRatio.w = '';
            this.aspRatio.h = '';
        }   
        if(!val) {
            this.aspRatio.toggle = false;
        }
  }

  addImage(_img:any) {
    // if(this.selectedTab == 'Background') {
    //   this.background_image.name = this.uploadImgPath+img.name; 
    //   this.background_image.active = true;
    // }
    // else {
    //   this._general.selectedBlock.content.src = this.uploadImgPath+img.name;
    // }
    this.imgSelection = !this.imgSelection;
  }

      // On file Select

    fileChangeEvent(event: any, directUpload: boolean): void {
      if (event.target.files && event.target.files[0]) {
        this.imageChangedEvent = event;
        this.file = event.target.files[0];
        this.selectedImg.title = this.file.name;
        const reader = new FileReader();
        reader.onload = e => this.selectedImg.path = reader.result;
        reader.readAsDataURL(this.file);
        if(directUpload) this.onUpload();
      }
    }

    saveCroppedImg() {
        console.log(this.file);
    }
  
    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                console.log(event);
                if (typeof (event) === 'object') {
                    // Short link via api response
                    this.shortLink = event.link;
                    this.loading = false; // Flag variable 
                }
            }
        );
    }

  imageCropped(event: ImageCroppedEvent | any) {
      this.croppedImage = event.base64;
    //   console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
      this.showCropper = true;
    //   console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    //   console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    //   console.log('Load failed');
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
      this.aspRatio.w = '';
      this.aspRatio.h = '';
      this.aspRatio.toggle = false;
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  updateRotation() {
      this.transform = {
          ...this.transform,
          rotate: this.rotation
      };
  }    
}
