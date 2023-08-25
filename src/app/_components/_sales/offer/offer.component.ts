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
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fetching:boolean = true;
  offer:any = {
    uniqueid: '',
    email_type: 'none',
    payment_type: 'free'
  }
  hasError:boolean = false;
  emails:Array<any> = [];
  selectedEmail = '';
  filteredEmails:Array<any> = [];
  products:Array<any> = [];
  selectedProducts:Array<any> = [];
  filteredProducts:Array<any> = [];
  isPaymentConnected:boolean = true;
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
  paymentTypes = [
    {name: 'One Time', value: 'onetime'},
    {name: 'Recurring', value: 'recurring'},
    {name: 'Free', value: 'free'},
  ]
  emailTypes = [
    {name: 'Custom Email', value: 'custom'},
    {name: 'Email Template', value: 'template'},
    {name: 'None', value: 'none'}
  ]
  offerCurrency = this.currencies[0];
  usage:string = `To use this offer, go to the funnel step in the funnels and 
  select the 'Checkout' element or the 'Upsell' button to choose the offer by name.`;

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
    });   
   }

  ngOnInit(): void {
    this.fetchOffer();
    this.fetchProducts();
    this.fetchEmails();
  }

  openDialog(templateRef: TemplateRef<any>) {
    this._dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{})
  }

  fetchOffer() {
    this.fetching = true;
    this._offer.singleoffer(this.offer.uniqueid).subscribe((resp:any)=>{
      if(resp.success) {
        this.offer = resp.data;
        if(this.offer.currency) {
          let cur = JSON.parse(this.offer.currency);
          this.offerCurrency = this.currencies.filter((c:any) => c.code == cur.code)[0];
        }
        if(this.offer.product_id && this.offer.offer_products?.length != 0) this.selectedProducts = this.offer.offer_products;
        if(this.offer.email_id && this.offer.template_email) this.selectedEmail = this.offer.template_email.name;
      }
      else {
        this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
      }
      this.fetching = false;
    });
  }

  isEmailValid() {
    return this.offer.email_type == 'none' || (this.offer.email_type =='template' && this.offer.email_id) || (this.offer.email_type =='custom' && this.offer.email_subject && this.offer.email_content);
  }

  isPaymentValid() {
    return this.offer.payment_type =='free' || (this.offer.payment_type == 'recurring' && this.offer.subscription_id) || (this.offer.payment_type == 'onetime' && this.offer.currency && this.offer.price);
  }

  updateOffer() {
    this.hasError = false;
    if(this.offer.name){
      if(this.isPaymentValid()){
        if(this.isEmailValid()){
          if(this.selectedProducts.length != 0) this.offer.product_id = this.selectedProducts.map((sp:any)=> sp.uniqueid).join(',');
          this._offer.updateoffer(this.offer).subscribe((resp:any) => {
            if(resp.success) this.fetchOffer();
            this._general.openSnackBar(!resp.success, resp?.message, 'OK', 'center', 'top');
          })
        }
        else{
          this._general.openSnackBar(true, 'Email details are required', 'OK', 'center', 'top');
          this.hasError = true;
        }
      }
      else{
        this._general.openSnackBar(true, 'Pricing details are required', 'OK', 'center', 'top');
        this.hasError = true;
      }
    }
    else{
      this._general.openSnackBar(true, 'Offer name is required', 'OK', 'center', 'top');
      this.hasError = true;
    }
  }

  deleteoffer() {
    this._offer.deleteoffer(this.offer.id).subscribe((resp:any) => {
      if(resp.success) this._router.navigate(['/sales/offers']);
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  currencySelect(event:any) {
    this.offer.currency = JSON.stringify(event.value);
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
    let value = JSON.parse(JSON.stringify(event.option.value))
    this.selectedProducts.push(value);
    searchListInp.value = '';
    this.filterProductData('');
  }

  removeSelectedProduct(index:number): void {
    this.selectedProducts.splice(index, 1);
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
    var value = this.selectedEmail;
    this.filteredEmails = this.emails?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  selectEmail(event:any): void {
    let value = event.option.value;
    this.selectedEmail = value.name;
    this.offer.email_id = value.uniqueid;
  }

  resetEmail() {
    this.selectedEmail = '';
    this.offer.email_id = '';
    this.filterEmailData();
  }

  // end email actions

  isOptionDisabled(values:any, uniqueid:any) {
    let vArr = values.filter((v:any) => v.uniqueid.includes(uniqueid));
    return vArr.length != 0;
  }
}
