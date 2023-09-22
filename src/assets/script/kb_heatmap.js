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

function allgeolocationdata() {
    // Create a script element to load the JSONP data
    const script = document.createElement('script');
    script.src = 'https://geolocation-db.com/jsonp';
  
    // Define a callback function that will be called when the data loads
    window.callback = function (location) {
      console.log(location);
      kb_location = location.country_name;
      allinonegeoloc[0] = location.country_code;
      allinonegeoloc[1] = location.country_name;
      allinonegeoloc[2] = location.state;
      allinonegeoloc[3] = location.city;
      allinonegeoloc[4] = location.postal;
      allinonegeoloc[5] = location.latitude;
      allinonegeoloc[6] = location.longitude;
      allinonegeoloc[7] = location.IPv4;
  
      // Clean up by removing the script element and callback function
      document.body.removeChild(script);
      delete window.callback;
    };
  
    // Append the script element to the document to trigger the JSONP request
    document.body.appendChild(script);
  }
  


function callback(response){
    // kb_location = response.country_name;
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

kb_unique_id = makeid(20);

kb_location = '';


kb_doctitle = document.getElementsByTagName('title')[0].innerText;

var kb_usergetlocX = [];
var kb_usergetlocY = [];

var kb_mousegetlocX = [];
var kb_mousegetlocY = [];

var kb_fulldata = {};

// var windoworigin = window.origin;
var windoworigin = 'http://localhost:3000';

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

function forclick(e){
    kb_usergetlocX.push(e.clientX);

    if(window.scrollY!=0){
        kb_usergetlocY.push(e.clientY+window.scrollY);
    }else{
        kb_usergetlocY.push(e.clientY);
    }

    kb_fulldata['locx'] = kb_usergetlocX;
    kb_fulldata['locY'] = kb_usergetlocY;
    kb_fulldata['location'] = kb_location;

    console.log(kb_fulldata);

        let url = `${windoworigin}/heat-request`;
        let data = { name: kb_fulldata };

        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Handle the success response here
            console.log(data);
        })
        .catch((error) => {
            // Handle errors here
            console.error(error);
        });


}

function formouse(e){
    kb_mousegetlocX.push(e.clientX);
    kb_fulldata['location'] = kb_location;

    if(window.scrollY!=0){
        kb_mousegetlocY.push(e.clientY+window.scrollY);
    }else{
        kb_mousegetlocY.push(e.clientY);
    }

    console.log(kb_mousegetlocX);
    console.log(kb_mousegetlocY);

    kb_fulldata['Mlocx'] = kb_mousegetlocX;
    kb_fulldata['MlocY'] = kb_mousegetlocY;

    // Assuming windoworigin is defined elsewhere in your code
    let url = `${windoworigin}/heat-request`;
    let data = {
    name: kb_fulldata
    };

    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the success response here
        console.log(data);
    })
    .catch(error => {
        // Handle errors here
        console.error(error);
    });


}

function recordheatmap(){

        let url = `${windoworigin}/saverecordheat`;
        let data = {
        created_at: kb_created_at,
        landing_page:location.href,
        location:kb_location,
        browser:kb_browser,
        os:kb_os,
        device:kb_device,
        doc_title:kb_doctitle,
        uniqueid: kb_unique_id,
        country_code: allinonegeoloc[0],
        country_name: allinonegeoloc[1],
        state: allinonegeoloc[2],
        city: allinonegeoloc[3],
        postal: allinonegeoloc[4],
        latitude: allinonegeoloc[5],
        longitude: allinonegeoloc[6],
        ipv4: allinonegeoloc[7]
        };
        console.log(data);

        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the success response here
            console.log(data);
        })
        .catch(error => {
            // Handle errors here
            console.error(error);
        });

}


if(window.location.hash!='#kb-heatmaps' && window.top.location.hash!='#kb-heatmaps'){

    window.addEventListener('click',forclick);
    // window.addEventListener('mousemove',formouse);
    allgeolocationdata();
    window.addEventListener('load',function(){
        recordheatmap();
    });

}
