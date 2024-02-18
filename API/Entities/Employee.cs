namespace API.Entities
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required DateTime Dob { get; set; }

        public required int DepartmentId { get; set; }
        public string ProfilePicture { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }


    }
}
