import { Component, OnInit, TemplateRef } from '@angular/core';
import { OfferService } from 'src/app/_services/_sales/offer.service';
import { ProductService } from 'src/app/_services/_sales/product.service';
import { EmailService } from 'src/app/_services/_crm/email.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ImageService } from 'src/app/_services/image.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css', '../../material.component.css']
})
export class OfferComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  offer:any = {
    uniqueid: '',
    email_type: 'none',
    payment_type: 'free'
  }
  hasError:any = {
    name: ''
  }
  emails:Array<any> = [];
  selectedEmail:any = {
    uniqueid: '',
    name: ''
  };
  filteredEmails:Array<any> = [];
  products:Array<any> = [];
  selectedProducts:Array<any> = [];
  filteredProducts:Array<any> = [];
  isPaymentConnected:boolean = true;
  paymentTypes = [
    {name: 'One Time', value: 'onetime'},
    {name: 'Recurring', value: 'recurring'},
    {name: 'Free', value: 'free'},
  ]
  currencies = [
    { name: "United States Dollar", code: "USD", symbol: "$" },
    { name: "Euro", code: "EUR", symbol: "€" },
    { name: "British Pound Sterling", code: "GBP", symbol: "£" },
    { name: "Indian Rupee", code: "INR", symbol: "₹" },
    { name: "Japanese Yen", code: "JPY", symbol: "¥" },
    { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
    { name: "Swiss Franc", code: "CHF", symbol: "Fr" },
    { name: "Canadian Dollar", code: "CAD", symbol: "C$" },
    { name: "Australian Dollar", code: "AUD", symbol: "A$" },
    { name: "Brazilian Real", code: "BRL", symbol: "R$" },
  ];  
  emailTypes = [
    {name: 'Custom Email', value: 'custom'},
    {name: 'Email Template', value: 'template'},
    {name: 'None', value: 'none'}
  ]
  customEmail = {
    subject: 'Offer Granted',
    content: '<h2>Thank You for purchasing the offer!</h2>'
  }
  usage:any = {
    checkout: `To use this offer, kindly proceed to the funnel step in the funnels where you'll find the 'Checkout' element associated with the offer's name.`,
    upsell: `To use this offer, kindly proceed to the funnel step in the funnels, where you'll find the 'Button' element choose 'Upsell' button and select the offer by name.`,
  }

  constructor(private _route: ActivatedRoute, 
    private _router:Router,
    private _dialog: MatDialog,
    private _offer: OfferService,
    private _product: ProductService,
    private _email: EmailService,
    public _general: GeneralService,
    public _image: ImageService) {
    this._route.paramMap.subscribe((params: ParamMap) => {
        this.offer.uniqueid = params.get('uniqueid');
        this.fetchOffer();
        this.fetchProducts();
        this.fetchEmails();
    });   
   }

  ngOnInit(): void {
  }

  openDialog(templateRef: TemplateRef<any>) {
    this._dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{})
  }

  fetchOffer() {
    this._offer.singleoffer(this.offer.uniqueid).subscribe((resp:any)=>{
      if(resp.success) {
        this.offer = resp.data[0];
        console.log(resp.data[0])
        this.selectedProducts=resp?.data[0]?.temp_products;
        if(resp.data[0].payment_type =='recurring') this.offer.subscription_id=resp.data[0]?.subscription_id;
        else if(resp.data[0].payment_type =='onetime') {
          this.offer.currency=resp.data[0].currency;
          this.offer.price=resp.data[0].price;
          this.offer.override_price=resp?.data[0]?.override_price;
        }
        else if(resp.data[0].email_type == 'template') {
        this.selectedEmail.name=resp?.data[0]?.email[0]?.name;
        this.selectedEmail.uniqueid=resp?.data[0]?.email;
        }
        else if(resp.data[0].email_type =='custom') {
          this.offer.email_subject=resp.data[0].email_subject;
          this.offer.email_content=resp.data[0].email_content;
          }
      }
    });
  }

  updateOffer() {
    this.offer.custom_email = JSON.stringify(this.customEmail);
    // console.log(this.selectedEmail);
    // console.log(this.selectedProducts);
    this.offer.product_id = this.selectedProducts.map((sp:any)=> sp.uniqueid).join(',');
    this.offer.email_id = this.selectedEmail.uniqueid;
    // console.log(this.offer);
   
    if(this.offer.name){
      if((this.offer.email_type == 'none') || (this.offer.email_type =='template' && this.offer.email_id) || (this.offer.email_type =='custom' && this.offer.email_subject && this.offer.email_content)){
        if((this.offer.payment_type =='free') || (this.offer.payment_type == 'recurring' && this.offer.subscription_id) || (this.offer.payment_type == 'onetime' && this.offer.currency && this.offer.price)){
          // if(this.offer.product_id){
    this._offer.updateoffer(this.offer).subscribe((resp:any) => {
      if(resp.success) this.fetchOffer();
      this._general.openSnackBar(!resp.success, resp?.message, 'OK', 'center', 'top');
    })
  // }else{
  //   this._general.openSnackBar(true, 'Choose a product first', 'OK', 'center', 'top');
  // }
  }else{
    this._general.openSnackBar(true, 'Pricing details required', 'OK', 'center', 'top');
  }
  }else{
    this._general.openSnackBar(true, 'Email details required', 'OK', 'center', 'top');
  }
  }else{
    this._general.openSnackBar(true, 'Offer name required', 'OK', 'center', 'top');
  }
  }

  deleteoffer() {
    this._offer.deleteoffer(this.offer.id).subscribe((resp:any) => {
      if(resp.success) this._router.navigate(['/sales/offers']);
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  // start product actions

  fetchProducts() {
    this._product.fetchproducts().subscribe((resp:any)=>{
      if(resp.success) {
        this.products = resp.data;
      }
    })
  }

  filterProductData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredProducts = this.products?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedProduct(event:any, searchListInp:any): void {
    this.selectedProducts.push(event.option.value);
    searchListInp.value = '';
    this.filterProductData('');
  }

  removeSelectedProduct(index:number): void {
    this.selectedProducts.splice(index, 1);
  }

  isProductDisabled(values:any, uniqueid:any) {
      let vArr = values.filter((v:any) => v.uniqueid.includes(uniqueid));
      return vArr.length != 0;
  }

  // end product actions

  // start email actions

  fetchEmails() {
    this._email.fetchemails().subscribe((resp:any)=>{
      if(resp.success) {
        this.emails = resp.data;
      }
    })
  }

  filterEmailData() {
    var value = this.selectedEmail.name;
    // console.log(this.emails);
    this.filteredEmails = this.emails?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
    // console.log(this.filteredEmails);
  }

  selectEmail(event:any): void {
    let value = event.option.value;
    this.selectedEmail.name = value.name;
    this.selectedEmail.uniqueid = value.uniqueid;
  }

  resetEmail() {
    this.selectedEmail.name = '';
    this.selectedEmail.id = '';
  }

  // end email actions
}
