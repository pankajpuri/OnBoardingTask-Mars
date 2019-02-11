using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace OnBoardingTalent.Models
{
    public class Context : DbContext
    {
        public Context() : base("DefaultConnection") { }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Store>Store { get; set; }
        public DbSet<Sales> Sales { get; set; }
    }
}