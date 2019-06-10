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

    function hideShow(m1,m2){
        pFound.classList[m1]('hide');
        pName.classList[m1]('hide');
        pImg.classList[m1]('hide');
        capture.classList[m1]('hide');
        pStats.classList[m1]('hide');
        msg.classList[m2]('hide');
    }

    return {
        fetchJSON,
        options,
        hideShow
    };
})();