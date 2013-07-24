var palabras=new Array( 
        /*Palabra 1 */ "SPYWARE",
        /*Palabra 2 */  "PHISHING",
        /*Palabra 3 */ "ADWARE",
         /*Palabra 4 */ "ROOTKITS",
        /*Palabra 5 */  "SPAM",
        /*Palabra 6 */  "VIRUS",
        /*Palabra 7 */ "GUSANOS",
        /*Palabra 8 */  "MALWARE");
//el numero de detalles debe ser igual al numero de palabras y deben tener la misma secuencia
var detalles=new Array( 
        /*detalle 1 */ "Spyware es un software que permite colectar la información sobre un usuario/organización de forma no autorizada.",
        /*detalle 2 */  "Phishing es una variedad de programas espías que se propaga a través de correo. Metan recibir los datos confidenciales del usuario, de carácter bancario preferente",
        /*detalle 3 */  "Los Adwares muestran publicidad al usuario. La mayoría de programas adware son instalados a software distribuido gratis",
        /*detalle 4 */ "Rootkits es una colección de programas usados por un hacker para evitar ser detectado mientras busca obtener acceso no autorizado a un ordenador.",
        /*detalle 5 */ "Spam son los mensajes no solicitados de remitente desconocido enviados en cantidades masivas de carácter publicitario, político, de propaganda, solicitando ayuda, etc",
        /*detalle 6 */ "Virus son programas que infectan a otros programas por añadir su código para tomar el control después de ejecución de los archivos infectados. El objetivo principal de un virus es infectar.",
        /*detalle 7 */ "Gusanos son malwares que usan los recursos de red para distribuirse. Su nombre implica que pueden penetrar de un equipo a otro como un gusano",
        /*detalle 8 */ "Malware es todo programa de computadora diseñado para atacar y dañar los dispositivos, causar el mal funcionamiento del sistema operativo de un ordenador o aprovechar las vulnerabilidades del sistema  o de la red de computadoras para robar la información del usuario.");
        
var numPalabrasEncontradas=0;
var tmpMarkedCell=new Array();
var tmpMarkedCellValue=new Array();
var busyTDs=new Array();
var idCell; 
var clicked=false;
var intervalFunction;
var gameLevel=2;   /*indica el nivel de juego, por defecto es 2. Los niveles de juego pueden ser 
 *                       1 --->  10 col x 10 rows
 *                       2 --->  15 col x 15 rows
 *                       3 --->  25 col x 25 rows                                 
 */                
var rowsCols;   //indica el numero de filas x columnas que tendra la sopa

function inicializarSopa(){

    switch (gameLevel){
        case 1: rowsCols=14; break;
        case 2: rowsCols=18; break;
        case 3: rowsCols=25; break;
        default : alert("tipo de juego no soportado");
    }
    //crear la tabla y llenar cada celda con un caracter aleatorio
    var tab=document.createElement("table");
    $(tab).addClass("myTable");
    for(var j=0;j<rowsCols;j++){
        var ntr=document.createElement("tr");
        $(ntr).addClass("myTR");
        for(var i=0;i<rowsCols;i++){
            var ntd=document.createElement("td");
            $(ntd).attr("id",j+"-"+i);            
            $(ntd).addClass("myTD");
            //aqui se llena la celda con el caracter aleactorio
            $(ntd).html(getRandomChar());
            $(ntd).appendTo(ntr);
        }
         $(ntr).appendTo(tab);
    }
     $(tab).appendTo("#sopaLetras");
     $("#sopaLetras").addClass("jugando");
    //poner las palabras en orden aleatorio 
    setWordsInSoup();    
    setWordsAside();
//    
//    //agregar evento clic a cada celda
    enableCellAction();
}

function setWordsInSoup(){
      var ramdonCol,ramdonRow,maxColInitPoint,minColInitPoint,maxRowInitPoint,minRowInitPoint;
      // Hacer mayusculas las palabras 
      
      for(var p in palabras){
          var tipoLlenado= Math.floor((Math.random()*4)+1); //generar un entero aleatorio para definir el tipo de llenado de la palabra
          switch (tipoLlenado){
              case 1: //left to rigth
                  maxColInitPoint=rowsCols-palabras[p].length; //punto maximo donde puede iniciar la palabra para no salirse de la sopa
                  do{ //generar punto aleatorio para poner la palabra p                      
                     ramdonCol = Math.floor(Math.random()*maxColInitPoint);
                     ramdonRow= Math.floor(Math.random()*rowsCols);                     
                  }while(intercepta(ramdonRow,ramdonCol,palabras[p],1)==true); //si se interceptan las palabras, repetir 
                   
                    for(var c in palabras[p]){
                        $("#"+ramdonRow+"-"+ramdonCol).html(palabras[p].charAt(c)); //setear cada char de la palabra en la celda con coordenada (ramdomRow,ramdomCol)
                         busyTDs.push(ramdonRow+"-"+ramdonCol); // agregar id de la celda al arreglo de celdas ocupadas
                        ramdonCol++;
                    }
                    break;
              case 2: //rigth to left   problem
                     minColInitPoint=palabras[p].length-1; //punto minimo para que la palabra no se salga de la sopa de letras    
                    do{
                         ramdonCol = Math.floor(Math.random()*(rowsCols-minColInitPoint)+minColInitPoint);              
                         ramdonRow= Math.floor(Math.random()*rowsCols);
                    }while(intercepta(ramdonRow,ramdonCol,palabras[p],2)==true);//si se interceptan las palabras, repetir 
                    
                    for(var c in palabras[p]){
                        $("#"+ramdonRow+"-"+ramdonCol).html(palabras[p].charAt(c)); //setear cada char de la palabra en la celda con coordenada (ramdomRow,ramdomCol)
                        busyTDs.push(ramdonRow+"-"+ramdonCol);  // agregar id de la celda al arreglo de celdas ocupadas                        
                        ramdonCol--;
                    }
                    break;
              case 3: //top to bottom
                    maxRowInitPoint=rowsCols-palabras[p].length;
                    do{  
                         ramdonCol = Math.floor(Math.random()*rowsCols);
                         ramdonRow= Math.floor(Math.random()*maxRowInitPoint);
                    }while(intercepta(ramdonRow,ramdonCol,palabras[p],3)==true); //si se interceptan las palabras, repetir 
                      
                    for(var c in palabras[p]){
                        $("#"+ramdonRow+"-"+ramdonCol).html(palabras[p].charAt(c));//setear cada char de la palabra en la celda con coordenada (ramdomRow,ramdomCol)
                        busyTDs.push(ramdonRow+"-"+ramdonCol+"");   //agregar celda al arreglo de celdas ocupadas                  
                        ramdonRow++;
                    }
                    break;
             case 4: //bottom to top
                   minRowInitPoint=palabras[p].length-1; //punto minimo para que no se salga de la sopa de letras   
                   do{
                         ramdonCol = Math.floor(Math.random()*rowsCols);                
                         ramdonRow= Math.floor(Math.random()*(rowsCols-minRowInitPoint)+minRowInitPoint); 
                    }while(intercepta(ramdonRow,ramdonCol,palabras[p],4)==true); // si se intercepta con otra palabra, repetir
                     
                    for(var c in palabras[p]){
                        $("#"+ramdonRow+"-"+ramdonCol).html(palabras[p].charAt(c)); //setear cada char de la palabra en la celda con coordenada (ramdomRow,ramdomCol)
                        busyTDs.push(ramdonRow+"-"+ramdonCol+""); 
                        ramdonRow--;
                    }
                    break;
                
              default :
                    alert(tipoLlenado+" no soportado");
          }
      }
}

function setWordsAside(){
    for(var p in palabras){
        var divPalabra=document.createElement("div");
            //$(ndiv).addClass("Palabra");
            $(divPalabra).addClass("palabra");
            $(divPalabra).attr("id","palabra-"+p);
            $(divPalabra).html(palabras[p]);
            
            
         var divDetalle=document.createElement("div");
            //$(ndiv).addClass("divPalabra");
            $(divDetalle).addClass("divDesc");
            $(divDetalle).attr("id","detalle-"+p);
            $(divDetalle).html(detalles[p]);
            
            $(divPalabra).appendTo("#palabras");
            $(divDetalle).appendTo("#palabras");            
            
            $("#palabra-"+p).attr("onclick","mostrarDetalle("+p+")");
            $("#palabra-"+p).attr("title","Pulsame para ver mas información");
    }   
}

function mostrarDetalle(panel){
    $("#detalle-"+panel).slideToggle("slow");
}

function intercepta(row,col,word,tipoLlenado){

    switch (tipoLlenado){
              case 1: //left to rigth
                    for(var c in word){
                       if( busyTDs.indexOf(row+"-"+col)>-1)
                        return true;
                       col++;                      
                    }                    
                    return false;
                    break;
              case 2: //rigth to left   problem
                    for(var c in word){
                        if( busyTDs.indexOf(row+"-"+col)>-1)
                        return true;
                       col--;                      
                    }
                    return false;
                    break;
              case 3: //top to bottom
                    for(var c in word){
                       if( busyTDs.indexOf(row+"-"+col)>-1)
                        return true;
                       row++;                       
                    }
                    return false;
                    break;
             case 4: //bottom to top
                    for(var c in word){
                       if( busyTDs.indexOf(row+"-"+col)>-1)
                        return true;
                       row--;
                    }
                    return false;
                    break;
                
              default :                    
                    alert(tipoLlenado+" no soportado");
          }
}

function enableCellAction(){
   $(".myTD").mouseover(function (){
        idCell=$(this).attr("id");     
        var cellRow=idCell.split("-")[0];
        var cellCol=idCell.split("-")[1];  
        var consecutivo=false; //variable para determinar si puede marcarse la celda o no
       if(clicked){        
            switch (tmpMarkedCell.length){ //switch con el numero de celdas marcadas
                case 0: consecutivo=true;  // si es 0 entonces se pone consecutivo para que pueda marcarse
                        break;
                case 1: if(  tmpMarkedCell.indexOf(cellRow+"-"+(cellCol-1))>-1              //si el numero de celsas seleccionadas es 1, la celda actual solo puede marcarse si  tiene una celda antes, despues, arriba o abajo seleccionada
                           ||tmpMarkedCell.indexOf(cellRow+"-"+(parseInt(cellCol)+1))>-1                       
                           ||tmpMarkedCell.indexOf((cellRow-1)+"-"+cellCol)>-1
                           ||tmpMarkedCell.indexOf((parseInt(cellRow)+1)+"-"+cellCol)>-1)
                                  consecutivo=true;
                        break;
                default :  if(   tmpMarkedCell.indexOf(cellRow+"-"+(cellCol-1))>-1 && tmpMarkedCell.indexOf(cellRow+"-"+(cellCol-2))>-1                 //si el numero de celsas seleccionadas es mas 1, la celda actual solo puede marcarse si  tiene dos celda antes, despues, arriba o abajo seleccionada de forma consecutiva
                               ||tmpMarkedCell.indexOf(cellRow+"-"+(parseInt(cellCol)+1))>-1 && tmpMarkedCell.indexOf(cellRow+"-"+(parseInt(cellCol)+2))>-1     
                               ||tmpMarkedCell.indexOf((cellRow-1)+"-"+cellCol)>-1  &&  tmpMarkedCell.indexOf((cellRow-2)+"-"+cellCol)>-1
                               ||tmpMarkedCell.indexOf((parseInt(cellRow)+1)+"-"+cellCol)>-1  && tmpMarkedCell.indexOf((parseInt(cellRow)+2)+"-"+cellCol)>-1 )
                                   consecutivo=true;                    
            }

            if(consecutivo && tmpMarkedCell.indexOf(idCell)===-1){       //si la celda actual no es consecutiva a las ya marcadas       
                $(this).addClass("tdMarcado"); // settear como marcada la celda actual
                tmpMarkedCell.push(idCell);   // agregar el id de celda a temporales marcadas
                tmpMarkedCellValue.push($(this).html()); // agregar el valor de celda a valores de celdas temporales marcadas
            } 
            
       }
       });
       
       $(".myTD").mousedown(function (e){

          if(e.which ===1){ //si es click izquierdo
                
                borrarTmpMarkedCells();
                $(this).addClass("tdMarcado"); // settear como marcada la celda actual
                tmpMarkedCell.push(idCell);   // agregar el id de celda a temporales marcadas
                tmpMarkedCellValue.push($(this).html()); // agregar el valor de celda a valores de celdas temporales marcadas
                clicked=true;
          }
           else { //si es click derecho
               
               if(tmpMarkedCell.length>0){
               var encontrada=false,encontradaReverse=false;
               var currentWord= new RegExp("\\b" + tmpMarkedCellValue.join("") + "\\b", "g");    //agrupar los valores de las celdas tempales marcados en una expresion regular     
               var currentWordReverse= new RegExp("\\b" + tmpMarkedCellValue.reverse().join("")+"\\b", "g");
               
               if(palabras.join(" ").match(currentWord)) //buscar la palabra conformada como expresion regular  en la lista de palabras
                   encontrada=true; 
               else 
                   if(palabras.join(" ").match(currentWordReverse)) //buscar la palabra conformada de forma reversa como expresion regular en la lista de palabras
                       encontradaReverse=true;
                   
               if(encontrada||encontradaReverse){ //si se encontró la palabra 
                   for(var i in tmpMarkedCell){ //por cada celda marcada
                       $("#"+tmpMarkedCell[i]).removeClass("tdMarcado");  //quitar celda como marcado
                       $("#"+tmpMarkedCell[i]).addClass("tdEncontrado");  //setear celda como encontrado cada celda marcada                   
                   } 
                   numPalabrasEncontradas++;                       //sumar palabra encontrada                  
                   if(encontrada){
                      tmpMarkedCell= tmpMarkedCell.reverse();
                      tmpMarkedCellValue= tmpMarkedCellValue.reverse();
                   }
                       
                   $("#palabra-"+palabras.indexOf(tmpMarkedCellValue.join(""))).addClass("palabraEncontrada");//marcar la palabra como encontrada en la lista
                     
                  if(palabras.length!==numPalabrasEncontradas){   //si  no se han encontraron todas las palabras
                        $("#succesMsg").html("<h4>¡Excelente!</h4><p>Has encontrado la palabra <b>"+tmpMarkedCellValue.join("")+"</b></p>");
                        $("#succesMsg").fadeIn(200).delay(4000).fadeOut(200);
                  }
                  else{  //si ya se encontraron todas las palabras
                         $("#sopaLetras").html("");
                        var mensajeCongratulations;
                        if(gameLevel<3)
                            mensajeCongratulations="<h3>¡¡Felicidades!!</h3><p>Has encontrado todas la palabras.</p><h4>¿Muy fácil?</h4><p> Que tal si pruebas con un nivel más difícil!</p>";
                        else
                         mensajeCongratulations="<h3>Felicidades</h3><p>Has encontrado todas la palabras. Puedes reiniciar el juego para jugar otra vez!</p>";
                        $("#sopaLetras").removeClass("jugando");
                        var divCongratulations=document.createElement("div");
                        $(divCongratulations).addClass("alert-danger mesajeCongratulation");                   
                        $(divCongratulations).html(mensajeCongratulations);      
                        $(divCongratulations).appendTo("#sopaLetras");
                        $(divCongratulations).fadeIn(200);
                   }                   
              }  
              else{   //si la palabra seleccionada no existe
                  alert("Oopss, la palabra que marcastes no está dentro de la lista que tienes que buscar");
              } 
              clicked=false;
               borrarTmpMarkedCells();
           }
           else   //si no se ha marcado alguna celda
                alert("Oopss, no has seleccionado ninguna palabra");
       } 
       });
       
       $("#sop").bind("contextmenu",function(e){
              return false;
       }); 
}

function borrarTmpMarkedCells(){
                 for(var i in tmpMarkedCell){  //quitar las celdas como marcadas
                     $("#"+tmpMarkedCell[i]).removeClass("tdMarcado");
                 }
                tmpMarkedCell=new Array();    //inicializar el arreglo de celdas temporales marcadas
                tmpMarkedCellValue=new Array(); //inicializar el arreglo de los valores de las celdas temporales marcadas
}

function cambiarNivelJuego(nuevoNivel){
        gameLevel=nuevoNivel;
        $(".myradio").removeClass("active");
        $("#"+nuevoNivel).addClass("active");
        
}


function reiniciarJuego(){  
    var conf;
    if(numPalabrasEncontradas>0 && palabras.length!==numPalabrasEncontradas){
      conf=confirm("Perderas tus avances ¿seguro que deseas reiniciar el juego?");
      if(!conf){        
          return ;
      }
    }
    numPalabrasEncontradas=0;
    tmpMarkedCell=new Array();
    tmpMarkedCellValue=new Array();
    busyTDs=new Array();
    clicked=false;
    $("#sopaLetras").html("");
    $("#palabras").html("");
    inicializarSopa();
    
}

function getRandomChar()
{
    var possible = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        return possible.charAt(Math.floor(Math.random() * possible.length)); //retornar un char en una posicion ramdom
}