const fetchAPI = (path) => {
    const baseURL = `https://pokeapi.co/api/v2/`;

    return fetch(`${baseURL}${path}`)
        .then(res => res.json())
        .then(function (posts)  {
            var postsValue = posts.results;
 
            postsValue.forEach(function(arrValue){
                console.log(arrValue.name);
            })
        })
}
