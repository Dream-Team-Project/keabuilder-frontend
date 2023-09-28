import { Injectable } from '@angular/core';
import { GeneralService } from './_builder/general.service';
import { FormControl, Validators } from '@angular/forms';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
    snackBarMsg:string = '';
    croppedEvent:boolean = false;
    saveasnew:boolean = true;
    imageBase64String:any;
    showEditImgContainer:boolean = false;
    imgLoaded:boolean = false;
    errMsg:any;
    imgMatTabIndex:any = 1;  
    imageSelectionAllow:boolean = true;
    imgPath: string = '/assets/images/';  
    svgPath: string = '/assets/svgs/';  
    uploadImgPath: string = window.location.origin + '/assets/uploads/images/';
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
    file:any; // Variable to store file
    selectedImg:any = {id:'', title: '', discription: '', alt: '', path: '', ext_link: false};
    galleryImg:any[] = [];
    galleryImgName:string[] = [];
    extImgLink:any = {originalname: '', filename: ''};
    extImgLinkInp = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?.(?:png|jpg|jpeg|svg)')]);
    timeStamp = (new Date()).getTime();
    imgOrder:any = [{icon: 'ascending', name:'Ascending By Name', value: 'asc', type: 'title'}, {icon: 'ascending', name:'Ascending By Date', value: 'asc', type: 'id'}, {icon: 'descending', name:'Descending By Name', value: 'desc', type: 'title'}, {icon: 'descending', name:'Descending By Date', value: 'desc', type: 'id'}];
    searchImgFilter:any = this.imgOrder[3];
    imagesUpdated = new BehaviorSubject(false);

    constructor(private _general: GeneralService) {
    }

    checkAspVal(val:any) {
        if(val < 0 || val == '-') {
            this.aspRatio.w = '';
            this.aspRatio.h = '';
        }   
        if(!val) {
            this.aspRatio.toggle = false;
        }
    }

        // DB handlers

    onUpload(saveasnew:boolean) {
        this.loading = !this.loading;
        this.saveasnew = saveasnew;
        if(this.croppedEvent) {
            this.file = this.base64ToFile(
                this.croppedImage,
                (this.saveasnew ? Math.floor(Math.random() * 10000000000) : this.selectedImg.title.toLowerCase().replace(/ /g,"_"))+'.'+this.croppedImage.split('data:image/')[1].split(';base64')[0]
              )
        }
        this._general._file.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
                    this.shortLink = event.link;
                    this.saveImageOnDb(event);
                }
            }
        );
    }

    onImageFileUpload(data:any) {
        return new Promise<any>((resolve, reject) => {
            this.file = this.base64ToFile(data.path, data.name)
            this._general._file.upload(this.file).subscribe(
                (event: any) => {
                    if (typeof (event) === 'object') {
                        resolve(event);
                    }
                }
            );
        })
    }

    saveImageOnDb(data: any) {
        this.selectedImg.title = this.croppedEvent ? this.selectedImg.title : data.originalname.split('.')[0];
        this.selectedImg.alt = this.selectedImg.alt ? this.selectedImg.alt : this.selectedImg.title;
        this.selectedImg.description = '';
        this.selectedImg.path = data.filename;
        this.selectedImg.ext_link = this.extImgLink.filename ? true : false;
        if(this.saveasnew) {
            this._general._file.saveondb(this.selectedImg).subscribe(
                (event:any) => {
                    this.snackBarMsg = 'Image has been uploaded';
                    this. getAllImgs();
                },
                error=>{console.log(error)})
        }
        else {
            this._general._file.updateondb(this.selectedImg).subscribe(
                (event:any) => {
                    this.snackBarMsg = 'Image has been edited';
                    this. getAllImgs();
                },
                error=>{console.log(error)})
        }
    }

    deleteImage(img:any) {
        img.deleting = true;
        this._general._file.deletefromdb(img.id).subscribe(
            (event:any) => {
                if(!img.ext_link) {
                    this._general._file.deleteimage(img.path).subscribe(
                        (event:any) => {
                            this.snackBarMsg = 'Image has been deleted';
                            this.getAllImgs();
                        },
                        error=>{
                            this.snackBarMsg = 'Image has been deleted';
                            this.getAllImgs();
                        }
                    )
                }
                else this.getAllImgs();
            },
            error=>{console.log(error)}
        )
    }

    getAllImgs() {
        this._general._file.getAllImgs().subscribe(
            (event:any) => {
                this.galleryImg = [];
                this.galleryImg = event.data;
                this.selectedImg.title = '';
                this.selectedImg.alt = '';
                this.selectedImg.description = '';
                this.selectedImg.path = '';
                this.extImgLink.originalname = '';
                this.extImgLink.filename = '';
                this.extImgLinkInp.reset();
                this.loading = false; // Flag variable 
                this.showEditImgContainer = false;
                this.saveasnew = true;
                this.croppedEvent = false;
                this.imgMatTabIndex = 1;
                this.imagesUpdated.next(!this.imagesUpdated.value);
                if(this.snackBarMsg) this._general.openSnackBar(false, this.snackBarMsg,'OK', 'center', 'top');
            }
        )
    }

        // DB handlers

    // convert image url to base64
    
    async getBase64ImageFromUrl(imageUrl: RequestInfo) {
        var res = await fetch(imageUrl);
        var blob = await res.blob();
        return new Promise((resolve, reject) => {
          var reader  = new FileReader();
          reader.addEventListener("load", function () {
              resolve(reader.result);
          }, false);
      
          reader.onerror = () => {
            return reject(this);
          };
          reader.readAsDataURL(blob);
        })
      }

    base64ToFile(data: any, filename: string) {
        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    // On file Select

    editImage(img:any) {
        this.selectedImg = img;
        if(!img.ext_link) {
            this.croppedImage = this.uploadImgPath+img.path;
            this.getBase64ImageFromUrl(this.croppedImage)
            .then(result => {
                this.imageBase64String = result;
                this.showEditImgContainer = true;
            })
            .catch(err => console.error(err));
        }
        else {
            this.croppedImage  =  img.path;
            this.showEditImgContainer = true;
        }
    }

    fileChangeEvent(event: any, directUpload: boolean): void {
        if(event.target.files && event.target.files[0]) {
            this.imageChangedEvent = event;
            this.file = event.target.files[0];
            this.selectedImg.title = this.file.name;
            const reader = new FileReader();
            reader.onload = e => this.selectedImg.path = reader.result;
            reader.readAsDataURL(this.file);
            if(directUpload) this.onUpload(true);
        }
    }

    imageCropped(event: ImageCroppedEvent | any) {
        this.croppedImage = event.base64;
        this.croppedEvent = true;
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

    getImgPath(path:string) {
          if(this.timeStamp) {
            return path + '?' + this.timeStamp;
          }
          return path;
      }
}
