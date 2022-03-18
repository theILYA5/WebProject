import { Lokacija } from "./lokacija.js";
import { Racun } from "./racun.js";

export class Pivnica {
    constructor(id,naziv,n,m,kapacitet,cena)
    {
        this.id = id;
        this.naziv = naziv;
        this.n = n;
        this.m = m;
        this.kapacitet = kapacitet;
        this.cena = cena;
        this.kontejner = null;
        this.lokacije=[];
        this.racun=[];
    }

    dodajLokaciju(lok)
    {
        this.lokacije.push(lok);
    }

    dodajRacun(rac)
    {
        this.racun.push(rac);
    }

    crtajObjekat(host)
    {
        if(!host)
        throw new Exception("Ne postoji roditeljski element!");
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejneri",this.naziv);
        host.appendChild(this.kontejner);
        this.crtajFormu(this.kontejner);
        this.crtajLokacije(this.kontejner);
        this.crtajRacune(this.kontejner);
    }

    crtajFormu(host)
    {
        const kontForma = document.createElement("div");
        kontForma.className = "ContainerForm";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML = "Unos osoba";
        kontForma.appendChild(elLabela);

        const tb = document.createElement("input");
        tb.className = "kolicina";
        tb.type = "number";
        kontForma.appendChild(tb);

        let tipoviHrane = ["Omlet", "Ljuta krilca" , "Burger" ,"Pomfrit", "BBQ Ribs"];
        var ceneHrane = [250,440,570,150,400];
        let tipoviPica = ["Dogma","Salto","Kozel","Stella Artois","Paulaner","Romerquelle"];
        var cenePica = [290,400,280,180,220,145];

        let opcija = null;
        let labela = null;
        let divRb = null;
        let divBr = null;
        
        //divovi,labele
        const div1 = document.createElement("div");
        kontForma.appendChild(div1);
        const lab1 = document.createElement("h3");
        lab1.innerHTML= "Unesite hranu";
        kontForma.appendChild(lab1);
        const div2 = document.createElement("div");
        kontForma.appendChild(div2);


        tipoviHrane.forEach((hrana,index)=>{
            divRb=document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = this.cena;
            opcija.value = ceneHrane[index];
           
            labela = document.createElement("label");
            labela.innerHTML = hrana;

            divRb.appendChild(labela);
            divRb.appendChild(opcija);
            kontForma.appendChild(divRb);
        })

        const div3 = document.createElement("div");
        kontForma.appendChild(div3);
        const div4 = document.createElement("div");
        kontForma.appendChild(div4);
        const lab = document.createElement("h3");
        lab.innerHTML = "Unesite piće";
        kontForma.appendChild(lab);

        tipoviPica.forEach((pice,index)=>
        {
            divBr = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = this.cena;
            opcija.value = cenePica[index];
            

            labela = document.createElement("label");
            labela.innerHTML = pice;

            divBr.appendChild(labela);
            divBr.appendChild(opcija);
            kontForma.appendChild(divBr);
        })


        let text = document.createElement("h4");
        text.innerHTML = "Unesite poziciju stola:";
        kontForma.appendChild(text);
        divRb=document.createElement("div");
        let selX = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "X:";
        divRb.appendChild(labela);
        divRb.appendChild(selX);

        for(let i=0;i<this.m;i++){
            opcija=document.createElement("option");
            opcija.innerHTML=i;
            opcija.value=i;
            selX.appendChild(opcija);
        }

                
        kontForma.appendChild(divRb);


        let selY = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML="Y:";
        divRb.appendChild(labela);
        divRb.appendChild(selY);

        for(let i=0;i<this.n;i++){
            opcija=document.createElement("option");
            opcija.innerHTML=i;
            opcija.value=i;
            selY.appendChild(opcija);
        }
        
        kontForma.appendChild(divRb);
        
        //upis u bazu//
        const dugme=document.createElement("button");
        dugme.innerHTML="Dodaj osobe za sto";
        dugme.className="DugmeKlasa";
        kontForma.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
            let x = parseInt(selX.value);
            let y = parseInt(selY.value);
            this.lokacije[x*this.n+y].azurirajLokaciju(kolicina,x,y);

            fetch("https://localhost:5001/Lokacija/UpisiLokaciju/" + this.id,{method:"POST",
            headers : {"Content-Type" : "application/json"}, body:JSON.stringify
            ({kapacitet : 0 , maxKapacitet : this.kapacitet , x : x , y : y })}).then
            (p=>{if(p.ok){this.lokacije[x*this.n+y].azurirajLokaciju(kolicina,x,y);}}).catch(err => console.log(err));
                            
        }

        //upis u bazu//
        const dugme2 = document.createElement("button");
        dugme2.innerHTML = "Račun";
        dugme2.className = "DugmeKlasa2";
        kontForma.appendChild(dugme2);
        dugme2.onclick=(ev)=>{

            const price = parseInt(this.kontejner.querySelector(`input[name='${this.cena}']:checked`).value);
           
            let x = parseInt(selX.value);
            let y = parseInt(selY.value);
            
            fetch("https://localhost:5001/Racun/UpisiRacune/" + this.id,{method:"POST" ,
             headers : {"Content-Type" : "application/json"},
             body:JSON.stringify
            ({ukupnaCena : this.racun[x*this.n+y].cena , x : x , y : y })}).then
            (p=>{if(p.ok){this.racun[x*this.n+y].azurirajCenu(price,x,y);}}).catch(err => console.log(err));
            
        }
        //brisanje racuna iz baze//
        const dugme3 = document.createElement("button");
        dugme3.innerHTML = "Isplaćeno";
        dugme3.className = "DugmeKlasa3";
        kontForma.appendChild(dugme3);
        dugme3.onclick=(ev)=>{
            let x=parseInt(selX.value);
            let y=parseInt(selY.value);
            this.racun[x*this.n+y].obrisiRacun(x,y);

            fetch("https://localhost:5001/Racun/IzbrisiRacun/" + this.racun[x*this.n+y].id , {method:"DELETE" ,
             headers : {"Content-Type" : "application/json"}}).then
            (p=>{if(p.ok){this.racun[x*this.n+y].azurirajCenu(price,x,y);}}).catch(err => console.log(err));

        }
    }

    crtajLokacije(host)
    {
        const kontLokacije = document.createElement("div");
        kontLokacije.className = "kontLokacije";
        host.appendChild(kontLokacije);
        
        
        let red;
        let lokacija;
        let lok;
        for(let i=0;i<this.m;i++)
        {
            red=document.createElement("div");
            red.className= "red";
            kontLokacije.appendChild(red);
            for(let j=0;j<this.n;j++){
                
            //lokacija=document.createElement("div");
            //lokacija.className="lok";

                lok=new Lokacija(i,j,this.kapacitet);
                this.dodajLokaciju(lok);
                lok.crtajLokaciju(red);
            }
        }
    }


    crtajRacune(host)
    {
        const kontRacun=document.createElement("div");
        kontRacun.classList.add("kontRacuna");
        kontRacun.className="kontRacuna";
        host.appendChild(kontRacun);
        for(let i=0;i<this.m;i++)
        {
        let red2=document.createElement("div");
        red2.className="red2";
        kontRacun.appendChild(red2);
        for(let j=0;j<this.n;j++){
        let rac = new Racun(i,j,this.cena);
        this.dodajRacun(rac);
        rac.CrtajRacun(red2);
        }
    }
        
    }
}     