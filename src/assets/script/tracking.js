window.onload = function(a){ 
    // product code
    document.querySelectorAll('.kb-product-btn').forEach(function(b){
        b.addEventListener("click", handleSubmition);
    });
    async function handleSubmition(e) {
        var producttype = e.target.getAttribute('kb-btn-type')==null ? e.target.parentElement.getAttribute('kb-btn-type') :e.target.getAttribute('kb-btn-type');
        if(producttype=='upsell' || producttype=='downsell'){
            e.preventDefault();
            var productid = e.target.getAttribute('kb-product-id')==null ? e.target.parentElement.getAttribute('kb-product-id') :e.target.getAttribute('kb-product-id');
            var custmid = window.location.hash.split('?')[0]?.split('=')[0]=='#customerid'?window.location.hash.split('?')[0]?.split('=')[1]:'';
            var userid = window.location.hash.split('?')[1]?.split('=')[0]=='userid'?window.location.hash.split('?')[1]?.split('=')[1]:'';
            if(custmid && userid && productid) {
                var itemscustm = { customerid: custmid, user_id:userid,productid:productid };
                const response = await fetch("https://app.keabuilder.com/api/paymentupsell", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(itemscustm ),
                });
                var getresponse = await response.json();
                var gopath = getresponse.path;
                if(getresponse.success){
                    alert('Payment Successful!');
                    if(gopath!='') window.location.href = '/'+gopath+'/'+'#customerid='+custmid+'?userid='+userid;
                }
                else alert('Something Went Wrong!');
            }
        }
    }
    // product code
    // video muted
    document.querySelectorAll('.kb-video-muted').forEach(item=>{
        item.muted = true;
        item.classList.remove('kb-video-muted');
    });
    // video muted
}