$(document).ready(function(){
    var arr = ["BMB","FZK","LCI","MAT","TBT","TDI","YDI"];
    $(".submit").on("click touchstart",(function(){
        var notlar = [];
        var katsayilar = [];
        $.each(arr,function(i,val){
            value = $("input[name='"+val+"']").val();
            if(  value == 0 ){
                notlar.push(0);
                katsayilar.push($("input[name='"+val+"']").attr("kredi"));
            }
            else {
                notlar.push(parseFloat(value));
                katsayilar.push(parseInt($("input[name='"+val+"']").attr("kredi")));
            }
        })
        k=0;
        c=0;
        for(i = 0;i<notlar.length;i++){
            c += notlar[i]*katsayilar[i];
            k += katsayilar[i];
        }
        $(".vize td:eq(1)").text(c/k);
        $(".vize td:eq(2)").text((c/k)*0.3);
        return(false);
    }))
})