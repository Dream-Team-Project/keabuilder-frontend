
const app_assets_url = 'http://localhost:4200/assets/sites/';

function includeMenuCode(num) {
    var menus = document.querySelectorAll(".kb-menu");
    var item = menus[num];
    if(item) {
        fetch(app_assets_url+"menus/"+item.getAttribute('kb-include-menu')+".html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            var parser = new DOMParser;
            var xmlDoc = parser.parseFromString(data,"text/html");
            item.innerHTML = xmlDoc.querySelector('ul').innerHTML;
            num++;
            if(menus.length != num) includeMenuCode(num);
        });
    }
}

function includeTrackingCode() {
    var track = document.querySelector("#tracking-js");
    var uid = track.getAttribute("kb-uniqueid");
    track.removeAttribute('kb-uniqueid');
    
    const fetchReq1 = fetch(
        app_assets_url+uid+`/tracking/header-tracking.html`
    ).then((res) => {return res.text()})
    
    const fetchReq2 = fetch(
        app_assets_url+uid+`/tracking/footer-tracking.html`
    ).then((res) => {return res.text()});

    const allData = Promise.all([fetchReq1, fetchReq2]);
    
    allData.then((res) => {
        var parser = new DOMParser;

        var hc = parser.parseFromString(res[0],"text/html");
        var hscript = hc.getElementsByTagName('script')[0];
        if(hscript) {
            var hscr = document.createElement('SCRIPT');
            hscr.innerHTML = hscript.innerHTML.trim();
            document.head.appendChild(hscr);
        }
        var hstyle = hc.getElementsByTagName('style')[0];
        if(hstyle) {
            var hcss = hc.createElement('STYLE');
            hcss.innerHTML = hstyle.innerHTML.trim();
            document.head.appendChild(hcss);
        }

        var fc = parser.parseFromString(res[1],"text/html");
        var fscript = fc.getElementsByTagName('script')[0];
        if(fscript) {
            var fscr = document.createElement('SCRIPT');
            fscr.innerHTML = fscript.innerHTML.trim();
            document.body.appendChild(fscr);
        }
        var fstyle = fc.getElementsByTagName('style')[0];
        if(fstyle) {
            var fcss = fc.createElement('STYLE');
            fcss.innerHTML = fstyle.innerHTML.trim();
            document.head.appendChild(fcss);
        }

    });      
}

window.onload = (e) => {
    // includeMenuCode(0);
    // includeTrackingCode();
};