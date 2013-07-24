function pregunta(title,pregunta,respCorrecta,respUsuario,retroalimentacion){
    this.title=title;
    this.pregunta=pregunta;
    this.respCorrecta=respCorrecta;
    this.respUsuario=respUsuario;
    this.retroalimentacion=retroalimentacion;
}


var ListPreguntas=new Array( 
    new pregunta("Entiendo que...","Todo código malicioso es virus",
                0,null,"No todo codigo malicioso es virus, el virus es solo uno de los tipos de malware que existen ")
   , new pregunta("Sobre la historia..","En 1981, trece años depues de invetada el primer ordenador, se produjo la primera epidemia de virus informáticos",
                0,null,"En 1981 si se produjo la primera epidemia de virus, pero fue hasta despues de 34 años de haberse inventado el primer ordenador.Recuerda que el primer ordenador se invento en 1947.")
   ,new pregunta("El Spyware","Permite colectar la información sobre un usuario/organización de forma no autorizada. Su presencia puede ser completamente invisible para el usuario.",
                1,null,"El Spyware es un software que permite colectar la información sobre un usuario/organización de forma no autorizada. Su presencia puede ser completamente invisible para el usuario.")
  ,new pregunta("Rootkit"," Un rootkit es una colección de programas usados por un hacker para correos publicitarios de forma masiva",
                0,null," Un rootkit es una colección de programas usados por un hacker para evitar ser detectado mientras busca obtener acceso no autorizado a un ordenador. ")
 ,new pregunta("El correo y Wifi"," Son medios por los cuales se pueden propagar el malware",
                1,null," El correo electronico y las redes inalambricas pueden ser canales de transmision de malware.")
  ,new pregunta("Sobre seguridad"," Es conveniente usar distintas contraseñas para todos los sitios",
                1,null," Si se usa la misma contraseña y ésta es decifrada por otra persona, se corre un gran riesgo de perder la informacion de todos los sitios")
  ,new pregunta("En la decada de los 90"," Nacen los “virus polimórficos” cambiando sus atributos, excepto su código núcleo.",
                1,null,"Es en la decada de los 90 cuando nacen los “virus polimórficos” cambiando sus atributos, excepto su código núcleo.")
 ,new pregunta("Sobre seguridad"," Los documentos, a diferencia de otros archivos multimedia, no pueden contener codigo malicioso porque no es posible ejecutar scripts en ellos",
                0,null,"Todo archivo multimedia o documento digital es propenso a contener codigo malicioso.")
,new pregunta("Sobre seguridad"," La descarga mediante programas P2P ayudan a prevenir que mi PC se infecte de malware",
                0,null,"Los software P2P son un canal bastante inseguro, puesto que facilmente pueden transmitirse codigos maliciosos")
 ,new pregunta("El Phishing"," Es una variedad de programas espías que se propaga a través de correo",
                1 ,null,"Los Phishing son una variedad de programas espías que se propaga a través de correo. Metan recibir los datos confidenciales del usuario, de carácter bancario preferente")
 
    
    );


var correctas=0;
var incorrectas=0;
var indexPregunta=-1;

$(document).ready(function (){
    cargarProximaPregunta();
    
});

function  cargarProximaPregunta(){
    $("#contestadas").html(parseInt(indexPregunta+1)+" de "+ListPreguntas.length );
     $("#correctas").html(correctas+" de "+parseInt(indexPregunta+1));
    if(indexPregunta<ListPreguntas.length-1){       
        if(indexPregunta==-1)
            indexPregunta=0;
        else
            indexPregunta++;
        $("#title").html(ListPreguntas[indexPregunta].title);
        $("#pregunta").html(ListPreguntas[indexPregunta].pregunta); 
        $(".mainContainer").slideUp(500).delay(50).slideDown(500);
        
        $(".resp").fadeIn(100);
        $(".sig").attr("disabled","disabled");
         $("#retroContainer").fadeOut(1000);
         
         if(indexPregunta==ListPreguntas.length-1)
             $(".sig").html("Terminar");
    }
    else{ 
          $(".mainContainer").fadeOut(500);
          var mensaje;
          var tipoMsg;
          var promedio= Math.floor((correctas/ListPreguntas.length)*100);  
           if(promedio>80){
            mensaje='<h3>Exelente!!! </h3><hr/><p class="lead">Tiesnes un promedio de <strong>'+promedio+'</strong>.  Estos son tus resultados</p>';
            tipoMsg=1;
           }else if(promedio>60){
                mensaje='<h3>Hey, lo has hecho muy bien!!!</h3><hr/><p class="lead">Tiesnes un promedio de <strong>'+promedio+'</strong>.  Estos son tus resultados</p>';
                tipoMsg=3;
           }else  {
                      mensaje='<h3>Upsss, necesitas repasar el contenido un poco mas!!!</h3><hr/><p class="lead">Tiesnes un promedio de <strong>'+promedio+'</strong>.  Estos son tus resultados</p>';
                      tipoMsg=0;
           }
                  
            mensaje=mensaje+getResultHTML();
            mostrarMensaje(mensaje,tipoMsg);
            
            
    }  
}

function contestarPreg(resp){
    
    ListPreguntas[indexPregunta].respUsuario=resp; 
    if(resp==ListPreguntas[indexPregunta].respCorrecta){
        mensaje='<h3>Correcto!!!</h4><p class="lead">'+ListPreguntas[indexPregunta].retroalimentacion+'</p>';
        mostrarMensaje(mensaje,1);
        correctas++;      
    }
    else{
        mensaje='<h3>Upsss, incorrecto!!!</h4><p class="lead">'+ListPreguntas[indexPregunta].retroalimentacion+'</p>';
        mostrarMensaje(mensaje,0);
        incorrectas++;
    }
    
     $("#contestadas").html(parseInt(indexPregunta+1)+" de "+ListPreguntas.length );
     $("#correctas").html(correctas+" de "+parseInt(indexPregunta+1));
     $(".resp").fadeOut(100);
     $(".sig").removeAttr("disabled");
}

function mostrarMensaje(mensaje,tipo){
    
    $("#retro").html('<div class="close" onclick="hideMsg()">&times;</div>'+mensaje);
    switch (tipo){
        case 0:  $("#retro").removeClass("alert-succes");
                 $("#retro").addClass("alert-danger");
                break;
        case 1: $("#retro").removeClass("alert-danger");
                $("#retro").addClass("alert-success");
                break;
        case 2: $("#retro").removeClass("alert-danger");
                $("#retro").removeClass("alert-danger");
                $("#retro").addClass("alert-info");
    }
        $("#retroContainer").fadeIn(1000);
}

function hideMsg(){
    $("#retroContainer").fadeOut(1000);
}

function  getResultHTML(){
    var result='';
    var respU;
    var respC;
    
    
     for(var p in ListPreguntas){
        
          if(ListPreguntas[p].respCorrecta==0)
             respC="Falso";
         else
             respC="Verdadero";
         
         if(ListPreguntas[p].respUsuario==0){
                if(ListPreguntas[p].respCorrecta==ListPreguntas[p].respUsuario) 
                     respU="Falso<i class='icon-ok pull-right'></i>";
                else
                    respU="Falso<i class='icon-remove pull-right'></i>";
         } else{
             if(ListPreguntas[p].respCorrecta==ListPreguntas[p].respUsuario) 
                    respU="Verdadero<i class='icon-ok pull-right'></i>";
                else
                    respU="Verdadero<i class='icon-remove pull-right'></i>";
         }
         
         result=result+'<tr><td style="width:15px;"> <i class="icon-hand-right"></i></td><td style="text-align:left;"> '+ListPreguntas[p].pregunta+'</td><td>'+respU+'</td><td>'+respC+'</td></tr>';
                        
     }
     
    var msg='<div class=" well"><table class="table-striped mytable table-hover"><tbody> <thead><th></th><th style="width:60%;">Pregunta</th>\n\
                               <th>Lo que contestastes</th>\n\
                                <th>La respuesta correcta</th></thead>'
                              +result+
                   
                  '</tbody>\n\
            </table></div>';
    
    return msg;
}