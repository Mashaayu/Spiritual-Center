using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Spiritual.Server.Identity;

namespace Spiritual.server.Context
{
    public class HubContext : DbContext
    {
        private readonly IConfiguration configuration;
        public HubContext(DbContextOptions<HubContext> contextOptions, IConfiguration configuration)
             : base(contextOptions)
        {
            this.configuration = configuration;
        }

        public DbSet<Message> Messages { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("Data"));
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Message>().HasNoKey();
        }
    }
}
