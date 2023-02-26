using Microsoft.AspNetCore.Mvc;
using PAS.Data;
using PAS.Domain;
using PAS.Models;

namespace PAS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly DbContext _dbContext;
        public PacienteController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var pacientes = _dbContext.Pacientes.ToList();
            return Ok(pacientes?.Select(p => new PacienteResponseModel(p)));
        }

        [HttpPut]
        public void Put(PacienteRequestModel request)
        {
            if(request == null) return;

            if (request.Id > 0)
            {
                var paciente = _dbContext.Pacientes.FirstOrDefault(x => x.Id == request.Id);
                if (paciente == null) return;

                paciente.Nome = request.Nome;
                paciente.Altura = request.Altura;
                paciente.DataNascimento = request.DataNascimento;
                paciente.Peso = request.Peso;

                _dbContext.Update(paciente);
                _dbContext.SaveChanges();
                return;
            }

            var ultimoPaciente = _dbContext.Pacientes.OrderByDescending(x => x.Id).FirstOrDefault();
            var ultimoId = ultimoPaciente is null ? 0 : ultimoPaciente.Id;

            var pacienteNovo = new Paciente()
            {
                Id = ultimoId + 1,
                Nome = request.Nome,
                Peso = request.Peso,
                Altura = request.Altura,
                DataNascimento = request.DataNascimento
            };

            _dbContext.Add(pacienteNovo);
            _dbContext.SaveChanges();
        }
    }
}