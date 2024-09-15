
using Spiritual.Server.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace Spiritual.server.Context
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        private readonly IConfiguration configuration;

        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> contextOptions, IConfiguration configuration)
            : base(contextOptions)
        {
            this.configuration = configuration;
        }

        public AppUser User { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("Users"));
        }

       
    }
}
