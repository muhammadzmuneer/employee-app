using API.Entities;

namespace API.DAL.Contract
{
    public interface IEmployeesRepository
    {
        public Task<bool> RegisterEmployee(Employee employee);
        public Task<Employee> GetEmployeeDetails(string name);
        public Task<IEnumerable<Department>> GetDepartmentMasterData();
    }
}
