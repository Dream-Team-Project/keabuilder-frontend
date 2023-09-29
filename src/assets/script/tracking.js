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
            var redirectlink = e.target.getAttribute('kb-redirect-link')==null ? e.target.parentElement.getAttribute('kb-redirect-link') :e.target.getAttribute('kb-redirect-link');
            var custmid = window.location.hash.split('?')[0]?.split('=')[0]=='#customerid'?window.location.hash.split('?')[0]?.split('=')[1]:'';
            var userid = window.location.hash.split('?')[1]?.split('&')[0]?.split('=')[0]=='userid'?window.location.hash.split('?')[1]?.split('&')[0]?.split('=')[1]:'';
            var email = window.location.hash.split('?')[1]?.split('&')[1]?.split('=')[0]=='email'?window.location.hash.split('?')[1]?.split('&')[1]?.split('=')[1]:'';
            if(custmid && userid && offerid) {
                var itemscustm = { customerid: custmid, user_id:userid, offerid:offerid, email: email };
                const response = await fetch("https://app.keabuilder.com/api/paymentupsell", {
                // const response = await fetch("http://localhost:4200/api/paymentupsell", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(itemscustm),
                });
                var getresponse = await response.json();
                if(getresponse.success){
                    alert('Payment Successful!');
                    if(redirectlink!='') window.location.href = redirectlink+'#customerid='+custmid+'?userid='+userid;
                }
                else alert('Something Went Wrong!');
            }
        }
    }
    // offer code
}