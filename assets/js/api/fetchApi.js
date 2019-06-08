
//responsible for returning the promise of all passed urls
function get(path){
    if(path!='none'){ 
    return fetch(path) //returns a promise
        .then(response => response.json())
        .catch(err=>console.log(err))
    }
    return 'none';
}

export default{
    get,
}