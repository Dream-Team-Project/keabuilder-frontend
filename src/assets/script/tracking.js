window.onload = function(a){ 
    document.querySelectorAll('.kb-product-btn').forEach(function(b){
        b.addEventListener("click", handleSubmition);
    });
    
    // console.log(itemscustm);
    
    async function handleSubmition(e) {
        var producttype = e.target.getAttribute('kb-btn-type')==null ? e.target.parentElement.getAttribute('kb-btn-type') :e.target.getAttribute('kb-btn-type');
        // console.log(producttype);
        if(producttype=='upsell' || producttype=='downsell'){
            e.preventDefault();
            var productid = e.target.getAttribute('kb-product-id')==null ? e.target.parentElement.getAttribute('kb-product-id') :e.target.getAttribute('kb-product-id');
            
            var custmid = window.location.hash.split('?')[0]?.split('=')[0]=='#customerid'?window.location.hash.split('?')[0]?.split('=')[1]:'';
            var userid = window.location.hash.split('?')[1]?.split('=')[0]=='userid'?window.location.hash.split('?')[1]?.split('=')[1]:'';
            var itemscustm = { customerid: custmid, user_id:userid,productid:productid };
            // console.log(itemscustm);
            const response = await fetch("http://localhost:4200/api/paymentupsell", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(itemscustm ),
            });
            var getresponse = await response.json();

            // console.log(getresponse);
            var gopath = getresponse.path;
            if(getresponse.success){
                alert('Payment Successful!');
                if(gopath!=''){
                    window.location.href = '/'+gopath+'/'+'#customerid='+custmid+'?userid='+userid;
                }
            }else{
                alert('Something Went Wrong!');
            }
        }
    }
}