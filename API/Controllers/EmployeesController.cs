using API.DAL;
using API.DAL.Contract;
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

        private readonly IEmployeesRepository _employeesRepository;

        public EmployeesController(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
                
        }

        #endregion

        #region EmployeeAppMethods

        /// <summary>
        /// Method to register an employee
        /// </summary>
        [HttpPost]
        [Route("RegisterEmployee")]
        public Task<bool> RegisterEmployee(Employee employee)
        {
           return _employeesRepository.RegisterEmployee(employee);      
        }

        /// <summary>
        /// Method to get details of a single employee by name
        /// </summary>
        [HttpGet]
        [Route("GetEmployeeDetails/{name}")]
        public Task<Employee> GetEmployeeDetails(string name)
        {
            return _employeesRepository.GetEmployeeDetails(name);
        }

        /// <summary>
        /// Method to get different department details
        /// </summary>
        [HttpGet]
        [Route("GetDepartmentMasterData")]
        public Task<IEnumerable<Department>> GetDepartmentMasterData()
        {
            return _employeesRepository.GetDepartmentMasterData();
        }

        #endregion
    }
}
