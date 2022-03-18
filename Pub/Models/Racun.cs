using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Racun
    {
        [Key]
        [Column("ID")]

        public int ID {get; set;}
        
        [Column("UkupnaCena")]
        public int UkupnaCena { get; set; }

        [Column("X")]

        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }
        [JsonIgnore]
        public Pivnica Pivnica {get; set;}
    }
}