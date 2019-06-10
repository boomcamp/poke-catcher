const btn = (function (){
    function checkBtn(){
        if(selectArea.value){
            exploreBtn.disabled = false;
        }
        else{
            exploreBtn.disabled = true;
        }
    }

    return{
        checkBtn,
    }
})()