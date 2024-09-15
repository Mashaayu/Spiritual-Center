using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Spiritual.server.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastModified = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    webkitRelativePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserImages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Devotees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    middlename = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    emaidId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    devoteeLoginId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InitiationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    flatno = table.Column<int>(type: "int", nullable: false),
                    area = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pincode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserImageId = table.Column<int>(type: "int", nullable: true),
                    UserImageURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByID = table.Column<int>(type: "int", nullable: true),
                    UpdatedByID = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devotees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Devotees_UserImages_UserImageId",
                        column: x => x.UserImageId,
                        principalTable: "UserImages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Donations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DonationAmount = table.Column<int>(type: "int", nullable: false),
                    DonationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    year = table.Column<int>(type: "int", nullable: false),
                    month = table.Column<int>(type: "int", nullable: false),
                    DevoteeId = table.Column<int>(type: "int", nullable: true),
                    CreatedByID = table.Column<int>(type: "int", nullable: true),
                    UpdatedByID = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Donations_Devotees_DevoteeId",
                        column: x => x.DevoteeId,
                        principalTable: "Devotees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Devotees_UserImageId",
                table: "Devotees",
                column: "UserImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Donations_DevoteeId",
                table: "Donations",
                column: "DevoteeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Donations");

            migrationBuilder.DropTable(
                name: "Devotees");

            migrationBuilder.DropTable(
                name: "UserImages");
        }
    }
}
