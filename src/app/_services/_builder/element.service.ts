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
        iframe: '<iframe width="560" height="315" src="http://localhost:4200/assets/videos/movie.mp4" title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        src: 'http://localhost:4200/assets/videos/movie.mp4',
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
    // divider
    divider: { content: { name: 'divider' }, iconCls: 'fas fa-minus' },
    // divider
    // form
    form: { content: { name: 'iframe', type: 'form', src: '', height: '' }, iconCls: 'fab fa-wpforms' },
    // form
    // code block
    code: { content: { name: 'code', html: `` }, iconCls: 'fas fa-code' },
    // code block
    // icon
    icon: { content: { name: 'icon', icon_html: `<i class="fa-solid fa-icons"></i>`, size: 18 }, iconCls: 'fa-solid fa-icons' },
    // icon
    // checkout form
    // append
    // checkout form
  };
  preMenuItems: any = ['Home', 'About', 'Blog', 'Contact'];
  defaultIcons: any = [
    { title: 'facebook', name: 'fa-brands fa-facebook', type: 'brand' },
    { title: 'facebook messenger', name: 'fa-brands fa-facebook-messenger', type: 'brand' },
    { title: 'facebook f', name: 'fa-brands fa-facebook-f', type: 'brand' },
    { title: 'square facebook', name: 'fa-brands fa-square-facebook', type: 'brand' },
    { title: 'instagram', name: 'fa-brands fa-instagram', type: 'brand' },
    { title: 'square instagram', name: 'fa-brands fa-square-instagram', type: 'brand' },
    { title: 'twitter', name: 'fa-brands fa-twitter', type: 'brand' },
    { title: 'square twitter', name: 'fa-brands fa-square-twitter', type: 'brand' },
    { title: 'skype', name: 'fa-brands fa-skype', type: 'brand' },
    { title: 'linkedin', name: 'fa-brands fa-linkedin', type: 'brand' },
    { title: 'linkedin in', name: 'fa-brands fa-linkedin-in', type: 'brand' },
    { title: 'cc visa', name: 'fa-brands fa-cc-visa', type: 'brand' },
    { title: 'cc mastercard', name: 'fa-brands fa-cc-mastercard', type: 'brand' },
    { title: 'cc stripe', name: 'fa-brands fa-cc-stripe', type: 'brand' },
    { title: 'cc paypal', name: 'fa-brands fa-cc-paypal', type: 'brand' },
    { title: 'cc jcb', name: 'fa-brands fa-cc-jcb', type: 'brand' },
    { title: 'cc amazon-pay', name: 'fa-brands fa-cc-amazon-pay', type: 'brand' },
    { title: 'accessible icon', name: 'fa-brands fa-accessible-icon', type: 'brand' },
    { title: 'uber', name: 'fa-brands fa-uber', type: 'brand' },
    { title: 'aws', name: 'fa-brands fa-aws', type: 'brand' },
    { title: 'servicestack', name: 'fa-brands fa-servicestack', type: 'brand' },
    { title: 'tiktok', name: 'fa-brands fa-tiktok', type: 'brand' },
    { title: 'discord', name: 'fa-brands fa-discord', type: 'brand' },
    { title: 'youtube', name: 'fa-brands fa-youtube', type: 'brand' },
    { title: 'github', name: 'fa-brands fa-github', type: 'brand' },
    { title: 'wordpress', name: 'fa-brands fa-wordpress', type: 'brand' },
    { title: 'docker', name: 'fa-brands fa-docker', type: 'brand' },
    { title: 'apple', name: 'fa-brands fa-apple', type: 'brand' },
    { title: 'google', name: 'fa-brands fa-google', type: 'brand' },
    { title: 'windows', name: 'fa-brands fa-windows', type: 'brand' },
    { title: 'paypal', name: 'fa-brands fa-paypal', type: 'brand' },
    { title: 'dropbox', name: 'fa-brands fa-dropbox', type: 'brand' },
    { title: 'squarespace', name: 'fa-brands fa-squarespace', type: 'brand' },
    { title: 'android', name: 'fa-brands fa-android', type: 'brand' },
    { title: 'shopify', name: 'fa-brands fa-shopify', type: 'brand' },
    { title: 'medium', name: 'fa-brands fa-medium', type: 'brand' },
    { title: 'codepen', name: 'fa-brands fa-codepen', type: 'brand' },
    { title: 'cloudflare', name: 'fa-brands fa-cloudflare', type: 'brand' },
    { title: 'whatsapp', name: 'fa-brands fa-whatsapp', type: 'brand' },
    { title: 'intercom', name: 'fa-brands fa-intercom', type: 'brand' },
    { title: 'internet explorer', name: 'fa-brands fa-internet-explorer', type: 'brand' },
    { title: 'telegram', name: 'fa-brands fa-telegram', type: 'brand' },
    { title: 'readme', name: 'fa-brands fa-readme', type: 'brand' },
    { title: 'wikipedia w', name: 'fa-brands fa-wikipedia-w', type: 'brand' },
    { title: 'java', name: 'fa-brands fa-java', type: 'brand' },
    { title: 'linux', name: 'fa-brands fa-linux', type: 'brand' },
    { title: 'rebel', name: 'fa-brands fa-rebel', type: 'brand' },
    { title: 'elementor', name: 'fa-brands fa-elementor', type: 'brand' },
    { title: 'untappd', name: 'fa-brands fa-untappd', type: 'brand' },
    { title: 'uikit', name: 'fa-brands fa-uikit', type: 'brand' },
    { title: 'unity', name: 'fa-brands fa-unity', type: 'brand' },
    { title: 'sketch', name: 'fa-brands fa-sketch', type: 'brand' },
    { title: 'sitrox', name: 'fa-brands fa-sitrox', type: 'brand' },
    { title: 'sellcast', name: 'fa-brands fa-sellcast', type: 'brand' },
    { title: 'rev', name: 'fa-brands fa-rev', type: 'brand' },
    { title: 'renren', name: 'fa-brands fa-renren', type: 'brand' },
    { title: 'pix', name: 'fa-brands fa-pix', type: 'brand' },
    { title: 'pushed', name: 'fa-brands fa-pushed', type: 'brand' },
    { title: 'osi', name: 'fa-brands fa-osi', type: 'brand' },
    { title: 'orcid', name: 'fa-brands fa-orcid', type: 'brand' },
    { title: 'odysee', name: 'fa-brands fa-odysee', type: 'brand' },
    { title: 'opera', name: 'fa-brands fa-opera', type: 'brand' },
    { title: 'opencart', name: 'fa-brands fa-opencart', type: 'brand' },
    { title: 'mix', name: 'fa-brands fa-mix', type: 'brand' },
    { title: 'meta', name: 'fa-brands fa-meta', type: 'brand' },
    { title: 'magento', name: 'fa-brands fa-magento', type: 'brand' },
    { title: 'korvue', name: 'fa-brands fa-korvue', type: 'brand' },
    { title: 'jenkins', name: 'fa-brands fa-jenkins', type: 'brand' },
    { title: 'jira', name: 'fa-brands fa-jira', type: 'brand' },
    { title: 'jsfiddle', name: 'fa-brands fa-jsfiddle', type: 'brand' },
    { title: 'itunes note', name: 'fa-brands fa-itunes-note', type: 'brand' },
    { title: 'keycdn', name: 'fa-brands fa-keycdn', type: 'brand' },
    { title: 'mizuni', name: 'fa-brands fa-mizuni', type: 'brand' },
    { title: 'megaport', name: 'fa-brands fa-megaport', type: 'brand' },
    { title: 'mendeley', name: 'fa-brands fa-mendeley', type: 'brand' },
    { title: 'lyft', name: 'fa-brands fa-lyft', type: 'brand' },
    { title: 'lastfm', name: 'fa-brands fa-lastfm', type: 'brand' },
    { title: 'less', name: 'fa-brands fa-less', type: 'brand' },
    { title: 'keybase', name: 'fa-brands fa-keybase', type: 'brand' },
    { title: 'kaggle', name: 'fa-brands fa-kaggle', type: 'brand' },
    { title: 'js', name: 'fa-brands fa-js', type: 'brand' },
    { title: 'joomla', name: 'fa-brands fa-joomla', type: 'brand' },
    { title: 'itch io', name: 'fa-brands fa-itch-io', type: 'brand' },
    { title: 'jedi order', name: 'fa-brands fa-jedi-order', type: 'brand' },
    { title: 'address book', name: 'fa-regular fa-address-book', type: 'regular' },
    { title: 'address card', name: 'fa-regular fa-address-card', type: 'regular' },
    { title: 'bell', name: 'fa-regular fa-bell', type: 'regular' },
    { title: 'bookmark', name: 'fa-regular fa-bookmark', type: 'regular' },
    { title: 'building', name: 'fa-regular fa-building', type: 'regular' },
    { title: 'circle user', name: 'fa-regular fa-circle-user', type: 'regular' },
    { title: 'clipboard', name: 'fa-regular fa-clipboard', type: 'regular' },
    { title: 'comment', name: 'fa-regular fa-comment', type: 'regular' },
    { title: 'comments', name: 'fa-regular fa-comments', type: 'regular' },
    { title: 'compass', name: 'fa-regular fa-compass', type: 'regular' },
    { title: 'envelope', name: 'fa-regular fa-envelope', type: 'regular' },
    { title: 'eye', name: 'fa-regular fa-eye', type: 'regular' },
    { title: 'face smile', name: 'fa-regular fa-face-smile', type: 'regular' },
    { title: 'file', name: 'fa-regular fa-file', type: 'regular' },
    { title: 'file excel', name: 'fa-regular fa-file-excel', type: 'regular' },
    { title: 'file pdf', name: 'fa-regular fa-file-pdf', type: 'regular' },
    { title: 'file powerpoint', name: 'fa-regular fa-file-powerpoint', type: 'regular' },
    { title: 'folder', name: 'fa-regular fa-folder', type: 'regular' },
    { title: 'folder open', name: 'fa-regular fa-folder-open', type: 'regular' },
    { title: 'hand', name: 'fa-regular fa-hand', type: 'regular' },
    { title: 'handshake', name: 'fa-regular fa-handshake', type: 'regular' },
    { title: 'hashtag', name: 'fa-regular fa-hashtag', type: 'regular' },
    { title: 'heart', name: 'fa-regular fa-heart', type: 'regular' },
    { title: 'id card', name: 'fa-regular fa-id-card', type: 'regular' },
    { title: 'image', name: 'fa-regular fa-image', type: 'regular' },
    { title: 'lightbulb', name: 'fa-regular fa-lightbulb', type: 'regular' },
    { title: 'map', name: 'fa-regular fa-map', type: 'regular' },
    { title: 'message', name: 'fa-regular fa-message', type: 'regular' },
    { title: 'newspaper', name: 'fa-regular fa-newspaper', type: 'regular' },
    { title: 'paper plane', name: 'fa-regular fa-paper-plane', type: 'regular' },
    { title: 'q', name: 'fa-regular fa-q', type: 'regular' },
    { title: 'question', name: 'fa-regular fa-question', type: 'regular' },
    { title: 'snowflake', name: 'fa-regular fa-snowflake', type: 'regular' },
    { title: 'star', name: 'fa-regular fa-star', type: 'regular' },
    { title: 'sun', name: 'fa-regular fa-sun', type: 'regular' },
    { title: 'thumbs down', name: 'fa-regular fa-thumbs-down', type: 'regular' },
    { title: 'thumbs up', name: 'fa-regular fa-thumbs-up', type: 'regular' },
    { title: 'trash can', name: 'fa-regular fa-trash-can', type: 'regular' },
    { title: 'user', name: 'fa-regular fa-user', type: 'regular' },
    { title: 'address book', name: 'fa-solid fa-address-book', type: 'solid' },
    { title: 'address card', name: 'fa-solid fa-address-card', type: 'solid' },
    { title: 'anchor', name: 'fa-solid fa-anchor', type: 'solid' },
    { title: 'arrow down', name: 'fa-solid fa-arrow-down', type: 'solid' },
    { title: 'arrow left', name: 'fa-solid fa-arrow-left', type: 'solid' },
    { title: 'arrow pointer', name: 'fa-solid fa-arrow-pointer', type: 'solid' },
    { title: 'arrow right', name: 'fa-solid fa-arrow-right', type: 'solid' },
    { title: 'arrow rotate-right', name: 'fa-solid fa-arrow-rotate-right', type: 'solid' },
    { title: 'arrow up', name: 'fa-solid fa-arrow-up', type: 'solid' },
    { title: 'arrow up-from-bracket', name: 'fa-solid fa-arrow-up-from-bracket', type: 'solid' },
    { title: 'award', name: 'fa-solid fa-award', type: 'solid' },
    { title: 'baby', name: 'fa-solid fa-baby', type: 'solid' },
    { title: 'bag shopping', name: 'fa-solid fa-bag-shopping', type: 'solid' },
    { title: 'barcode', name: 'fa-solid fa-barcode', type: 'solid' },
    { title: 'bars', name: 'fa-solid fa-bars', type: 'solid' },
    { title: 'bath', name: 'fa-solid fa-bath', type: 'solid' },
    { title: 'battery full', name: 'fa-solid fa-battery-full', type: 'solid' },
    { title: 'bell', name: 'fa-solid fa-bell', type: 'solid' },
    { title: 'bell concierge', name: 'fa-solid fa-bell-concierge', type: 'solid' },
    { title: 'bicycle', name: 'fa-solid fa-bicycle', type: 'solid' },
    { title: 'bolt', name: 'fa-solid fa-bolt', type: 'solid' },
    { title: 'bolt lightning', name: 'fa-solid fa-bolt-lightning', type: 'solid' },
    { title: 'bone', name: 'fa-solid fa-bone', type: 'solid' },
    { title: 'book', name: 'fa-solid fa-book', type: 'solid' },
    { title: 'bookmark', name: 'fa-solid fa-bookmark', type: 'solid' },
    { title: 'brain', name: 'fa-solid fa-brain', type: 'solid' },
    { title: 'briefcase', name: 'fa-solid fa-briefcase', type: 'solid' },
    { title: 'brush', name: 'fa-solid fa-brush', type: 'solid' },
    { title: 'bug', name: 'fa-solid fa-bug', type: 'solid' },
    { title: 'building', name: 'fa-solid fa-building', type: 'solid' },
    { title: 'building user', name: 'fa-solid fa-building-user', type: 'solid' },
    { title: 'burger', name: 'fa-solid fa-burger', type: 'solid' },
    { title: 'bus', name: 'fa-solid fa-bus', type: 'solid' },
    { title: 'cable car', name: 'fa-solid fa-cable-car', type: 'solid' },
    { title: 'calculator', name: 'fa-solid fa-calculator', type: 'solid' },
    { title: 'camera', name: 'fa-solid fa-camera', type: 'solid' },
    { title: 'car', name: 'fa-solid fa-car', type: 'solid' },
    { title: 'car side', name: 'fa-solid fa-car-side', type: 'solid' },
    { title: 'cart shopping', name: 'fa-solid fa-cart-shopping', type: 'solid' },
    { title: 'certificate', name: 'fa-solid fa-certificate', type: 'solid' },
    { title: 'chair', name: 'fa-solid fa-chair', type: 'solid' },
    { title: 'chalkboard user', name: 'fa-solid fa-chalkboard-user', type: 'solid' },
    { title: 'chart simple', name: 'fa-solid fa-chart-simple', type: 'solid' },
    { title: 'check double', name: 'fa-solid fa-check-double', type: 'solid' },
    { title: 'child', name: 'fa-solid fa-child', type: 'solid' },
    { title: 'child reaching', name: 'fa-solid fa-child-reaching', type: 'solid' },
    { title: 'children', name: 'fa-solid fa-children', type: 'solid' },
    { title: 'church', name: 'fa-solid fa-church', type: 'solid' },
    { title: 'circle user', name: 'fa-solid fa-circle-user', type: 'solid' },
    { title: 'city', name: 'fa-solid fa-city', type: 'solid' },
    { title: 'clapperboard', name: 'fa-solid fa-clapperboard', type: 'solid' },
    { title: 'clipboard', name: 'fa-solid fa-clipboard', type: 'solid' },
    { title: 'clipboard user', name: 'fa-solid fa-clipboard-user', type: 'solid' },
    { title: 'cloud', name: 'fa-solid fa-cloud', type: 'solid' },
    { title: 'code compare', name: 'fa-solid fa-code-compare', type: 'solid' },
    { title: 'comment', name: 'fa-solid fa-comment', type: 'solid' },
    { title: 'comments', name: 'fa-solid fa-comments', type: 'regular' },
    { title: 'comments', name: 'fa-solid fa-comments', type: 'solid' },
    { title: 'comment sms', name: 'fa-solid fa-comment-sms', type: 'solid' },
    { title: 'compass', name: 'fa-solid fa-compass', type: 'solid' },
    { title: 'computer', name: 'fa-solid fa-computer', type: 'solid' },
    { title: 'computer mouse', name: 'fa-solid fa-computer-mouse', type: 'solid' },
    { title: 'desktop', name: 'fa-solid fa-desktop', type: 'solid' },
    { title: 'diamond', name: 'fa-solid fa-diamond', type: 'solid' },
    { title: 'dragon', name: 'fa-solid fa-dragon', type: 'solid' },
    { title: 'droplet', name: 'fa-solid fa-droplet', type: 'solid' },
    { title: 'egg', name: 'fa-solid fa-egg', type: 'solid' },
    { title: 'envelope', name: 'fa-solid fa-envelope', type: 'solid' },
    { title: 'expand', name: 'fa-solid fa-expand', type: 'solid' },
    { title: 'eye', name: 'fa-solid fa-eye', type: 'solid' },
    { title: 'face smile', name: 'fa-solid fa-face-smile', type: 'solid' },
    { title: 'feather', name: 'fa-solid fa-feather', type: 'solid' },
    { title: 'file', name: 'fa-solid fa-file', type: 'solid' },
    { title: 'file excel', name: 'fa-solid fa-file-excel', type: 'solid' },
    { title: 'file pdf', name: 'fa-solid fa-file-pdf', type: 'solid' },
    { title: 'file pen', name: 'fa-solid fa-file-pen', type: 'solid' },
    { title: 'file powerpoint', name: 'fa-solid fa-file-powerpoint', type: 'solid' },
    { title: 'file prescription', name: 'fa-solid fa-file-prescription', type: 'solid' },
    { title: 'fill', name: 'fa-solid fa-fill', type: 'solid' },
    { title: 'film', name: 'fa-solid fa-film', type: 'solid' },
    { title: 'filter', name: 'fa-solid fa-filter', type: 'solid' },
    { title: 'fingerprint', name: 'fa-solid fa-fingerprint', type: 'solid' },
    { title: 'fire', name: 'fa-solid fa-fire', type: 'solid' },
    { title: 'flask', name: 'fa-solid fa-flask', type: 'solid' },
    { title: 'folder', name: 'fa-solid fa-folder', type: 'solid' },
    { title: 'folder open', name: 'fa-solid fa-folder-open', type: 'solid' },
    { title: 'gamepad', name: 'fa-solid fa-gamepad', type: 'solid' },
    { title: 'gear', name: 'fa-solid fa-gear', type: 'solid' },
    { title: 'gears', name: 'fa-solid fa-gears', type: 'solid' },
    { title: 'ghost', name: 'fa-solid fa-ghost', type: 'solid' },
    { title: 'gift', name: 'fa-solid fa-gift', type: 'solid' },
    { title: 'globe', name: 'fa-solid fa-globe', type: 'solid' },
    { title: 'graduation cap', name: 'fa-solid fa-graduation-cap', type: 'solid' },
    { title: 'gun', name: 'fa-solid fa-gun', type: 'solid' },
    { title: 'hammer', name: 'fa-solid fa-hammer', type: 'solid' },
    { title: 'hand', name: 'fa-solid fa-hand', type: 'solid' },
    { title: 'hands', name: 'fa-solid fa-hands', type: 'solid' },
    { title: 'handshake', name: 'fa-solid fa-handshake', type: 'solid' },
    { title: 'hashtag', name: 'fa-solid fa-hashtag', type: 'solid' },
    { title: 'heading', name: 'fa-solid fa-heading', type: 'solid' },
    { title: 'headphones', name: 'fa-solid fa-headphones', type: 'solid' },
    { title: 'head side-virus', name: 'fa-solid fa-head-side-virus', type: 'solid' },
    { title: 'heart', name: 'fa-solid fa-heart', type: 'solid' },
    { title: 'helicopter', name: 'fa-solid fa-helicopter', type: 'solid' },
    { title: 'helicopter symbol', name: 'fa-solid fa-helicopter-symbol', type: 'solid' },
    { title: 'hospital user', name: 'fa-solid fa-hospital-user', type: 'solid' },
    { title: 'hotel', name: 'fa-solid fa-hotel', type: 'solid' },
    { title: 'house', name: 'fa-solid fa-house', type: 'solid' },
    { title: 'house chimney-user', name: 'fa-solid fa-house-chimney-user', type: 'solid' },
    { title: 'house flag', name: 'fa-solid fa-house-flag', type: 'solid' },
    { title: 'house lock', name: 'fa-solid fa-house-lock', type: 'solid' },
    { title: 'house signal', name: 'fa-solid fa-house-signal', type: 'solid' },
    { title: 'house user', name: 'fa-solid fa-house-user', type: 'solid' },
    { title: 'icons', name: 'fa-solid fa-icons', type: 'solid' },
    { title: 'id card', name: 'fa-solid fa-id-card', type: 'solid' },
    { title: 'image', name: 'fa-solid fa-image', type: 'solid' },
    { title: 'industry', name: 'fa-solid fa-industry', type: 'solid' },
    { title: 'info', name: 'fa-solid fa-info', type: 'solid' },
    { title: 'jar', name: 'fa-solid fa-jar', type: 'solid' },
    { title: 'joint', name: 'fa-solid fa-joint', type: 'solid' },
    { title: 'key', name: 'fa-solid fa-key', type: 'solid' },
    { title: 'landmark', name: 'fa-solid fa-landmark', type: 'solid' },
    { title: 'language', name: 'fa-solid fa-language', type: 'solid' },
    { title: 'laptop', name: 'fa-solid fa-laptop', type: 'solid' },
    { title: 'laptop code', name: 'fa-solid fa-laptop-code', type: 'solid' },
    { title: 'layer group', name: 'fa-solid fa-layer-group', type: 'solid' },
    { title: 'lightbulb', name: 'fa-solid fa-lightbulb', type: 'solid' },
    { title: 'link', name: 'fa-solid fa-link', type: 'solid' },
    { title: 'location arrow', name: 'fa-solid fa-location-arrow', type: 'solid' },
    { title: 'location crosshairs', name: 'fa-solid fa-location-crosshairs', type: 'solid' },
    { title: 'location dot', name: 'fa-solid fa-location-dot', type: 'solid' },
    { title: 'location pin', name: 'fa-solid fa-location-pin', type: 'solid' },
    { title: 'location pin-lock', name: 'fa-solid fa-location-pin-lock', type: 'solid' },
    { title: 'lock', name: 'fa-solid fa-lock', type: 'solid' },
    { title: 'magnet', name: 'fa-solid fa-magnet', type: 'solid' },
    { title: 'map', name: 'fa-solid fa-map', type: 'solid' },
    { title: 'map pin', name: 'fa-solid fa-map-pin', type: 'solid' },
    { title: 'marker', name: 'fa-solid fa-marker', type: 'solid' },
    { title: 'mask face', name: 'fa-solid fa-mask-face', type: 'solid' },
    { title: 'memory', name: 'fa-solid fa-memory', type: 'solid' },
    { title: 'mercury', name: 'fa-solid fa-mercury', type: 'solid' },
    { title: 'message', name: 'fa-solid fa-message', type: 'solid' },
    { title: 'microchip', name: 'fa-solid fa-microchip', type: 'solid' },
    { title: 'microphone', name: 'fa-solid fa-microphone', type: 'solid' },
    { title: 'microphone slash', name: 'fa-solid fa-microphone-slash', type: 'solid' },
    { title: 'mobile', name: 'fa-solid fa-mobile', type: 'solid' },
    { title: 'motorcycle', name: 'fa-solid fa-motorcycle', type: 'solid' },
    { title: 'mountain', name: 'fa-solid fa-mountain', type: 'solid' },
    { title: 'mug saucer', name: 'fa-solid fa-mug-saucer', type: 'solid' },
    { title: 'music', name: 'fa-solid fa-music', type: 'solid' },
    { title: 'oil can', name: 'fa-solid fa-oil-can', type: 'solid' },
    { title: 'pager', name: 'fa-solid fa-pager', type: 'solid' },
    { title: 'paint roller', name: 'fa-solid fa-paint-roller', type: 'solid' },
    { title: 'palette', name: 'fa-solid fa-palette', type: 'solid' },
    { title: 'pallet', name: 'fa-solid fa-pallet', type: 'solid' },
    { title: 'panorama', name: 'fa-solid fa-panorama', type: 'solid' },
    { title: 'paperclip', name: 'fa-solid fa-paperclip', type: 'solid' },
    { title: 'paragraph', name: 'fa-solid fa-paragraph', type: 'solid' },
    { title: 'passport', name: 'fa-solid fa-passport', type: 'solid' },
    { title: 'pause', name: 'fa-solid fa-pause', type: 'solid' },
    { title: 'paw', name: 'fa-solid fa-paw', type: 'solid' },
    { title: 'peace', name: 'fa-solid fa-peace', type: 'solid' },
    { title: 'pen', name: 'fa-solid fa-pen', type: 'solid' },
    { title: 'pencil', name: 'fa-solid fa-pencil', type: 'solid' },
    { title: 'pen nib', name: 'fa-solid fa-pen-nib', type: 'solid' },
    { title: 'people arrows', name: 'fa-solid fa-people-arrows', type: 'solid' },
    { title: 'people carry-box', name: 'fa-solid fa-people-carry-box', type: 'solid' },
    { title: 'people group', name: 'fa-solid fa-people-group', type: 'solid' },
    { title: 'people roof', name: 'fa-solid fa-people-roof', type: 'solid' },
    { title: 'person', name: 'fa-solid fa-person', type: 'solid' },
    { title: 'person biking', name: 'fa-solid fa-person-biking', type: 'solid' },
    { title: 'person dress', name: 'fa-solid fa-person-dress', type: 'solid' },
    { title: 'person drowning', name: 'fa-solid fa-person-drowning', type: 'solid' },
    { title: 'person hiking', name: 'fa-solid fa-person-hiking', type: 'solid' },
    { title: 'person praying', name: 'fa-solid fa-person-praying', type: 'solid' },
    { title: 'person pregnant', name: 'fa-solid fa-person-pregnant', type: 'solid' },
    { title: 'person running', name: 'fa-solid fa-person-running', type: 'solid' },
    { title: 'person shelter', name: 'fa-solid fa-person-shelter', type: 'solid' },
    { title: 'person swimming', name: 'fa-solid fa-person-swimming', type: 'solid' },
    { title: 'person walking', name: 'fa-solid fa-person-walking', type: 'solid' },
    { title: 'person walking-luggage', name: 'fa-solid fa-person-walking-luggage', type: 'solid' },
    { title: 'person walking-with-cane', name: 'fa-solid fa-person-walking-with-cane', type: 'solid' },
    { title: 'phone', name: 'fa-solid fa-phone', type: 'solid' },
    { title: 'phone volume', name: 'fa-solid fa-phone-volume', type: 'solid' },
    { title: 'pizza slice', name: 'fa-solid fa-pizza-slice', type: 'solid' },
    { title: 'plane', name: 'fa-solid fa-plane', type: 'solid' },
    { title: 'play', name: 'fa-solid fa-play', type: 'solid' },
    { title: 'plug', name: 'fa-solid fa-plug', type: 'solid' },
    { title: 'podcast', name: 'fa-solid fa-podcast', type: 'solid' },
    { title: 'poo', name: 'fa-solid fa-poo', type: 'solid' },
    { title: 'power off', name: 'fa-solid fa-power-off', type: 'solid' },
    { title: 'prescription', name: 'fa-solid fa-prescription', type: 'solid' },
    { title: 'print', name: 'fa-solid fa-print', type: 'solid' },
    { title: 'q', name: 'fa-solid fa-q', type: 'solid' },
    { title: 'question', name: 'fa-solid fa-question', type: 'solid' },
    { title: 'quote left', name: 'fa-solid fa-quote-left', type: 'solid' },
    { title: 'radio', name: 'fa-solid fa-radio', type: 'solid' },
    { title: 'rainbow', name: 'fa-solid fa-rainbow', type: 'solid' },
    { title: 'recycle', name: 'fa-solid fa-recycle', type: 'solid' },
    { title: 'reply', name: 'fa-solid fa-reply', type: 'solid' },
    { title: 'restroom', name: 'fa-solid fa-restroom', type: 'solid' },
    { title: 'ribbon', name: 'fa-solid fa-ribbon', type: 'solid' },
    { title: 'road', name: 'fa-solid fa-road', type: 'solid' },
    { title: 'road barrier', name: 'fa-solid fa-road-barrier', type: 'solid' },
    { title: 'rocket', name: 'fa-solid fa-rocket', type: 'solid' },
    { title: 'route', name: 'fa-solid fa-route', type: 'solid' },
    { title: 'rss', name: 'fa-solid fa-rss', type: 'solid' },
    { title: 'rug', name: 'fa-solid fa-rug', type: 'solid' },
    { title: 'sailboat', name: 'fa-solid fa-sailboat', type: 'solid' },
    { title: 'scissors', name: 'fa-solid fa-scissors', type: 'solid' },
    { title: 'server', name: 'fa-solid fa-server', type: 'solid' },
    { title: 'shapes', name: 'fa-solid fa-shapes', type: 'solid' },
    { title: 'share', name: 'fa-solid fa-share', type: 'solid' },
    { title: 'share nodes', name: 'fa-solid fa-share-nodes', type: 'solid' },
    { title: 'sheet plastic', name: 'fa-solid fa-sheet-plastic', type: 'solid' },
    { title: 'shield', name: 'fa-solid fa-shield', type: 'solid' },
    { title: 'ship', name: 'fa-solid fa-ship', type: 'solid' },
    { title: 'shirt', name: 'fa-solid fa-shirt', type: 'solid' },
    { title: 'shoe prints', name: 'fa-solid fa-shoe-prints', type: 'solid' },
    { title: 'shop', name: 'fa-solid fa-shop', type: 'solid' },
    { title: 'shower', name: 'fa-solid fa-shower', type: 'solid' },
    { title: 'signal', name: 'fa-solid fa-signal', type: 'solid' },
    { title: 'signature', name: 'fa-solid fa-signature', type: 'solid' },
    { title: 'skull', name: 'fa-solid fa-skull', type: 'solid' },
    { title: 'skull crossbones', name: 'fa-solid fa-skull-crossbones', type: 'solid' },
    { title: 'sliders', name: 'fa-solid fa-sliders', type: 'solid' },
    { title: 'smoking', name: 'fa-solid fa-smoking', type: 'solid' },
    { title: 'snowflake', name: 'fa-solid fa-snowflake', type: 'solid' },
    { title: 'snowman', name: 'fa-solid fa-snowman', type: 'solid' },
    { title: 'socks', name: 'fa-solid fa-socks', type: 'solid' },
    { title: 'spa', name: 'fa-solid fa-spa', type: 'solid' },
    { title: 'spinner', name: 'fa-solid fa-spinner', type: 'solid' },
    { title: 'spoon', name: 'fa-solid fa-spoon', type: 'solid' },
    { title: 'staff snake', name: 'fa-solid fa-staff-snake', type: 'solid' },
    { title: 'stairs', name: 'fa-solid fa-stairs', type: 'solid' },
    { title: 'stamp', name: 'fa-solid fa-stamp', type: 'solid' },
    { title: 'stapler', name: 'fa-solid fa-stapler', type: 'solid' },
    { title: 'star', name: 'fa-solid fa-star', type: 'solid' },
    { title: 'stethoscope', name: 'fa-solid fa-stethoscope', type: 'solid' },
    { title: 'stopwatch', name: 'fa-solid fa-stopwatch', type: 'solid' },
    { title: 'store', name: 'fa-solid fa-store', type: 'solid' },
    { title: 'street view', name: 'fa-solid fa-street-view', type: 'solid' },
    { title: 'suitcase', name: 'fa-solid fa-suitcase', type: 'solid' },
    { title: 'sun', name: 'fa-solid fa-sun', type: 'solid' },
    { title: 'tag', name: 'fa-solid fa-tag', type: 'solid' },
    { title: 'tarp', name: 'fa-solid fa-tarp', type: 'solid' },
    { title: 'taxi', name: 'fa-solid fa-taxi', type: 'solid' },
    { title: 'teeth', name: 'fa-solid fa-teeth', type: 'solid' },
    { title: 'tent', name: 'fa-solid fa-tent', type: 'solid' },
    { title: 'thumbs down', name: 'fa-solid fa-thumbs-down', type: 'solid' },
    { title: 'thumbs up', name: 'fa-solid fa-thumbs-up', type: 'solid' },
    { title: 'thumbtack', name: 'fa-solid fa-thumbtack', type: 'solid' },
    { title: 'timeline', name: 'fa-solid fa-timeline', type: 'solid' },
    { title: 'toggle on', name: 'fa-solid fa-toggle-on', type: 'solid' },
    { title: 'tooth', name: 'fa-solid fa-tooth', type: 'solid' },
    { title: 'tower broadcast', name: 'fa-solid fa-tower-broadcast', type: 'solid' },
    { title: 'tower cell', name: 'fa-solid fa-tower-cell', type: 'solid' },
    { title: 'tower observation', name: 'fa-solid fa-tower-observation', type: 'solid' },
    { title: 'train', name: 'fa-solid fa-train', type: 'solid' },
    { title: 'trash', name: 'fa-solid fa-trash', type: 'solid' },
    { title: 'trash can', name: 'fa-solid fa-trash-can', type: 'solid' },
    { title: 'tree', name: 'fa-solid fa-tree', type: 'solid' },
    { title: 'trophy', name: 'fa-solid fa-trophy', type: 'solid' },
    { title: 'truck', name: 'fa-solid fa-truck', type: 'solid' },
    { title: 'truck moving', name: 'fa-solid fa-truck-moving', type: 'solid' },
    { title: 'tv', name: 'fa-solid fa-tv', type: 'solid' },
    { title: 'umbrella', name: 'fa-solid fa-umbrella', type: 'solid' },
    { title: 'universal access', name: 'fa-solid fa-universal-access', type: 'solid' },
    { title: 'upload', name: 'fa-solid fa-upload', type: 'solid' },
    { title: 'user', name: 'fa-solid fa-user', type: 'solid' },
    { title: 'user astronaut', name: 'fa-solid fa-user-astronaut', type: 'solid' },
    { title: 'user check', name: 'fa-solid fa-user-check', type: 'solid' },
    { title: 'user clock', name: 'fa-solid fa-user-clock', type: 'solid' },
    { title: 'user doctor', name: 'fa-solid fa-user-doctor', type: 'solid' },
    { title: 'user gear', name: 'fa-solid fa-user-gear', type: 'solid' },
    { title: 'user graduate', name: 'fa-solid fa-user-graduate', type: 'solid' },
    { title: 'user group', name: 'fa-solid fa-user-group', type: 'solid' },
    { title: 'user minus', name: 'fa-solid fa-user-minus', type: 'solid' },
    { title: 'user ninja', name: 'fa-solid fa-user-ninja', type: 'solid' },
    { title: 'user nurse', name: 'fa-solid fa-user-nurse', type: 'solid' },
    { title: 'user pen', name: 'fa-solid fa-user-pen', type: 'solid' },
    { title: 'user plus', name: 'fa-solid fa-user-plus', type: 'solid' },
    { title: 'users', name: 'fa-solid fa-users', type: 'solid' },
    { title: 'users between-lines', name: 'fa-solid fa-users-between-lines', type: 'solid' },
    { title: 'user secret', name: 'fa-solid fa-user-secret', type: 'solid' },
    { title: 'users gear', name: 'fa-solid fa-users-gear', type: 'solid' },
    { title: 'user shield', name: 'fa-solid fa-user-shield', type: 'solid' },
    { title: 'user slash', name: 'fa-solid fa-user-slash', type: 'solid' },
    { title: 'users line', name: 'fa-solid fa-users-line', type: 'solid' },
    { title: 'users rays', name: 'fa-solid fa-users-rays', type: 'solid' },
    { title: 'users rectangle', name: 'fa-solid fa-users-rectangle', type: 'solid' },
    { title: 'users slash', name: 'fa-solid fa-users-slash', type: 'solid' },
    { title: 'users viewfinder', name: 'fa-solid fa-users-viewfinder', type: 'solid' },
    { title: 'user tag', name: 'fa-solid fa-user-tag', type: 'solid' },
    { title: 'user tie', name: 'fa-solid fa-user-tie', type: 'solid' },
    { title: 'user xmark', name: 'fa-solid fa-user-xmark', type: 'solid' },
    { title: 'vials', name: 'fa-solid fa-vials', type: 'solid' },
    { title: 'video', name: 'fa-solid fa-video', type: 'solid' },
    { title: 'viruses', name: 'fa-solid fa-viruses', type: 'solid' },
    { title: 'wallet', name: 'fa-solid fa-wallet', type: 'solid' },
    { title: 'warehouse', name: 'fa-solid fa-warehouse', type: 'solid' },
    { title: 'water', name: 'fa-solid fa-water', type: 'solid' },
    { title: 'wheelchair', name: 'fa-solid fa-wheelchair', type: 'solid' },
    { title: 'wifi', name: 'fa-solid fa-wifi', type: 'solid' },
    { title: 'wrench', name: 'fa-solid fa-wrench', type: 'solid' },
    { title: 'person digging', name: 'fa-solid fa-person-digging', type: 'solid' },
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

  constructor(private _general: GeneralService, 
    private _style: StyleService, 
    private _section: SectionService) {
  }

  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  setIcon(icon: any) {
    return '<i class="' + icon.name + '"></i>';
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

