using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Lokacija")]
    public class Lokacija
    {
        [Key]
        [Column("ID")]

        public int ID {get;set;}
        
        [Column("Kapacitet")]
        public int Kapacitet { get; set; }

        [Column("MaxKapacitet")]

        public int MaxKapacitet { get; set; }

        [Column("X")]

        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        [JsonIgnore]
        public Pivnica Pivnica {get; set;}

    }
}