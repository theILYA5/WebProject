using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Pivnica")]
    public class Pivnica
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}


        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("N")]

        public int N { get; set; }

        [Column("M")]
        public int M { get; set; }

        [Column("Kapacitet")]

         public int Kapacitet { get; set; }

        [Column("Cena")]

         public int Cena { get; set; }

        
         public virtual List<Lokacija> Lokacije {get; set;}

        
         public virtual List<Racun> Racuni{get; set;}




    }
}