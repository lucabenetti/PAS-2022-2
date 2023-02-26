using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PAS.Domain;

namespace PAS.Data
{
    public class PacienteMapping : IEntityTypeConfiguration<Paciente>
    {
        public PacienteMapping()
        {
        }

        public void Configure(EntityTypeBuilder<Paciente> builder)
        {
            builder.HasKey(x => x.Id);

            builder.ToTable("Paciente", "Sistema");
        }
    }
}