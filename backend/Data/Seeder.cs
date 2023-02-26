using Microsoft.EntityFrameworkCore;

namespace PAS.Data
{
    public class Seeder
    {
        private readonly DbContext _dbContext;


        public Seeder(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Migrate()
        {
            _dbContext.Database.Migrate();
        }
    }
}
