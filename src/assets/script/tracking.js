window.onload = function(a){ 
    // offer code
    document.querySelectorAll('.kb-offer-btn').forEach(function(b){
        b.addEventListener("click", handleSubmition);
    });
    async function handleSubmition(e) {
        var offertype = e.target.getAttribute('kb-btn-type')==null ? e.target.parentElement.getAttribute('kb-btn-type') :e.target.getAttribute('kb-btn-type');
        if(offertype=='upsell' || offertype=='downsell'){
            e.preventDefault();
            var offerid = e.target.getAttribute('kb-offer-id')==null ? e.target.parentElement.getAttribute('kb-offer-id') :e.target.getAttribute('kb-offer-id');
            var custmid = window.location.hash.split('?')[0]?.split('=')[0]=='#customerid'?window.location.hash.split('?')[0]?.split('=')[1]:'';
            var userid = window.location.hash.split('?')[1]?.split('=')[0]=='userid'?window.location.hash.split('?')[1]?.split('=')[1]:'';
            if(custmid && userid && offerid) {
                var itemscustm = { customerid: custmid, user_id:userid, offerid:offerid };
                const response = await fetch("https://app.keabuilder.com/api/paymentupsell", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(itemscustm),
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
    // offer code
    // video muted
    document.querySelectorAll('.kb-video-muted').forEach(item=>{
        item.muted = true;
        item.classList.remove('kb-video-muted');
    });
    // video muted
    // responsive menu
    document.querySelectorAll('.kb-menu-bar').forEach(item=>{
        item.addEventListener('click',()=>{
            item.classList.toggle("kb-menu-bar-open");
            item.parentElement.querySelector('.kb-menu-content').classList.toggle('kb-d-none');
        })
    });
  // responsive menu
    // block redirection
    document.querySelectorAll('.kb-block-redirection').forEach(block=>{
        block.addEventListener('click',()=>{
            console.log(block);
            var link = block.getAttribute('data-link');
            var target = block.getAttribute('data-target');
            if(link) window.open(link, target);
        })
    })
    // block redirection
}