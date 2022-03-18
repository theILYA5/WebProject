export class Lokacija{
    constructor(i,j,MaxKapacitet)
    {
        this.x = i;
        this.y = j;
        this.kapacitet = 0;
        this.MaxKapacitet = MaxKapacitet;
        this.miniKontejner = null;
    }

    vratiSliku()
    {
        let image = document.createElement("img");
        image.className = "slika";
        image= "url('sto.png')";        
        return image;        
    }

    crtajLokaciju(host)
    {
        this.miniKontejner=document.createElement("div");
        this.miniKontejner.className="lok";
        this.miniKontejner.innerHTML="prazno, " + this.kapacitet;
        this.miniKontejner.style.backgroundImage = this.vratiSliku();
        host.appendChild(this.miniKontejner);
    }

    azurirajLokaciju(kolicina,x,y)
    {
        if(kolicina+this.kapacitet > this.MaxKapacitet)
        alert("Kapacitet je popunjen");
        else
        {
            this.kapacitet+=kolicina;
            this.miniKontejner.innerHTML=this.kapacitet;    
        }
    }
}