using System;
using System.Collections.Generic;

namespace PJSoulsAPI.Models;

public partial class Character
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Game { get; set; } = null!;

    public string Origin { get; set; } = null!;

    public string Race { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Affiliation { get; set; } = null!;

    public string CharacterIcon { get; set; } = null!;

    public string CharacterImage { get; set; } = null!;
}
