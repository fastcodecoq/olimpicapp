
      window.addEventListener('load', function(e) {
        setTimeout(function() { window.scrollTo(0, 1); }, 1);
      }, false);


         window.player = document.getElementById('player');
         window.emisra = "";

        var app = angular.module('olimpicapp',[]);

        // controller emisoras

            app.controller('emisoras', function($scope, $http){

              // pasaremos esto a un catalogo
       

       $http
       .get("http://gomosoft.com/olimpicapp/servicios/emisoras.json")
       .success(function(rs){
           $scope.emisoras = rs.data;
       })


$scope.play = function(){    

        if(!$scope.emisoraSel)
        {
            alert("Debes seleccionar una ciudad.");
            return;
        }

       player.src = $scope.emisoraSel.src;
       window.playing = $scope.emisoraSel.src;

       if($scope.emisoraSel.tel)
         document.getElementById("tel").href = "tel:" + $scope.emisoraSel.tel;

       $scope.frec = $scope.emisoraSel.frec;

       player.load();
       player.play();
}

           

            });


  // controller 20 Latinas


            app.controller('20Latinas', function($scope, $http){

                $scope.Lats20 = {};

                $http
                .get('http://gomosoft.com/olimpicapp/servicios/20Latinas.php')
                .success(function(rs){

                    $scope.Lats20 = rs.rs;

                });


                $scope.play = function(src){   

                    console.log(src); 

                      if(src === "emi")
                      {

                       console.log(window.playing); 


                        if(!window.playing && !src) return;

                         if(window.emisra === window.playing) // si la emisora se estaba reproduciendo solo la reanudamos
                         {
                           player.play();
                           return;
                         }

                         player.src = window.playing;
                         player.load();
                         player.play();

                         window.emisra = window.playing;

                         return;

                      }  

                      if(window.playing === src) // si el track ya estaba en reprodución solo lo reproducimos nuevamente
                        {
                          player.play();
                          return;
                        }

                       player.src = src;
                       player.load();
                       player.play();

                       window.playing = src;

                }


                $scope.pause = function(){ player.pause(); }

            });
  

  //controller twitter


  app.controller("twitter", function($scope){

      $scope.tuit = "";

      $scope.doTuit = function(){
         window.open("https://twitter.com/intent/tweet?text=" + $scope.tuit + "&hashtags=NuevaApp&via=OlimpicaStereo", "_system");          
         $scope.tuit = "";
      }

  });




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

  if(!window.initialHeight)
     window.initialHeight = oField.clientHeight;
      
  if(oField.value.split("").length === 0)
     oField.style.height = window.initialHeight + "px";

  if (oField.scrollHeight > oField.clientHeight) 
    oField.style.height = oField.scrollHeight + "px";
  
}