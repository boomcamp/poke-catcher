$(function() {
    var pageTitle = $("title").text();
    $(window).blur(function() {
        $("title").text("Come Back!  You gotta catch 'em all!");
    });
    $(window).focus(function() {
        $("title").text(pageTitle);
    });
});