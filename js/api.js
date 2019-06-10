const API = (function() {

    function fetchJSON(url,get) {
        return fetch(url)
            .then(result => result.json())
            .then(data => data[get]);
    }
    
    function options(opt,optURL,get){
        fetchJSON(optURL,get).then(data => {
            opt.innerHTML = data.map(reg => 
                `<option value="${reg.url}">${reg.name}</option>`)
                .join('');
        });
    }

    function hideShow(rem,add){
        pName.classList[rem]('hide');
        pImg.classList[rem]('hide');
        capture.classList[rem]('hide');
        pStats.classList[rem]('hide');
        msg.classList[add]('hide');
    }

    return {
        fetchJSON,
        options,
        hideShow
    };
})();