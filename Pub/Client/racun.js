export class Racun
{
    
    constructor(id, i , j , cena)
    {
        this.id = id;
        this.x=i;
        this.y=j;
        this.cena=cena;
        this.ukupnaCena=0;
        this.minikontejner2=null;
    }
    
        CrtajRacun(host)
        {  
            let naziv=document.createElement("h3");
            naziv.innerHTML = "";
            host.appendChild(naziv);
            this.minikontejner2=document.createElement("div");
            this.minikontejner2.className="rac";
            this.minikontejner2.innerHTML="Prazno";
            host.appendChild(this.minikontejner2);
        }
    
        vratiCenu()
        {
            return this.cena;
        }
        
    
        azurirajCenu(cena,x,y)
        {
            this.cena=cena;
            this.ukupnaCena+=cena;
            this.minikontejner2.innerHTML=this.ukupnaCena +"din";
            this.minikontejner2.style.backgroundColor="#55aa55";
            this.vratiCenu();           
        }
    
        obrisiRacun(x,y)
    {
       this.minikontejner2.innerHTML="Prazno";
       this.minikontejner2.style.backgroundColor="#ff7f50"
    }
}