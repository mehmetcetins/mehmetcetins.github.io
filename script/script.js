$(document).ready(function(){
    
    var arr = ["BMB","FZK","LCI","MAT","TBT","TDI","YDI"];
    $(".submit").on("click touchstart",(function(){
        $.each([1,2],function(i,val){
            $(".genel td:eq("+val+")").text(" ");
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
        tz = c/k;
        notlar=[];
        katsayilar=[];
        k=0;
        c=0;
        $.each(arr,function(i,val){
            value = $("input[name='"+val+"'].f").val();
            if(  value == 0 ){
                notlar.push(0);
                katsayilar.push($("input[name='"+val+"'].f").attr("kredi"));
            }
            else {
                notlar.push(parseFloat(value));
                katsayilar.push(parseInt($("input[name='"+val+"'].f").attr("kredi")));
            }
        })
        
        for(i = 0;i<notlar.length;i++){
            c += notlar[i]*katsayilar[i];
            k += katsayilar[i];
        }
        tf = c/k;
        console.log(tf);
        console.log(tz);
        t = tf > 0 && tz > 0 ? tf*0.7 + tz*0.3 : 0;
        t = tf > 0 && tz == 0 ? tf : t;
        t = tf == 0 && tz > 0 ? tz : t; 
        $(".genel td:eq(1)").append((t).toFixed(2));
        if (t != 0){
            if (tz == 0){
                $(".genel td:eq(2)").append(((tf)*0.7).toFixed(2));
                $(".genel td:eq(0)").text("Final Ortalaması");
            }
            else if (tf == 0){
                $(".genel td:eq(2)").append(((tz)*0.3).toFixed(2));
                $(".genel td:eq(0)").text("Vize Ortalaması");
            }
            else 
                $(".genel td:eq(0)").text("Genel Ortalama");
        }
        else {
            $(".genel td:eq(0)").text("Genel Ortalama");
        }

        if(t>87 && t<=100)
            $(".genel td:eq(1)").append(" AA");
        else if(t>81 && t<=87)
            $(".genel td:eq(1)").append(" BA");
        else if(t>=74 && t<=80)
            $(".genel td:eq(1)").append(" BB");
        else if(t>=67 && t<=73)
            $(".genel td:eq(1)").append(" CB");
        else if(t>=60 && t<=66)
            $(".genel td:eq(1)").append(" CC");
        else if(t>=53 && t<=59)
            $(".genel td:eq(1)").append(" DC");
        else if(t>=46 && t<=52)
            $(".genel td:eq(1)").append(" DD");
        else if(t>=39 && t<=45)
            $(".genel td:eq(1)").append(" FD");
        else if(t>=0 && t<=38)
            $(".genel td:eq(1)").append(" FF");
        $(document).scrollTop(0);
        return(false);
    }))

    $("input:not(.submit)").keydown(function(e){
        if (e.key == "-")
            e.preventDefault();
        
    }).keyup(function(){
        if (parseInt($(this).val()) > 100){
            $(this).val($(this).val().substr(0,2));
        }
    })
})