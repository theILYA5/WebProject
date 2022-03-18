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
    public class PivnicaController : ControllerBase
    {
        public PivnicaContext Context {get; set;}
        public PivnicaController(PivnicaContext context)
        {
           Context=context;
        }


        [Route("PreuzmiPivnicu")]
        [HttpGet]
        public async Task<List<Pivnica>> PreuzmiPivnicu()
        {
            return await Context.Pivnice.Include(p => p.Lokacije).Include(p=>p.Racuni).ToListAsync();
        }

        [Route("UpisiPivnicu")]
        [HttpPost]
        public async Task UpisiRestoran([FromBody]Pivnica piv)
        {
        Context.Pivnice.Add(piv);
        await Context.SaveChangesAsync();
        }


        [Route("IzmeniPivnicu")]
        [HttpPut]
        public async Task IzmeniPivnicu([FromBody]Pivnica piv)
        {
            Context.Update<Pivnica>(piv);
            await Context.SaveChangesAsync();
        }
         
        [Route("IzbrisiPivnicu/{ime}")]
        [HttpDelete]
        public async Task IzbrisiPivnicu(string ime)
        {
           var nizLokacija = Context.Lokacije.Where(l => l.Pivnica.Ime == ime);
           await nizLokacija.ForEachAsync(l=>{
             Context.Remove(l);
           });
           var nizRacuna = Context.Racuni.Where(l => l.Pivnica.Ime == ime);
           await nizRacuna.ForEachAsync(l=>{
             Context.Remove(l);
           });
           var pivnicaP = await Context.Pivnice.FirstOrDefaultAsync(l => l.Ime == ime);
           Context.Remove(pivnicaP);
           await Context.SaveChangesAsync();
        }
    }
}
