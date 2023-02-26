using System.ComponentModel.DataAnnotations;

namespace PAS.Domain
{
    public class Paciente
    {
        public Paciente()
        {
        }

        [Key]
        public int Id { get; set; }

        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public decimal Altura { get; set; }

        public decimal Peso { get; set; }
    }
}
