using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class PivnicaContext : DbContext{
        public DbSet<Pivnica> Pivnice {get;set;}
        public DbSet<Lokacija> Lokacije {get;set;}

        public DbSet<Racun> Racuni {get;set;}

        public PivnicaContext(DbContextOptions options) :base(options)
        {

        }
    }
}