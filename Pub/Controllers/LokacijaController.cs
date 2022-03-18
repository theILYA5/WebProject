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
    public class LokacijaController : ControllerBase
    {
        public PivnicaContext Context {get; set;}
        public LokacijaController(PivnicaContext context)
        {
           Context=context;
        }

        [Route("PreuzmiLokacije/{idPivnice}")] //done; tested
        [HttpGet]
        public async Task<List<Lokacija>> PreuzmiLokacije(int idPivnice)
        {
            return await Context.Lokacije.Where(lok=>lok.Pivnica.ID==idPivnice).ToListAsync();
        }

        [Route("UpisiLokaciju/{idPivnice}")]    //done; tested
        [HttpPost]
        public async Task UpisiLokaciju(int idPivnice , [FromBody]Lokacija lok)
        {
          var piv = await Context.Pivnice.FindAsync(idPivnice);
          lok.Pivnica = piv;
          Context.Lokacije.Add(lok);
          await Context.SaveChangesAsync();
        }

        [Route("IzmeniLokaciju")] //radi; testirano
        [HttpPut]
        public async Task IzmeniLokaciju([FromBody] Lokacija lok)
        {
            Context.Update<Lokacija>(lok);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiLokaciju/{idPivnice}")] //radi; testirano
        [HttpDelete]
        public async Task IzbrisiLokaciju(int id)
        {
            var lok = await Context.Lokacije.FindAsync(id);
            Context.Remove(lok);
            await Context.SaveChangesAsync();
        }
    }

}