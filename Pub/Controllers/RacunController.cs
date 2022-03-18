using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Pub.Controllers 

{          
    [ApiController]
    [Route("[controller]")]
    public class RacunController : ControllerBase
    {
        public PivnicaContext Context {get; set;}
        public RacunController(PivnicaContext context)
        {
           Context=context;
        }

        [Route("PreuzmiRacune/{idPivnice}")] //done; tested
        [HttpGet]
        public async Task<List<Racun>> PreuzmiRacune(int idPivnice)
        {
            return await Context.Racuni.Where(rac => rac.Pivnica.ID == idPivnice).ToListAsync();
        }

        [Route("UpisiRacune/{idPivnice}")] //done; tested
        [HttpPost]
        public async Task UpisiRacune(int idPivnice,[FromBody]Racun rac)
        {
            var piv = await Context.Pivnice.FindAsync(idPivnice);
            rac.Pivnica=piv;
          Context.Racuni.Add(rac);
          await Context.SaveChangesAsync();
        }


        [Route("IzmeniRacune")] //done; tested
        [HttpPut]
        public async Task IzmeniRacune([FromBody] Racun rac)
        {
            Context.Update<Racun>(rac);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiRacun/{idRacuna}")] //ne radi
        [HttpDelete]
        public async Task IzbrisiRacun(int idRacuna)
        {
           var rac = await Context.Racuni.FindAsync(idRacuna);
            Context.Racuni.Remove(rac);
            await Context.SaveChangesAsync();
        }

    }

     
}    