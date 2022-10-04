function includeMenuCode(num) {
    var menus = document.querySelectorAll(".kb-menu");
    var item = menus[num];
    if(item) {
        fetch("http://localhost:4200/assets/sites/menus/"+item.getAttribute('kb-include-menu')+".html")
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
async function includeTrackingCode(){let a=document.querySelector("#tracking-js"),b=a.getAttribute("kb-include-path");a.removeAttribute("kb-include-path");let c=new Promise(function(a){let c=new XMLHttpRequest;c.open("GET",b),c.onload=function(){parser=new DOMParser,xmlDoc=parser.parseFromString(c.response,"text/html"),200==c.status?a(xmlDoc):a("")},c.send()});var d=await c,e=document.querySelector("HEADER");"true"==e.getAttribute("kb-include-html")?e.outerHTML=d.querySelector("#kb-header-html").innerHTML:e.remove();var f=document.querySelector("FOOTER");"true"==f.getAttribute("kb-include-html")?f.outerHTML=d.querySelector("#kb-footer-html").innerHTML:f.remove();var g=d.querySelector("#kb-header-tracking");g.querySelectorAll("style").forEach(a=>{document.head.appendChild(a)}),g.querySelectorAll("script").forEach(a=>{var b=document.createElement("SCRIPT");b.innerHTML=a.innerHTML,document.head.appendChild(b)});var h=d.querySelector("#kb-footer-tracking");h.querySelectorAll("script").forEach(a=>{var b=document.createElement("SCRIPT");b.innerHTML=a.innerHTML,document.body.appendChild(b)})}
includeTrackingCode();
window.onload = (e) => {
    includeMenuCode(0);
};