
    $("#explore").hover(
        function() {
            $(".red-gif").attr("src", "img/red-running.gif");
            $(".pikachu-gif").attr("src", "img/pikachu-running.gif");
        },
        function() {
            $(".red-gif").attr("src", "img/red-static.gif");
            $(".pikachu-gif").attr("src", "img/pikachu-static.gif");
        }                         
    );
    $("#catch").hover(
        function() {
            $("#pokeball-catch").attr("src", "img/catch-pokeball.gif");
        },
        function() {
            $("#pokeball-catch").attr("src", "img/catch-static.gif");
        }   
    );
