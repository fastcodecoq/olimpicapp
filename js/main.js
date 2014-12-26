window.addEventListener('load', function(e) {
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 1);
}, false);



window.player = document.getElementById('player');
window.emi = document.getElementById('emisora');
window.emisra = "";
window.twitter = "OlimpicaStereo";
window.playing = "";
window.playingEmi = "";


window.player.addEventListener('playing', function() {

    loader.hide();

});


window.player.addEventListener('waiting', function() {

    loader.show();

});


window.player.addEventListener('pause', function() {


    loader.hide();

});



window.emi.addEventListener('playing', function() {

    loader.hide();
    $('.emis').addClass('icon-pause').
    addClass('playing');


});


window.emi.addEventListener('waiting', function() {

    loader.show();
    $('.emis').addClass('icon-pause');

});


window.emi.addEventListener('pause', function() {


    loader.hide();
    $('.emis')
        .removeClass('icon-pause')
        .removeClass('playing');



});


var app = angular.module('olimpicapp', []);

// controller emisoras

app.controller('emisoras', function($scope, $http) {

    // pasaremos esto a un catalogo

    $scope.frec = "000.0";






    $http.get("http://gomosoft.com/services/servicios/emisoras.json")
    // .get("servicios/emisoras.json")
    .success(function(rs) {
        $scope.emisoras = rs.data;
        window.appurl = rs.appurl;
    })



    $scope.play = function() {

        if (!$scope.emisoraSel) {
            alert("Debes seleccionar una ciudad.");
            return;
        }





        if (window.playingEmi === $scope.emisoraSel.src) {
            emi.play();
            return;
        }

        emi.src = $scope.emisoraSel.src;
        emi.load();
        emi.play();

        $scope.frec = $scope.emisoraSel.frec || "000.0";
        $('button.rep').removeClass('icon-pause').addClass('icon-play2');


        window.playingEmi = $scope.emisoraSel.src;
        $scope.reproduciendo = true;
        player.pause();
        window.twitter = $scope.emisoraSel.twitter || "OlimpicaStereo";

        if ($scope.emisoraSel.tel) document.getElementById("tel").href = "tel:" + $scope.emisoraSel.tel;
        else document.getElementById("tel").href = "tel:0315554433";


    }







});


// controller 20 Latinas


app.controller('20Latinas', function($scope, $http) {


    $scope.Lats20 = {};
    $scope.cargado = false;


    $http.get('http://gomosoft.com/services/servicios/20Latinas.php')
        .success(function(rs) {

        $scope.Lats20 = rs.rs;
        $scope.cargado = true;
        loader.hide();


    });

    $scope.reproduciendo = false;
    $scope.share = function(nombre, artista, src) {
        console.log(nombre, artista, src);

        var msg = 'Estoy escuchando ' + nombre + ' de ' + artista + ', en la aplicación móvil de Olimpica Stereo.';
        var link = 'http://olimpicastereo.com.co/20-latinas';
        window.plugins.socialsharing.share(msg, 'escuchando ' + nombre + ' de ' + artista, src, link);

    }


    $scope.play = function(event, src) {

        console.log(src);

        if (src === "emi") {

            player.pause();
            emi.play();
            window.emisra = window.playing;
            console.log(window.playing);


            if (!window.playing && !src) return;

            if (window.emisra === window.playing) // si la emisora se estaba reproduciendo solo la reanudamos
            {
                if ($scope.reproduciendo) {
                    $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                    $('.emis').addClass('icon-play2');
                    $scope.reproduciendo = false;
                    emi.pause();
                } else {
                    $scope.reproduciendo = true;
                    $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                    $('.emis').addClass('icon-pause');
                    player.pause();
                    emi.play();
                }
                return;
            }

            return;

        }

        if (window.playing === src) // si el track ya estaba en reprodución solo lo reproducimos nuevamente
        {
            if ($scope.reproduciendo) {
                $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                $(event.target).addClass('icon-play2');
                player.pause();
                $scope.reproduciendo = false;
            } else {
                $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                $(event.target).addClass('icon-pause');
                emi.pause();
                player.play();
                $scope.reproduciendo = true;
            }
            return;
        }

        emi.pause();
        player.src = src;
        player.load();
        player.play();

        $scope.reproduciendo = true;
        $('button.rep').removeClass('icon-pause').addClass('icon-play2');
        $(event.target).addClass('icon-pause');
        window.playing = src;

    }




});


//controller twitter


app.controller("twitter", function($scope) {

    $scope.tuit = "";

    $scope.doTuit = function() {
        if ($("#tuit").val().trim() == "") {
            alert("El mensaje no puede estar vacio");
        } else {
            window.plugins.socialsharing.shareViaTwitter($scope.tuit + ' via @' + window.twitter + ' ' + window.appurl);

            $("#tuit")
                .css(height, window.initialHeight + "px")
                .val('');

        }
    }

});


//objeto app 


var app = {
    run: function() {



        window.loader = $(".loader-wrap");

        var lastScrollTop = 0;

        $(window).scroll(function() {

            $("header").css("transform", "translateY(0)");


        });

        $('#repro-emi').on('click', '.emis.playing', function() {

            emi.pause();
            return;

        });


        $(".app-content").scroll(function() {
            var st = $(this).scrollTop();

            console.log(st, lastScrollTop);

            if (st > lastScrollTop) {
                $("footer").css("bottom", "-" + ($("footer").height() + 15) + "px");
            } else {
                $("footer").css({
                    transform: "translate3d(0,0" + $(window).scrollTop() + "px,0)",
                    bottom: 0
                });
            }

            lastScrollTop = st;

        });


        $("#tuit").on("focus", function() {

            $("footer").toggleClass('noauto');

        });


        $("#tuit").on("blur", function() {

            $("footer").toggleClass('noauto');

        });

    }

}


//miramos si corre con phonegap 

if ( !! window.cordova)

// device ready phonegap

document.addEventListener("deviceready", function() {

    app.run();
   // window.plugin.backgroundMode.enable();

});

else

// Ready Jquery

$(app.run);

// esto hará que un textarea ajuste el alto al contenido 

function autoGrow(oField) {

    if (!window.initialHeight) window.initialHeight = oField.clientHeight;

    if (oField.value.split("").length === 0) oField.style.height = window.initialHeight + "px";

    if (oField.scrollHeight > oField.clientHeight) oField.style.height = oField.scrollHeight + "px";

}