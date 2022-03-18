import { Lokacija } from "./lokacija.js";
import {Pivnica} from "./pivnica.js"
import { Racun } from "./racun.js";

//const beerPub = new Pivnica("Beer Pub",5,4,6);
//beerPub.crtajObjekat(document.body);
let main = document.createElement("div");
main.className = "crtanje";
document.body.appendChild(main);
const kontejner3 = document.createElement("div");
kontejner3.className = "main";
main.appendChild(kontejner3);
let label = document.createElement("br");
kontejner3.appendChild(label);
label=document.createElement("h2");
label.innerHTML = "Prikaži pivnice";
kontejner3.appendChild(label);

//crtanje pivnica
const crtaj = document.createElement("button");
crtaj.className = "btnCrtaj";
crtaj.innerHTML = "Prikaži pivnice";
kontejner3.appendChild(crtaj);

crtaj.onclick=(ev)=>
{
    fetch("https://localhost:5001/Pivnica/PreuzmiPivnicu").then(p=>{
    p.json().then(data=>{
    data.forEach(piv=>{
    const pivn = new Pivnica(piv.id , piv.ime, piv.n, piv.m, piv.kapacitet);
    pivn.crtajObjekat(document.body);

    piv.lokacije.forEach(l => {
    pivn.dodajLokaciju(new Lokacija(piv.lokacije.x, piv.lokacije.y ,piv.lokacije.maxKapacitet));
    pivn.lokacije[l.x * pivn.n + l.y].azurirajLokaciju(l.x, l.y, l.kapacitet);
        });
    piv.racuni.forEach(r => {
    pivn.dodajRacun(new Racun(r.id , r.x, r.y,r.ukupnaCena));
    let red2 = document.querySelector(".red2");
    console.log(red2);
    pivn.racuni[r.x * pivn.n + r.y].crtajRacun(red2);
    })    });
});
});
}


let main1 = document.createElement("div");
main1.className = "brisanje";
document.body.appendChild(main1);
const kontejner4 = document.createElement("div");
kontejner4.className = "kont4";
main1.appendChild(kontejner4);
let label4 = document.createElement("br");
kontejner4.appendChild(label4);
label4=document.createElement("h2");
label4.innerHTML = "Brisanje pivnice";
let label5=document.createElement("h2");
label5.innerHTML = "sa imenom: ";
kontejner4.appendChild(label4);
kontejner4.appendChild(label5);
let input = document.createElement("input");
input.className = "ime";
input.type = "string";
kontejner4.appendChild(input);

//brisanje

const izbrisi = document.createElement("button");
izbrisi.className= "btnIzbrisi";
izbrisi.innerHTML= "Izbriši pivnicu";
kontejner4.appendChild(izbrisi);
izbrisi.onclick=(ev)=>{
    let ime = document.querySelector(".ime").value;
    fetch("https://localhost:5001/Pivnica/IzbrisiPivnicu/"+ime,{method:"DELETE"}).then
    (p=>{if(p.ok){let kontejner = document.querySelector("." + ime); 
        kontejner.remove(); }});
}


