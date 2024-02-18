using API.DAL;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesDbContext _employeeDbContext;

        public EmployeesController(EmployeesDbContext dbcontext)
        {
            _employeeDbContext = dbcontext;
                
        }

        [HttpPost]
        [Route("RegisterEmployee")]
        public async Task<bool> RegisterEmployee(Employee employee)
        {
            try
            {
                employee.CreatedBy = "Admin";
                employee.CreatedOn = DateTime.Now;
                await _employeeDbContext.Employees.AddAsync(employee);
                var result = await _employeeDbContext.SaveChangesAsync() > 0;
                return result;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        [HttpGet]
        [Route("GetEmployeeDetails/{name}")]
        public async Task<Employee> GetEmployeeDetails(string name)
        {
            try
            {
                return await _employeeDbContext.Employees.FirstAsync(emp => emp.FirstName == name);
            }
            catch (Exception ex)
            {
                return null;

            }
        }

        [HttpGet]
        [Route("GetDepartmentMasterData")]
        public async Task<IEnumerable<Department>> GetDepartmentMasterData()
        {
            try
            {
                return await _employeeDbContext.Departments.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;

            }
        }
    }
}
