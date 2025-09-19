using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CRUDApplicationWebAPI.Models;

public partial class Student
{
   [Key] public int Id { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }
}
