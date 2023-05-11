import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RowService } from './row.service';
import { GeneralService } from './general.service';
import { StyleService } from './style.service';
import { SectionService } from './section.service';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  public elementConnect: CdkDropList[] = [];

  distroyDialogue = new Subject<any>();
  elementObj: any = {id: '', name: '',  type: 'element', content: {}, setting: false, 
                    item_alignment: {desktop: '', tablet_h: 'auto', tablet_v: 'auto', mobile: 'auto'}, 
                    redirection: {link: '', target: '_self' },
                    style: {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''}, 
                    hide: {desktop: false, tablet_h: false, tablet_v: false, mobile: false}};
  element_index = 0;
  selectedElements: any = [];
  elementList: any = {
    // heading
    heading: {
      content: {
        name: 'heading',
        html: `<h2>Heading goes here</h2>`,
        size: 38,
        editor: false,
      }, iconCls: 'fas fa-heading'},
    // heading
    // text
    text: {
      content: {
        name: 'text',
        html: `<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>`,
        size: 16,
        editor: false,
      }, iconCls: 'fas fa-font'},
    // text
    // image
    image: { content: { name: 'image', src: '' }, iconCls: 'far fa-image'},
    // image
    // video
    video: {
      content: {
        name: 'video',
        type: 'video',
        iframe: '<iframe width="560" height="315" src="http://localhost:4200/assets/videos/movie.mp4" title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        src: 'http://localhost:4200/assets/videos/movie.mp4',
        autoplay: false,
        muted: false,
        loop: false,
        controls: true
      }, iconCls: 'fas fa-video'},
    // video
    // button
    button: { 
      content: { 
        name: 'button', size: 14, btntype: 'regular', 
        text: 'Read More', subtext: '', subfont_size: '80%', 
        link: '#no-link', target: '_self' 
      }, iconCls: 'fas fa-toggle-off'},
    // button
    // menu
    menu: { content: { name: 'menu', size: 16, items: []}, iconCls: 'fas fa-bars'},
    // menu
    // divider
    divider: { content: { name: 'divider' }, iconCls: 'fas fa-minus'},
    // divider
    // form
    form: { content: { name: 'iframe', type: 'form', src: '', height: '' }, iconCls: 'fab fa-wpforms'},
    // form
    // code block
    code: { content: { name: 'code', html: ``}, iconCls: 'fas fa-code' },
    // code block
    // icon
    icon: { content: { name: 'icon', html: `<i class="fa-solid fa-icons"></i>`, size: 18,}, iconCls: 'fa-solid fa-icons' },
    // icon
    // checkout form
    // append
    // checkout form
  };
  preMenuItems: any = ['Home', 'About', 'Blog', 'Contact'];
  defaultIcons: any = [
    {name: 'fa-brands fa-facebook', type: 'brand'},
    {name: 'fa-brands fa-facebook-messenger', type: 'brand'},
    {name: 'fa-brands fa-facebook-f', type: 'brand'},
    {name: 'fa-brands fa-square-facebook', type: 'brand'},
    {name: 'fa-brands fa-instagram', type: 'brand'},
    {name: 'fa-brands fa-square-instagram', type: 'brand'},
    {name: 'fa-brands fa-twitter', type: 'brand'},
    {name: 'fa-brands fa-square-twitter', type: 'brand'},
    {name: 'fa-brands fa-skype', type: 'brand'},
    {name: 'fa-brands fa-linkedin', type: 'brand'},
    {name: 'fa-brands fa-linkedin-in', type: 'brand'},
    {name: 'fa-brands fa-cc-visa', type: 'brand'},
    {name: 'fa-brands fa-cc-mastercard', type: 'brand'},
    {name: 'fa-brands fa-cc-stripe', type: 'brand'},
    {name: 'fa-brands fa-cc-paypal', type: 'brand'},
    {name: 'fa-brands fa-cc-jcb', type: 'brand'},
    {name: 'fa-brands fa-cc-amazon-pay', type: 'brand'},
    {name: 'fa-brands fa-accessible-icon', type: 'brand'},
    {name: 'fa-brands fa-uber', type: 'brand'},
    {name: 'fa-brands fa-aws', type: 'brand'},
    {name: 'fa-brands fa-servicestack', type: 'brand'},
    {name: 'fa-brands fa-tiktok', type: 'brand'},
    {name: 'fa-brands fa-discord', type: 'brand'},
    {name: 'fa-brands fa-youtube', type: 'brand'},
    {name: 'fa-brands fa-github', type: 'brand'},
    {name: 'fa-brands fa-wordpress', type: 'brand'},
    {name: 'fa-brands fa-docker', type: 'brand'},
    {name: 'fa-brands fa-apple', type: 'brand'},
    {name: 'fa-brands fa-google', type: 'brand'},
    {name: 'fa-brands fa-windows', type: 'brand'},
    {name: 'fa-brands fa-paypal', type: 'brand'},
    {name: 'fa-brands fa-dropbox', type: 'brand'},
    {name: 'fa-brands fa-squarespace', type: 'brand'},
    {name: 'fa-brands fa-android', type: 'brand'},
    {name: 'fa-brands fa-shopify', type: 'brand'},
    {name: 'fa-brands fa-medium', type: 'brand'},
    {name: 'fa-brands fa-codepen', type: 'brand'},
    {name: 'fa-brands fa-cloudflare', type: 'brand'},
    {name: 'fa-brands fa-whatsapp', type: 'brand'},
    {name: 'fa-brands fa-intercom', type: 'brand'},
    {name: 'fa-brands fa-internet-explorer', type: 'brand'},
    {name: 'fa-brands fa-telegram', type: 'brand'},
    {name: 'fa-brands fa-readme', type: 'brand'},
    {name: 'fa-brands fa-wikipedia-w', type: 'brand'},
    {name: 'fa-brands fa-java', type: 'brand'},
    {name: 'fa-brands fa-linux', type: 'brand'},
    {name: 'fa-brands fa-rebel', type: 'brand'},
    {name: 'fa-brands fa-elementor', type: 'brand'},
    {name: 'fa-brands fa-untappd', type: 'brand'},
    {name: 'fa-brands fa-uikit', type: 'brand'},
    {name: 'fa-brands fa-unity', type: 'brand'},
    {name: 'fa-brands fa-sketch', type: 'brand'},
    {name: 'fa-brands fa-sitrox', type: 'brand'},
    {name: 'fa-brands fa-sellcast', type: 'brand'},
    {name: 'fa-brands fa-rev', type: 'brand'},
    {name: 'fa-brands fa-renren', type: 'brand'},
    {name: 'fa-brands fa-pix', type: 'brand'},
    {name: 'fa-brands fa-pushed', type: 'brand'},
    {name: 'fa-brands fa-osi', type: 'brand'},
    {name: 'fa-brands fa-orcid', type: 'brand'},
    {name: 'fa-brands fa-odysee', type: 'brand'},
    {name: 'fa-brands fa-opera', type: 'brand'},
    {name: 'fa-brands fa-opencart', type: 'brand'},
    {name: 'fa-brands fa-mix', type: 'brand'},
    {name: 'fa-brands fa-meta', type: 'brand'},
    {name: 'fa-brands fa-magento', type: 'brand'},
    {name: 'fa-brands fa-korvue', type: 'brand'},
    {name: 'fa-brands fa-jenkins', type: 'brand'},
    {name: 'fa-brands fa-jira', type: 'brand'},
    {name: 'fa-brands fa-jsfiddle', type: 'brand'},
    {name: 'fa-brands fa-itunes-note', type: 'brand'},
    {name: 'fa-brands fa-keycdn', type: 'brand'},
    {name: 'fa-brands fa-mizuni', type: 'brand'},
    {name: 'fa-brands fa-megaport', type: 'brand'},
    {name: 'fa-brands fa-mendeley', type: 'brand'},
    {name: 'fa-brands fa-lyft', type: 'brand'},
    {name: 'fa-brands fa-lastfm', type: 'brand'},
    {name: 'fa-brands fa-less', type: 'brand'},
    {name: 'fa-brands fa-keybase', type: 'brand'},
    {name: 'fa-brands fa-kaggle', type: 'brand'},
    {name: 'fa-brands fa-js', type: 'brand'},
    {name: 'fa-brands fa-joomla', type: 'brand'},
    {name: 'fa-brands fa-itch-io', type: 'brand'},
    {name: 'fa-brands fa-jedi-order', type: 'brand'},
    {name: 'fa-regular fa-address-book', type: 'regular'},
    {name: 'fa-regular fa-address-card', type: 'regular'},
    {name: 'fa-regular fa-bell', type: 'regular'},
    {name: 'fa-regular fa-bookmark', type: 'regular'},
    {name: 'fa-regular fa-building', type: 'regular'},
    {name: 'fa-regular fa-circle-user', type: 'regular'},
    {name: 'fa-regular fa-clipboard', type: 'regular'},
    {name: 'fa-regular fa-comment', type: 'regular'},
    {name: 'fa-regular fa-comments', type: 'regular'},
    {name: 'fa-regular fa-compass', type: 'regular'},
    {name: 'fa-regular fa-envelope', type: 'regular'},
    {name: 'fa-regular fa-eye', type: 'regular'},
    {name: 'fa-regular fa-face-smile', type: 'regular'},
    {name: 'fa-regular fa-file', type: 'regular'},
    {name: 'fa-regular fa-file-excel', type: 'regular'},
    {name: 'fa-regular fa-file-pdf', type: 'regular'},
    {name: 'fa-regular fa-file-powerpoint', type: 'regular'},
    {name: 'fa-regular fa-folder', type: 'regular'},
    {name: 'fa-regular fa-folder-open', type: 'regular'},
    {name: 'fa-regular fa-hand', type: 'regular'},
    {name: 'fa-regular fa-handshake', type: 'regular'},
    {name: 'fa-regular fa-hashtag', type: 'regular'},
    {name: 'fa-regular fa-heart', type: 'regular'},
    {name: 'fa-regular fa-id-card', type: 'regular'},
    {name: 'fa-regular fa-image', type: 'regular'},
    {name: 'fa-regular fa-lightbulb', type: 'regular'},
    {name: 'fa-regular fa-map', type: 'regular'},
    {name: 'fa-regular fa-message', type: 'regular'},
    {name: 'fa-regular fa-newspaper', type: 'regular'},
    {name: 'fa-regular fa-paper-plane', type: 'regular'},
    {name: 'fa-regular fa-q', type: 'regular'},
    {name: 'fa-regular fa-question', type: 'regular'},
    {name: 'fa-regular fa-snowflake', type: 'regular'},
    {name: 'fa-regular fa-star', type: 'regular'},
    {name: 'fa-regular fa-sun', type: 'regular'},
    {name: 'fa-regular fa-thumbs-down', type: 'regular'},
    {name: 'fa-regular fa-thumbs-up', type: 'regular'},
    {name: 'fa-regular fa-trash-can', type: 'regular'},
    {name: 'fa-regular fa-user', type: 'regular'},
    {name: 'fa-solid fa-address-book', type: 'solid'},
    {name: 'fa-solid fa-address-card', type: 'solid'},
    {name: 'fa-solid fa-anchor', type: 'solid'},
    {name: 'fa-solid fa-arrow-down', type: 'solid'},
    {name: 'fa-solid fa-arrow-left', type: 'solid'},
    {name: 'fa-solid fa-arrow-pointer', type: 'solid'},
    {name: 'fa-solid fa-arrow-right', type: 'solid'},
    {name: 'fa-solid fa-arrow-rotate-right', type: 'solid'},
    {name: 'fa-solid fa-arrow-up', type: 'solid'},
    {name: 'fa-solid fa-arrow-up-from-bracket', type: 'solid'},
    {name: 'fa-solid fa-award', type: 'solid'},
    {name: 'fa-solid fa-baby', type: 'solid'},
    {name: 'fa-solid fa-bag-shopping', type: 'solid'},
    {name: 'fa-solid fa-barcode', type: 'solid'},
    {name: 'fa-solid fa-bars', type: 'solid'},
    {name: 'fa-solid fa-bath', type: 'solid'},
    {name: 'fa-solid fa-battery-full', type: 'solid'},
    {name: 'fa-solid fa-bell', type: 'solid'},
    {name: 'fa-solid fa-bell-concierge', type: 'solid'},
    {name: 'fa-solid fa-bicycle', type: 'solid'},
    {name: 'fa-solid fa-bolt', type: 'solid'},
    {name: 'fa-solid fa-bolt-lightning', type: 'solid'},
    {name: 'fa-solid fa-bone', type: 'solid'},
    {name: 'fa-solid fa-book', type: 'solid'},
    {name: 'fa-solid fa-bookmark', type: 'solid'},
    {name: 'fa-solid fa-brain', type: 'solid'},
    {name: 'fa-solid fa-briefcase', type: 'solid'},
    {name: 'fa-solid fa-brush', type: 'solid'},
    {name: 'fa-solid fa-bug', type: 'solid'},
    {name: 'fa-solid fa-building', type: 'solid'},
    {name: 'fa-solid fa-building-user', type: 'solid'},
    {name: 'fa-solid fa-burger', type: 'solid'},
    {name: 'fa-solid fa-bus', type: 'solid'},
    {name: 'fa-solid fa-cable-car', type: 'solid'},
    {name: 'fa-solid fa-calculator', type: 'solid'},
    {name: 'fa-solid fa-camera', type: 'solid'},
    {name: 'fa-solid fa-car', type: 'solid'},
    {name: 'fa-solid fa-car-side', type: 'solid'},
    {name: 'fa-solid fa-cart-shopping', type: 'solid'},
    {name: 'fa-solid fa-certificate', type: 'solid'},
    {name: 'fa-solid fa-chair', type: 'solid'},
    {name: 'fa-solid fa-chalkboard-user', type: 'solid'},
    {name: 'fa-solid fa-chart-simple', type: 'solid'},
    {name: 'fa-solid fa-check-double', type: 'solid'},
    {name: 'fa-solid fa-child', type: 'solid'},
    {name: 'fa-solid fa-child-reaching', type: 'solid'},
    {name: 'fa-solid fa-children', type: 'solid'},
    {name: 'fa-solid fa-church', type: 'solid'},
    {name: 'fa-solid fa-circle-user', type: 'solid'},
    {name: 'fa-solid fa-city', type: 'solid'},
    {name: 'fa-solid fa-clapperboard', type: 'solid'},
    {name: 'fa-solid fa-clipboard', type: 'solid'},
    {name: 'fa-solid fa-clipboard-user', type: 'solid'},
    {name: 'fa-solid fa-cloud', type: 'solid'},
    {name: 'fa-solid fa-code-compare', type: 'solid'},
    {name: 'fa-solid fa-comment', type: 'solid'},
    {name: 'fa-solid fa-comments', type: 'regular'},
    {name: 'fa-solid fa-comments', type: 'solid'},
    {name: 'fa-solid fa-comment-sms', type: 'solid'},
    {name: 'fa-solid fa-compass', type: 'solid'},
    {name: 'fa-solid fa-computer', type: 'solid'},
    {name: 'fa-solid fa-computer-mouse', type: 'solid'},
    {name: 'fa-solid fa-desktop', type: 'solid'},
    {name: 'fa-solid fa-diamond', type: 'solid'},
    {name: 'fa-solid fa-dragon', type: 'solid'},
    {name: 'fa-solid fa-droplet', type: 'solid'},
    {name: 'fa-solid fa-egg', type: 'solid'},
    {name: 'fa-solid fa-envelope', type: 'solid'},
    {name: 'fa-solid fa-expand', type: 'solid'},
    {name: 'fa-solid fa-eye', type: 'solid'},
    {name: 'fa-solid fa-face-smile', type: 'solid'},
    {name: 'fa-solid fa-feather', type: 'solid'},
    {name: 'fa-solid fa-file', type: 'solid'},
    {name: 'fa-solid fa-file-excel', type: 'solid'},
    {name: 'fa-solid fa-file-pdf', type: 'solid'},
    {name: 'fa-solid fa-file-pen', type: 'solid'},
    {name: 'fa-solid fa-file-powerpoint', type: 'solid'},
    {name: 'fa-solid fa-file-prescription', type: 'solid'},
    {name: 'fa-solid fa-fill', type: 'solid'},
    {name: 'fa-solid fa-film', type: 'solid'},
    {name: 'fa-solid fa-filter', type: 'solid'},
    {name: 'fa-solid fa-fingerprint', type: 'solid'},
    {name: 'fa-solid fa-fire', type: 'solid'},
    {name: 'fa-solid fa-flask', type: 'solid'},
    {name: 'fa-solid fa-folder', type: 'solid'},
    {name: 'fa-solid fa-folder-open', type: 'solid'},
    {name: 'fa-solid fa-gamepad', type: 'solid'},
    {name: 'fa-solid fa-gear', type: 'solid'},
    {name: 'fa-solid fa-gears', type: 'solid'},
    {name: 'fa-solid fa-ghost', type: 'solid'},
    {name: 'fa-solid fa-gift', type: 'solid'},
    {name: 'fa-solid fa-globe', type: 'solid'},
    {name: 'fa-solid fa-graduation-cap', type: 'solid'},
    {name: 'fa-solid fa-gun', type: 'solid'},
    {name: 'fa-solid fa-hammer', type: 'solid'},
    {name: 'fa-solid fa-hand', type: 'solid'},
    {name: 'fa-solid fa-hands', type: 'solid'},
    {name: 'fa-solid fa-handshake', type: 'solid'},
    {name: 'fa-solid fa-hashtag', type: 'solid'},
    {name: 'fa-solid fa-heading', type: 'solid'},
    {name: 'fa-solid fa-headphones', type: 'solid'},
    {name: 'fa-solid fa-head-side-virus', type: 'solid'},
    {name: 'fa-solid fa-heart', type: 'solid'},
    {name: 'fa-solid fa-helicopter', type: 'solid'},
    {name: 'fa-solid fa-helicopter-symbol', type: 'solid'},
    {name: 'fa-solid fa-hospital-user', type: 'solid'},
    {name: 'fa-solid fa-hotel', type: 'solid'},
    {name: 'fa-solid fa-house', type: 'solid'},
    {name: 'fa-solid fa-house-chimney-user', type: 'solid'},
    {name: 'fa-solid fa-house-flag', type: 'solid'},
    {name: 'fa-solid fa-house-lock', type: 'solid'},
    {name: 'fa-solid fa-house-signal', type: 'solid'},
    {name: 'fa-solid fa-house-user', type: 'solid'},
    {name: 'fa-solid fa-icons', type: 'solid'},
    {name: 'fa-solid fa-id-card', type: 'solid'},
    {name: 'fa-solid fa-image', type: 'solid'},
    {name: 'fa-solid fa-industry', type: 'solid'},
    {name: 'fa-solid fa-info', type: 'solid'},
    {name: 'fa-solid fa-jar', type: 'solid'},
    {name: 'fa-solid fa-joint', type: 'solid'},
    {name: 'fa-solid fa-key', type: 'solid'},
    {name: 'fa-solid fa-landmark', type: 'solid'},
    {name: 'fa-solid fa-language', type: 'solid'},
    {name: 'fa-solid fa-laptop', type: 'solid'},
    {name: 'fa-solid fa-laptop-code', type: 'solid'},
    {name: 'fa-solid fa-layer-group', type: 'solid'},
    {name: 'fa-solid fa-lightbulb', type: 'solid'},
    {name: 'fa-solid fa-link', type: 'solid'},
    {name: 'fa-solid fa-location-arrow', type: 'solid'},
    {name: 'fa-solid fa-location-crosshairs', type: 'solid'},
    {name: 'fa-solid fa-location-dot', type: 'solid'},
    {name: 'fa-solid fa-location-pin', type: 'solid'},
    {name: 'fa-solid fa-location-pin-lock', type: 'solid'},
    {name: 'fa-solid fa-lock', type: 'solid'},
    {name: 'fa-solid fa-magnet', type: 'solid'},
    {name: 'fa-solid fa-map', type: 'solid'},
    {name: 'fa-solid fa-map-pin', type: 'solid'},
    {name: 'fa-solid fa-marker', type: 'solid'},
    {name: 'fa-solid fa-mask-face', type: 'solid'},
    {name: 'fa-solid fa-memory', type: 'solid'},
    {name: 'fa-solid fa-mercury', type: 'solid'},
    {name: 'fa-solid fa-message', type: 'solid'},
    {name: 'fa-solid fa-microchip', type: 'solid'},
    {name: 'fa-solid fa-microphone', type: 'solid'},
    {name: 'fa-solid fa-microphone-slash', type: 'solid'},
    {name: 'fa-solid fa-mobile', type: 'solid'},
    {name: 'fa-solid fa-motorcycle', type: 'solid'},
    {name: 'fa-solid fa-mountain', type: 'solid'},
    {name: 'fa-solid fa-mug-saucer', type: 'solid'},
    {name: 'fa-solid fa-music', type: 'solid'},
    {name: 'fa-solid fa-oil-can', type: 'solid'},
    {name: 'fa-solid fa-pager', type: 'solid'},
    {name: 'fa-solid fa-paint-roller', type: 'solid'},
    {name: 'fa-solid fa-palette', type: 'solid'},
    {name: 'fa-solid fa-pallet', type: 'solid'},
    {name: 'fa-solid fa-panorama', type: 'solid'},
    {name: 'fa-solid fa-paperclip', type: 'solid'},
    {name: 'fa-solid fa-paragraph', type: 'solid'},
    {name: 'fa-solid fa-passport', type: 'solid'},
    {name: 'fa-solid fa-pause', type: 'solid'},
    {name: 'fa-solid fa-paw', type: 'solid'},
    {name: 'fa-solid fa-peace', type: 'solid'},
    {name: 'fa-solid fa-pen', type: 'solid'},
    {name: 'fa-solid fa-pencil', type: 'solid'},
    {name: 'fa-solid fa-pen-nib', type: 'solid'},
    {name: 'fa-solid fa-people-arrows', type: 'solid'},
    {name: 'fa-solid fa-people-carry-box', type: 'solid'},
    {name: 'fa-solid fa-people-group', type: 'solid'},
    {name: 'fa-solid fa-people-roof', type: 'solid'},
    {name: 'fa-solid fa-person', type: 'solid'},
    {name: 'fa-solid fa-person-biking', type: 'solid'},
    {name: 'fa-solid fa-person-dress', type: 'solid'},
    {name: 'fa-solid fa-person-drowning', type: 'solid'},
    {name: 'fa-solid fa-person-hiking', type: 'solid'},
    {name: 'fa-solid fa-person-praying', type: 'solid'},
    {name: 'fa-solid fa-person-pregnant', type: 'solid'},
    {name: 'fa-solid fa-person-running', type: 'solid'},
    {name: 'fa-solid fa-person-shelter', type: 'solid'},
    {name: 'fa-solid fa-person-swimming', type: 'solid'},
    {name: 'fa-solid fa-person-walking', type: 'solid'},
    {name: 'fa-solid fa-person-walking-luggage', type: 'solid'},
    {name: 'fa-solid fa-person-walking-with-cane', type: 'solid'},
    {name: 'fa-solid fa-phone', type: 'solid'},
    {name: 'fa-solid fa-phone-volume', type: 'solid'},
    {name: 'fa-solid fa-pizza-slice', type: 'solid'},
    {name: 'fa-solid fa-plane', type: 'solid'},
    {name: 'fa-solid fa-play', type: 'solid'},
    {name: 'fa-solid fa-plug', type: 'solid'},
    {name: 'fa-solid fa-podcast', type: 'solid'},
    {name: 'fa-solid fa-poo', type: 'solid'},
    {name: 'fa-solid fa-power-off', type: 'solid'},
    {name: 'fa-solid fa-prescription', type: 'solid'},
    {name: 'fa-solid fa-print', type: 'solid'},
    {name: 'fa-solid fa-q', type: 'solid'},
    {name: 'fa-solid fa-question', type: 'solid'},
    {name: 'fa-solid fa-quote-left', type: 'solid'},
    {name: 'fa-solid fa-radio', type: 'solid'},
    {name: 'fa-solid fa-rainbow', type: 'solid'},
    {name: 'fa-solid fa-recycle', type: 'solid'},
    {name: 'fa-solid fa-reply', type: 'solid'},
    {name: 'fa-solid fa-restroom', type: 'solid'},
    {name: 'fa-solid fa-ribbon', type: 'solid'},
    {name: 'fa-solid fa-road', type: 'solid'},
    {name: 'fa-solid fa-road-barrier', type: 'solid'},
    {name: 'fa-solid fa-rocket', type: 'solid'},
    {name: 'fa-solid fa-route', type: 'solid'},
    {name: 'fa-solid fa-rss', type: 'solid'},
    {name: 'fa-solid fa-rug', type: 'solid'},
    {name: 'fa-solid fa-sailboat', type: 'solid'},
    {name: 'fa-solid fa-scissors', type: 'solid'},
    {name: 'fa-solid fa-server', type: 'solid'},
    {name: 'fa-solid fa-shapes', type: 'solid'},
    {name: 'fa-solid fa-share', type: 'solid'},
    {name: 'fa-solid fa-share-nodes', type: 'solid'},
    {name: 'fa-solid fa-sheet-plastic', type: 'solid'},
    {name: 'fa-solid fa-shield', type: 'solid'},
    {name: 'fa-solid fa-ship', type: 'solid'},
    {name: 'fa-solid fa-shirt', type: 'solid'},
    {name: 'fa-solid fa-shoe-prints', type: 'solid'},
    {name: 'fa-solid fa-shop', type: 'solid'},
    {name: 'fa-solid fa-shower', type: 'solid'},
    {name: 'fa-solid fa-signal', type: 'solid'},
    {name: 'fa-solid fa-signature', type: 'solid'},
    {name: 'fa-solid fa-skull', type: 'solid'},
    {name: 'fa-solid fa-skull-crossbones', type: 'solid'},
    {name: 'fa-solid fa-sliders', type: 'solid'},
    {name: 'fa-solid fa-smoking', type: 'solid'},
    {name: 'fa-solid fa-snowflake', type: 'solid'},
    {name: 'fa-solid fa-snowman', type: 'solid'},
    {name: 'fa-solid fa-socks', type: 'solid'},
    {name: 'fa-solid fa-spa', type: 'solid'},
    {name: 'fa-solid fa-spinner', type: 'solid'},
    {name: 'fa-solid fa-spoon', type: 'solid'},
    {name: 'fa-solid fa-staff-snake', type: 'solid'},
    {name: 'fa-solid fa-stairs', type: 'solid'},
    {name: 'fa-solid fa-stamp', type: 'solid'},
    {name: 'fa-solid fa-stapler', type: 'solid'},
    {name: 'fa-solid fa-star', type: 'solid'},
    {name: 'fa-solid fa-stethoscope', type: 'solid'},
    {name: 'fa-solid fa-stopwatch', type: 'solid'},
    {name: 'fa-solid fa-store', type: 'solid'},
    {name: 'fa-solid fa-street-view', type: 'solid'},
    {name: 'fa-solid fa-suitcase', type: 'solid'},
    {name: 'fa-solid fa-sun', type: 'solid'},
    {name: 'fa-solid fa-tag', type: 'solid'},
    {name: 'fa-solid fa-tarp', type: 'solid'},
    {name: 'fa-solid fa-taxi', type: 'solid'},
    {name: 'fa-solid fa-teeth', type: 'solid'},
    {name: 'fa-solid fa-tent', type: 'solid'},
    {name: 'fa-solid fa-thumbs-down', type: 'solid'},
    {name: 'fa-solid fa-thumbs-up', type: 'solid'},
    {name: 'fa-solid fa-thumbtack', type: 'solid'},
    {name: 'fa-solid fa-timeline', type: 'solid'},
    {name: 'fa-solid fa-toggle-on', type: 'solid'},
    {name: 'fa-solid fa-tooth', type: 'solid'},
    {name: 'fa-solid fa-tower-broadcast', type: 'solid'},
    {name: 'fa-solid fa-tower-cell', type: 'solid'},
    {name: 'fa-solid fa-tower-observation', type: 'solid'},
    {name: 'fa-solid fa-train', type: 'solid'},
    {name: 'fa-solid fa-trash', type: 'solid'},
    {name: 'fa-solid fa-trash-can', type: 'solid'},
    {name: 'fa-solid fa-tree', type: 'solid'},
    {name: 'fa-solid fa-trophy', type: 'solid'},
    {name: 'fa-solid fa-truck', type: 'solid'},
    {name: 'fa-solid fa-truck-moving', type: 'solid'},
    {name: 'fa-solid fa-tv', type: 'solid'},
    {name: 'fa-solid fa-umbrella', type: 'solid'},
    {name: 'fa-solid fa-universal-access', type: 'solid'},
    {name: 'fa-solid fa-upload', type: 'solid'},
    {name: 'fa-solid fa-user', type: 'solid'},
    {name: 'fa-solid fa-user-astronaut', type: 'solid'},
    {name: 'fa-solid fa-user-check', type: 'solid'},
    {name: 'fa-solid fa-user-clock', type: 'solid'},
    {name: 'fa-solid fa-user-doctor', type: 'solid'},
    {name: 'fa-solid fa-user-gear', type: 'solid'},
    {name: 'fa-solid fa-user-graduate', type: 'solid'},
    {name: 'fa-solid fa-user-group', type: 'solid'},
    {name: 'fa-solid fa-user-minus', type: 'solid'},
    {name: 'fa-solid fa-user-ninja', type: 'solid'},
    {name: 'fa-solid fa-user-nurse', type: 'solid'},
    {name: 'fa-solid fa-user-pen', type: 'solid'},
    {name: 'fa-solid fa-user-plus', type: 'solid'},
    {name: 'fa-solid fa-users', type: 'solid'},
    {name: 'fa-solid fa-users-between-lines', type: 'solid'},
    {name: 'fa-solid fa-user-secret', type: 'solid'},
    {name: 'fa-solid fa-users-gear', type: 'solid'},
    {name: 'fa-solid fa-user-shield', type: 'solid'},
    {name: 'fa-solid fa-user-slash', type: 'solid'},
    {name: 'fa-solid fa-users-line', type: 'solid'},
    {name: 'fa-solid fa-users-rays', type: 'solid'},
    {name: 'fa-solid fa-users-rectangle', type: 'solid'},
    {name: 'fa-solid fa-users-slash', type: 'solid'},
    {name: 'fa-solid fa-users-viewfinder', type: 'solid'},
    {name: 'fa-solid fa-user-tag', type: 'solid'},
    {name: 'fa-solid fa-user-tie', type: 'solid'},
    {name: 'fa-solid fa-user-xmark', type: 'solid'},
    {name: 'fa-solid fa-vials', type: 'solid'},
    {name: 'fa-solid fa-video', type: 'solid'},
    {name: 'fa-solid fa-viruses', type: 'solid'},
    {name: 'fa-solid fa-wallet', type: 'solid'},
    {name: 'fa-solid fa-warehouse', type: 'solid'},
    {name: 'fa-solid fa-water', type: 'solid'},
    {name: 'fa-solid fa-wheelchair', type: 'solid'},
    {name: 'fa-solid fa-wifi', type: 'solid'},
    {name: 'fa-solid fa-wrench', type: 'solid'},
    {name: 'fa-solid fa-person-digging', type: 'solid'},
    
      ]
  default: any = {
    headings: [],
    texts: [],
    buttons: [],
    dividers: [],
    videos: [],
    checkouts: [],
    codes: [],
  }
  constructor(private _general: GeneralService, private _row: RowService, private _style: StyleService, private _section: SectionService) {
  }
  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  setMenu(element: any, menu: any) {
    element.data_id = menu.id;
    element.items = JSON.parse(JSON.stringify(menu.items));
    return element;
  }

  setIframe(element: any, adata: any) {
    element.data_id = adata.uniqueid;
    element.src = window.origin + '/fetch-form/' + adata.user_id + '/' + adata.uniqueid;
    return element;
  }

  addElement(element: any) {
    if (element.btntype == 'upsell' || element.btntype == 'downsell') {
      var proId = this._general.step_products[0];
      element.productid = proId ? proId.uniqueid : '';
    }
    else if (element.name == 'menu') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setMenu(element, JSON.parse(JSON.stringify(this._general.menus[0])));
    }
    else if (element.name == 'iframe' && element.type == 'form') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setIframe(element, JSON.parse(JSON.stringify(this._general.forms[0])));
    }
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = JSON.parse(JSON.stringify(element));
    if (element.name != 'iframe' && element.name != 'code') {
      var fntSz = '14px';
      switch(tempObj.content.name) {
        case 'heading': 
          fntSz = '24px';
        break; 
        case 'icon': 
          fntSz = '16px';
        break;   
        default:
          fntSz = '14px';
      }
      var respS: any = { 'font-size': fntSz };
      if(element.name == 'menu') {
        tempObj.content.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: '',
          mobile: ''
        }
        tempObj.dropdownstyle = true;
        tempObj.content.style.dropdown = this._style.defaultStyling(tempObj);
        delete tempObj.dropdownstyle;
      }
      else if (element.name == 'form' || element.name == 'divider') {
        respS = { 'width': '100%'};
        tempObj.content.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
      }
      else {
        tempObj.content.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
      }
      if (element.items) {
        tempObj.itemstyle = true;
        var eleS = this._style.defaultElementStyling(tempObj);
        tempObj.content.item = {
          style: {
            desktop: eleS,
            tablet_h: '',
            tablet_v: respS,
            mobile: respS,
          }
        }
        if(element.name == 'menu') tempObj.content.item.style.dropdown = eleS;
        delete tempObj.itemstyle;
        console.log(tempObj);
      }
      if (element.form) return tempObj;
    }
    this.appendElement(tempObj, this.element_index);
    this.distroyDialogue.next(void 0);
  }

  duplicateElement(element: any, index: any) {
    var tempObj = JSON.parse(JSON.stringify(element));
    this.appendElement(tempObj, index);
  }

  deleteElement(elements: any[], index: any) {
    elements.splice(index, 1);
    this._section.savePageSession();
  }

  appendElement(tempObj: any, index: number) {
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.setting = false;
    this.selectedElements.splice(index + 1, 0, tempObj);
    this._section.savePageSession();
  }
}

