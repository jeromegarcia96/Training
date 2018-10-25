using Microsoft.EntityFrameworkCore;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class OnlineStoreDbContext
        : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Shipper> Shippers { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<Man> Man { get; set; }
        public DbSet<Note> Notes { get; set; }


        public OnlineStoreDbContext(DbContextOptions<OnlineStoreDbContext> options)
         : base(options)
        {

        }
        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=.;Database=OnlineStoreDB;Integrated Security=true;";
            optionsBuilder.UseSqlServer(connectionString);
        }

        public OnlineStoreDbContext()
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                        .ToTable("Employee");
            modelBuilder.Entity<Department>()
                        .ToTable("Department");
            modelBuilder.Entity<Customer>()
                        .ToTable("Customer");
            modelBuilder.Entity<Category>()
                        .ToTable("Category");
            modelBuilder.Entity<Product>()
                        .ToTable("Product");
            modelBuilder.Entity<Supplier>()
                        .ToTable("Supplier");
            modelBuilder.Entity<Shipper>()
                        .ToTable("Shipper");
            modelBuilder.Entity<OrderDetail>()
                       .ToTable("OrderDetail");
            modelBuilder.Entity<Order>()
                       .ToTable("Order");
            modelBuilder.Entity<Student>()
                      .ToTable("Student");
            modelBuilder.Entity<Course>()
                       .ToTable("Course");
            modelBuilder.Entity<Person>()
                      .ToTable("Person");
            modelBuilder.Entity<Man>()
                      .ToTable("Man");
            modelBuilder.Entity<Note>()
                 .ToTable("Note");


            base.OnModelCreating(modelBuilder);
        }
    }
}
