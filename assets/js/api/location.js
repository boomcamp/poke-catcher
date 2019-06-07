
//responsible for returning the promise of all passed urls
function get(path){
    if(path === undefined){
        return fetch(`${path}`)
         .then(response => response.json());
    }else{
        return fetch(`${path}`)
         .then(response => response.json())
    }
}

export default{
    get,
}