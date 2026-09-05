using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerticalSlice.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIndexToTodoListName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TodoLists_Name",
                table: "TodoLists",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TodoLists_Name",
                table: "TodoLists");
        }
    }
}
