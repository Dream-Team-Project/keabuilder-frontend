function detectBrowser() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';//crap
    } else {
        return 'Unknown';
    }
} 

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
}

function getDevice(){
    var innerwidth = window.innerWidth;
    var device = 'Desktop';
    if(innerwidth<=768){
        device = 'Tablet';
    }else if(innerwidth<=500){
        device = 'Mobile';
    }

    return device;
}

function dateComponentPad(value) {
    var format = String(value);
  
    return format.length < 2 ? '0' + format : format;
}
  
function formatDate(date) {
var datePart = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].map(dateComponentPad);
var timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(dateComponentPad);

return datePart.join('-') + ' ' + timePart.join(':');
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function getuserlocation(){ 

    $.ajax({
        url: "https://geolocation-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function( location ) {
            return location.country_name;
        }
    });

}

let kb_created_at, //done
kb_time_taken, 
kb_landing_page, //done
kb_exit_page, 
kb_source, 
kb_location, //done
kb_browser, //done
kb_os, //done
kb_device,
kb_unique_id, //done 
kb_doctitle; //done 

kb_landing_page = window.location.href.toString().split('#')[0];

kb_browser = detectBrowser();

kb_os = getOS();

kb_device = getDevice();

kb_created_at = formatDate(new Date());

kb_unique_id = makeid(8);

kb_location = getuserlocation();

kb_doctitle = document.getElementsByTagName('title')[0].innerText;

var kb_usergetlocX = [];
var kb_usergetlocY = [];

var kb_mousegetlocX = [];
var kb_mousegetlocY = [];

var kb_fulldata = {};

kb_fulldata['uniqueid'] = kb_unique_id;
kb_fulldata['created_at'] = kb_created_at;
kb_fulldata['kb_time_taken'] = kb_time_taken;
kb_fulldata['landing_page'] = kb_landing_page;
kb_fulldata['exit_page'] = kb_exit_page;
kb_fulldata['source'] = kb_source;
kb_fulldata['location'] = kb_location;
kb_fulldata['browser'] = kb_browser;
kb_fulldata['os'] = kb_os;
kb_fulldata['device'] = kb_device;
kb_fulldata['doctitle'] = kb_doctitle;

var allinonegeoloc = ['','','','','',''];
function allgeolocationdata(){
    $.ajax({
        url: "https://geolocation-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function( location ) {
            allinonegeoloc[0]=location.country_code;
            allinonegeoloc[1]=location.country_name;
            allinonegeoloc[2]=location.state;
            allinonegeoloc[3]=location.city;
            allinonegeoloc[4]=location.postal;
            allinonegeoloc[5]=location.latitude;
            allinonegeoloc[6]=location.longitude;
            allinonegeoloc[7]=location.IPv4;  
        }
    });
}

function redirectsometime(e){
    e.preventDefault();
    const anchor = e.target.closest("a");
    if (!anchor) return;                        
    var gethref = anchor.getAttribute('href'); 

    var targetanch = anchor.getAttribute('target');

    if(targetanch!='_blank'){
        setTimeout(function(){
            window.location.href = gethref;
        },800);   
    }
    
}

var allanchor = document.getElementsByTagName('a');

for (var index = 0; index < allanchor.length; index++) {
    allanchor[index].addEventListener('click',redirectsometime);
}
function forclick(e){
    kb_usergetlocX.push(e.clientX);

    if(window.scrollY!=0){
        kb_usergetlocY.push(e.clientY+window.scrollY);
    }else{
        kb_usergetlocY.push(e.clientY);
    }

    kb_fulldata['locx'] = kb_usergetlocX;
    kb_fulldata['locY'] = kb_usergetlocY;

    $.ajax({
        url: "http://127.0.0.1:8000/heat-request",
        type: "GET",
        dataType: 'json',
        data:  {
            name: kb_fulldata
        },
        contentType: 'application/json',
        CrossDomain:true,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status)
            console.log(xhr.responseText);

        }
    });

}

function formouse(e){
    kb_mousegetlocX.push(e.clientX);

    if(window.scrollY!=0){
        kb_mousegetlocY.push(e.clientY+window.scrollY);
    }else{
        kb_mousegetlocY.push(e.clientY);
    }

    // console.log(kb_mousegetlocX);
    // console.log(kb_mousegetlocY);

    kb_fulldata['Mlocx'] = kb_mousegetlocX;
    kb_fulldata['MlocY'] = kb_mousegetlocY;

    $.ajax({
        url: "http://127.0.0.1:8000/heat-request",
        type: "GET",
        dataType: 'json',
        data:  {
            name: kb_fulldata
        },
        contentType: 'application/json',
        CrossDomain:true,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status)
            console.log(xhr.responseText);

        }
    });

}

function screenshotjs(){
    var wa = document.createElement('script'); wa.type = 'text/javascript'; wa.async = true;
    wa.src = 'https://dinklin.greenofficeinncr.com/heatmap_record/screenshot.js';
    wa.id = 'kb-screenshotjs';
    var s = document.getElementsByTagName('body')[0]; s.appendChild(wa);
}

function RecordRTCjs(){
    var wa = document.createElement('script'); wa.type = 'text/javascript'; wa.async = true;
    wa.src = 'https://dinklin.greenofficeinncr.com/heatmap_record/RecordRTC.js';
    wa.id = 'kb-RecordRTCjs';
    var s = document.getElementsByTagName('body')[0]; s.appendChild(wa);
}

// function recordheatmap(){
if(window.location.hash!='#kb-heatmaps' && window.top.location.hash!='#kb-heatmaps'){

        screenshotjs();
        RecordRTCjs();
        allgeolocationdata();
            
        var elementToShare = document.getElementById('elementToShare');
        var canvas2d = document.createElement('canvas');
        var context = canvas2d.getContext('2d');

        // canvas2d.width = elementToShare.clientWidth;
        // canvas2d.height = elementToShare.clientHeight;

        canvas2d.width = window.innerWidth;
        canvas2d.height = window.innerHeight;

        canvas2d.style.top = '-99999px';
        canvas2d.style.left = '-99999px';
        canvas2d.style.position = 'absolute';
        (document.body || document.documentElement).appendChild(canvas2d);

        var isRecordingStarted = false;
        var isStoppedRecording = false;

        (function looper() {
            if(!isRecordingStarted) {
                return setTimeout(looper, 500);
            }

            html2canvas(document.body, {
                grabMouse: true,
                allowTaint: false,
                useCORS: true,
                onrendered: function(canvas) {
            
                    var body = document.body,
                    html = document.documentElement;
                    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
                    
                    context.clearRect(0, 0, 0, window.innerWidth,height+88);
                    context.drawImage(canvas, 0, -window.scrollY, window.innerWidth,height+88);
                    
                    if(isStoppedRecording) {
                        return;
                    }

                    setTimeout(looper, 1);
                }
            });
        })();

        var recorder;

        // var recorder = new RecordRTC(canvas2d, {
        //     type: 'canvas',
        //     mimeType: 'video/webm\;codecs=h264',
        //     getNativeBlob: true
        // });

        function recordinginterv(){
            setTimeout(function() {
                // clearInterval(recordingInterval);
                heatstop();
            }, 5000);
        }

        function heatstart() {
            recorder = new RecordRTC(canvas2d, {
                type: 'canvas'
            });
            // document.getElementById('start').disabled = true;
            isStoppedRecording = false;
            isRecordingStarted = true;
            recorder.startRecording();
                // setTimeout(function() {
                //     heatstop();
                // //     document.getElementById('stop').disabled = false;
                // }, 5000);
        };

        var myrandomstrng = kb_unique_id;
            
        var rndmval = 0;
        function heatstop() {
            // this.disabled = true;

            isStoppedRecording = true;

            recorder.stopRecording(function() {
        
                // this function is used to generate random file name
                function getFileName(fileExtension) {
                    var d = new Date();
                    var year = d.getUTCFullYear();
                    var month = d.getUTCMonth();
                    var date = d.getUTCDate();
                    var seconds = d.getSeconds();
                    var url = location.href;
                    var myloc = encodeURIComponent(url);
                    // return myloc+','+ year +'-'+ month +'-'+ date +'-'+ seconds +','+myrandomstrng+ '.' + fileExtension;
                    return myrandomstrng+'_'+rndmval+ '.' + fileExtension;
                }
                
                // get recorded blob
                var blob = recorder.getBlob();

                // generating a random file name
                var fileName = getFileName('webm');
                // var fileName = getFileName('mp4');

                // we need to upload "File" --- not "Blob"
                var fileObject = new File([blob], fileName, {
                    type: 'video/webm'
                });
                
                // var fileObject = new File([blob], fileName, {
                //         type: 'video/mp4'
                //     });

                var formData = new FormData();

                // recorded data
                formData.append('video-blob', fileObject);

                // file name
                formData.append('video-filename', fileObject.name);
            
            // upload using jQuery
                $.ajax({
                    url: 'http://127.0.0.1:8000/uploadheatmap.php', 
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function(response) {
                    }
                });

                function gendt(){
                    var d = new Date();
                    var year = d.getUTCFullYear();
                    var month = d.getUTCMonth()+1;
                    var date = d.getUTCDate();
                    var seconds = d.getSeconds();
                    return year +'-'+ month +'-'+ date +'-'+ seconds;
                }


                $.ajax({
                    url: "http://127.0.0.1:8000/saverecordheat",
                    type: "GET",
                    dataType: 'json',
                    data:  {
                        date: gendt(),
                        url: location.href,
                        uniqueid: myrandomstrng,
                        country_code: allinonegeoloc[0],
                        country_name: allinonegeoloc[1],
                        state: allinonegeoloc[2],
                        city: allinonegeoloc[3],
                        postal: allinonegeoloc[4],
                        latitude: allinonegeoloc[5],
                        longitude: allinonegeoloc[6],
                        ipv4: allinonegeoloc[7] 
                    },
                    contentType: 'application/json',
                    CrossDomain:true,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status)
                        console.log(xhr.responseText);
                    }
                });
                
                heatstart();
                recordinginterv();
            
                
            });

            rndmval++;

        };

// }

// if(window.location.hash!='#kb-heatmaps' && window.top.location.hash!='#kb-heatmaps'){
    window.addEventListener('click',forclick);
    // window.addEventListener('mousemove',formouse);
    window.addEventListener('load',function(){
        heatstart();
        recordinginterv();
        
    });
}

function checkparam(value){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get(value);
    return myParam;
}

var kb_fullcontent = `
    <style>
    button:focus {
        border: none;
        outline: none;
    }
    .flex {
    flex: 1;
    box-sizing: border-box;
}
#lo-app-bar{
padding-top: 7px;
    padding-bottom: 4px;
}
.layout, .layout-column, .layout-row {
    position: relative;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}
.layout-column {
    flex-direction: column;
}
.layout-column>.flex, .layout-column>.flex {
    min-height: 0;
}
#recordings {
    width:30%;
    margin:auto;
    display:block;
}
.showmyheatmaps ol {
    margin:0px;
}
.showmyheatmaps ol li span {
    width: 50%;
    float: left;
    text-align: left;
    padding-left: 15px;
}
.showmyheatmaps ol li span a {
    background-image: linear-gradient( 
26deg, #2196F3 0%, #2157f3 100%);
    border-color: #2196F3;
    padding: 10px 20px;
    color: #fff;
    text-decoration: none;
}
.showmyheatmaps ol li {
    height: 50px;
}
@media (min-width: 944px){
    .layout-column>.flex, .layout-xl-column>.flex {
        min-height: 0;
    }
}
.layout-align-space-between, .layout-align-space-between-center, .layout-align-space-between-start, .layout-align-space-between-end, .layout-align-space-between-stretch {
    justify-content: space-between;
}
.layout-align-start-center, .layout-align-center-center, .layout-align-end-center, .layout-align-space-between-center, .layout-align-space-around-center {
    align-items: center;
    align-content: center;
    max-width: 100%;
}
.layout-row {
    flex-direction: row;
}
.app-button.ui-button-text:not(:last-child) {
    margin-right: .5rem;
}
.ui-button.ui-button-text, [role=button].ui-button-text {
    background: transparent;
    border-color: transparent;
}
.app-button.ui-button-text {
    border-radius: 0;
    padding: 0 .5rem;
    position: relative;
}
.ui-button, [role=button] {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 3px;
    color: #2c2c28;
    display: inline-flex;
    font-size: inherit;
    line-height: 1.7;
    justify-content: center;
    outline: 0;
    padding: 0;
    text-align: center;
    transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    -webkit-appearance: none;
}
.app-button.ui-button-text.ui-button .ui-button-flex {
    display: block;
    padding: 0;
}
.ui-button .ui-button-flex, [role=button] .ui-button-flex {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    padding: 0.75em 1.25em 0.65em;
    width: 100%;
    cursor: pointer;
}
.app-button.ui-button-text .icon-label {
    color: #b2c0c6;
    display: block;
    font-size: 10px;
    transition: color .2s cubic-bezier(0.55, 0, 0.1, 1);
}
.app-button.ui-button-text:not(:last-child) {
    margin-right: .5rem;
}
#lo-website, #lo-app-bar, #lo-status-bar {
    margin: 0 2rem;
}
#lo-website-iframe-container {
    border-radius: 3px;
    max-height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 10;
    transform: translate3d(0, 0, 0);
    transition: all .4s ease-out;
}
#lo-website-iframe {
    background-color: #fff;
    border: none;
    bottom: 0;
    height: 100%;
    overflow-y: scroll;
    top: 0;
    width: 100%;
}
.ui-panel-manager {
    box-sizing: border-box;
    margin: 52px 2rem;
    pointer-events: none;
    z-index: 10;
}
.size-fill {
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
}
.shadow-z4 {
    box-shadow: 0px 4px 15px rgb(44 50 61 / 25%);
}
.ui-floating-panel.left {
    left: 0;
}

.ui-floating-panel {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0px 3px 9px rgb(44 50 61 / 25%);
    height: 100%;
    outline: 0;
    overflow: hidden;
    pointer-events: auto;
    position: absolute;
    width: 300px;
    z-index: 1;
}
.ui-status-bar .filtered {
    border-bottom: 2px solid #CFD8DC;
    display: inline;
}
.ui-status-bar .spacer {
    padding: 0 0.5rem;
}
.color-positive {
    color: #13CE66;
}
#loading-data-spinner {
    margin-left: 0.25rem;
    vertical-align: bottom;
}
.ui-spinner.style-1 {
    border-top: 4px solid rgba(0, 0, 0, 0.15);
    border-right: 4px solid rgba(0, 0, 0, 0.15);
    border-bottom: 4px solid rgba(0, 0, 0, 0.15);
    border-left: 4px solid #34495E;
    border-radius: 50%;
    display: inline-block;
    margin: 0;
    position: relative;
    transform: translateZ(0);
    animation: style1 0.6s infinite linear;
    width: 1.7rem;
    height: 1.7rem;
}
#brand-wordmark {
    height: 50px;
    margin: 7px 0px;
}
@keyframes style1{
    0% {
        -webkit-transform: rotate(
    0deg);
        transform: rotate(
    0deg);
    }

    100% {
        -webkit-transform: rotate(
    360deg);
        transform: rotate(
    360deg);
    }
}
.lo-app{
    font-family: roboto;
}
#lo-status-bar >div {
    font-size: 14px;
}

#brand-link span {
    margin-right: .5rem;
    opacity: 0;
    transition: opacity .2s cubic-bezier(0.55, 0, 0.1, 1);
    white-space: nowrap;
    font-size:13px;
}
#brand-link:hover span {
    opacity: 1;
}
.color-darker {
    color: #b2c0c6;
}
#brand-link{
    text-decoration: none;
}
.ui-button svg {
    width: 22px;
}

/* segmentataion */

.ui-floating-panel.panel-active {
    z-index: 2;
}
.ui-floating-panel .ui-floating-panel-header {
    background-color: #F9FAFC;
    /* cursor: move; */
    padding: 1rem;
}
.ps {
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}
.padding-half {
    padding: 1rem !important;
}
.lo-segment {
    outline: 0;
}
.cursor-pointer {
    cursor: pointer;
}
.padding-y-half {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
}
.display-inline-flex {
    display: inline-flex !important;
}
.padding-bottom-half {
    padding-bottom: 1rem !important;
}
#segmentation-panel-scroll-container h5{
    margin: 0px;
}
#segmentation-panel-scroll-container svg, #segmentation-panel header svg {
    width: 12px;
}
#segmentation-panel header h3 {
    margin: 0px;
}
.ui-input, input:not([type="checkbox"]) {
    background: #fff;
    border: 1px solid #CFD8DC;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    font-size: inherit;
    line-height: 1.7;
    margin: 0;
    max-height: 98%;
    min-width: 2rem;
    outline: 0;
    padding: 0.75em 1.25em 0.65em 0.65em;
    position: relative;
    text-align: left;
    transition: border-color 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    width: 100%;
    word-wrap: break-word;
    -webkit-appearance: none;
    -moz-appearance: none;
}
.border-top {
    border-top: 1px solid #ECEFF1;
}

.ui-list-item {
    align-items: center;
    display: flex;
    flex-direction: row;
    line-height: inherit;
    padding: 0 5px;
    position: relative;
}.text-truncate {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.lo-segment.active .showmydropdown {
    display: block!important;
}

.loadEffect {
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    transform-origin: center;
    position: relative;
}

@keyframes slideUp{
        0% {
            opacity: 0;
            top: 40px;
        }
        100% {
            opacity: 1;
            top: 0px;            
        }
}
.ps--active-y {
    overflow-y: scroll!important;
}
/* width */
.ps--active-y::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.ps--active-y::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.ps--active-y::-webkit-scrollbar-thumb {
  background: rgb(201, 201, 201);
}

/* Handle on hover */
.ps--active-y::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.ui-list-item {
    font-size: 12px;
}
.ui-button{
    transition:.5s ease-in-out;
}
.ui-button:hover {
    color: #d8c898;
}
.ui-button.active {
    color: #d8c898;
}
.icon-label {
    font-size: 11px;
}

/* segmentataion */

/* device */

#sizing-options h3 , #sizing-options h5 {
    margin: 0px;
}
#sizing-options header button {
    width: 12px;
}
#screen-size-selector .ui-button {
    font-size: 11px;
}
#screen-size-selector svg {
    height: 24px;
    margin-right: 4px;
}
#screen-size-selector .ui-button-flex{
    padding: 13px;
}
.ui-floating-panel.compact {
    height: auto;
}
#sizing-options input {
    font-size: 13px;
    margin-top: 10px;
}
.margin-top {
    margin-top: 2rem !important;
}
#sizing-options .margin-top {
    margin: 8px;
}
#lo-website-iframe-container.tablet {
    background: #d8c898a3;
    padding: 30px;
    border-radius: 15px;
}
#lo-website-iframe-container.phone{
    background: #d8c898a3;
    padding: 30px 10px;
    border-radius: 15px;
}

/* device */

.ui-floating-panel-header h3 {
    font-size: 20px;
}
.lo-segment h5 {
    font-size: 13px;
}
#sizing-options header .ui-button-flex, #heatmap-options header .ui-button-flex {
    padding: 0px!important;
}
#heatmap-options label {
    width: 100%;
}
#heatmap-options input[type="range"] {
    position: relative;
    background-color: #eeeeee;
    outline: none;
    width: 100%;
    margin: 15px 0;
    padding: 0;
    -webkit-appearance: none;
    border: 1px solid transparent;
    cursor: ew-resize;
    height: 3px;
}
#heatmap-options header svg {
    width: 13px;
}
#heatmap-options main svg {
    width: 18px;
    margin-right: 6px;
}
#heatmap-options {
    float: right;
    right: 18px;
}

.refreshrotate{
    animation: rotation 2s infinite linear;
    -webkit-animation: rotation 2s infinite linear;
}

@keyframes rotation {
    from {
            transform: rotate(0deg);
    }
    to {
            transform: rotate(359deg);
    }
}

@-webkit-keyframes rotation {
    from {
            -webkit-transform: rotate(0deg);
    }
    to {
            -webkit-transform: rotate(359deg);
    }
}

/* screenshot */

.ui-backdrop {
    background-color: rgba(44, 50, 61, 0.4);
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 1;
    position: fixed;
    top: 0;
    width: 100%;
    transition-property: visibility, opacity;
    transition: 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    visibility: visible;
    z-index: 1003;
    justify-content:center;
    display:none;
}
.ui-dialog {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0px 3px 9px rgb(44 50 61 / 25%);
    cursor: auto;
    max-height: 99%;
    max-width: 99%;
    outline: none;
    overflow: auto;
    position: relative;
    z-index: 1004;
}
.ui-a-dialog-enter-active, .ui-a-dialog-leave-active, .ui-dialog {
    opacity: 1;
    transform: scale(1);
    transition-property: transform, opacity;
    transition: 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.size-dialog-large .ui-dialog {
    width: 750px;
}
#kb-screenshotcont h2 {
    font-size: 23px;
}
#kb-screenshotcont .padding {
    padding: 20px;
}
.overflow-none {
    overflow: hidden;
}
.screenshot-container {
    border: 3px solid #fff;
    height: 100%;
    max-height: 270px;
    width: 270px;
}
#kb-screenshotcont img{
    max-width:100%;
}
.ui-dialog-close {
    position: absolute;
    top: 5px;
    right: 5px;
}
.size-dialog-large .ui-dialog {
    width: 750px;
}

.kb-scrbtn{
    background-image: linear-gradient(
26deg, #2196F3 0%, #2157f3 100%);
    border-color: #2196F3;
    color: #FFFFFF;
    text-decoration: none!important;
}
.kb-scrbtn:hover{
color:#fff!important;
}
#kb-screenshotcont .ui-dialog-close span {
    padding: 10px 10px 0px;
}
#kb-screenshotcont .ui-dialog-close svg {
    width: 13px;
    color: lightgray;
}
#kb-insidescrn-second a {
    font-size: 15px;
}
#kb-insidescrn-second svg {
    width: 15px;
    margin-right:10px;
}
/* screenshot */


</style>
<div class="ui-backdrop layout-row layout-align-center-center size-dialog-large" style="position: fixed;" id="kb-screenshotcont">
 <div class="ui-dialog">

   <div class="text-center padding" id="kb-insidescrn-first">
      <h2> Taking a screenshot<br><span class="color-grey">(This may take a few seconds)</span></h2> 
      <div alt="Loading" class="ui-spinner style-1 refreshrotate"></div>
    </div> 
   

    <div class="layout-row" id="kb-insidescrn-second" style="display:none;" > 
    <div class="overflow-none screenshot-container"><a
            href="" target="_blank" id="kb-link1"
            class="display-block"><img id="kb-scr-src"
                src=""
                alt="Screenshot preview" class="display-block"></a></div>
    <div class="flex padding">
        <h2>Your screenshot is ready</h2>
        <p>Copy or download your screenshot image to place it in emails and presentations, or to save it for later use.
        </p>
        <p class="color-grey"></p> <a target="_blank"
            href="" id="kb-link2"
            class="flex ui-button ui-button-fill ui-button-primary kb-scrbtn">
            <span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-external-link-alt fa-w-16 fa-7x"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" class=""></path></svg> 
            Open in new window</span></a> <a
            class="ui-button flex ui-button-primary ui-button-fill kb-scrbtn" id="capturescreenshot-kb" download><span
                class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-download fa-w-16 fa-9x"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" class=""></path></svg>
                Download</span></a>
     </div>
   </div>

   <button class="ui-button icon padding-none ui-dialog-close ui-button-default ui-button-text" id="bw-close-scrnsht"><span class="ui-button-flex" >
   <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10 fa-9x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
   </span></button>


   </div>
 </div>


    <div class="lo-app layout-column size-fill overflow-none">
    <main class="layout-column flex">
        <div id="lo-app-bar" role="toolbar" class="ui-status-bar layout-row layout-align-space-between-center">
            <div id="global-tools" class="flex layout-row layout-align-start-center"><button
                class="ui-button icon app-button ui-button-default ui-button-text" id="segments-button"
                aria-label="filter_listSegments  ">
                <span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-amount-up-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sort-amount-up-alt fa-w-16 fa-9x"><path fill="currentColor" d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.39-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160z" class=""></path></svg><span class="icon-label">Segments</span>
                   </span>
                </button> <button class="ui-button icon app-button ui-button-default ui-button-text"
                id="device-button" aria-label="desktop_windowsDevice  "><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="desktop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-desktop fa-w-18 fa-9x"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" class=""></path></svg><span class="icon-label">Device</span>
                   </span></button>
            </div>
        <div id="primary-apps" class="layout-row layout-align-start-center">
            
            <button class="ui-button icon app-button ui-button-default ui-button-text" id="heatmap-button"
                aria-label="blur_circularHeatmap  "><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="braille" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-braille fa-w-20 fa-7x"><path fill="currentColor" d="M128 256c0 35.346-28.654 64-64 64S0 291.346 0 256s28.654-64 64-64 64 28.654 64 64zM64 384c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-352C28.654 32 0 60.654 0 96s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm160 192c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 160c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-352c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm224 192c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 160c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-352c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm160 192c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 160c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-320c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" class=""></path></svg><span class="icon-label">Heatmap</span></span>
                </button>

                <button class="ui-button icon app-button ui-button-default ui-button-text" id="heatmap-recording"
                aria-label="blur_circularHeatmap  "><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-video fa-w-18 fa-9x"><path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" class=""></path></svg><span class="icon-label">Recordings</span></span>
                </button>
        </div>
        <div class="flex layout-row layout-align-end-center" style="flex-direction: row-reverse;">
                <button style="margin-left: -25px;" class="ui-button icon padding-none ui-button-default ui-button-text"
                id="feedback-button" aria-label="help Get help"><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-question-circle fa-w-16 fa-9x"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" class=""></path></svg>  &nbsp;
                    <span class="icon-label">Get help</span>
                </span></button> 

                <button class="ui-button ui-button-positive ui-button-fill" id="screenshot-button"
                ><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="camera-retro" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-camera-retro fa-w-16 fa-9x"><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm0 32h106c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H38c-3.3 0-6-2.7-6-6V80c0-8.8 7.2-16 16-16zm426 96H38c-3.3 0-6-2.7-6-6v-36c0-3.3 2.7-6 6-6h138l30.2-45.3c1.1-1.7 3-2.7 5-2.7H464c8.8 0 16 7.2 16 16v74c0 3.3-2.7 6-6 6zM256 424c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-208c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm-48 104c-8.8 0-16-7.2-16-16 0-35.3 28.7-64 64-64 8.8 0 16 7.2 16 16s-7.2 16-16 16c-17.6 0-32 14.4-32 32 0 8.8-7.2 16-16 16z" class=""></path></svg> &nbsp;
                    <span class="icon-label">Screenshot</span>
                </span></button>
        </div>
        </div>
        <div id="lo-website" class="flex layout-column layout-align-center-center">
            <div id="lo-website-iframe-container" class="shadow-z4 layout-column flex desktop"
                style="width: 100%; height: 100%; position: relative;">
                <iframe id="lo-website-iframe"
                    sandbox="allow-scripts allow-same-origin allow-forms" class="lo-website-iframe flex" src="`+kb_landing_page+`"></iframe>
            </div>
            <div></div>
        </div>
        <div id="lo-status-bar" role="toolbar" class="ui-status-bar layout-row layout-align-space-between-center">
            <div class="flex layout-row layout-align-start-center">
                <span>
                    <strong class="filtered">0 clicks</strong>
                </span>
                <span class="layout-row">
                    <strong class="spacer">·</strong> 
                    <span class="color-positive">All clicks have been loaded</span>
                </span> 
                <span class="layout-row">
                     <button class="ui-button icon padding-none ui-button-default ui-button-text"
                        id="heatmap-reload">
                            <span class="ui-button-flex">
                                <svg style="width:15px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-redo fa-w-16 fa-9x"><path fill="currentColor" d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z" class=""></path></svg> 
                            </span>
                      </button>
                </span>
            </div> 
            <a href="http://127.0.0.1:8000/heat-maps" target="_blank" id="brand-link"
                class="layout-row layout-align-end-center"><span class="color-darker">Back to</span> <img
                    id="brand-wordmark"
                    src="http://127.0.0.1:8000/images/logo/kblogo.svg"
                    alt="Kia Builder Logo" /></a>
        </div>
        <div class="ui-panel-manager size-fill">
            <div class="ui-panel-manager-bounds size-fill">
                <div tabindex="0" class="ui-floating-panel left loadEffect" id="segmentation-panel" style="display: none;">
                    <div class="layout-column size-fill">
                        <header class="ui-floating-panel-header">
                            <div class="layout-row layout-align-start-center">
                                <h3 class="flex margin-none">Segmentation</h3>
                                <div class="layout-row layout-align-end-center">
                                    <button
                                        class="ui-button padding-none size-small icon ui-button-default ui-button-text closeall-floating"
                                        aria-label="close"><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-9x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg></span>
                                    </button>
                                </div>
                            </div>
                        </header>
                        <main class="layout-column ui-floating-panel-content flex">
                            <div id="segmentation-panel-scroll-container" class="ps ps--active-y"
                                style="position: relative;">
                                <div class="padding-half">
                                    <div id="date-range" class="lo-segment loadEffect">
                                        <header 
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <h5 class="flex margin-none">
                                                Date range
                                                <div class="indicator" style="display: none;">
                                                    <div aria-hidden="true" class="ui-tooltip" style="display: none;">
                                                        Contains active segmentation</div>
                                                </div>
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="lo-input-group padding-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="padding-bottom-half">
                                                <input name="date-start" type="date"
                                                    id="ui-datepicker1" class="ui-datepicker ui-input"
                                                    placeholder="Start date" autocomplete="off"
                                                    aria-label="Use the arrow keys to pick a date" /></div> 
                                                    <input
                                                name="date-end" type="date" id="ui-datepicker2"
                                                class="ui-datepicker ui-input" placeholder="End date"
                                                autocomplete="off" /> 
                                        </div>
                                    </div>
                                    <div class="ui-list-group lo-segment lo-default-segment loadEffect" style="display:none;">
                                        <header
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <h5 class="flex margin-none text-truncate">
                                                Source
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="border-top margin-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="segmentation-container padding-top-half ps"
                                                style="display: block;overflow-y: auto;height: 250px;position: relative;">
                                                <div role="group" class=""
                                                    style="display: block; padding-top: 12px; padding-bottom: 0px;">
                                                    <div class="padding-bottom-half"><label
                                                            class="layout-row layout-align-start-center margin-none">
                                                            <div class="padding-right-half"><input type="checkbox"
                                                                    value="" /></div>
                                                            <div aria-label="" role="listitem"
                                                                class="ui-list-item padding-none flex">
                                                                <div
                                                                    class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                                                                    Direct
                                                                </div> <strong>116</strong>
                                                            </div>
                                                        </label></div>
                                                    <div class="padding-bottom-half"><label
                                                            class="layout-row layout-align-start-center margin-none">
                                                            <div class="padding-right-half"><input type="checkbox"
                                                                    value="Google PPC" /></div>
                                                            <div aria-label="" role="listitem"
                                                                class="ui-list-item padding-none flex">
                                                                <div
                                                                    class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                                                                    Google PPC
                                                                </div> <strong>51</strong>
                                                            </div>
                                                        </label></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="ui-list-group lo-segment lo-default-segment loadEffect">
                                        <header 
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <input type="checkbox" checked="checked" class="margin-right-half"
                                                style="display: none;" />
                                            <h5 class="flex margin-none text-truncate">
                                                Browser
                                                <div class="indicator" style="display: none;">
                                                    <div aria-hidden="true" class="ui-tooltip" style="display: none;">
                                                        Contains active segmentation</div>
                                                </div>
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="border-top margin-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="segmentation-container padding-top-half ps--active-y"
                                                style="display: block;overflow-y: scroll;height: 250px;position: relative;">
                                                <div role="group" id="kb_bs_segment" class=""
                                                    style="display: block; padding-top: 12px; padding-bottom: 0px;">
                                                   
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="ui-list-group lo-segment lo-default-segment loadEffect">
                                        <header 
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <input type="checkbox" checked="checked" class="margin-right-half"
                                                style="display: none;" />
                                            <h5 class="flex margin-none text-truncate">
                                                Operating system
                                                <div class="indicator" style="display: none;">
                                                    <div aria-hidden="true" class="ui-tooltip" style="display: none;">
                                                        Contains active segmentation</div>
                                                </div>
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="border-top margin-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="segmentation-container padding-top-half ps--active-y"
                                                style="display: block;overflow-y: scroll;height: 250px;position: relative;">
                                                <div role="group" id="kb_os_segment" class=""
                                                    style="display: block; padding-top: 12px; padding-bottom: 0px;">
                                                   
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="ui-list-group lo-segment lo-default-segment loadEffect">
                                        <header 
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <input type="checkbox" checked="checked" class="margin-right-half"
                                                style="display: none;" />
                                            <h5 class="flex margin-none text-truncate">
                                                Country
                                                <div class="indicator" style="display: none;">
                                                    <div aria-hidden="true" class="ui-tooltip" style="display: none;">
                                                        Contains active segmentation</div>
                                                </div>
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="border-top margin-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="segmentation-container padding-top-half ps--active-y"
                                                style="display: block;overflow-y: scroll;height: 250px;position: relative;">
                                                <div role="group" id="kb_country_segment" class=""
                                                    style="display: block; padding-top: 12px; padding-bottom: 0px;">
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="ui-list-group lo-segment lo-default-segment loadEffect" style="display:none;">
                                        <header 
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <input type="checkbox" checked="checked" class="margin-right-half"
                                                style="display: none;" />
                                            <h5 class="flex margin-none text-truncate">
                                                Region name
                                                <div class="indicator" style="display: none;">
                                                    <div aria-hidden="true" class="ui-tooltip" style="display: none;">
                                                        Contains active segmentation</div>
                                                </div>
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="border-top margin-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="segmentation-container padding-top-half ps--active-y"
                                                style="display: block;overflow-y: scroll;height: 250px;position: relative;">
                                                <div role="group"class=""
                                                    style="display: block; padding-top: 12px; padding-bottom: 0px;">
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui-list-group lo-segment lo-default-segment loadEffect">
                                        <header 
                                            class="layout-row layout-align-start-center padding-y-half cursor-pointer kb-dropdwn">
                                            <input type="checkbox" checked="checked" class="margin-right-half"
                                                style="display: none;" />
                                            <h5 class="flex margin-none text-truncate">
                                                Number of visits
                                                <div class="indicator" style="display: none;">
                                                    <div aria-hidden="true" class="ui-tooltip" style="display: none;">
                                                        Contains active segmentation</div>
                                                </div>
                                            </h5>
                                            <div class="layout-row layout-align-start-center">
                                                <div class="display-inline-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>
                                                </div>
                                            </div>
                                        </header>
                                        <div class="border-top margin-bottom-half showmydropdown loadEffect" style="display: none;">
                                            <div class="segmentation-container padding-top-half ps--active-y"
                                                style="display: block;overflow-y: scroll;height: 250px;position: relative;">
                                                <div role="group" id="kb_nuofvisit_segment"  class=""
                                                    style="display: block; padding-top: 12px; padding-bottom: 0px;">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div tabindex="0" class="ui-floating-panel compact left loadEffect" id="advanced-options" style="display: none;">
                    <div class="layout-column">
                        <header class="ui-floating-panel-header">
                            <div class="layout-row layout-align-start-center">
                                <h3 class="flex margin-none">Advanced</h3>
                                <div class="layout-row layout-align-end-center"><button
                                        class="ui-button padding-none size-small icon ui-button-default ui-button-text"
                                        aria-label="close"><span class="ui-button-flex"><i
                                                class="material-icons">close</i></span></button></div>
                            </div>
                        </header>
                        <main class="layout-column ui-floating-panel-content">
                            <div class="padding-half">
                                <div class="ui-popover">
                                    <div tabindex="0" aria-haspopup="true" class="ui-popover-target"><label
                                            id="show-element-analytics" for="show-element-overlay"
                                            class="ui-form-label margin-none">
                                            <div class="layout-row layout-align-start-center"><span class="flex">Emulate
                                                    mobile device</span> <input type="checkbox" name="show-element-overlay" />
                                            </div>
                                        </label> </div>
                                    <div class="ui-popover-content" style="display: none;">
                                        <div class="padding-half size-panel-tiny">
                                            <h5>Help</h5>
                                            <p>Useful for websites that rely on a user-agent string to display a mobile
                                                optimized version.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui-popover">
                                    <div tabindex="0" aria-haspopup="true" class="ui-popover-target"><label
                                            id="show-element-analytics" for="show-element-overlay"
                                            class="ui-form-label margin-none">
                                            <div class="layout-row layout-align-start-center"><span class="flex">Update on
                                                    URL change</span> <input type="checkbox" name="show-element-overlay" />
                                            </div>
                                        </label> </div>
                                    <div class="ui-popover-content" style="display: none;">
                                        <div class="padding-half size-panel-tiny">
                                            <h5>Help</h5>
                                            <p>By default, data will be reloaded automatically when a URL change is
                                                detected.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div tabindex="0" class="ui-floating-panel compact left loadEffect" id="sizing-options" style="display: none;">
                    <div class="layout-column">
                        <header class="ui-floating-panel-header">
                            <div class="layout-row layout-align-start-center">
                                <h3 class="flex margin-none">Device</h3>
                                <div class="layout-row layout-align-end-center">
                                <button
                                        class="ui-button padding-none size-small icon ui-button-default ui-button-text closeall-floating"
                                        aria-label="close"><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-9x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg></span></button></div>
                            </div>
                        </header>
                        <main class="layout-column ui-floating-panel-content">
                            <div class="padding-half">
                                <div id="screen-size-selector" class="ui-input-group margin-bottom-half"><label
                                        for="heatmap-viewport" class="ui-form-label flex">Device type</label>
                                    <div role="radiogroup" class="ui-button-group size-full-width" name="heatmap-viewport">
                                        <button
                                            class="ui-button padding-none size-small ui-button-default ui-button-text ui-button-primary kb-devicebtn active"
                                            value="desktop" aria-label="desktop_windowsDesktop" role="radio"><span
                                                class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="desktop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-desktop fa-w-18 fa-9x"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" class=""></path></svg> Desktop</span></button>

                                        <button class="ui-button padding-none size-small ui-button-default ui-button-text kb-devicebtn"
                                            value="tablet" aria-label="tablet_macTablet" role="radio"><span
                                                class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tablet-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-tablet-alt fa-w-14 fa-9x"><path fill="currentColor" d="M400 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM224 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm176-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h328c6.6 0 12 5.4 12 12v312z" class=""></path></svg> Tablet</span></button> 
                                                
                                        <button class="ui-button padding-none size-small ui-button-default ui-button-text kb-devicebtn"
                                            value="phone" aria-label="smartphonePhone" role="radio"><span
                                                class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mobile-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-mobile-alt fa-w-10 fa-9x"><path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z" class=""></path></svg> Phone</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="ui-list-group lo-segment lo-default-segment margin-bottom-half">
                                    <header tabindex="0"
                                        class="layout-row layout-align-start-center padding-y-half cursor-pointer"><input
                                            type="checkbox" checked="checked" class="margin-right-half"
                                            style="display: none;" />
                                        <h5 class="flex margin-none text-truncate">
                                            Device segmentation
                                            <div class="indicator">
                                                <div aria-hidden="true" class="ui-tooltip" style="display: none;">Contains
                                                    active segmentation</div>
                                            </div>
                                        </h5>
                                    </header>
                                </div>
                                <div class="layout-row layout-gutters-half layout-align-start-center margin-bottom">
                                    <div class="ui-input-group margin-none"><label
                                            for="device-width">Custom width</label> <input type="number" name="device-width"
                                            min="0" field="device-width" placeholder="E.g. 800" class="ui-input" />
                                    </div> <strong class="margin-top">×</strong>
                                    <div class="ui-input-group"><label for="device-height">Custom
                                            height</label> <input type="number" name="device-height" min="0"
                                            field="device-height" placeholder="E.g. 600" class="ui-input" />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div tabindex="0" class="ui-floating-panel compact right loadEffect" id="heatmap-options" style="display: none;">
                    <div class="layout-column">
                        <header class="ui-floating-panel-header">
                            <div class="layout-row layout-align-start-center">
                                <h3 class="flex margin-none">Heatmap</h3>
                                <div class="layout-row layout-align-end-center">
                                <button class="ui-button padding-none size-small icon ui-button-default ui-button-text closeall-floating" aria-label="close"><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-9x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg></span>
                                    </button>
                                </div>
                            </div>
                        </header>
                        <main class="layout-column ui-floating-panel-content">
                            <div class="padding-half">
                                <div id="event-type-selector" class="ui-input-group"><label for="heatmap-type"
                                        class="ui-form-label flex">Event type</label>
                                    <div role="radiogroup" class="ui-button-group size-full-width" name="heatmap-type">
                                    
                                    <button class="ui-button padding-none size-small ui-button-default ui-button-text ui-button-primary active"
                                            value="clicks" id="kb-clicks" role="radio"><span class="ui-button-flex">
                                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="hand-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-hand-pointer fa-w-14 fa-9x"><path fill="currentColor" d="M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z" class=""></path></svg> Clicks</span>
                                    </button> 
                                                    
                                    <button class="ui-button padding-none size-small ui-button-default ui-button-text" value="moves"
                                             role="radio" id="kb-moves"><span class="ui-button-flex"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="signature" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-signature fa-w-20 fa-7x"><path fill="currentColor" d="M623.2 192c-51.8 3.5-125.7 54.7-163.1 71.5-29.1 13.1-54.2 24.4-76.1 24.4-22.6 0-26-16.2-21.3-51.9 1.1-8 11.7-79.2-42.7-76.1-25.1 1.5-64.3 24.8-169.5 126L192 182.2c30.4-75.9-53.2-151.5-129.7-102.8L7.4 116.3C0 121-2.2 130.9 2.5 138.4l17.2 27c4.7 7.5 14.6 9.7 22.1 4.9l58-38.9c18.4-11.7 40.7 7.2 32.7 27.1L34.3 404.1C27.5 421 37 448 64 448c8.3 0 16.5-3.2 22.6-9.4 42.2-42.2 154.7-150.7 211.2-195.8-2.2 28.5-2.1 58.9 20.6 83.8 15.3 16.8 37.3 25.3 65.5 25.3 35.6 0 68-14.6 102.3-30 33-14.8 99-62.6 138.4-65.8 8.5-.7 15.2-7.3 15.2-15.8v-32.1c.2-9.1-7.5-16.8-16.6-16.2z" class=""></path></svg> Moves</span>
                                    </button> 
                                                    
                                    </div>
                                </div>
                                <div class="ui-input-group">
                                    <div class="layout-row layout-align-start-center"><label for="heatmap-opacity"
                                            class="ui-form-label flex margin-none">Opacity</label> <span
                                            class="size-small"><strong class="heatmapopacity">100%</strong></span></div> 
                                            <input name="heatmap-opacity" type="range" min="0" max="1" value="1" step="0.1">
                                </div>
                                <div class="ui-input-group margin-none"><label id="show-background" class="ui-form-label margin-none">
                                        <div class="layout-row layout-align-start-center"><span class="flex">Show heatmap</span> <input
                                                type="checkbox" name="show-heatmap"></div>
                                    </label> <label id="show-background" class="ui-form-label margin-none">
                                        <div class="layout-row layout-align-start-center"><span class="flex">Show background</span> <input
                                                type="checkbox" name="show-background" checked></div>
                                    </label> </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div tabindex="0" class="ui-floating-panel right loadEffect" id="element-analytics" style="display: none;">
                    <div class="layout-column size-fill">
                        <header class="ui-floating-panel-header">
                            <div class="layout-row layout-align-start-center">
                                <h3 class="flex margin-none">Element analytics</h3>
                                <div class="layout-row layout-align-end-center"><button
                                        class="ui-button padding-none size-small icon ui-button-default ui-button-text"
                                        aria-label="close"><span class="ui-button-flex"><i
                                                class="material-icons">close</i></span></button></div>
                            </div>
                            <p class="color-darker margin-none">By number of clicks received</p>
                        </header>
                        <main class="layout-column ui-floating-panel-content flex">
                            <div class="layout-column flex">
                                <div class="layout-row padding-half"><input id="elements-list-filter" type="text"
                                        name="name" value="" autocomplete="off" placeholder="Filter elements"
                                        class="flex mousetrap" />
                                    <div class="padding-left-half layout-row"><button
                                            class="ui-button icon padding-none ui-button-default ui-button-text"
                                            id="toggle-top-elements-button" aria-label="Toggle top elements"><span
                                                class="ui-button-flex">
                                                <div class="">Top <span>10</span></div>
                                                <div aria-hidden="true" class="ui-tooltip" position="bottom"
                                                    style="display: none;">Toggle top elements</div>
                                            </span></button> <button
                                            class="ui-button icon padding-none ui-button-default ui-button-text"
                                            id="export-csv-button" aria-label="Export to CSV"><span
                                                class="ui-button-flex"><i class="material-icons">file_download</i>
                                                <div aria-hidden="true" class="ui-tooltip" position="bottom"
                                                    style="display: none;">Export to CSV</div>
                                            </span></button> <button
                                            class="ui-button icon padding-none ui-button-default ui-button-text"
                                            id="show-hidden-button" aria-label="Show Hidden Elements"><span
                                                class="ui-button-flex"><i class="material-icons">visibility</i>
                                                <div aria-hidden="true" class="ui-tooltip" position="bottom"
                                                    style="display: none;">Only show visible elements</div>
                                            </span></button></div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div tabindex="0" class="ui-floating-panel right loadEffect" id="form-analytics" style="display: none;">
                    <div class="layout-column size-fill">
                        <main class="layout-column ui-floating-panel-content flex">
                            <header class="ui-floating-panel-header">
                                <div class="layout-row layout-align-start-center">
                                    <h3 class="flex margin-none text-truncate">Form analytics</h3>
                                    <div class="layout-row layout-align-end-center"><button
                                            class="ui-button padding-none size-small icon ui-button-default ui-button-text"
                                            aria-label="close"><span class="ui-button-flex"><i
                                                    class="material-icons">close</i></span></button></div>
                                </div>
                                <p class="color-darker margin-none"><span class="cursor-pointer">By number of
                                        conversions</span></p>
                            </header>
                        </main>
                    </div>
                </div>
                <div tabindex="0" class="ui-floating-panel panel-fill right loadEffect" id="recordings" style="display: none;">
                    <div class="layout-column size-fill">
                        <main class="layout-column ui-floating-panel-content flex">
                            <header class="ui-floating-panel-header">
                                <div class="layout-row layout-align-start-center">
                                    <h3 class="flex margin-none">Play recordings</h3>
                                    <div class="layout-row layout-align-end-center">
                                    <button class="ui-button padding-none size-small icon ui-button-default ui-button-text closeall-floating" aria-label="close"><span class="ui-button-flex"><svg style="width:12px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-9x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg></span></button>
                                    </div>
                                </div>
                                <p class="color-darker margin-none"><span>Visitors who <span class="important">navigated to
                                            this page</span></span></p>
                            </header>
                            <div class="layout-column flex" style="height: 350px; overflow-y: scroll; width: 100%; padding-top: 10px;"> 
                                <div class="ui-empty-state layout-column layout-align-center-center flex">
                                    <div class="content" style="width: 100%;">
                                       <div class="showmyheatmaps">
                                        <ol id="myheatrecordol">
                                        </ol>
                                       </div>
                                    </div>
                                </div> 
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>`;

if(window.location.hash=='#kb-heatmaps'){
    
    var kb_height = document.body.scrollHeight;
    var kb_width = document.body.scrollWidth;

    var data1 = [];
    var data2 = [];
    var data3 = [];


    document.getElementsByTagName('body')[0].innerHTML = (kb_fullcontent);

    setTimeout(() => {
        
        $.ajax({
            url: "http://127.0.0.1:8000/heatfetchloc-request",
            type: "GET",
            dataType: 'json',
            data:  {
                url: window.location.href.toString().split('#kb-heatmaps')[0]
            },
            contentType: 'application/json',
            CrossDomain:true,
            success: function (data) {

                var strng1 = [];
                var strng2 = [];

                data.forEach(element => {
                    var elm1 =  element['locY'].split(',')
                    elm1.forEach(element2 => {
                        strng1.push(element2);
                    });

                    var elm2 =  element['locx'].split(',')
                    elm2.forEach(element3 => {
                        var generateelm = 1519%kb_width*0.5;
                        generateelm = Math.abs(element3-generateelm);
                        strng2.push(generateelm);
                    });
                });

                var div1 = document.createElement("div");
                div1.id = 'kb-heatmap'                

                var div = document.createElement("canvas");
                div.id='heat-map';
                div.setAttribute('width',kb_width-64);
                div.setAttribute('height',kb_height);
                div1.append(div);

                var style = document.createElement('STYLE');
                style.id='kb_style';
                style.innerHTML = `#heat-map {
                    z-index: 999999;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    display: block;
                }
                #kb-heatmap {
                    bottom: 0;
                    left: 0;
                    position: absolute;
                    pointer-events: none;
                    right: 0;
                    top: 0;
                    z-index: 999999998;
                    transition-property: opacity, background-color;
                    transition: .2s ease;
                    background-color: rgba(0, 0, 0, 0.75);
                    height: ${kb_height}px;
                }
                body{
                    pointer-events: none;
                }
                `;
                // document.head.appendChild(style);

                var x = document.getElementById("lo-website-iframe");
                var y = x.contentDocument;
                y.body.insertBefore(div1,y.body.childNodes[0]);   
                y.body.insertBefore(style,y.body.childNodes[0]);   

                
                // document.getElementById('heat-map').setAttribute('width',kb_width);
                // document.getElementById('heat-map').setAttribute('height',kb_height);

                // ===================================
                // ========== HEATMAP START ==========
                // ===================================
                "use strict";
                class HeatMap {
                    constructor(canvas, data) {
                        this.canvas = canvas;
                        this.ctx = canvas.getContext("2d");
                        this.width = canvas.width;
                        this.height = canvas.height;
                        this.data = data;
                        this.circle = HeatMap.createCanvas();
                        this.radius = 15 + 15;
                        this.computeRadius(15, 15);
                        this.unit8Gradient = HeatMap.computeGradient({
                            0.4: "blue",
                            0.6: "cyan",
                            0.7: "lime",
                            0.8: "yellow",
                            1.0: "red"
                        });
                    }
                    computeRadius(r, blur) {
                        const { circle } = this;
                        const ctx = circle.getContext("2d");
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        const r2 = this.radius;
                        circle.height = r2 * 2;
                        circle.width = r2 * 2;
                        ctx.shadowOffsetY = r2 * 2;
                        ctx.shadowOffsetX = r2 * 2;
                        ctx.shadowBlur = blur;
                        ctx.shadowColor = "black";
                        ctx.beginPath();
                        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();
                    }
                    resize() {
                        this.width = this.canvas.width;
                        this.height = this.canvas.height;
                    }
                    draw(minOpacity) {
                        const { ctx } = this;
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        ctx.clearRect(0, 0, this.width, this.height);
                        for (let i = 0, len = this.data.length, p; i < len; i++) {
                            p = this.data[i];
                            ctx.globalAlpha = Math.min(minOpacity, 1);
                            if (!this.circle || !this.radius) {
                                throw new Error("The circle || radius is undefined");
                            }
                            ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
                        }
                        const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
                        ctx.putImageData(colored, 0, 0);
                    }
                    static computeGradient(grad) {
                        const canvas = HeatMap.createCanvas();
                        const ctx = canvas.getContext("2d");
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                        canvas.width = 1;
                        canvas.height = 256;
                        Object.keys(grad).forEach((i) => {
                            gradient.addColorStop(+i, grad[+i]);
                        });
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, 1, 256);
                        return ctx.getImageData(0, 0, 1, 256).data;
                    }
                    static colorize(imageData, gradient) {
                        const pixels = imageData.data;
                        for (let i = 0, len = pixels.length, j; i < len; i += 4) {
                            j = pixels[i + 3] * 4;
                            if (j) {
                                pixels[i] = gradient[j];
                                pixels[i + 1] = gradient[j + 1];
                                pixels[i + 2] = gradient[j + 2];
                            }
                        }
                        return imageData;
                    }
                    static createCanvas() {
                        return document.createElement("canvas");
                    }
                }

                // const canvas = document.getElementById("heat-map");
                const canvas = x.contentWindow.document.getElementById("heat-map");

                var chkmn = [];
                
                var kb_main = 0;
                strng1.forEach(element => {
                    chkmn = [];
                    if(strng2[kb_main]!='' || strng2[kb_main]!=0){
                        chkmn.push(strng2[kb_main]);
                        chkmn.push(strng1[kb_main]);
                        data1.push(chkmn);
                    }
                        kb_main++;
                    });

                document.getElementsByClassName('filtered')[0].innerText = data1.length+' clicks';

                const heat = new HeatMap(canvas, data1);
                heat.draw(0.85);

                // ===================================
                // =========== HEATMAP END ===========
                // ===================================



            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(xhr.responseText);

            }
        });

        // fetch all data
        $.ajax({
            url: "http://127.0.0.1:8000/heatall-request",
            type: "GET",
            dataType: 'json',
            data:  {
                url: window.location.href.toString().split('#kb-heatmaps')[0]
            },
            contentType: 'application/json',
            CrossDomain:true,
            success: function (data) {
                // console.log(data);

                var browser_segment = [];
                var os_segment = [];
                var country_segment = [];
                var numberofvisit_segment = [];
                data.forEach(element => {
                        browser_segment.push(element['browser']);
                        os_segment.push(element['os']);
                        country_segment.push(element['location']);
                        numberofvisit_segment.push(element['created_at'].substr(0, 10));
                });

                // browser_segment
                var counts = {};
                browser_segment.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                for (bs in counts) {
                    document.getElementById('kb_bs_segment').innerHTML+=`<div class="padding-bottom-half"><label
                        class="layout-row layout-align-start-center margin-none">
                        <div class="padding-right-half"><input type="checkbox"
                                value="`+bs+`" name="browser_segment" checked /></div>
                        <div aria-label="" role="listitem"
                            class="ui-list-item padding-none flex">
                            <div
                                class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                                `+bs+`
                            </div> <strong>`+counts[bs]+`</strong>
                                </div>
                            </label>
                        </div>`;
                }
                var brsegmnt = [];
                document.getElementsByName('browser_segment').forEach((brseg) => {
                brsegmnt.push(brseg.value);
                    brseg.addEventListener('click',function(){
                        data3 = [];
                        if (this.checked) {
                            brsegmnt.push(this.value);
                            getrequireddata(brsegmnt,'browser');
                        }else{
                            var index = brsegmnt.indexOf(this.value);
                            if (index > -1) {
                                brsegmnt.splice(index, 1);
                            }
                            getrequireddata(brsegmnt,'browser');
                        }
                    });
                   
                });
                // browser_segment

                // os_segment
                var counts2 = {};
                os_segment.forEach(function (x) { counts2[x] = (counts2[x] || 0) + 1; });
                for (bs in counts2) {
                    document.getElementById('kb_os_segment').innerHTML+=`<div class="padding-bottom-half"><label
                        class="layout-row layout-align-start-center margin-none">
                        <div class="padding-right-half"><input type="checkbox"
                                value="`+bs+`" name="os_segment" checked /></div>
                        <div aria-label="" role="listitem"
                            class="ui-list-item padding-none flex">
                            <div
                                class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                                `+bs+`
                            </div> <strong>`+counts2[bs]+`</strong>
                                </div>
                            </label>
                        </div>`;
                }
                var ossegmnt = [];
                document.getElementsByName('os_segment').forEach((osseg) => {
                    ossegmnt.push(osseg.value);
                        osseg.addEventListener('click',function(){
                            data3 = [];
                            if (this.checked) {
                                ossegmnt.push(this.value);
                                getrequireddata(ossegmnt,'os');
                            }else{
                                var index = ossegmnt.indexOf(this.value);
                                if (index > -1) {
                                    ossegmnt.splice(index, 1);
                                }
                                getrequireddata(ossegmnt,'os');
                            }
                        });
                       
                    });
                // os_segment

                // country_segment
                var counts3 = {};
                country_segment.forEach(function (x) { counts3[x] = (counts3[x] || 0) + 1; });
                for (bs in counts3) {
                    document.getElementById('kb_country_segment').innerHTML+=`<div class="padding-bottom-half"><label
                        class="layout-row layout-align-start-center margin-none">
                        <div class="padding-right-half"><input type="checkbox"
                                value="`+bs+`" name="country_segment" checked /></div>
                        <div aria-label="" role="listitem"
                            class="ui-list-item padding-none flex">
                            <div
                                class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                                `+bs+`
                            </div> <strong>`+counts3[bs]+`</strong>
                                </div>
                            </label>
                        </div>`;
                }
                var countrysegmnt = [];
                document.getElementsByName('country_segment').forEach((countryseg) => {
                    countrysegmnt.push(countryseg.value);
                    countryseg.addEventListener('click',function(){
                            data3 = [];
                            if (this.checked) {
                                countrysegmnt.push(this.value);
                                getrequireddata(countrysegmnt,'location');
                            }else{
                                var index = countrysegmnt.indexOf(this.value);
                                if (index > -1) {
                                    countrysegmnt.splice(index, 1);
                                }
                                getrequireddata(countrysegmnt,'location');
                            }
                        });
                       
                    });
                // country_segment

                 // numberofvisit_segment
                 var counts4 = {};
                 numberofvisit_segment.forEach(function (x) { counts4[x] = (counts4[x] || 0) + 1; });
                 for (bs in counts4) {
                     document.getElementById('kb_nuofvisit_segment').innerHTML+=`<div class="padding-bottom-half"><label
                         class="layout-row layout-align-start-center margin-none">
                         <div class="padding-right-half"><input type="checkbox"
                                 value="`+bs+`" name="numberofvisit_segment" checked /></div>
                         <div aria-label="" role="listitem"
                             class="ui-list-item padding-none flex">
                             <div
                                 class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                                 `+bs+`
                             </div> <strong>`+counts4[bs]+`</strong>
                                 </div>
                             </label>
                         </div>`;
                 }
                 var numberofvisitsegmnt = [];
                document.getElementsByName('numberofvisit_segment').forEach((numberofvisitseg) => {
                    numberofvisitsegmnt.push(numberofvisitseg.value);
                    numberofvisitseg.addEventListener('click',function(){
                            data3 = [];
                            if (this.checked) {
                                numberofvisitsegmnt.push(this.value);
                                getrequireddata(numberofvisitsegmnt,'created_at');
                            }else{
                                var index = numberofvisitsegmnt.indexOf(this.value);
                                if (index > -1) {
                                    numberofvisitsegmnt.splice(index, 1);
                                }
                                getrequireddata(numberofvisitsegmnt,'created_at');
                            }
                        });
                       
                    });
                 // numberofvisit_segment


                //  date_range_segment
                var dtrange = ['',''];
                document.getElementById('ui-datepicker1').addEventListener('change',function(){
                    data3 = [];
                    dtrange[0] = this.value;
                    if(dtrange[0]!='' && dtrange[1]!=''){
                        getrequireddata(dtrange,'daterange_segment');
                    }
                });

                document.getElementById('ui-datepicker2').addEventListener('change',function(){
                    data3 = [];
                    dtrange[1] = this.value;
                    if(dtrange[0]!='' && dtrange[1]!=''){
                        getrequireddata(dtrange,'daterange_segment');
                    }
                });
                //  date_range_segment
                
                

            }
        });
        // fetch all data

        // get required data
        function getrequireddata(value1,value2){
            $.ajax({
                url: "http://127.0.0.1:8000/heatshome-request",
                type: "GET",
                dataType: 'json',
                data:  {
                    url: window.location.href.toString().split('#kb-heatmaps')[0],
                    browser_segment: value1,
                    whichvalue: value2
                },
                contentType: 'application/json',
                CrossDomain:true,
                success: function (data) {
                    // console.log(data);

                var strng1 = [];
                var strng2 = [];

                data.forEach(element => {
                    var elm1 =  element['locY'].split(',')
                    elm1.forEach(element2 => {
                        strng1.push(element2);
                    });

                    var elm2 =  element['locx'].split(',')
                    elm2.forEach(element3 => {
                        var generateelm = 1519%kb_width*0.5;
                        generateelm = Math.abs(element3-generateelm);
                        strng2.push(generateelm);
                    });
                });

                // ===================================
                // ========== HEATMAP START ==========
                // ===================================
                "use strict";
                class HeatMap {
                    constructor(canvas, data) {
                        this.canvas = canvas;
                        this.ctx = canvas.getContext("2d");
                        this.width = canvas.width;
                        this.height = canvas.height;
                        this.data = data;
                        this.circle = HeatMap.createCanvas();
                        this.radius = 15 + 15;
                        this.computeRadius(15, 15);
                        this.unit8Gradient = HeatMap.computeGradient({
                            0.4: "blue",
                            0.6: "cyan",
                            0.7: "lime",
                            0.8: "yellow",
                            1.0: "red"
                        });
                    }
                    computeRadius(r, blur) {
                        const { circle } = this;
                        const ctx = circle.getContext("2d");
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        const r2 = this.radius;
                        circle.height = r2 * 2;
                        circle.width = r2 * 2;
                        ctx.shadowOffsetY = r2 * 2;
                        ctx.shadowOffsetX = r2 * 2;
                        ctx.shadowBlur = blur;
                        ctx.shadowColor = "black";
                        ctx.beginPath();
                        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();
                    }
                    resize() {
                        this.width = this.canvas.width;
                        this.height = this.canvas.height;
                    }
                    draw(minOpacity) {
                        const { ctx } = this;
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        ctx.clearRect(0, 0, this.width, this.height);
                        for (let i = 0, len = this.data.length, p; i < len; i++) {
                            p = this.data[i];
                            ctx.globalAlpha = Math.min(minOpacity, 1);
                            if (!this.circle || !this.radius) {
                                throw new Error("The circle || radius is undefined");
                            }
                            ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
                        }
                        const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
                        ctx.putImageData(colored, 0, 0);
                    }
                    static computeGradient(grad) {
                        const canvas = HeatMap.createCanvas();
                        const ctx = canvas.getContext("2d");
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                        canvas.width = 1;
                        canvas.height = 256;
                        Object.keys(grad).forEach((i) => {
                            gradient.addColorStop(+i, grad[+i]);
                        });
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, 1, 256);
                        return ctx.getImageData(0, 0, 1, 256).data;
                    }
                    static colorize(imageData, gradient) {
                        const pixels = imageData.data;
                        for (let i = 0, len = pixels.length, j; i < len; i += 4) {
                            j = pixels[i + 3] * 4;
                            if (j) {
                                pixels[i] = gradient[j];
                                pixels[i + 1] = gradient[j + 1];
                                pixels[i + 2] = gradient[j + 2];
                            }
                        }
                        return imageData;
                    }
                    static createCanvas() {
                        return document.createElement("canvas");
                    }
                }

                var chkmn = [];


                var kb_main = 0;
                strng1.forEach(element => {
                    chkmn = [];
                    if(strng2[kb_main]!='' || strng2[kb_main]!=0){
                        chkmn.push(strng2[kb_main]);
                        chkmn.push(strng1[kb_main]);
                        data3.push(chkmn);
                    }
                        kb_main++;
                    });

                var x = document.getElementById("lo-website-iframe");
                const canvas2 = x.contentWindow.document.getElementById("heat-map");

                document.getElementsByClassName('filtered')[0].innerText = data3.length+' Clicks';
                const heat = new HeatMap(canvas2, data3);
                heat.draw(0.85);

                // ===================================
                // =========== HEATMAP END ===========
                // ===================================


                }
            });
        }
        // get required data
            

    }, 500);

    // layout js

    function showmydrop(e){
        this.parentNode.classList.toggle('active');
    }
    
    var elements = document.getElementsByClassName("kb-dropdwn");
    Array.from(elements).forEach(function(element) {
      element.addEventListener('click', showmydrop);
    });

    function closeall_floating(){
        document.getElementById('segmentation-panel').style.display = "none";
        document.getElementById('sizing-options').style.display = "none";
        document.getElementById('heatmap-options').style.display = "none";
        document.getElementById('recordings').style.display = "none";
    }

    var elementsclose = document.getElementsByClassName("closeall-floating");
    Array.from(elementsclose).forEach(function(element) {
      element.addEventListener('click', closeall_floating);
    });

    function showmydrop2(evt){

        closeall_floating();

        var x =  document.getElementById(evt.currentTarget.myParam);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    document.getElementById('segments-button').addEventListener('click',showmydrop2);
    document.getElementById('segments-button').myParam = 'segmentation-panel';

    document.getElementById('device-button').addEventListener('click',showmydrop2);
    document.getElementById('device-button').myParam = 'sizing-options';

    document.getElementById('heatmap-button').addEventListener('click',showmydrop2);
    document.getElementById('heatmap-button').myParam = 'heatmap-options';
    
    function createheatmp(){
            // ===================================
            // ========== HEATMAP START ==========
            // ===================================
            "use strict";
            class HeatMap {
                constructor(canvas, data) {
                    this.canvas = canvas;
                    this.ctx = canvas.getContext("2d");
                    this.width = canvas.width;
                    this.height = canvas.height;
                    this.data = data;
                    this.circle = HeatMap.createCanvas();
                    this.radius = 15 + 15;
                    this.computeRadius(15, 15);
                    this.unit8Gradient = HeatMap.computeGradient({
                        0.4: "blue",
                        0.6: "cyan",
                        0.7: "lime",
                        0.8: "yellow",
                        1.0: "red"
                    });
                }
                computeRadius(r, blur) {
                    const { circle } = this;
                    const ctx = circle.getContext("2d");
                    if (!ctx) {
                        throw new Error("The ctx is undefined");
                    }
                    const r2 = this.radius;
                    circle.height = r2 * 2;
                    circle.width = r2 * 2;
                    ctx.shadowOffsetY = r2 * 2;
                    ctx.shadowOffsetX = r2 * 2;
                    ctx.shadowBlur = blur;
                    ctx.shadowColor = "black";
                    ctx.beginPath();
                    ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                }
                resize() {
                    this.width = this.canvas.width;
                    this.height = this.canvas.height;
                }
                draw(minOpacity) {
                    const { ctx } = this;
                    if (!ctx) {
                        throw new Error("The ctx is undefined");
                    }
                    ctx.clearRect(0, 0, this.width, this.height);
                    for (let i = 0, len = this.data.length, p; i < len; i++) {
                        p = this.data[i];
                        ctx.globalAlpha = Math.min(minOpacity, 1);
                        if (!this.circle || !this.radius) {
                            throw new Error("The circle || radius is undefined");
                        }
                        ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
                    }
                    const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
                    ctx.putImageData(colored, 0, 0);
                }
                static computeGradient(grad) {
                    const canvas = HeatMap.createCanvas();
                    const ctx = canvas.getContext("2d");
                    if (!ctx) {
                        throw new Error("The ctx is undefined");
                    }
                    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                    canvas.width = 1;
                    canvas.height = 256;
                    Object.keys(grad).forEach((i) => {
                        gradient.addColorStop(+i, grad[+i]);
                    });
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, 1, 256);
                    return ctx.getImageData(0, 0, 1, 256).data;
                }
                static colorize(imageData, gradient) {
                    const pixels = imageData.data;
                    for (let i = 0, len = pixels.length, j; i < len; i += 4) {
                        j = pixels[i + 3] * 4;
                        if (j) {
                            pixels[i] = gradient[j];
                            pixels[i + 1] = gradient[j + 1];
                            pixels[i + 2] = gradient[j + 2];
                        }
                    }
                    return imageData;
                }
                static createCanvas() {
                    return document.createElement("canvas");
                }
            }

            // const canvas = document.getElementById("heat-map");
            var x = document.getElementById("lo-website-iframe");
            const canvas = x.contentWindow.document.getElementById("heat-map");

            document.getElementsByClassName('filtered')[0].innerText = data1.length+' clicks';

            const heat = new HeatMap(canvas, data1);
            heat.draw(0.85);

            // ===================================
            // =========== HEATMAP END ===========
            // ===================================

    }
    
    function createheatmpmouse(){
        $.ajax({
            url: "http://127.0.0.1:8000/heatfetchmou-request",
            type: "GET",
            dataType: 'json',
            data:  {
                url: window.location.href.toString().split('#kb-heatmaps')[0]
            },
            contentType: 'application/json',
            CrossDomain:true,
            success: function (data) {

                var strng1 = [];
                var strng2 = [];

                data.forEach(element => {
                    var elm1 =  element['mouseY'].split(',')
                    elm1.forEach(element2 => {
                        strng1.push(element2);
                    });

                    var elm2 =  element['mouseX'].split(',')
                    elm2.forEach(element3 => {
                        var generateelm = 1519%kb_width*0.5;
                        generateelm = Math.abs(element3-generateelm);
                        strng2.push(generateelm);
                    });
                });

                // ===================================
                // ========== HEATMAP START ==========
                // ===================================
                "use strict";
                class HeatMap {
                    constructor(canvas, data) {
                        this.canvas = canvas;
                        this.ctx = canvas.getContext("2d");
                        this.width = canvas.width;
                        this.height = canvas.height;
                        this.data = data;
                        this.circle = HeatMap.createCanvas();
                        this.radius = 15 + 15;
                        this.computeRadius(15, 15);
                        this.unit8Gradient = HeatMap.computeGradient({
                            0.4: "blue",
                            0.6: "cyan",
                            0.7: "lime",
                            0.8: "yellow",
                            1.0: "red"
                        });
                    }
                    computeRadius(r, blur) {
                        const { circle } = this;
                        const ctx = circle.getContext("2d");
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        const r2 = this.radius;
                        circle.height = r2 * 2;
                        circle.width = r2 * 2;
                        ctx.shadowOffsetY = r2 * 2;
                        ctx.shadowOffsetX = r2 * 2;
                        ctx.shadowBlur = blur;
                        ctx.shadowColor = "black";
                        ctx.beginPath();
                        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();
                    }
                    resize() {
                        this.width = this.canvas.width;
                        this.height = this.canvas.height;
                    }
                    draw(minOpacity) {
                        const { ctx } = this;
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        ctx.clearRect(0, 0, this.width, this.height);
                        for (let i = 0, len = this.data.length, p; i < len; i++) {
                            p = this.data[i];
                            ctx.globalAlpha = Math.min(minOpacity, 1);
                            if (!this.circle || !this.radius) {
                                throw new Error("The circle || radius is undefined");
                            }
                            ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
                        }
                        const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
                        ctx.putImageData(colored, 0, 0);
                    }
                    static computeGradient(grad) {
                        const canvas = HeatMap.createCanvas();
                        const ctx = canvas.getContext("2d");
                        if (!ctx) {
                            throw new Error("The ctx is undefined");
                        }
                        const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                        canvas.width = 1;
                        canvas.height = 256;
                        Object.keys(grad).forEach((i) => {
                            gradient.addColorStop(+i, grad[+i]);
                        });
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, 1, 256);
                        return ctx.getImageData(0, 0, 1, 256).data;
                    }
                    static colorize(imageData, gradient) {
                        const pixels = imageData.data;
                        for (let i = 0, len = pixels.length, j; i < len; i += 4) {
                            j = pixels[i + 3] * 4;
                            if (j) {
                                pixels[i] = gradient[j];
                                pixels[i + 1] = gradient[j + 1];
                                pixels[i + 2] = gradient[j + 2];
                            }
                        }
                        return imageData;
                    }
                    static createCanvas() {
                        return document.createElement("canvas");
                    }
                }

                var chkmn = [];
                
                // var kb_main = 0;
                // strng1.forEach(element => {
                //     chkmn = [];
                //     chkmn.push(strng2[kb_main]);
                //     chkmn.push(strng1[kb_main]);
                //     // console.log(chkmn);
                //         data2.push(chkmn);
                //         kb_main++;
                //     });


                var kb_main = 0;
                strng1.forEach(element => {
                    chkmn = [];
                    if(strng2[kb_main]!='' || strng2[kb_main]!=0){
                        chkmn.push(strng2[kb_main]);
                        chkmn.push(strng1[kb_main]);
                        data2.push(chkmn);
                    }
                        kb_main++;
                    });

                var x = document.getElementById("lo-website-iframe");
                const canvas2 = x.contentWindow.document.getElementById("heat-map");

                document.getElementsByClassName('filtered')[0].innerText = data2.length+' Moves';

                const heat = new HeatMap(canvas2, data2);
                heat.draw(0.85);

                // ===================================
                // =========== HEATMAP END ===========
                // ===================================



            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(xhr.responseText);

            }
        });
    }

    var scrheight = 0;
    var scrwidth = 0;
    var heatmapready = false;

    function removeactiveclass(value,position){
        var array = document.getElementsByClassName(value);
        Array.from(array).forEach(element => {
            element.classList.remove('active');
        });
        document.getElementsByClassName(value)[position].classList.add('active');
    }

    function devicecheck(){
        var x = document.getElementById("lo-website-iframe");

        switch (this.value) {
            case 'desktop':
                document.getElementById('lo-website-iframe-container').style.width = '100%';
                removeactiveclass('kb-devicebtn',0);
                document.getElementById("lo-website-iframe-container").classList.remove('tablet');
                document.getElementById("lo-website-iframe-container").classList.remove('phone');

                setTimeout(function(){
                    scrheight = x.contentDocument.body.scrollHeight;
                    scrwidth = (x.contentDocument.body.scrollWidth)-60;
                    x.contentWindow.document.getElementById("heat-map").setAttribute('width',scrwidth);
                    x.contentWindow.document.getElementById("heat-map").setAttribute('height',scrheight);
                    x.contentWindow.document.getElementById("kb-heatmap").style.height = scrheight+'px';

                    if(heatmapready==false){
                        createheatmp(); 
                    }else{
                        createheatmpmouse();
                    }

                },500);               

                break;
            case 'tablet':
                document.getElementById('lo-website-iframe-container').style.width = '868px';
                x.contentWindow.document.getElementById("heat-map").setAttribute('width','768');
                document.getElementById("lo-website-iframe-container").classList.add('tablet');
                document.getElementById("lo-website-iframe-container").classList.remove('phone');

                removeactiveclass('kb-devicebtn',1);

                setTimeout(function(){
                    scrheight = x.contentDocument.body.scrollHeight;
                    scrwidth = (x.contentDocument.body.scrollWidth)-60;
                    x.contentWindow.document.getElementById("heat-map").setAttribute('height',scrheight);
                    x.contentWindow.document.getElementById("kb-heatmap").style.height = scrheight+'px';

                    if(heatmapready==false){
                        createheatmp(); 
                    }else{
                        createheatmpmouse();
                    }
                    
                },500);               

                break;
            case 'phone':
                document.getElementById('lo-website-iframe-container').style.width = '380px';
                x.contentWindow.document.getElementById("heat-map").setAttribute('width','342');
                document.getElementById("lo-website-iframe-container").classList.add('phone');
                document.getElementById("lo-website-iframe-container").classList.remove('tablet');

                removeactiveclass('kb-devicebtn',2);

                setTimeout(function(){
                    scrheight = x.contentDocument.body.scrollHeight;
                    scrwidth = (x.contentDocument.body.scrollWidth)-60;
                    x.contentWindow.document.getElementById("heat-map").setAttribute('height',scrheight);
                    x.contentWindow.document.getElementById("kb-heatmap").style.height = scrheight+'px';

                    if(heatmapready==false){
                        createheatmp(); 
                    }else{
                        createheatmpmouse();
                    }

                },500);               

                break;
            default:
                break;
        }
       
    }

    var elements2 = document.getElementsByClassName("kb-devicebtn");
    Array.from(elements2).forEach(function(element) {
      element.addEventListener('click', devicecheck);
    });

    document.getElementsByName('device-width')[0].addEventListener('change',function(){

        var x = document.getElementById("lo-website-iframe");
        document.getElementById('lo-website-iframe-container').style.width = (this.value)+'px';

        if(this.value>window.innerWidth){
            document.getElementById('lo-website-iframe-container').style.transform = 'scale(0.9)';
        }

        x.contentWindow.document.getElementById("heat-map").setAttribute('width',this.value-17);

        setTimeout(function(){
            scrheight = x.contentDocument.body.scrollHeight;
            scrwidth = (x.contentDocument.body.scrollWidth)-60;
            x.contentWindow.document.getElementById("heat-map").setAttribute('height',scrheight);
            x.contentWindow.document.getElementById("kb-heatmap").style.height = scrheight+'px';
            createheatmp();
        },500); 

    });

    document.getElementsByName('device-height')[0].addEventListener('change',function(){

        if(this.value!='' && this.value!=0){
            document.getElementById('lo-website-iframe-container').style.maxHeight = (this.value)+'px';
        }else{
            document.getElementById('lo-website-iframe-container').style.maxHeight = '100%';
        }

    });

    document.getElementsByName('heatmap-opacity')[0].addEventListener('change',function(){
        document.getElementsByClassName('heatmapopacity')[0].innerHTML = this.value*100+'%';

        var x = document.getElementById("lo-website-iframe");
        x.contentWindow.document.getElementById('kb-heatmap').style.opacity = this.value;   
    });

    document.getElementsByName('show-heatmap')[0].addEventListener('click',function(){
        var checkBox = document.getElementsByName("show-heatmap")[0];
        var x = document.getElementById("lo-website-iframe");
        if (checkBox.checked == true){
            x.contentWindow.document.getElementById('kb-heatmap').style.backgroundColor = "transparent";   
        } else {
            x.contentWindow.document.getElementById('kb-heatmap').style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        }
    });

    document.getElementsByName('show-background')[0].addEventListener('click',function(){
        var checkBox = document.getElementsByName("show-background")[0];
        var x = document.getElementById("lo-website-iframe");
        if (checkBox.checked == true){
            x.contentWindow.document.getElementById('kb-heatmap').style.display = "block";   
        } else {
            x.contentWindow.document.getElementById('kb-heatmap').style.display = "none";
        }
    });

    document.getElementById('kb-moves').addEventListener('click',function(){
        document.getElementById('kb-clicks').classList.remove('active');
        this.classList.add('active');
        createheatmpmouse();
        heatmapready = true;
    });
    
    document.getElementById('kb-clicks').addEventListener('click',function(){
        document.getElementById('kb-moves').classList.remove('active');
        this.classList.add('active');
        createheatmp();
        heatmapready = false;
    });

    document.getElementById('heatmap-reload').addEventListener('click',function(){

        // all input inside segmentation checked true
        var htrelm = document.getElementById('segmentation-panel-scroll-container');
        var chkelm = htrelm.querySelectorAll('input');
        chkelm.forEach(element => {
            if(!element.checked){
                element.checked = true;
            }
        });
        document.getElementById('ui-datepicker1').value = '';
        document.getElementById('ui-datepicker2').value = '';
        // all input inside segmentation checked true
        
        this.classList.add('refreshrotate');
        var ths = this;
        if(heatmapready==false){
            createheatmp(); 
        }else{
            createheatmpmouse();
        }
        setTimeout(() => {
           ths.classList.remove('refreshrotate');
        }, 1000);
    });
    
    function createhtml2canvasscript(){
        var wa = document.createElement('script'); wa.type = 'text/javascript'; wa.async = true;
		wa.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js';
        wa.id = 'kb-html2canvas';
		var s = document.getElementsByTagName('body')[0]; s.appendChild(wa);
    }

    var checkhtml2canvas = false;

    document.getElementById('screenshot-button').addEventListener('click',function(){

        if(checkhtml2canvas==false){
            createhtml2canvasscript();
            checkhtml2canvas = true;
        }

        document.getElementById('kb-screenshotcont').style.display = "flex";
        document.getElementById('kb-insidescrn-first').style.display = "block";

        setTimeout(() => {
            var x = document.getElementById("lo-website-iframe");
            var y =  x.contentDocument.body;

            html2canvas(y, {
                onrendered: function(canvas)  
                {
                    //src = url;
                    var img = canvas.toDataURL();
                    document.getElementById('capturescreenshot-kb').href = img;

                    var dateObj = new Date();
                    var month = dateObj.getUTCMonth() + 1;
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();
                    
                    newdate = year + "-" + month + "-" + day;

                    var topurl = window.location.href.toString().split('#kb-heatmaps')[0];

                    document.getElementById('capturescreenshot-kb').setAttribute('download','heatmat-'+newdate+'-'+topurl);


                    canvas.toBlob(function(blob) {
                        //     saveAs(blob, "screenshot.png");
                    var url = URL.createObjectURL(blob);
                        // console.log(url);

                        document.getElementById('kb-scr-src').src = url;
                        document.getElementById('kb-link1').href = url;
                        document.getElementById('kb-link2').href = url;
                        
                        document.getElementById('kb-insidescrn-first').style.display = "none";
                        document.getElementById('kb-insidescrn-second').style.display = "flex";
                        
                    });
                }
            });
            return false;
        }, 1000);
  
    });

    // https://www.w3schools.com/jsref/tryit.asp?filename=try_dom_event_timestamp

    document.getElementById('bw-close-scrnsht').addEventListener('click',function(){
        document.getElementById('kb-screenshotcont').style.display = "none";
        document.getElementById('kb-insidescrn-second').style.display = "none";
    });

    // layout js
    
    document.getElementById('heatmap-recording').addEventListener('click',function(){
        document.getElementById('recordings').style.display = "block";
    });

   
    $.ajax({
        url: "http://127.0.0.1:8000/showrecordheat",
        type: "GET",
        dataType: 'json',
        data:  {
            url: window.location.href.toString().split('#kb-heatmaps')[0]
        },
        contentType: 'application/json',
        CrossDomain:true,
        success: function (data) {
            // console.log(data);
            data.forEach(element => {
                var myArray = element['created_at'].split("-");
                if(myArray[0]!=''){

                    $.ajax({
                        url: "http://127.0.0.1:8000/getheatdir",
                        type: "GET",
                        dataType: 'json',
                        data:  {
                            hash: element['uniqueid']
                        },
                        contentType: 'application/json',
                        CrossDomain:true,
                        success: function (data) {
                            if(data[0]!=undefined){
                                var dt = myArray[0]+'-'+myArray[1]+'-'+myArray[2];
                                var hashvl = element['uniqueid'];
                                document.getElementById('myheatrecordol').innerHTML += "<li><span>"+dt+"</span><span><a target='_blank' href='http://127.0.0.1:8000/heatmaps-recordings#"+hashvl+"'>View Recording</a></span></li>";
                            }
                        }
                    });


                   
                }
            });
        }
    });


    

}


// head section script
{/* <script>
(function() {
    var wa = document.createElement('script'); wa.type = 'text/javascript'; wa.async = true;
    wa.src = 'http://127.0.0.1:8000/js/kb_heatmap.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(wa, s);
  })();
</script> */}