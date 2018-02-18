var aps = '<tr class = "scml">\
                    <td><input type="text"  class="form-control"></td>\
                    <td><input type="number" class="form-control ekkredi"></td>\
                    <td >\
                        <input type="number" min="0" max= "100" class="form-control">\
                        <input type="number" min="0" max= "100" class="form-control"> \
                    </td> \
                </tr>';


$(document).ready(function(){
    
    
    c = 0;
    k = 0;
    
    $("div").on("keydown","input[type=number]",function(e){
        if (e.key == "-")
            e.preventDefault();
        else if (e.key == "+")
            e.preventDefault();
        
    }).on("keyup","table  td:nth-child(3) input[type=number]",function(){
        if (parseInt($(this).val()) > 100){
            $(this).val($(this).val().substr(0,2));
        }
    });
    
    

    $("div").on("click touchstart",function(e){
        a = e.target.parentElement.parentElement.matches(".scml") && $(e.target).attr("class") == "form-control ekkredi" ? e.target.parentElement.parentElement :"ek yapma" ;
        if (a != "ek yapma"){
            $(a).removeAttr("class");
            $(aps).insertAfter(a);
        }
    });


});

a = document.createElement("script");
a.src = document.location.pathname.match( /.*\//g )[0]+"bolumders.js";
document.head.appendChild(a);
document.head.removeChild(a);
delete a;

dl = false;
dr = false;
scmli = [];
var ders = new Vue({
    el:"#ders",
    data:{
        items : this.chg,
        selected:"0",
        deleted:[],
        scml:[],
        v:-1,
        f:-1,
        nt: -1,
        h: -1,
        dort : -1
    },
    watch:{
        selected : function(n,o){
            /* for(i = 0;i<this.deleted.length;i++){
                this.items[this.deleted[i][0]] = this.deleted[i][1]; gereksiz
            } */ 
            this.chg();
            this.v = -1;
            this.f = -1;
            this.nt = -1;
            this.h = -1;
            this.deleted = [];
            this.scml = [];
            this.dort = -1;
            $("input[type='text']").parent().parent().remove();
            $($(".submit").parent().parent()).before(aps);
            $("table tr").css("opacity","1");
        }
    },
    methods:{
        sub : function(){
            this.scml= [];
            for(i = 0;i < $(".ekkredi").length;i++){
                kredi = $(".ekkredi")[i].value == "" ? 0 : $(".ekkredi")[i].value; 
                this.scml.push(["secmeli "+i,kredi]);
                scmli.push(["secmeli "+i,kredi]); 
            }
            a =[];b = [];
            $.each($("table tr td input:not(.submit):not(.ekkredi):not([type='text'])"), function( index, value ) {
                if (index %2 == 0)
                    a.push(parseInt($("table tr td input:not(.submit):not(.ekkredi):not([type='text']):eq("+index +")").val()));
                else 
                    b.push(parseInt($("table tr td input:not(.submit):not(.ekkredi):not([type='text']):eq("+index +")").val()));
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
            $(document).scrollTop(0);
            return false;
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
            scmli = this.scml;
            tmkre = kre.concat(scmli);
            console.log(tmkre);
            for(i = 0;i<vf.length;i++){
                if(isNaN(vf[i])){
                    k += parseInt(tmkre[i][1]);
                    continue;
                }
                else
                {
                    t += vf[i] * parseInt(tmkre[i][1]);
                    k += parseInt(tmkre[i][1]);
                }
                console.log(t);
                
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

        },
        dlt : function(e){
            if(dl){
                
                k = this.deleted.length;
                a = !e.target.parentElement.matches("tr") ? e.target.parentElement.parentElement :e.target.parentElement ;
                e = a;
                d = true;
                a = Array.from(a.parentElement.rows).indexOf(a) - 1
                //this.items = this.items.concat(this.scml); butona tıklayınca this.scml'ye ekleme oluyor.
                for (i = 0 ;i < k; i++)
                {
                    if (this.deleted[i][0] == a )
                    {
                        d = false;
                        break;
                    }
                }
                if (d){
                    this.deleted.push([a,this.items[a][1]]);
                    d = true;
                }
                k = this.deleted.length;
                for (i = 0 ; i < k; i++)
                    {
                        this.items[this.deleted[i][0]][1] = 0;
                        $(e).css("opacity","0.4");
                        $(e.children[2].children[0]).prop("disabled",true);
                        $(e.children[2].children[1]).prop("disabled",true);
                    }
            }
        },
        drt:function(e){
            if(dr){
                k = this.deleted.length;
                a = !e.target.parentElement.matches("tr") ? e.target.parentElement.parentElement :e.target.parentElement ;
                $(a).css("opacity","1");
                $(a.children[2].children[0]).prop("disabled",false); 
                $(a.children[2].children[1]).prop("disabled",false);
                a = Array.from(a.parentElement.rows).indexOf(a) - 1
                for (i = 0;i<k;i++){
                    if(this.deleted[i][0]==a){
                        this.items[a][1] = this.deleted[i][1];
                        console.log(this.deleted.splice(i,1));
                        break;
                    }
                }
            }
           
        },
        drtdlt : function(e){
            this.drt(e);
            this.dlt(e);
        },
        dlta:function(){
            dl = dl ? !dl : !dl;
            dr = false;
            tbcl = dl ? "darkred" : "";
            $("table").css("background",tbcl);
        },
        drta:function(){
            dr = dr ? !dr : !dr;
            dl = false;
            tbcl = dr ? "darkgreen" : "";
            $("table").css("background",tbcl);
        }

    }
});