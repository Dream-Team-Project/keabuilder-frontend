import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  elementObj: any = {
    id: '', name: '', type: 'element', content: {}, setting: false,
    item_alignment: { desktop: '', tablet_h: 'auto', tablet_v: 'auto', mobile: 'auto' },
    redirection: { link: '', target: '_self' },
    style: { desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: '' },
    hide: { desktop: false, tablet_h: false, tablet_v: false, mobile: false }
  };
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
      }, iconCls: 'fas fa-heading'
    },
    // heading
    // text
    text: {
      content: {
        name: 'text',
        html: `<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>`,
        size: 16,
        editor: false,
      }, iconCls: 'fas fa-font'
    },
    // text
    // image
    image: { content: { name: 'image', src: '' }, iconCls: 'far fa-image' },
    // image
    // video
    video: {
      content: {
        name: 'video',
        type: 'video',
        iframe: '<iframe width="560" height="315" src="http://app.keabuilder.com/assets/videos/movie.mp4" title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        src: 'http://app.keabuilder.com/assets/videos/movie.mp4',
        autoplay: false,
        muted: false,
        loop: false,
        controls: true
      }, iconCls: 'fas fa-video'
    },
    // video
    // button
    button: {
      content: {
        name: 'button', size: 14, btntype: 'regular',
        text: 'Read More', subtext: '', subfont_size: '80%',
        link: '#no-link', target: '_self'
      }, iconCls: 'fas fa-toggle-off'
    },
    // button
    // menu
    menu: { content: { name: 'menu', size: 16, items: [] }, iconCls: 'fas fa-bars' },
    // menu
    // courses block
    // courses: { content: { name: 'courses', view: 'kb-course-grid-view-3', gap: {desktop:1.5, tablet_h:1.5, tablet_v:1, mobile:1}, 
    // children: {card: {}, thumbnail: {}, title: {}, description: {}, button: {text: 'View Course'}} }, iconCls: 'fa fa-users' },
    // courses block
    // login
    // login: { content: { name: 'login', children: {label: {}, input: {}, button: {text: 'Login'}} }, iconCls: 'fa fa-user' },
    // login,password
    // divider
    divider: { content: { name: 'divider' }, iconCls: 'fas fa-minus' },
    // divider
    // form
    form: { content: { name: 'form-component', type: 'form' }, iconCls: 'fab fa-wpforms' },
    // form
    // code block
    code: { content: { name: 'code', html: `` }, iconCls: 'fas fa-code' },
    // code block
    // icon
    icon: { content: { name: 'icon', icon_html: `<i class="fa-solid fa-icons"></i>`, size: 18 }, iconCls: 'fa-solid fa-icons' },
    // icon
    // login
    // login: { content: { name: 'login', label: {}, input: {}, button: {} }, iconCls: 'fas fa-bars' },
    // login
    // order form
    // order_form: { content: { name: 'order-form-component', type: 'order_form' }, iconCls: 'fab fa-wpforms' },
    // order form
  };
  preMenuItems: any = ['Home', 'About', 'Blog', 'Contact'];
  defaultIcons: any = [
    { title: 'facebook', name: 'fa-brands fa-facebook', group: 'brand', type: 'icon' },
    { title: 'facebook messenger', name: 'fa-brands fa-facebook-messenger', group: 'brand', type: 'icon' },
    { title: 'facebook f', name: 'fa-brands fa-facebook-f', group: 'brand', type: 'icon' },
    { title: 'square facebook', name: 'fa-brands fa-square-facebook', group: 'brand', type: 'icon' },
    { title: 'instagram', name: 'fa-brands fa-instagram', group: 'brand', type: 'icon' },
    { title: 'square instagram', name: 'fa-brands fa-square-instagram', group: 'brand', type: 'icon' },
    { title: 'twitter', name: 'fa-brands fa-twitter', group: 'brand', type: 'icon' },
    { title: 'square twitter', name: 'fa-brands fa-square-twitter', group: 'brand', type: 'icon' },
    { title: 'skype', name: 'fa-brands fa-skype', group: 'brand', type: 'icon' },
    { title: 'linkedin', name: 'fa-brands fa-linkedin', group: 'brand', type: 'icon' },
    { title: 'linkedin in', name: 'fa-brands fa-linkedin-in', group: 'brand', type: 'icon' },
    { title: 'cc visa', name: 'fa-brands fa-cc-visa', group: 'brand', type: 'icon' },
    { title: 'cc mastercard', name: 'fa-brands fa-cc-mastercard', group: 'brand', type: 'icon' },
    { title: 'cc stripe', name: 'fa-brands fa-cc-stripe', group: 'brand', type: 'icon' },
    { title: 'cc paypal', name: 'fa-brands fa-cc-paypal', group: 'brand', type: 'icon' },
    { title: 'cc jcb', name: 'fa-brands fa-cc-jcb', group: 'brand', type: 'icon' },
    { title: 'cc amazon-pay', name: 'fa-brands fa-cc-amazon-pay', group: 'brand', type: 'icon' },
    { title: 'accessible icon', name: 'fa-brands fa-accessible-icon', group: 'brand', type: 'icon' },
    { title: 'uber', name: 'fa-brands fa-uber', group: 'brand', type: 'icon' },
    { title: 'aws', name: 'fa-brands fa-aws', group: 'brand', type: 'icon' },
    { title: 'servicestack', name: 'fa-brands fa-servicestack', group: 'brand', type: 'icon' },
    { title: 'tiktok', name: 'fa-brands fa-tiktok', group: 'brand', type: 'icon' },
    { title: 'discord', name: 'fa-brands fa-discord', group: 'brand', type: 'icon' },
    { title: 'youtube', name: 'fa-brands fa-youtube', group: 'brand', type: 'icon' },
    { title: 'github', name: 'fa-brands fa-github', group: 'brand', type: 'icon' },
    { title: 'wordpress', name: 'fa-brands fa-wordpress', group: 'brand', type: 'icon' },
    { title: 'docker', name: 'fa-brands fa-docker', group: 'brand', type: 'icon' },
    { title: 'apple', name: 'fa-brands fa-apple', group: 'brand', type: 'icon' },
    { title: 'google', name: 'fa-brands fa-google', group: 'brand', type: 'icon' },
    { title: 'windows', name: 'fa-brands fa-windows', group: 'brand', type: 'icon' },
    { title: 'paypal', name: 'fa-brands fa-paypal', group: 'brand', type: 'icon' },
    { title: 'dropbox', name: 'fa-brands fa-dropbox', group: 'brand', type: 'icon' },
    { title: 'squarespace', name: 'fa-brands fa-squarespace', group: 'brand', type: 'icon' },
    { title: 'android', name: 'fa-brands fa-android', group: 'brand', type: 'icon' },
    { title: 'shopify', name: 'fa-brands fa-shopify', group: 'brand', type: 'icon' },
    { title: 'medium', name: 'fa-brands fa-medium', group: 'brand', type: 'icon' },
    { title: 'codepen', name: 'fa-brands fa-codepen', group: 'brand', type: 'icon' },
    { title: 'cloudflare', name: 'fa-brands fa-cloudflare', group: 'brand', type: 'icon' },
    { title: 'whatsapp', name: 'fa-brands fa-whatsapp', group: 'brand', type: 'icon' },
    { title: 'intercom', name: 'fa-brands fa-intercom', group: 'brand', type: 'icon' },
    { title: 'internet explorer', name: 'fa-brands fa-internet-explorer', group: 'brand', type: 'icon' },
    { title: 'telegram', name: 'fa-brands fa-telegram', group: 'brand', type: 'icon' },
    { title: 'readme', name: 'fa-brands fa-readme', group: 'brand', type: 'icon' },
    { title: 'wikipedia w', name: 'fa-brands fa-wikipedia-w', group: 'brand', type: 'icon' },
    { title: 'java', name: 'fa-brands fa-java', group: 'brand', type: 'icon' },
    { title: 'linux', name: 'fa-brands fa-linux', group: 'brand', type: 'icon' },
    { title: 'rebel', name: 'fa-brands fa-rebel', group: 'brand', type: 'icon' },
    { title: 'elementor', name: 'fa-brands fa-elementor', group: 'brand', type: 'icon' },
    { title: 'untappd', name: 'fa-brands fa-untappd', group: 'brand', type: 'icon' },
    { title: 'uikit', name: 'fa-brands fa-uikit', group: 'brand', type: 'icon' },
    { title: 'unity', name: 'fa-brands fa-unity', group: 'brand', type: 'icon' },
    { title: 'sketch', name: 'fa-brands fa-sketch', group: 'brand', type: 'icon' },
    { title: 'sitrox', name: 'fa-brands fa-sitrox', group: 'brand', type: 'icon' },
    { title: 'sellcast', name: 'fa-brands fa-sellcast', group: 'brand', type: 'icon' },
    { title: 'rev', name: 'fa-brands fa-rev', group: 'brand', type: 'icon' },
    { title: 'renren', name: 'fa-brands fa-renren', group: 'brand', type: 'icon' },
    { title: 'pix', name: 'fa-brands fa-pix', group: 'brand', type: 'icon' },
    { title: 'pushed', name: 'fa-brands fa-pushed', group: 'brand', type: 'icon' },
    { title: 'osi', name: 'fa-brands fa-osi', group: 'brand', type: 'icon' },
    { title: 'orcid', name: 'fa-brands fa-orcid', group: 'brand', type: 'icon' },
    { title: 'odysee', name: 'fa-brands fa-odysee', group: 'brand', type: 'icon' },
    { title: 'opera', name: 'fa-brands fa-opera', group: 'brand', type: 'icon' },
    { title: 'opencart', name: 'fa-brands fa-opencart', group: 'brand', type: 'icon' },
    { title: 'mix', name: 'fa-brands fa-mix', group: 'brand', type: 'icon' },
    { title: 'meta', name: 'fa-brands fa-meta', group: 'brand', type: 'icon' },
    { title: 'magento', name: 'fa-brands fa-magento', group: 'brand', type: 'icon' },
    { title: 'korvue', name: 'fa-brands fa-korvue', group: 'brand', type: 'icon' },
    { title: 'jenkins', name: 'fa-brands fa-jenkins', group: 'brand', type: 'icon' },
    { title: 'jira', name: 'fa-brands fa-jira', group: 'brand', type: 'icon' },
    { title: 'jsfiddle', name: 'fa-brands fa-jsfiddle', group: 'brand', type: 'icon' },
    { title: 'itunes note', name: 'fa-brands fa-itunes-note', group: 'brand', type: 'icon' },
    { title: 'keycdn', name: 'fa-brands fa-keycdn', group: 'brand', type: 'icon' },
    { title: 'mizuni', name: 'fa-brands fa-mizuni', group: 'brand', type: 'icon' },
    { title: 'megaport', name: 'fa-brands fa-megaport', group: 'brand', type: 'icon' },
    { title: 'mendeley', name: 'fa-brands fa-mendeley', group: 'brand', type: 'icon' },
    { title: 'lyft', name: 'fa-brands fa-lyft', group: 'brand', type: 'icon' },
    { title: 'lastfm', name: 'fa-brands fa-lastfm', group: 'brand', type: 'icon' },
    { title: 'less', name: 'fa-brands fa-less', group: 'brand', type: 'icon' },
    { title: 'keybase', name: 'fa-brands fa-keybase', group: 'brand', type: 'icon' },
    { title: 'kaggle', name: 'fa-brands fa-kaggle', group: 'brand', type: 'icon' },
    { title: 'js', name: 'fa-brands fa-js', group: 'brand', type: 'icon' },
    { title: 'joomla', name: 'fa-brands fa-joomla', group: 'brand', type: 'icon' },
    { title: 'itch io', name: 'fa-brands fa-itch-io', group: 'brand', type: 'icon' },
    { title: 'jedi order', name: 'fa-brands fa-jedi-order', group: 'brand', type: 'icon' },
    { title: 'address book', name: 'fa-regular fa-address-book', group: 'regular', type: 'icon' },
    { title: 'address card', name: 'fa-regular fa-address-card', group: 'regular', type: 'icon' },
    { title: 'bell', name: 'fa-regular fa-bell', group: 'regular', type: 'icon' },
    { title: 'bookmark', name: 'fa-regular fa-bookmark', group: 'regular', type: 'icon' },
    { title: 'building', name: 'fa-regular fa-building', group: 'regular', type: 'icon' },
    { title: 'circle user', name: 'fa-regular fa-circle-user', group: 'regular', type: 'icon' },
    { title: 'clipboard', name: 'fa-regular fa-clipboard', group: 'regular', type: 'icon' },
    { title: 'comment', name: 'fa-regular fa-comment', group: 'regular', type: 'icon' },
    { title: 'comments', name: 'fa-regular fa-comments', group: 'regular', type: 'icon' },
    { title: 'compass', name: 'fa-regular fa-compass', group: 'regular', type: 'icon' },
    { title: 'envelope', name: 'fa-regular fa-envelope', group: 'regular', type: 'icon' },
    { title: 'eye', name: 'fa-regular fa-eye', group: 'regular', type: 'icon' },
    { title: 'face smile', name: 'fa-regular fa-face-smile', group: 'regular', type: 'icon' },
    { title: 'file', name: 'fa-regular fa-file', group: 'regular', type: 'icon' },
    { title: 'file excel', name: 'fa-regular fa-file-excel', group: 'regular', type: 'icon' },
    { title: 'file pdf', name: 'fa-regular fa-file-pdf', group: 'regular', type: 'icon' },
    { title: 'file powerpoint', name: 'fa-regular fa-file-powerpoint', group: 'regular', type: 'icon' },
    { title: 'folder', name: 'fa-regular fa-folder', group: 'regular', type: 'icon' },
    { title: 'folder open', name: 'fa-regular fa-folder-open', group: 'regular', type: 'icon' },
    { title: 'hand', name: 'fa-regular fa-hand', group: 'regular', type: 'icon' },
    { title: 'handshake', name: 'fa-regular fa-handshake', group: 'regular', type: 'icon' },
    { title: 'hashtag', name: 'fa-regular fa-hashtag', group: 'regular', type: 'icon' },
    { title: 'heart', name: 'fa-regular fa-heart', group: 'regular', type: 'icon' },
    { title: 'id card', name: 'fa-regular fa-id-card', group: 'regular', type: 'icon' },
    { title: 'image', name: 'fa-regular fa-image', group: 'regular', type: 'icon' },
    { title: 'lightbulb', name: 'fa-regular fa-lightbulb', group: 'regular', type: 'icon' },
    { title: 'map', name: 'fa-regular fa-map', group: 'regular', type: 'icon' },
    { title: 'message', name: 'fa-regular fa-message', group: 'regular', type: 'icon' },
    { title: 'newspaper', name: 'fa-regular fa-newspaper', group: 'regular', type: 'icon' },
    { title: 'paper plane', name: 'fa-regular fa-paper-plane', group: 'regular', type: 'icon' },
    { title: 'q', name: 'fa-regular fa-q', group: 'regular', type: 'icon' },
    { title: 'question', name: 'fa-regular fa-question', group: 'regular', type: 'icon' },
    { title: 'snowflake', name: 'fa-regular fa-snowflake', group: 'regular', type: 'icon' },
    { title: 'star', name: 'fa-regular fa-star', group: 'regular', type: 'icon' },
    { title: 'sun', name: 'fa-regular fa-sun', group: 'regular', type: 'icon' },
    { title: 'thumbs down', name: 'fa-regular fa-thumbs-down', group: 'regular', type: 'icon' },
    { title: 'thumbs up', name: 'fa-regular fa-thumbs-up', group: 'regular', type: 'icon' },
    { title: 'trash can', name: 'fa-regular fa-trash-can', group: 'regular', type: 'icon' },
    { title: 'user', name: 'fa-regular fa-user', group: 'regular', type: 'icon' },
    { title: 'address book', name: 'fa-solid fa-address-book', group: 'solid', type: 'icon' },
    { title: 'address card', name: 'fa-solid fa-address-card', group: 'solid', type: 'icon' },
    { title: 'anchor', name: 'fa-solid fa-anchor', group: 'solid', type: 'icon' },
    { title: 'arrow down', name: 'fa-solid fa-arrow-down', group: 'solid', type: 'icon' },
    { title: 'arrow left', name: 'fa-solid fa-arrow-left', group: 'solid', type: 'icon' },
    { title: 'arrow pointer', name: 'fa-solid fa-arrow-pointer', group: 'solid', type: 'icon' },
    { title: 'arrow right', name: 'fa-solid fa-arrow-right', group: 'solid', type: 'icon' },
    { title: 'arrow rotate-right', name: 'fa-solid fa-arrow-rotate-right', group: 'solid', type: 'icon' },
    { title: 'arrow up', name: 'fa-solid fa-arrow-up', group: 'solid', type: 'icon' },
    { title: 'arrow up-from-bracket', name: 'fa-solid fa-arrow-up-from-bracket', group: 'solid', type: 'icon' },
    { title: 'award', name: 'fa-solid fa-award', group: 'solid', type: 'icon' },
    { title: 'baby', name: 'fa-solid fa-baby', group: 'solid', type: 'icon' },
    { title: 'bag shopping', name: 'fa-solid fa-bag-shopping', group: 'solid', type: 'icon' },
    { title: 'barcode', name: 'fa-solid fa-barcode', group: 'solid', type: 'icon' },
    { title: 'bars', name: 'fa-solid fa-bars', group: 'solid', type: 'icon' },
    { title: 'bath', name: 'fa-solid fa-bath', group: 'solid', type: 'icon' },
    { title: 'battery full', name: 'fa-solid fa-battery-full', group: 'solid', type: 'icon' },
    { title: 'bell', name: 'fa-solid fa-bell', group: 'solid', type: 'icon' },
    { title: 'bell concierge', name: 'fa-solid fa-bell-concierge', group: 'solid', type: 'icon' },
    { title: 'bicycle', name: 'fa-solid fa-bicycle', group: 'solid', type: 'icon' },
    { title: 'bolt', name: 'fa-solid fa-bolt', group: 'solid', type: 'icon' },
    { title: 'bolt lightning', name: 'fa-solid fa-bolt-lightning', group: 'solid', type: 'icon' },
    { title: 'bone', name: 'fa-solid fa-bone', group: 'solid', type: 'icon' },
    { title: 'book', name: 'fa-solid fa-book', group: 'solid', type: 'icon' },
    { title: 'bookmark', name: 'fa-solid fa-bookmark', group: 'solid', type: 'icon' },
    { title: 'brain', name: 'fa-solid fa-brain', group: 'solid', type: 'icon' },
    { title: 'briefcase', name: 'fa-solid fa-briefcase', group: 'solid', type: 'icon' },
    { title: 'brush', name: 'fa-solid fa-brush', group: 'solid', type: 'icon' },
    { title: 'bug', name: 'fa-solid fa-bug', group: 'solid', type: 'icon' },
    { title: 'building', name: 'fa-solid fa-building', group: 'solid', type: 'icon' },
    { title: 'building user', name: 'fa-solid fa-building-user', group: 'solid', type: 'icon' },
    { title: 'burger', name: 'fa-solid fa-burger', group: 'solid', type: 'icon' },
    { title: 'bus', name: 'fa-solid fa-bus', group: 'solid', type: 'icon' },
    { title: 'cable car', name: 'fa-solid fa-cable-car', group: 'solid', type: 'icon' },
    { title: 'calculator', name: 'fa-solid fa-calculator', group: 'solid', type: 'icon' },
    { title: 'camera', name: 'fa-solid fa-camera', group: 'solid', type: 'icon' },
    { title: 'car', name: 'fa-solid fa-car', group: 'solid', type: 'icon' },
    { title: 'car side', name: 'fa-solid fa-car-side', group: 'solid', type: 'icon' },
    { title: 'cart shopping', name: 'fa-solid fa-cart-shopping', group: 'solid', type: 'icon' },
    { title: 'certificate', name: 'fa-solid fa-certificate', group: 'solid', type: 'icon' },
    { title: 'chair', name: 'fa-solid fa-chair', group: 'solid', type: 'icon' },
    { title: 'chalkboard user', name: 'fa-solid fa-chalkboard-user', group: 'solid', type: 'icon' },
    { title: 'chart simple', name: 'fa-solid fa-chart-simple', group: 'solid', type: 'icon' },
    { title: 'check double', name: 'fa-solid fa-check-double', group: 'solid', type: 'icon' },
    { title: 'child', name: 'fa-solid fa-child', group: 'solid', type: 'icon' },
    { title: 'child reaching', name: 'fa-solid fa-child-reaching', group: 'solid', type: 'icon' },
    { title: 'children', name: 'fa-solid fa-children', group: 'solid', type: 'icon' },
    { title: 'church', name: 'fa-solid fa-church', group: 'solid', type: 'icon' },
    { title: 'circle user', name: 'fa-solid fa-circle-user', group: 'solid', type: 'icon' },
    { title: 'city', name: 'fa-solid fa-city', group: 'solid', type: 'icon' },
    { title: 'clapperboard', name: 'fa-solid fa-clapperboard', group: 'solid', type: 'icon' },
    { title: 'clipboard', name: 'fa-solid fa-clipboard', group: 'solid', type: 'icon' },
    { title: 'clipboard user', name: 'fa-solid fa-clipboard-user', group: 'solid', type: 'icon' },
    { title: 'cloud', name: 'fa-solid fa-cloud', group: 'solid', type: 'icon' },
    { title: 'code compare', name: 'fa-solid fa-code-compare', group: 'solid', type: 'icon' },
    { title: 'comment', name: 'fa-solid fa-comment', group: 'solid', type: 'icon' },
    { title: 'comments', name: 'fa-solid fa-comments', group: 'regular', type: 'icon' },
    { title: 'comments', name: 'fa-solid fa-comments', group: 'solid', type: 'icon' },
    { title: 'comment sms', name: 'fa-solid fa-comment-sms', group: 'solid', type: 'icon' },
    { title: 'compass', name: 'fa-solid fa-compass', group: 'solid', type: 'icon' },
    { title: 'computer', name: 'fa-solid fa-computer', group: 'solid', type: 'icon' },
    { title: 'computer mouse', name: 'fa-solid fa-computer-mouse', group: 'solid', type: 'icon' },
    { title: 'desktop', name: 'fa-solid fa-desktop', group: 'solid', type: 'icon' },
    { title: 'diamond', name: 'fa-solid fa-diamond', group: 'solid', type: 'icon' },
    { title: 'dragon', name: 'fa-solid fa-dragon', group: 'solid', type: 'icon' },
    { title: 'droplet', name: 'fa-solid fa-droplet', group: 'solid', type: 'icon' },
    { title: 'egg', name: 'fa-solid fa-egg', group: 'solid', type: 'icon' },
    { title: 'envelope', name: 'fa-solid fa-envelope', group: 'solid', type: 'icon' },
    { title: 'expand', name: 'fa-solid fa-expand', group: 'solid', type: 'icon' },
    { title: 'eye', name: 'fa-solid fa-eye', group: 'solid', type: 'icon' },
    { title: 'face smile', name: 'fa-solid fa-face-smile', group: 'solid', type: 'icon' },
    { title: 'feather', name: 'fa-solid fa-feather', group: 'solid', type: 'icon' },
    { title: 'file', name: 'fa-solid fa-file', group: 'solid', type: 'icon' },
    { title: 'file excel', name: 'fa-solid fa-file-excel', group: 'solid', type: 'icon' },
    { title: 'file pdf', name: 'fa-solid fa-file-pdf', group: 'solid', type: 'icon' },
    { title: 'file pen', name: 'fa-solid fa-file-pen', group: 'solid', type: 'icon' },
    { title: 'file powerpoint', name: 'fa-solid fa-file-powerpoint', group: 'solid', type: 'icon' },
    { title: 'file prescription', name: 'fa-solid fa-file-prescription', group: 'solid', type: 'icon' },
    { title: 'fill', name: 'fa-solid fa-fill', group: 'solid', type: 'icon' },
    { title: 'film', name: 'fa-solid fa-film', group: 'solid', type: 'icon' },
    { title: 'filter', name: 'fa-solid fa-filter', group: 'solid', type: 'icon' },
    { title: 'fingerprint', name: 'fa-solid fa-fingerprint', group: 'solid', type: 'icon' },
    { title: 'fire', name: 'fa-solid fa-fire', group: 'solid', type: 'icon' },
    { title: 'flask', name: 'fa-solid fa-flask', group: 'solid', type: 'icon' },
    { title: 'folder', name: 'fa-solid fa-folder', group: 'solid', type: 'icon' },
    { title: 'folder open', name: 'fa-solid fa-folder-open', group: 'solid', type: 'icon' },
    { title: 'gamepad', name: 'fa-solid fa-gamepad', group: 'solid', type: 'icon' },
    { title: 'gear', name: 'fa-solid fa-gear', group: 'solid', type: 'icon' },
    { title: 'gears', name: 'fa-solid fa-gears', group: 'solid', type: 'icon' },
    { title: 'ghost', name: 'fa-solid fa-ghost', group: 'solid', type: 'icon' },
    { title: 'gift', name: 'fa-solid fa-gift', group: 'solid', type: 'icon' },
    { title: 'globe', name: 'fa-solid fa-globe', group: 'solid', type: 'icon' },
    { title: 'graduation cap', name: 'fa-solid fa-graduation-cap', group: 'solid', type: 'icon' },
    { title: 'gun', name: 'fa-solid fa-gun', group: 'solid', type: 'icon' },
    { title: 'hammer', name: 'fa-solid fa-hammer', group: 'solid', type: 'icon' },
    { title: 'hand', name: 'fa-solid fa-hand', group: 'solid', type: 'icon' },
    { title: 'hands', name: 'fa-solid fa-hands', group: 'solid', type: 'icon' },
    { title: 'handshake', name: 'fa-solid fa-handshake', group: 'solid', type: 'icon' },
    { title: 'hashtag', name: 'fa-solid fa-hashtag', group: 'solid', type: 'icon' },
    { title: 'heading', name: 'fa-solid fa-heading', group: 'solid', type: 'icon' },
    { title: 'headphones', name: 'fa-solid fa-headphones', group: 'solid', type: 'icon' },
    { title: 'head side-virus', name: 'fa-solid fa-head-side-virus', group: 'solid', type: 'icon' },
    { title: 'heart', name: 'fa-solid fa-heart', group: 'solid', type: 'icon' },
    { title: 'helicopter', name: 'fa-solid fa-helicopter', group: 'solid', type: 'icon' },
    { title: 'helicopter symbol', name: 'fa-solid fa-helicopter-symbol', group: 'solid', type: 'icon' },
    { title: 'hospital user', name: 'fa-solid fa-hospital-user', group: 'solid', type: 'icon' },
    { title: 'hotel', name: 'fa-solid fa-hotel', group: 'solid', type: 'icon' },
    { title: 'house', name: 'fa-solid fa-house', group: 'solid', type: 'icon' },
    { title: 'house chimney-user', name: 'fa-solid fa-house-chimney-user', group: 'solid', type: 'icon' },
    { title: 'house flag', name: 'fa-solid fa-house-flag', group: 'solid', type: 'icon' },
    { title: 'house lock', name: 'fa-solid fa-house-lock', group: 'solid', type: 'icon' },
    { title: 'house signal', name: 'fa-solid fa-house-signal', group: 'solid', type: 'icon' },
    { title: 'house user', name: 'fa-solid fa-house-user', group: 'solid', type: 'icon' },
    { title: 'icons', name: 'fa-solid fa-icons', group: 'solid', type: 'icon' },
    { title: 'id card', name: 'fa-solid fa-id-card', group: 'solid', type: 'icon' },
    { title: 'image', name: 'fa-solid fa-image', group: 'solid', type: 'icon' },
    { title: 'industry', name: 'fa-solid fa-industry', group: 'solid', type: 'icon' },
    { title: 'info', name: 'fa-solid fa-info', group: 'solid', type: 'icon' },
    { title: 'jar', name: 'fa-solid fa-jar', group: 'solid', type: 'icon' },
    { title: 'joint', name: 'fa-solid fa-joint', group: 'solid', type: 'icon' },
    { title: 'key', name: 'fa-solid fa-key', group: 'solid', type: 'icon' },
    { title: 'landmark', name: 'fa-solid fa-landmark', group: 'solid', type: 'icon' },
    { title: 'language', name: 'fa-solid fa-language', group: 'solid', type: 'icon' },
    { title: 'laptop', name: 'fa-solid fa-laptop', group: 'solid', type: 'icon' },
    { title: 'laptop code', name: 'fa-solid fa-laptop-code', group: 'solid', type: 'icon' },
    { title: 'layer group', name: 'fa-solid fa-layer-group', group: 'solid', type: 'icon' },
    { title: 'lightbulb', name: 'fa-solid fa-lightbulb', group: 'solid', type: 'icon' },
    { title: 'link', name: 'fa-solid fa-link', group: 'solid', type: 'icon' },
    { title: 'location arrow', name: 'fa-solid fa-location-arrow', group: 'solid', type: 'icon' },
    { title: 'location crosshairs', name: 'fa-solid fa-location-crosshairs', group: 'solid', type: 'icon' },
    { title: 'location dot', name: 'fa-solid fa-location-dot', group: 'solid', type: 'icon' },
    { title: 'location pin', name: 'fa-solid fa-location-pin', group: 'solid', type: 'icon' },
    { title: 'location pin-lock', name: 'fa-solid fa-location-pin-lock', group: 'solid', type: 'icon' },
    { title: 'lock', name: 'fa-solid fa-lock', group: 'solid', type: 'icon' },
    { title: 'magnet', name: 'fa-solid fa-magnet', group: 'solid', type: 'icon' },
    { title: 'map', name: 'fa-solid fa-map', group: 'solid', type: 'icon' },
    { title: 'map pin', name: 'fa-solid fa-map-pin', group: 'solid', type: 'icon' },
    { title: 'marker', name: 'fa-solid fa-marker', group: 'solid', type: 'icon' },
    { title: 'mask face', name: 'fa-solid fa-mask-face', group: 'solid', type: 'icon' },
    { title: 'memory', name: 'fa-solid fa-memory', group: 'solid', type: 'icon' },
    { title: 'mercury', name: 'fa-solid fa-mercury', group: 'solid', type: 'icon' },
    { title: 'message', name: 'fa-solid fa-message', group: 'solid', type: 'icon' },
    { title: 'microchip', name: 'fa-solid fa-microchip', group: 'solid', type: 'icon' },
    { title: 'microphone', name: 'fa-solid fa-microphone', group: 'solid', type: 'icon' },
    { title: 'microphone slash', name: 'fa-solid fa-microphone-slash', group: 'solid', type: 'icon' },
    { title: 'mobile', name: 'fa-solid fa-mobile', group: 'solid', type: 'icon' },
    { title: 'motorcycle', name: 'fa-solid fa-motorcycle', group: 'solid', type: 'icon' },
    { title: 'mountain', name: 'fa-solid fa-mountain', group: 'solid', type: 'icon' },
    { title: 'mug saucer', name: 'fa-solid fa-mug-saucer', group: 'solid', type: 'icon' },
    { title: 'music', name: 'fa-solid fa-music', group: 'solid', type: 'icon' },
    { title: 'oil can', name: 'fa-solid fa-oil-can', group: 'solid', type: 'icon' },
    { title: 'pager', name: 'fa-solid fa-pager', group: 'solid', type: 'icon' },
    { title: 'paint roller', name: 'fa-solid fa-paint-roller', group: 'solid', type: 'icon' },
    { title: 'palette', name: 'fa-solid fa-palette', group: 'solid', type: 'icon' },
    { title: 'pallet', name: 'fa-solid fa-pallet', group: 'solid', type: 'icon' },
    { title: 'panorama', name: 'fa-solid fa-panorama', group: 'solid', type: 'icon' },
    { title: 'paperclip', name: 'fa-solid fa-paperclip', group: 'solid', type: 'icon' },
    { title: 'paragraph', name: 'fa-solid fa-paragraph', group: 'solid', type: 'icon' },
    { title: 'passport', name: 'fa-solid fa-passport', group: 'solid', type: 'icon' },
    { title: 'pause', name: 'fa-solid fa-pause', group: 'solid', type: 'icon' },
    { title: 'paw', name: 'fa-solid fa-paw', group: 'solid', type: 'icon' },
    { title: 'peace', name: 'fa-solid fa-peace', group: 'solid', type: 'icon' },
    { title: 'pen', name: 'fa-solid fa-pen', group: 'solid', type: 'icon' },
    { title: 'pencil', name: 'fa-solid fa-pencil', group: 'solid', type: 'icon' },
    { title: 'pen nib', name: 'fa-solid fa-pen-nib', group: 'solid', type: 'icon' },
    { title: 'people arrows', name: 'fa-solid fa-people-arrows', group: 'solid', type: 'icon' },
    { title: 'people carry-box', name: 'fa-solid fa-people-carry-box', group: 'solid', type: 'icon' },
    { title: 'people group', name: 'fa-solid fa-people-group', group: 'solid', type: 'icon' },
    { title: 'people roof', name: 'fa-solid fa-people-roof', group: 'solid', type: 'icon' },
    { title: 'person', name: 'fa-solid fa-person', group: 'solid', type: 'icon' },
    { title: 'person biking', name: 'fa-solid fa-person-biking', group: 'solid', type: 'icon' },
    { title: 'person dress', name: 'fa-solid fa-person-dress', group: 'solid', type: 'icon' },
    { title: 'person drowning', name: 'fa-solid fa-person-drowning', group: 'solid', type: 'icon' },
    { title: 'person hiking', name: 'fa-solid fa-person-hiking', group: 'solid', type: 'icon' },
    { title: 'person praying', name: 'fa-solid fa-person-praying', group: 'solid', type: 'icon' },
    { title: 'person pregnant', name: 'fa-solid fa-person-pregnant', group: 'solid', type: 'icon' },
    { title: 'person running', name: 'fa-solid fa-person-running', group: 'solid', type: 'icon' },
    { title: 'person shelter', name: 'fa-solid fa-person-shelter', group: 'solid', type: 'icon' },
    { title: 'person swimming', name: 'fa-solid fa-person-swimming', group: 'solid', type: 'icon' },
    { title: 'person walking', name: 'fa-solid fa-person-walking', group: 'solid', type: 'icon' },
    { title: 'person walking-luggage', name: 'fa-solid fa-person-walking-luggage', group: 'solid', type: 'icon' },
    { title: 'person walking-with-cane', name: 'fa-solid fa-person-walking-with-cane', group: 'solid', type: 'icon' },
    { title: 'phone', name: 'fa-solid fa-phone', group: 'solid', type: 'icon' },
    { title: 'phone volume', name: 'fa-solid fa-phone-volume', group: 'solid', type: 'icon' },
    { title: 'pizza slice', name: 'fa-solid fa-pizza-slice', group: 'solid', type: 'icon' },
    { title: 'plane', name: 'fa-solid fa-plane', group: 'solid', type: 'icon' },
    { title: 'play', name: 'fa-solid fa-play', group: 'solid', type: 'icon' },
    { title: 'plug', name: 'fa-solid fa-plug', group: 'solid', type: 'icon' },
    { title: 'podcast', name: 'fa-solid fa-podcast', group: 'solid', type: 'icon' },
    { title: 'poo', name: 'fa-solid fa-poo', group: 'solid', type: 'icon' },
    { title: 'power off', name: 'fa-solid fa-power-off', group: 'solid', type: 'icon' },
    { title: 'prescription', name: 'fa-solid fa-prescription', group: 'solid', type: 'icon' },
    { title: 'print', name: 'fa-solid fa-print', group: 'solid', type: 'icon' },
    { title: 'q', name: 'fa-solid fa-q', group: 'solid', type: 'icon' },
    { title: 'question', name: 'fa-solid fa-question', group: 'solid', type: 'icon' },
    { title: 'quote left', name: 'fa-solid fa-quote-left', group: 'solid', type: 'icon' },
    { title: 'radio', name: 'fa-solid fa-radio', group: 'solid', type: 'icon' },
    { title: 'rainbow', name: 'fa-solid fa-rainbow', group: 'solid', type: 'icon' },
    { title: 'recycle', name: 'fa-solid fa-recycle', group: 'solid', type: 'icon' },
    { title: 'reply', name: 'fa-solid fa-reply', group: 'solid', type: 'icon' },
    { title: 'restroom', name: 'fa-solid fa-restroom', group: 'solid', type: 'icon' },
    { title: 'ribbon', name: 'fa-solid fa-ribbon', group: 'solid', type: 'icon' },
    { title: 'road', name: 'fa-solid fa-road', group: 'solid', type: 'icon' },
    { title: 'road barrier', name: 'fa-solid fa-road-barrier', group: 'solid', type: 'icon' },
    { title: 'rocket', name: 'fa-solid fa-rocket', group: 'solid', type: 'icon' },
    { title: 'route', name: 'fa-solid fa-route', group: 'solid', type: 'icon' },
    { title: 'rss', name: 'fa-solid fa-rss', group: 'solid', type: 'icon' },
    { title: 'rug', name: 'fa-solid fa-rug', group: 'solid', type: 'icon' },
    { title: 'sailboat', name: 'fa-solid fa-sailboat', group: 'solid', type: 'icon' },
    { title: 'scissors', name: 'fa-solid fa-scissors', group: 'solid', type: 'icon' },
    { title: 'server', name: 'fa-solid fa-server', group: 'solid', type: 'icon' },
    { title: 'shapes', name: 'fa-solid fa-shapes', group: 'solid', type: 'icon' },
    { title: 'share', name: 'fa-solid fa-share', group: 'solid', type: 'icon' },
    { title: 'share nodes', name: 'fa-solid fa-share-nodes', group: 'solid', type: 'icon' },
    { title: 'sheet plastic', name: 'fa-solid fa-sheet-plastic', group: 'solid', type: 'icon' },
    { title: 'shield', name: 'fa-solid fa-shield', group: 'solid', type: 'icon' },
    { title: 'ship', name: 'fa-solid fa-ship', group: 'solid', type: 'icon' },
    { title: 'shirt', name: 'fa-solid fa-shirt', group: 'solid', type: 'icon' },
    { title: 'shoe prints', name: 'fa-solid fa-shoe-prints', group: 'solid', type: 'icon' },
    { title: 'shop', name: 'fa-solid fa-shop', group: 'solid', type: 'icon' },
    { title: 'shower', name: 'fa-solid fa-shower', group: 'solid', type: 'icon' },
    { title: 'signal', name: 'fa-solid fa-signal', group: 'solid', type: 'icon' },
    { title: 'signature', name: 'fa-solid fa-signature', group: 'solid', type: 'icon' },
    { title: 'skull', name: 'fa-solid fa-skull', group: 'solid', type: 'icon' },
    { title: 'skull crossbones', name: 'fa-solid fa-skull-crossbones', group: 'solid', type: 'icon' },
    { title: 'sliders', name: 'fa-solid fa-sliders', group: 'solid', type: 'icon' },
    { title: 'smoking', name: 'fa-solid fa-smoking', group: 'solid', type: 'icon' },
    { title: 'snowflake', name: 'fa-solid fa-snowflake', group: 'solid', type: 'icon' },
    { title: 'snowman', name: 'fa-solid fa-snowman', group: 'solid', type: 'icon' },
    { title: 'socks', name: 'fa-solid fa-socks', group: 'solid', type: 'icon' },
    { title: 'spa', name: 'fa-solid fa-spa', group: 'solid', type: 'icon' },
    { title: 'spinner', name: 'fa-solid fa-spinner', group: 'solid', type: 'icon' },
    { title: 'spoon', name: 'fa-solid fa-spoon', group: 'solid', type: 'icon' },
    { title: 'staff snake', name: 'fa-solid fa-staff-snake', group: 'solid', type: 'icon' },
    { title: 'stairs', name: 'fa-solid fa-stairs', group: 'solid', type: 'icon' },
    { title: 'stamp', name: 'fa-solid fa-stamp', group: 'solid', type: 'icon' },
    { title: 'stapler', name: 'fa-solid fa-stapler', group: 'solid', type: 'icon' },
    { title: 'star', name: 'fa-solid fa-star', group: 'solid', type: 'icon' },
    { title: 'stethoscope', name: 'fa-solid fa-stethoscope', group: 'solid', type: 'icon' },
    { title: 'stopwatch', name: 'fa-solid fa-stopwatch', group: 'solid', type: 'icon' },
    { title: 'store', name: 'fa-solid fa-store', group: 'solid', type: 'icon' },
    { title: 'street view', name: 'fa-solid fa-street-view', group: 'solid', type: 'icon' },
    { title: 'suitcase', name: 'fa-solid fa-suitcase', group: 'solid', type: 'icon' },
    { title: 'sun', name: 'fa-solid fa-sun', group: 'solid', type: 'icon' },
    { title: 'tag', name: 'fa-solid fa-tag', group: 'solid', type: 'icon' },
    { title: 'tarp', name: 'fa-solid fa-tarp', group: 'solid', type: 'icon' },
    { title: 'taxi', name: 'fa-solid fa-taxi', group: 'solid', type: 'icon' },
    { title: 'teeth', name: 'fa-solid fa-teeth', group: 'solid', type: 'icon' },
    { title: 'tent', name: 'fa-solid fa-tent', group: 'solid', type: 'icon' },
    { title: 'thumbs down', name: 'fa-solid fa-thumbs-down', group: 'solid', type: 'icon' },
    { title: 'thumbs up', name: 'fa-solid fa-thumbs-up', group: 'solid', type: 'icon' },
    { title: 'thumbtack', name: 'fa-solid fa-thumbtack', group: 'solid', type: 'icon' },
    { title: 'timeline', name: 'fa-solid fa-timeline', group: 'solid', type: 'icon' },
    { title: 'toggle on', name: 'fa-solid fa-toggle-on', group: 'solid', type: 'icon' },
    { title: 'tooth', name: 'fa-solid fa-tooth', group: 'solid', type: 'icon' },
    { title: 'tower broadcast', name: 'fa-solid fa-tower-broadcast', group: 'solid', type: 'icon' },
    { title: 'tower cell', name: 'fa-solid fa-tower-cell', group: 'solid', type: 'icon' },
    { title: 'tower observation', name: 'fa-solid fa-tower-observation', group: 'solid', type: 'icon' },
    { title: 'train', name: 'fa-solid fa-train', group: 'solid', type: 'icon' },
    { title: 'trash', name: 'fa-solid fa-trash', group: 'solid', type: 'icon' },
    { title: 'trash can', name: 'fa-solid fa-trash-can', group: 'solid', type: 'icon' },
    { title: 'tree', name: 'fa-solid fa-tree', group: 'solid', type: 'icon' },
    { title: 'trophy', name: 'fa-solid fa-trophy', group: 'solid', type: 'icon' },
    { title: 'truck', name: 'fa-solid fa-truck', group: 'solid', type: 'icon' },
    { title: 'truck moving', name: 'fa-solid fa-truck-moving', group: 'solid', type: 'icon' },
    { title: 'tv', name: 'fa-solid fa-tv', group: 'solid', type: 'icon' },
    { title: 'umbrella', name: 'fa-solid fa-umbrella', group: 'solid', type: 'icon' },
    { title: 'universal access', name: 'fa-solid fa-universal-access', group: 'solid', type: 'icon' },
    { title: 'upload', name: 'fa-solid fa-upload', group: 'solid', type: 'icon' },
    { title: 'user', name: 'fa-solid fa-user', group: 'solid', type: 'icon' },
    { title: 'user astronaut', name: 'fa-solid fa-user-astronaut', group: 'solid', type: 'icon' },
    { title: 'user check', name: 'fa-solid fa-user-check', group: 'solid', type: 'icon' },
    { title: 'user clock', name: 'fa-solid fa-user-clock', group: 'solid', type: 'icon' },
    { title: 'user doctor', name: 'fa-solid fa-user-doctor', group: 'solid', type: 'icon' },
    { title: 'user gear', name: 'fa-solid fa-user-gear', group: 'solid', type: 'icon' },
    { title: 'user graduate', name: 'fa-solid fa-user-graduate', group: 'solid', type: 'icon' },
    { title: 'user group', name: 'fa-solid fa-user-group', group: 'solid', type: 'icon' },
    { title: 'user minus', name: 'fa-solid fa-user-minus', group: 'solid', type: 'icon' },
    { title: 'user ninja', name: 'fa-solid fa-user-ninja', group: 'solid', type: 'icon' },
    { title: 'user nurse', name: 'fa-solid fa-user-nurse', group: 'solid', type: 'icon' },
    { title: 'user pen', name: 'fa-solid fa-user-pen', group: 'solid', type: 'icon' },
    { title: 'user plus', name: 'fa-solid fa-user-plus', group: 'solid', type: 'icon' },
    { title: 'users', name: 'fa-solid fa-users', group: 'solid', type: 'icon' },
    { title: 'users between-lines', name: 'fa-solid fa-users-between-lines', group: 'solid', type: 'icon' },
    { title: 'user secret', name: 'fa-solid fa-user-secret', group: 'solid', type: 'icon' },
    { title: 'users gear', name: 'fa-solid fa-users-gear', group: 'solid', type: 'icon' },
    { title: 'user shield', name: 'fa-solid fa-user-shield', group: 'solid', type: 'icon' },
    { title: 'user slash', name: 'fa-solid fa-user-slash', group: 'solid', type: 'icon' },
    { title: 'users line', name: 'fa-solid fa-users-line', group: 'solid', type: 'icon' },
    { title: 'users rays', name: 'fa-solid fa-users-rays', group: 'solid', type: 'icon' },
    { title: 'users rectangle', name: 'fa-solid fa-users-rectangle', group: 'solid', type: 'icon' },
    { title: 'users slash', name: 'fa-solid fa-users-slash', group: 'solid', type: 'icon' },
    { title: 'users viewfinder', name: 'fa-solid fa-users-viewfinder', group: 'solid', type: 'icon' },
    { title: 'user tag', name: 'fa-solid fa-user-tag', group: 'solid', type: 'icon' },
    { title: 'user tie', name: 'fa-solid fa-user-tie', group: 'solid', type: 'icon' },
    { title: 'user xmark', name: 'fa-solid fa-user-xmark', group: 'solid', type: 'icon' },
    { title: 'vials', name: 'fa-solid fa-vials', group: 'solid', type: 'icon' },
    { title: 'video', name: 'fa-solid fa-video', group: 'solid', type: 'icon' },
    { title: 'viruses', name: 'fa-solid fa-viruses', group: 'solid', type: 'icon' },
    { title: 'wallet', name: 'fa-solid fa-wallet', group: 'solid', type: 'icon' },
    { title: 'warehouse', name: 'fa-solid fa-warehouse', group: 'solid', type: 'icon' },
    { title: 'water', name: 'fa-solid fa-water', group: 'solid', type: 'icon' },
    { title: 'wheelchair', name: 'fa-solid fa-wheelchair', group: 'solid', type: 'icon' },
    { title: 'wifi', name: 'fa-solid fa-wifi', group: 'solid', type: 'icon' },
    { title: 'wrench', name: 'fa-solid fa-wrench', group: 'solid', type: 'icon' },
    { title: 'person digging', name: 'fa-solid fa-person-digging', group: 'solid', type: 'icon' }
  ]
  default: any = {
    headings: [],
    texts: [],
    buttons: [],
    dividers: [],
    videos: [],
    codes: [],
    courses: [],
    logins: []
  }

  constructor(private _general: GeneralService, 
    private _style: StyleService, 
    private _section: SectionService) {
  }

  createDefaultElements() {
    Object.values(this.elementList).forEach((e:any)=>{
      if(e.content.name == 'heading') {
        var types = ['h1','h2','h3','h4','h5','h6'];
        var size = 42;
        for(var i=0; i<types.length; i++) {
          var obj = JSON.parse(JSON.stringify(e));
          obj.content.type = types[i];
          obj.content.size = size;
          obj.content.html = '<'+types[i]+'>Heading Goes Here</'+types[i]+'>';
          this.default.headings.push(obj);
          size = size - 4;
        }
      }
      if(e.content.name == 'text') {
        var types = ['xl','l','m','s','xs'];
        var size = 22;
        for(var i=0; i<types.length; i++) {
          var obj = JSON.parse(JSON.stringify(e));
          obj.content.type = types[i];
          obj.content.size = size;
          this.default.texts.push(obj);
          size = size - 2;
        }
      }
      if(e.content.name == 'button') {
        let types:any = [{name: 'regular', subtext: false}, {name: 'regular', subtext: true}];
        let upsBtn = [{name: 'upsell', subtext: false},  {name: 'upsell', subtext: true}];
        let dwnsBtn = [{name: 'downsell', subtext: false}, {name: 'downsell', subtext: true}];
        
        if(this._general.target.type == 'funnel') {
          if(this._general.webpage.funneltype == 'upsell') types = types.concat(upsBtn);
          if(this._general.webpage.funneltype == 'downsell') types = types.concat(dwnsBtn);
        }
        for(var i=0; i<types.length; i++) {
          var obj = JSON.parse(JSON.stringify(e));
          obj.content.type = types[i];
          obj.content.btntype = types[i].name;
          obj.content.text = types[i].name[0].toUpperCase() + types[i].name.slice(1) + ' Button';
          if(types[i].name == 'upsell' || types[i].name == 'downsell') obj.content.offerid = '';
          if(types[i].subtext) obj.content.subtext = 'Extra Text';
          this.default.buttons.push(obj);
        }        
      }
      if(e.content.name == 'code') {
        this.default.codes.push(e);
      }
      if(e.content.name == 'courses') {
        this._style.course_view_types.forEach((item:any)=>{
          let obj = JSON.parse(JSON.stringify(e));
          obj.content.view = item.value;
          obj['grid_name'] = item.name;
          this.default.courses.push(obj);
        })
      }
      if(e.content.name == 'login') {
        this.default.logins.push(e);
      }
      if(e.content.name == 'video') {
        this.default.videos.push(e);
      }
      if(e.content.name == 'divider') {
        this.default.dividers.push(e);
      }
    })
  }

  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  setIcon(icon: any) {
    return '<i class="' + icon.name + '"></i>';
  }

  setMenu(element: any, menu: any) {
    element.data_id = menu.uniqueid;
    element.items = this._general.decodeJSON(menu.items);
    return element;
  }

  setOrderFormId(element: any, adata: any) {
    element.data_id = adata.uniqueid;
    return element;
  }

  setFormId(element: any, adata: any) {
    element.data_id = adata.uniqueid;
    return element;
  }

  addElement(element: any) {
    if (element.btntype == 'upsell' || element.btntype == 'downsell') {
      var proId = this._general.step_products[0];
      element.offerid = proId ? proId.uniqueid : '';
    }
    else if (element.name == 'menu') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setMenu(element, JSON.parse(JSON.stringify(this._general.menus[0])));
    }
    else if(element.name == 'form-component') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setOrderFormId(element, JSON.parse(JSON.stringify(this._general.forms[0])));
    }
    else if(element.name == 'order-form-component') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setFormId(element, JSON.parse(JSON.stringify(this._general.order_forms[0])));
    }
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = JSON.parse(JSON.stringify(element));
    if (element.name != 'form-component' && element.name != 'order-form-component' && element.name != 'code') {
      var fntSz = '14px';
      switch (tempObj.content.name) {
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
      if (element.name == 'menu') {
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
      else if(element.name == 'courses') {
        respS = { 'width': '100%' };
        tempObj.content.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.card.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.card.style.desktop['background-color'] = 'rgb(255, 255, 255)';
        tempObj.content.children.card.style.desktop['border-radius'] = '10px';
        tempObj.content.children.card.style.desktop['box-shadow'] = 'rgba(0, 0, 3, 0.1) 0px 2px 12px 4px';
        tempObj.content.children.thumbnail.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.thumbnail.style.desktop['margin'] = '0px';
        tempObj.size = '22';
        tempObj.weight = {num: 'semi bold (demi bold)', val: 600};
        tempObj.content.children.title.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.title.style.desktop['margin'] = '0px';
        tempObj.content.children.title.style.desktop['padding'] = '0px 10px';
        tempObj.size = '16';
        tempObj.weight = {num: 'normal', val: 400};
        tempObj.content.children.description.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.description.style.desktop['margin'] = '0px';
        tempObj.content.children.description.style.desktop['padding'] = '0px 10px';
        tempObj.button_child = true;
        tempObj.content.children.button.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.button.style.desktop['margin'] = '10px 10px';
        delete tempObj.button_child;
        delete tempObj.size;
        delete tempObj.weight;
      }
      else if(element.name == 'login') {
        respS = { 'width': '100%' };
        tempObj.content.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.style.desktop['width'] = '50%';
        tempObj.content.style.desktop['padding'] = '12px 20px';
        tempObj.content.style.desktop['background-color'] = 'rgb(255, 255, 255)';
        tempObj.content.style.desktop['border-radius'] = '10px';
        tempObj.content.style.desktop['box-shadow'] = 'rgba(0, 0, 3, 0.1) 0px 2px 12px 4px';
        tempObj.item_alignment = {desktop:'center', tablet_h:'center', tablet_v:'center', mobile:'center'};
        tempObj.size = '16';
        tempObj.weight = {num: 'normal', val: 500};
        tempObj.content.children.label.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS 
        }
        tempObj.content.children.label.style.desktop['width'] = '100%';
        tempObj.size = '14';
        tempObj.weight = {num: 'normal', val: 500};
        tempObj.content.children.input.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.input.style.desktop['border'] = '2px solid #e0e0e0';
        tempObj.content.children.input.style.desktop['border-radius'] = '4px';
        tempObj.content.children.input.style.desktop['width'] = '100%';
        tempObj.content.children.input.style.desktop['padding'] = '4px 8px';
        tempObj.button_child = true;
        tempObj.content.children.button.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
        tempObj.content.children.button.style.desktop['margin'] = '0px';
        delete tempObj.button_child;
        delete tempObj.size;
        delete tempObj.weight;
      }
      else if (element.name == 'form' || element.name == 'divider') {
        respS = { 'width': '100%' };
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
        if (element.name == 'menu') tempObj.content.item.style.dropdown = eleS;
        delete tempObj.itemstyle;
      }
      if (element.form || element.email) return tempObj;
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

