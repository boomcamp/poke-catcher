   
        document.getElementById('explore').addEventListener('click', 
        
        function(event) {
             var image = document.getElementById('myImage');
            if (image.src.match("1.png")) {
                image.src = "img/bg/2.jpg";
            } 
            else if(image.src.match("2.jpg")){
                image.src = "img/bg/3.png";
            }
            else if(image.src.match("3.png")){
                image.src = "img/bg/4.png";
            }
            else if(image.src.match("4.png")){
                image.src = "img/bg/5.png";
            }
            else if(image.src.match("5.png")){
                image.src = "img/bg/6.jpeg";
            }
             else if(image.src.match("6.jpeg")){
                image.src = "img/bg/7.png";
            }
             else if(image.src.match("7.png")){
                image.src = "img/bg/8.jpg";
            }
             else if(image.src.match("8.jpg")){
                image.src = "img/bg/9.jpeg";
            }
             else if(image.src.match("9.jpeg")){
                image.src = "img/bg/10.jpeg";
            }
            else if(image.src.match("10.jpeg")){
                image.src = "img/bg/11.jpg";
            }
             else if(image.src.match("11.jpg")){
                image.src = "img/bg/12.png";
            }
            else {
                image.src = "img/bg/1.png";
            }
        }
        );
        
        