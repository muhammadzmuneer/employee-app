using API.DAL;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    /// <summary>
    /// The EmployeesController holds the methods to register and search employees.
    /// </summary>
    public class EmployeesController : ControllerBase
    {
        #region ConstructorRegion

        private readonly EmployeesDbContext _employeeDbContext;

        public EmployeesController(EmployeesDbContext dbcontext)
        {
            _employeeDbContext = dbcontext;
                
        }

        #endregion

        #region EmployeeAppMethods

        /// <summary>
        /// Method to register an employee
        /// </summary>
        [HttpPost]
        [Route("RegisterEmployee")]
        public async Task<bool> RegisterEmployee(Employee employee)
        {
            try
            {
                employee.CreatedBy = "Admin";
                employee.CreatedOn = DateTime.Now;
                employee.Dob = employee.Dob.ToLocalTime();
                await _employeeDbContext.Employees.AddAsync(employee);
                var result = await _employeeDbContext.SaveChangesAsync() > 0;
                return result;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        /// <summary>
        /// Method to get details of a single employee by name
        /// </summary>
        [HttpGet]
        [Route("GetEmployeeDetails/{name}")]
        public async Task<Employee> GetEmployeeDetails(string name)
        {
            try
            {
                return await _employeeDbContext.Employees.FirstAsync(emp => (emp.FirstName == name || emp.LastName == name || (emp.FirstName + ' ' + emp.LastName) == name));
            }
            catch (Exception ex)
            {
                return null;

            }
        }

        /// <summary>
        /// Method to get different department details
        /// </summary>
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

        #endregion
    }
}
