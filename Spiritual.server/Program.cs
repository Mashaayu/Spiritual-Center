
using Spiritual.server.Context;
using Spiritual.Server.Extension;
using Spiritual.Server.Identity;
using Spiritual.Server.SeedData;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.OpenApi.Models;
using Spiritual.Server.Services;
using Spirituals.Server.Services;
using Spiritual.server.Repository;
using Spiritual.server.Hubs;
using Spiritual.server.Models.Message;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Spiritual.server.Services;
using Microsoft.AspNetCore.WebSockets;
using Spiritual.server.Hubs.HubServices;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Users")));
        builder.Services.AddDbContext<DevoteeDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Data")));
        builder.Services.AddDbContext<HubContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Data")));
            
        builder.Services.AddIdentityService(builder.Configuration);
       
        //   builder.Services.AddAutoMapper(typeof(MappingProfiles));
        builder.Services.AddScoped<ITokenService,TokenService>();
        builder.Services.AddScoped(typeof(IGenericRepo<>),typeof(GenericRepo<>));
        builder.Services.AddScoped<IDevoteeRepo,DevoteeRepo>();

        //need only one instance in a life
        builder.Services.AddSingleton<IMessageService, MessageService>();

        //Ingored the cycle created while fetching the data of 
        
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
        builder.Services.TryAddEnumerable(ServiceDescriptor.Singleton<IPostConfigureOptions<JwtBearerOptions>,
            ConfigureJwtBearerOptions>());
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {

                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }
            });
        });
        builder.Services.AddSignalR();
        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                RoleManager<AppRole> roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                await IdentitySeed.SeedUser(roleManager);
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError(ex.Message);

            }

   
        }
        app.UseCors(
            options =>
            {
                options.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
          
            app.UseSwagger();
            app.UseSwaggerUI();
        }


        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseMiddleware<WebSocketMiddleware>(); /// added middle ware

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<UserHub>("hub/Userhub");
            endpoints.MapControllers();
        }
        );
    

        app.Run();
    }
}