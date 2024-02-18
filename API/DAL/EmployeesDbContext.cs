using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DAL
{
    public class EmployeesDbContext : DbContext
    {
        public EmployeesDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Department> Departments { get; set; }
    }
}
