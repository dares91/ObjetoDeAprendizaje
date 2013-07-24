var ArreglodeTodos1 = ["human","ing","fish","SpyWare","email","devices","Multimedia","directContact", 
                                "antivirus","firewall","descargaMalware","click","se","ESET","MalwareBorrador","BarreM"];

var ArregloGanadores = ["fish","SpyWare","email","devices","Multimedia","antivirus","firewall","se","ESET"];

var cantOpor = 3;

   
function comprovar(){
     var victoria = false;
    if(cantOpor === 0 && victoria === false){
        document.getElementById("Respuestas").innerHTML = '<br/></br>\
                                                            <div style="background-color:pink;\
                                                            border-style:solid;\
                                                            border-radius: 15px;\
                                                            "><h2>Lo sentimos pero has perdido todas las oportunidades, a la derecha se muestran las respuestas\n\
                                                             </h2>\
                                                            </div>';
        
        for(var a = 1; a<=9; a++)
        {
            document.getElementById("g"+a).style.backgroundColor = "lightgreen";
            
        }
        
        return;}
    
    else{
  cantOpor--;
    

    for(var i = 0; i<9;i++){
        if(document.getElementById(ArregloGanadores[i]).checked === false)
            break;
        else
            var victoria = true;
    }
    
    if(victoria === false)
        document.getElementById("Respuestas").innerHTML = '<br/></br>\
                                                            <div style="background-color:pink;\
                                                            border-style:solid;\
                                                            border-radius: 15px;\
                                                            "><h2>Lo sentimos pero no has contestado correctamente\n\
                                                             </h2><br/><h4>Tienes '+cantOpor+' Oportunidades</h4>\
                                                            </div>';
    else
        document.getElementById("Respuestas").innerHTML = '<div style="background-color:lightgreen;\
                                                            border-style:solid;\
                                                            border-radius: 15px;\
                                                            "><h2>Perfecto has contestado correctamente</h2>\
                                                            </div>';
    }
}