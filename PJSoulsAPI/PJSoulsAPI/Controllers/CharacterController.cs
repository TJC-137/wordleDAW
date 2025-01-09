using PJSoulsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
namespace PJSoulsAPI.Controllers
{
    public class CharacterController
    {
    }


public static class CharacterEndpoints
{
	public static void MapCharacterEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Character").WithTags(nameof(Character));

        group.MapGet("/", async (PjsoulsContext db) =>
        {
            return await db.Characters.ToListAsync();
        })
        .WithName("GetAllCharacters")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Character>, NotFound>> (int id, PjsoulsContext db) =>
        {
            return await db.Characters.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is Character model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetCharacterById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Character character, PjsoulsContext db) =>
        {
            var affected = await db.Characters
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, character.Id)
                  .SetProperty(m => m.Name, character.Name)
                  .SetProperty(m => m.Game, character.Game)
                  .SetProperty(m => m.Origin, character.Origin)
                  .SetProperty(m => m.Race, character.Race)
                  .SetProperty(m => m.Gender, character.Gender)
                  .SetProperty(m => m.Type, character.Type)
                  .SetProperty(m => m.Affiliation, character.Affiliation)
                  .SetProperty(m => m.CharacterIcon, character.CharacterIcon)
                  .SetProperty(m => m.CharacterImage, character.CharacterImage)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateCharacter")
        .WithOpenApi();

        group.MapPost("/", async (Character character, PjsoulsContext db) =>
        {
            db.Characters.Add(character);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Character/{character.Id}",character);
        })
        .WithName("CreateCharacter")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, PjsoulsContext db) =>
        {
            var affected = await db.Characters
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteCharacter")
        .WithOpenApi();
    }
}}
