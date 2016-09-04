$(function() {
    var $slider = $(".slider");
    var $slidesList = $slider.find(".slides");
    var $slides = $slidesList.find(".slide");
    
    var sliderHandler;
    var currentSlide = 1;
    var marginStep = 1300;
    var duration = 1000;
    var margin;
    $(".nav").mouseenter(function() {
        $(this).css({backgroundColor: "rgba(255, 255, 255, 0.5)"});
    })
    .mouseleave(function() {
        $(this).css({backgroundColor: "rgba(255, 255, 255, 0.2)"});
    });
    
    $(".left").click(function(){
        if(currentSlide === $slides.length) {
            currentSlide = 1;
            $slidesList.css({"marginLeft": marginStep});
            $slidesList.animate({"marginLeft": 0}, duration);
        }else {
            $slidesList.animate({"marginLeft": "-=" + marginStep}, duration) 
            currentSlide ++;
        }
        
    });
    
    $(".right").click(function(){
        if(currentSlide === 1) {
            currentSlide = 9;
            $slidesList.css({"marginLeft": "-" + marginStep * $slides.length - 1});
            $slidesList.animate({"marginLeft": "+=" + marginStep}, duration);
        }else{
            $slidesList.animate({marginLeft: "+=" + marginStep}, duration);
            currentSlide -= 1;
        }
    });
    
    function makeRequest () {
        $.ajax({
            url: "http://localhost:8080/number",
            method: "GET",
            dataType: "json",
            success: function(result){
                var number = Math.floor(result.number * $slides.length);
                $slidesList.animate({"marginLeft": "-" + marginStep * number}, duration);
            }
        });
    };
    
    $("#slide").on("click", function(){
        sliderHandler = setInterval(makeRequest, 2000);
    });
    $("#stop").on("click", function() {
        clearInterval(sliderHandler);
    })
})