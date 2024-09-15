
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Spiritual.server.Models;
using Spiritual.Server.Models;

namespace Spiritual.server.Context
{
    public class DevoteeDbContext : DbContext
    {
        private readonly IConfiguration configuration;

        public DevoteeDbContext(DbContextOptions<DevoteeDbContext> Options, IConfiguration configuration)
            : base(Options)
        {
            this.configuration = configuration;
        }

        public DbSet<Devotee> Devotees { get; set; }

        public DbSet<Donation> Donations { get; set; }
        public DbSet<UserImage> UserImages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("Data"));
        }
    }
}
