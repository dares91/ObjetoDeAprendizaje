var predecesor = null;
var cantselecciones = 0;

//var x1y1 = new Array(2);
//var x2y2 = new Array(2);

var cantidadDeAciertos = 0;
                        
var parejas2 =     [["bti1","btd2"],
                   ["bti2","btd5"],
                   ["bti5","btd3"],
                   ["bti4","btd1"],
                   ["bti3","btd4"]]; 


function funcion(objeto){    
            
            
            if(predecesor !== null)  
                    {
                            if((objeto.getAttribute("id").substring(0,3)) === (predecesor.getAttribute("id").substring(0,3)))
                            {
                            }else { 
                                         cantselecciones++;
                                         comprovarAciertos(objeto.getAttribute("id"),predecesor.getAttribute("id"));
                                         establecerCeldaSeleccionada(objeto);

                                    }
                     }
                                                                         
                else
                    {
                       if(objeto.getAttribute("id").substring(0,3) === "btd"){                               
                                alert("por favor, empiece con un elemento de la izquierda");
                       }
                       else{
                       cantselecciones++;  
                       establecerCeldaSeleccionada(objeto);

                   }
                    }
            
}


function establecerCeldaSeleccionada(objeto){
    
   
    switch (cantselecciones){
        case 0:
        break;
        
        case 1:
                        objeto.setAttribute("class","pareja1");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
            
        break;
        
        case 2:
                        objeto.setAttribute("class","pareja1");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 3:
                        objeto.setAttribute("class","pareja2");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 4:
                        objeto.setAttribute("class","pareja2");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 5:
                        objeto.setAttribute("class","pareja3");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 6:
                        objeto.setAttribute("class","pareja3");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 7:
                        objeto.setAttribute("class","pareja4");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 8:
                        objeto.setAttribute("class","pareja4");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 9:
                        objeto.setAttribute("class","pareja5");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
        break;
        
        case 10:
                        objeto.setAttribute("class","pareja5");
                        objeto.setAttribute("disabled","true");
                        predecesor = objeto;
                        
                        if(cantidadDeAciertos===5){
                            document.getElementById("contenedorAlertas").innerHTML = '\
                                                            <span class="label label-success">Felicidades, usted ha contestado correctamente</span>\
                                                            <br/>\
                                                            <br/>\
                                                            <br/>\
                                                            <button class="btn btn-danger" onclick="(window.location = \'Ejercicios.html\');">Seleccionar otro Ejercicio</button> \
                                                            ';
                        }
                        else{
                            document.getElementById("contenedorAlertas").innerHTML = '\
                                                                                    <span class="label label-warning"><h1>Lo sentimos. <br/>Usted no ha\
                                                                                     contestado\
                                                                                     <br/>   correctamente.</h1></span>\
                                                                                    <br/>\
                                                                                    <br/>\
                                                                                    <br/>\
                                                                                    <br/>\
                                                                                    <button class="btn btn-primary" onclick="(window.location = \'JuegoEmparejamiento.html\');">Jugar de Nuevo</button> \
                                                                                    <br/> \
                                                                                    <br/>\
                                                                                    <button class="btn btn-danger" onclick="(window.location = \'Ejercicios.html\');">Seleccionar otro Ejercicio</button> \
                                                                                      ';
                        }
        break;
    }
    
    
}

//function dibujarLinea(){
//    var c = document.getElementById("AreaDeTrabajo");
//    var ctx=c.getContext("2d");
//    ctx.moveTo(0,0);
//    ctx.lineTo(200,100);
//    ctx.stroke();
//}

function comprovarAciertos(objeto, predecesor){
       
     for(var i = 0; i< parejas2.length;i++){
        if(parejas2[i][0] === predecesor && parejas2[i][1] === objeto){
            cantidadDeAciertos++;
        }
        
    }    
   
}