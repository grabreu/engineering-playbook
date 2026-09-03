using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerticalSlice.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsStarredToTodoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsStarred",
                table: "TodoItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsStarred",
                table: "TodoItems");
        }
    }
}
