using PAS.Domain;

namespace PAS.Models
{
    public record struct PacienteResponseModel
    {
        public PacienteResponseModel(Paciente paciente)
        {
            Id = paciente.Id;
            Nome = paciente.Nome;
            DataNascimento = paciente.DataNascimento;
            Altura = paciente.Altura;
            Peso = paciente.Peso;
        }

        public int Id { get; set; }

        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public decimal Altura { get; set; }

        public decimal Peso { get; set; }
    }
}
