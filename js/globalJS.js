var clicked=false;
$(document).ready(function (){
   
    $(document).on("scroll",function (){
           var pscroll=$(window).scrollTop();
            if(pscroll>150)
               $(".staticSideMenu").css({"top":"40px"});   
             else
                 $(".staticSideMenu").css({"top":(220-pscroll)}); 
             validarCurrentAnchor(pscroll);
    });
    
    $(".itemStacticMenu ").click(function (){
        $(".itemStacticMenu").removeClass("activeLink");
        $(this).addClass("activeLink");
        var anchor= $(this).attr("href").toString().replace("#","");
        scrollToAnchor(anchor);
    });
});

function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

function  scrollToTop(){
     $('html,body').animate({scrollTop: 0},'slow');
}

 var anchorTop;
 var anchors=document.anchors;
function validarCurrentAnchor(scrollPosition){
    for(var a in anchors){ 
        anchorTop=$(anchors[a]).offset().top;
        anchorName= $(anchors[a]).attr("name");
        if(anchorTop<(scrollPosition+60)){
            $(".itemStacticMenu").removeClass("activeLink");
            $("#"+anchorName).addClass("activeLink");
        }
    }
}