
using Microsoft.EntityFrameworkCore;
using MovieApplication.Models;
using System;

namespace MovieApplication.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}
