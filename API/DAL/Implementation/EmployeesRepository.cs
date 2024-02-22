using API.DAL.Contract;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DAL.Implementation
{
    public class EmployeesRepository : IEmployeesRepository
    {
        private readonly EmployeesDbContext _employeeDbContext;

        public EmployeesRepository(EmployeesDbContext dbcontext)
        {
            _employeeDbContext = dbcontext;

        }
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
