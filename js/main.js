  // Code Jquery



   $(function(){
     
     var lastScrollTop = 0;

    $(window).scroll(function() {
      
      $("header").css("transform", "translateY(0)");

    
     });

    $(".app-content").scroll(function(){
        var st = $(this).scrollTop();

     console.log(st,lastScrollTop);
   
      if (st > lastScrollTop){
         $("footer:not('footer.noauto')").css("bottom", "-" + ( $("footer").height() + 15 ) + "px");
        } else {
         $("footer:not('footer.noauto')").css({transform : "translate3d(0,0" + $(window).scrollTop() + "px,0)", bottom:0});        
      }

   lastScrollTop = st;

});


    $("#tuit").on("focus", function(){

           $("footer").toggleClass('noauto');

    });


    $("#tuit").on("blur", function(){

           $("footer").toggleClass('noauto');

    });




});

    // esto hará que un textarea ajuste el alto al contenido 

function autoGrow (oField) {
      console.log("yey")
  if (oField.scrollHeight > oField.clientHeight) 
    oField.style.height = oField.scrollHeight + "px";
  
}