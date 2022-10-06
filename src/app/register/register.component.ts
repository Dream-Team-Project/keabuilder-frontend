import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { WistiaService } from '../_services/wistia.service';
import { FileUploadService } from '../_services/file-upload.service';
import { EmailService } from '../_services/mailer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  fistnameFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('');
  companynameFormControl = new FormControl('',[Validators.required]);
  phoneFormControl = new FormControl('');
  

  hide = true;

  form: any = {
    username: null,
    firstname:null,
    lastname:'',
    company:null,
    email: null,
    phone:'',
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  min = 1;
  max = 3;
  bgImg = 'url(./assets/images/login/login-bk1.jpg)';

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              private _wistia: WistiaService,
              private emailService: EmailService) { }

  ngOnInit(): void {
    this.createNewImg();
  }

  onSubmit(): void {
    const { username,firstname,lastname,company, email,phone, password } = this.form;
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){
        this.authService.register(username,firstname,lastname,company, email,phone, password).subscribe({
          next: data => {
            console.log(data);
            this._file.createdefaulthome(data.uniqueid).subscribe(e=>{
              console.log(e);
            });

            var emailhtml = `<!DOCTYPE html><html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head><title></title><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><meta content="width=device-width,initial-scale=1" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><style>
            *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}@media (max-width:690px){.desktop_hide table.icons-inner{display:inline-block!important}.icons-inner{text-align:center}.icons-inner td{margin:0 auto}.fullMobileWidth,.row-content{width:100%!important}.mobile_hide{display:none}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}}
            </style></head><body style="background-color:#f9f9f9;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f9f9f9" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%">
            <tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-position:top center;background-color:#fff;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:45px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:14.399999999999999px;color:#61697a;line-height:1.2;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px">Hi `+username+`,</p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:14.399999999999999px;color:#1f0b0b;line-height:1.2;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px"><strong><span style="font-size:46px;">Welcome Aboard!</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:18px;color:#393d47;line-height:1.5;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;mso-line-height-alt:21px">
            Kea is a smart, comprehensive solution that is developed to take care of all your online business needs. </p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:15px;padding-left:20px;padding-right:10px;padding-top:10px;text-align:left"><div align="left" class="alignment">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="keabuilder.com" style="height:52px;width:183px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#dea641"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
            <a href="keabuilder.com" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#dea641;border-radius:4px;width:auto;border-top:0px solid #8a3b8f;font-weight:400;border-right:0px solid #8a3b8f;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;padding-top:10px;padding-bottom:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:50px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;"><strong>View More</strong></span></span></a>
            <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table></td><td class="column column-2" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-right:5px;width:100%;padding-left:0;padding-top:5px;padding-bottom:55px"><div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text" src="https://app.keabuilder.com/assets/images/logo/kblogo.png" style="display:block;height:auto;border:0;width:330px;max-width:100%" title="Alternate text" width="330"/></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;background-image:url(https://keabuilder.com/emailimg/Background.png);background-position:top center;background-repeat:no-repeat" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:35px;padding-right:35px;padding-top:35px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:18px;color:#34495e;line-height:1.5;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:21px">
            <strong><span style="font-size:20px;">The world was rocked by Covid two years ago. It changed the way we work and the way companies conduct business. But unfortunately, the pandemic also sent many firms out of business, and thousands were left jobless. </span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="image_block block-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="width:100%;padding-right:0;padding-left:0;padding-top:40px"><div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text" class="fullMobileWidth" src="https://keabuilder.com/emailimg/middle_Image.png" style="display:block;height:auto;border:0;width:469px;max-width:100%" title="Alternate text" width="469"/></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-6" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:30px;padding-left:35px;padding-right:35px;padding-top:70px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:18px;color:#34495e;line-height:1.5;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:24px">
            <span style="font-size:16px;"><strong>A common need of every entrepreneur, freelancer, or startup firm is an online presence. To achieve their vision, they need to share it with the world. They need customers to find them, and they need to find new avenues to grow their businesses. </strong></span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;width:100%"><div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text" class="fullMobileWidth" src="https://keabuilder.com/emailimg/search.png" style="display:block;height:auto;border:0;width:315px;max-width:100%" title="Alternate text" width="315"/></div></td></tr></table></td><td class="column column-2" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><div class="spacer_block" style="height:5px;line-height:5px;font-size:1px"> </div><div class="spacer_block mobile_hide" style="height:50px;line-height:50px;font-size:1px"> </div><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:24px;color:#34495e;line-height:2;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;mso-line-height-alt:28px"><strong><span style="font-size:24px;">Website Solution</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
            <tr><td class="pad" style="padding-bottom:15px;padding-left:25px;padding-right:10px;padding-top:10px;text-align:left"><div align="left" class="alignment">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="keabuilder.com" style="height:52px;width:183px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#dea641"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
            <a href="keabuilder.com" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#dea641;border-radius:4px;width:auto;border-top:0px solid #8a3b8f;font-weight:400;border-right:0px solid #8a3b8f;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;padding-top:10px;padding-bottom:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:50px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;"><strong>View More</strong></span></span></a>
            <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><div class="spacer_block" style="height:5px;line-height:5px;font-size:1px"> </div><div class="spacer_block mobile_hide" style="height:50px;line-height:50px;font-size:1px"> </div><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:24px;color:#34495e;line-height:2;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;text-align:left;mso-line-height-alt:48px"><span style="font-size:24px;"><strong>Funnel Solution</strong></span></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:15px;padding-left:25px;padding-right:10px;padding-top:10px;text-align:left"><div align="left" class="alignment">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="keabuilder.com" style="height:52px;width:183px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#dea641"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
            <a href="keabuilder.com" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#dea641;border-radius:4px;width:auto;border-top:0px solid #8a3b8f;font-weight:400;border-right:0px solid #8a3b8f;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;padding-top:10px;padding-bottom:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:50px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;"><strong>View More</strong></span></span></a>
            <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table></td><td class="column column-2" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;width:100%"><div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text" class="fullMobileWidth" src="https://keabuilder.com/emailimg/find_.png" style="display:block;height:auto;border:0;width:315px;max-width:100%" title="Alternate text" width="315"/></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;width:100%"><div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text" class="fullMobileWidth" src="https://keabuilder.com/emailimg/finding.png" style="display:block;height:auto;border:0;width:315px;max-width:100%" title="Alternate text" width="315"/></div></td></tr></table></td><td class="column column-2" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0" width="50%"><div class="spacer_block" style="height:5px;line-height:5px;font-size:1px"> </div><div class="spacer_block mobile_hide" style="height:50px;line-height:50px;font-size:1px"> </div><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:24px;color:#34495e;line-height:2;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;mso-line-height-alt:28px"><strong><span style="font-size:24px;">Course Solution</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
            <tr><td class="pad" style="padding-bottom:15px;padding-left:25px;padding-right:10px;padding-top:10px;text-align:left"><div align="left" class="alignment">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="keabuilder.com" style="height:52px;width:183px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#dea641"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
            <a href="keabuilder.com" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#dea641;border-radius:4px;width:auto;border-top:0px solid #8a3b8f;font-weight:400;border-right:0px solid #8a3b8f;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;padding-top:10px;padding-bottom:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:50px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;"><strong>View More</strong></span></span></a>
            <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;background-image:url(https://keabuilder.com/emailimg/background_down.png);background-repeat:no-repeat" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:35px;padding-right:35px;padding-top:80px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:18px;color:#34495e;line-height:1.5;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:21px">
            <strong><span style="font-size:24px;">Used and loved by enterprises and </span></strong><strong><span style="font-size:24px;">hiring </span></strong><strong style="font-family:inherit;font-family:inherit;background-color:transparent"><span style="font-size:24px;">managers all over the globe</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-7" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:35px;padding-right:10px;padding-top:115px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;mso-line-height-alt:18px;color:#34495e;line-height:1.5;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:21px">
            <strong><span style="font-size:24px;">Get a Free Call</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-8" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:20px;padding-left:60px;padding-right:60px;padding-top:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;mso-line-height-alt:21.6px;color:#555;line-height:1.8"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:25.2px">Discover how Kea help to grow your business.</p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="button_block block-9" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;text-align:center"><div align="center" class="alignment">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:52px;width:191px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#dea641"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><div style="text-decoration:none;display:inline-block;color:#fff;background-color:#dea641;border-radius:4px;width:auto;border-top:0 solid #8a3b8f;font-weight:400;border-right:0 solid #8a3b8f;border-bottom:0 solid #8a3b8f;border-left:0 solid #8a3b8f;padding-top:10px;padding-bottom:10px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all">
            <span style="padding-left:50px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;"><strong>Book A Call</strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="image_block block-10" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-top:15px;width:100%;padding-right:0;padding-left:0"><div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text" class="fullMobileWidth" src="https://keabuilder.com/emailimg/find_new_job.png" style="display:block;height:auto;border:0;width:436px;max-width:100%" title="Alternate text" width="436"/></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><div class="spacer_block" style="height:55px;line-height:55px;font-size:1px"> </div></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
            <tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:670px" width="670"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="vertical-align:middle;color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center"><table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="alignment" style="vertical-align:middle;text-align:center">
            <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]--><!--[if !vml]><!--><table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block;margin-right:-4px;padding-left:0;padding-right:0"><!--<![endif]--><tr><td style="vertical-align:middle;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:6px"></td><td style="font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;font-size:15px;color:#9d9d9d;vertical-align:middle;letter-spacing:undefined;text-align:center"></td></tr></table></td></tr></table></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End --></body></html>`;
            var maildata = {tomailid: email, frommailid: 'keabuilder@gmail.com', subject: 'Welcome To Keabuilder', html: emailhtml};
            this.emailService.sendmail(maildata).subscribe({
              next: data => {
                console.log(data);
              }
            });

          // need to pass unique id to the wistia instead of username
          //  var userobject = {project_name: username};
          //   this._wistia.projectCreate(userobject).subscribe({
          //     next: data2 => {
          //       this.authService.onupdateprojectid(data.id, data2.data.hashedId).subscribe({
          //         next: data3 => {
          //           console.log(data3);
          //         }
          //       });

          //     }
          //   });

            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.redirectToDashboard();
            
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }

  redirectToDashboard(): void {
    this.router.navigate(['/'],{relativeTo: this.route});
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
    this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }


}
