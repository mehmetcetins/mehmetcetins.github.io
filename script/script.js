$(document).ready(function(){
    
    var arr = ["BMB","FZK","LCI","MAT","TBT","TDI","YDI"];
    $(".submit").on("click touchstart",(function(){
        $.each([1,2],function(i,val){
            $(".vize td:eq("+val+")").text(" ");
        })
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
        t = c/k;
        $(".vize td:eq(1)").append((t).toFixed(2));
        $(".vize td:eq(2)").append((t)*0.3);

        if(t>87 && t<=100)
            $(".vize td:eq(1)").append(" AA");
        else if(t>81 && t<=87)
            $(".vize td:eq(1)").append(" BA");
        else if(t>=74 && t<=80)
            $(".vize td:eq(1)").append(" BB");
        else if(t>=67 && t<=73)
            $(".vize td:eq(1)").append(" CB");
        else if(t>=60 && t<=66)
            $(".vize td:eq(1)").append(" CC");
        else if(t>=53 && t<=59)
            $(".vize td:eq(1)").append(" DC");
        else if(t>=46 && t<=52)
            $(".vize td:eq(1)").append(" DD");
        else if(t>=39 && t<=45)
            $(".vize td:eq(1)").append(" FD");
        else if(t>=0 && t<=38)
            $(".vize td:eq(1)").append(" FF");

        return(false);
    }))
})