async function includeGlobal() {
    let file = "/assets/keapages/global.html";
    let myPromise = new Promise(function(resolve) {
        let req = new XMLHttpRequest();
        req.open('GET', file);
        req.onload = function() {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(req.response,"text/html");
            if(req.status == 200) {
                resolve(xmlDoc);
            }
            else resolve('');
        };
        req.send();
    });
    var doc = await myPromise;
    var header = document.querySelector('HEADER');
    var footer = document.querySelector('FOOTER');
    if(header.getAttribute('kb-include-html') == 'true') header.outerHTML = doc.querySelector('HEADER').outerHTML;
    else header.remove();
    if(footer.getAttribute('kb-include-html') == 'true') footer.outerHTML = doc.querySelector('FOOTER').outerHTML;
    else footer.remove();
    var ht = doc.head.querySelector('#kb-header-tracking');
    var hsrc = document.createElement('SCRIPT');
    hsrc.innerHTML = ht.innerHTML;
    document.head.appendChild(hsrc);
    var gs = doc.head.querySelector('#kb-global-style');
    document.head.appendChild(gs);
    var hs = doc.head.querySelector('#kb-header-style');
    document.head.appendChild(hs);
    var fs = doc.head.querySelector('#kb-footer-style');
    document.head.appendChild(fs);
    var ft = doc.body.querySelector('#kb-footer-tracking');
    var fsrc = document.createElement('SCRIPT');
    fsrc.innerHTML = ft.innerHTML;
    document.body.appendChild(fsrc);
}
includeGlobal();

