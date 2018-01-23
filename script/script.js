
$(document).ready(function(){
    c = 0
    $("div").on("keyup","input[type=number]",function(e){
        if (c == 3){
            $(this).val($(this).val().match(/^(100)|^[0-9]{2}/g));
        }
        if (e.keyCode == 8){
            if (c != 0)
                c--;
        }
        else {
            if (c != 3)
                c++;
        }
        
    });
});



a = document.createElement("script");
a.src = document.location.pathname.match( /.*\//g )[0]+"bolumders.js";
document.head.appendChild(a);
document.head.removeChild(a);
delete a;


var ders = new Vue({
    el:"#ders",
    data:{
        items : this.chg,
        selected:"0",
        v:-1,
        f:-1,
        nt: -1,
        h: -1,
        dort : -1
    },
    watch:{
        selected : function(n,o){
            this.chg();
            this.v = -1;
            this.f = -1;
            this.nt = -1;
            this.h = -1;
        }
    },
    methods:{
        sub : function(){
            a =[];b = [];
            $.each($("table tr td input:not(.submit)"), function( index, value ) {
                if (index %2 == 0)
                    a.push(parseInt($("table tr td input:not(.submit):eq("+index +")").val()));
                else 
                    b.push(parseInt($("table tr td input:not(.submit):eq("+index +")").val()));
            });
            this.v = a;
            this.f = b;
            this.v = this.ntf(this.v,this.items,0.3);
            this.f = this.ntf(this.f,this.items,0.7);
            if(!(isNaN(this.v) && isNaN(this.f))){
                this.nt = (this.v + this.f).toFixed(2);
            }
            else {
                if (isNaN(this.v))
                    this.nt = this.f.toFixed(2);
                else 
                    this.nt = this.v.toFixed(2);
            }
            this.hn();
            this.dort = ((this.nt * 4)/100).toFixed(2);
        },
        chg : function(){
            var bd = [];
            var c = this.selected;
            if (typeof(bolumders[c]) == "undefined")
                console.log(c + " yok");
            else 
                if (c != "0")
                    {
                        var length = bolumders[c].alan.length;
                        var bolum = bolumders[c].alan;
                        var kredi = bolumders[c].kredi;
                        for(i = 0; i< length;i++){
                            bd.push([bolum[i],kredi[i]]);
                        }
                    }
                    this.items = bd;
        },
        ntf : function(vf,kre,kts){
            t = 0;
            k = 0;
            for(i = 0;i<vf.length;i++){
                if(isNaN(vf[i])){
                    k += parseInt(kre[i][1]);
                    continue;
                }
                else
                {
                    t += vf[i] * parseInt(kre[i][1]);
                    k += parseInt(kre[i][1]);
                }
                
            }
            return (t/k)*kts;
        },
        hn :function(){
            ntk = this.nt;
            this.h = ntk >= 90 && ntk <=100 ? "AA" :
            ntk >= 85 && ntk <90 ? "BA" :
            ntk >= 80 && ntk <85 ? "BB" :
            ntk >= 75 && ntk <80 ? "CB" :
            ntk >= 70 && ntk <75 ? "CC" :
            ntk >= 65 && ntk <70 ? "DC" :
            ntk >= 60 && ntk <65 ? "DD" :
            ntk >= 50 && ntk <60 ? "FD" : "FF";

        }
    }
});
