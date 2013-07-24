   var listaEnlaces=new Array(
       '<li id="p0" ><a href="index.html">Inicio</a></li>',
       '<li id="p2" ><a href="Historia.html">Historia</a></li>',
       '<li id="p3"><a href="TiposMalware.html">Tipos de Malware</a></li>',
       '<li id="p4"><a href="Prevencion.html">¿Cómo combatirlos?</a></li>',
       '<li id="p4"><a href="Actividades.html">Actividades de Aprendizaje</a></li>',
        '<li id="p4"><a href="Referencias.html">Bibliografía</a></li>'
       );  
 
    function agregarMenu(){
          $("<link/>",{rel:  "stylesheet", type: "text/css", href: "css/bootstrap.min.css", media: "screen" }).appendTo("head");
          $("<link/>",{rel:  "stylesheet", type: "text/css", href: "css/bootstrap-responsive.min.css" }).appendTo("head");
          var menu= '<p><h1>El Malware</h1></p> \
                     <div class="navbar "> \
                            <div class="navbar-inner"> \
                                <div class="container"> \
                                    <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\
                                        <span class="icon-bar"></span>\
                                        <span class="icon-bar"></span>\
                                        <span class="icon-bar"></span>\
                                    </button>\
                                    <a class="brand">Navegacion</a> \
                                    <div class="nav-collapse collapse"> \
                                        <ul class="nav">'
                                              + listaEnlaces.join("")
                                     + '</ul> \
                                   </div> \
                                 </div> \
                            </div> \
                      </div>';  
            document.getElementById("mainMenu").innerHTML = menu;            
            $('.dropdown-toggle').dropdown();

        }
        
 