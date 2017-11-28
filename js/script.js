$(document).ready(function(){

    $(".list-group li").click(function(){
        $(".list-group li").removeClass("active");
        $(this).addClass("active");
    });

});