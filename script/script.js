
document.getElementById("silinecek").remove();


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
    if (!sav && localStorage.getItem("selected") != null){
        tmplen = ders.vize.length * 2;
        tmp = [];
        c = 0;
        for (i = 0 ; i < tmplen;i++){
            if (i % 2 == 0) {
                tmp.push(ders.vize[c]);
            }
            else {
                tmp.push(ders.final[c]);
                c++;
            }
            
        }

        for (i = 0; i< ders.deleted.length;i++){
            $("table tr:eq("+(ders.deleted[i][0]+1)+")").css("opacity","0.4");
            $("table tr:eq("+(ders.deleted[i][0]+1)+")").children("td:eq(2)").children("input:eq(0)").prop("disabled",true);
            $("table tr:eq("+(ders.deleted[i][0]+1)+")").children("td:eq(2)").children("input:eq(1)").prop("disabled",true);
        }

        $(".scml").removeAttr("class");
        for (i = 0; i< ders.scml.length - 1;i++){
            $($(".submit").parent().parent()).before(aps);
            $(".ekkredi:eq("+i+")").val(ders.scml[i][1]);
            $("input[type='text']:eq("+i+")").val(ders.scml[i][0]);
        }
        $.each($("table tr td input:not(.submit):not(.ekkredi):not([type='text'])"), function( index, value ) {
            if (index %2 == 0)
                $("table tr td input:not(.submit):not(.ekkredi):not([type='text']):eq("+index +")").val(tmp[index]);
            else 
                $("table tr td input:not(.submit):not(.ekkredi):not([type='text']):eq("+index +")").val(tmp[index]);
        });
    }
});

dl = false;
dr = false;
scmli = [];
sav = true;
var ders = new Vue({
    el:"#ders",
    data:{
        items : [],
        selected:"0",
        deleted:[],
        scml:[],
        vize : [],
        final : [],
        v:-1,
        f:-1,
        nt: -1,
        h: -1,
        dort : -1,
        buttonText : "KAYDET",
    },
    watch:{
        selected : function(n,o){
            
            if (sav && localStorage.getItem("selected") != null)
            {
                this.items = JSON.parse(localStorage.getItem("items"));
                this.deleted = JSON.parse(localStorage.getItem("deleted"));
                this.vize = JSON.parse(localStorage.getItem("vize"));
                this.scml = JSON.parse(localStorage.getItem("scml"));
                this.final = JSON.parse(localStorage.getItem("final"));
                this.v = localStorage.getItem("v");
                this.f = localStorage.getItem("f");
                this.nt = localStorage.getItem("nt");
                this.h = localStorage.getItem("h");
                this.dort = localStorage.getItem("dort");
                this.chg();
                sav = false;
                
            }
            else{
                this.chg();
                this.v = -1;
                this.f = -1;
                this.nt = -1;
                this.h = -1;
                this.deleted = [];
                this.scml = [];
                this.dort = -1;
                this.final = [];
                this.vize = [];
                $("input[type='text']").parent().parent().remove();
                $($(".submit").parent().parent()).before(aps);
                $("table tr").css("opacity","1");
                $("input:not(.submit)").val("");
            }
        }
    },
    mounted : function(){
        if (localStorage.getItem("selected") != null)
            this.selected = localStorage.getItem("selected");
    },

    methods:{
        sub : function(){
            this.scml= [];
            for(i = 0;i < $(".ekkredi").length;i++){
                kredi = $(".ekkredi")[i].value == "" ? 0 : $(".ekkredi")[i].value; 
                dersad = $("input[type='text']:eq("+i+")").val();
                this.scml.push([dersad,kredi]);
                scmli.push([dersad,kredi]); 
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
            this.vize = a;
            this.final = b;
            this.v = this.ntf(this.v,this.items,0.3);
            this.f = this.ntf(this.f,this.items,0.7);
            drto = 0;
            if(!(isNaN(this.v) && !isNaN(this.f)) && this.v != 0 && this.f != 0 ){
                this.nt = (this.v + this.f).toFixed(2);
                drto = ((this.nt * 4)/100).toFixed(2);
            }
            else {
                if (isNaN(this.v) && this.v == 0){
                    this.nt =  (this.f / 0.7).toFixed(2);
                    drto = this.f;
                }
                else{
                    this.nt = (this.v / 0.3).toFixed(2);
                    drto = this.v;
                }
            }
            this.hn();
            this.dort = drto;
            console.log(drto);
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
            console.log(k);
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
                        this.deleted;
                        break;
                    }
                }
            }
            this.deleted;
        
        },
        drtdlt : function(e){
            this.drt(e);
            this.dlt(e);
        },
        dltdrta:function(){ 
            
            if ($(".kage").hasClass("btn-success"))
                {
                    dc = true;
                    dr = dr ? !dr : !dr;
                    dl = false;
                    tbcl = dr ? "green" : "";
                    $("table").css("background",tbcl);
                    $(".kage").removeClass("btn-success");
                    $(".kage").addClass("btn-dark");
                }
            else if ($(".kage").hasClass("btn-danger")){
                
                dl = dl ? !dl : !dl;
                dr = false;
                tbcl = dl ? "darkred" : "";
                $("table").css("background",tbcl);
                $(".kage").removeClass("btn-danger");
                $(".kage").addClass("btn-success");
                
            }
            else if ($(".kage").hasClass("btn-dark")){
                
                dl = false;
                dr = false;
                $("table").css("background","");
                $(".kage").removeClass("btn-dark");
                $(".kage").addClass("btn-danger");
                
            }
        },
        savenot: async function(){
            if (typeof(Storage) !== "undefined") {
                
                localStorage.setItem("selected",this.selected);
                localStorage.setItem("deleted",JSON.stringify(this.deleted));
                localStorage.setItem("scml",JSON.stringify(this.scml));
                localStorage.setItem("vize",JSON.stringify(this.vize));
                localStorage.setItem("final",JSON.stringify(this.final));
                localStorage.setItem("v",this.v);
                localStorage.setItem("f",this.f);
                localStorage.setItem("nt",this.nt);
                localStorage.setItem("h",this.h);
                localStorage.setItem("dort",this.dort);
                localStorage.setItem("items",JSON.stringify(this.items));
                sself = this;
                sself.buttonText = "KAYDEDİLDİ";
                setTimeout(function(){
                    sself.buttonText = "KAYDET";
                },2000);
                
            } else {
                prompt("tarayıcınız html5 web storage desteklemiyor");
            }
        },

    },
});