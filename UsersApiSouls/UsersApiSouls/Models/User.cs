using System;
using System.Collections.Generic;

namespace UsersApiSouls.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? ProfilePicture { get; set; }

    public string? Description { get; set; }

    public DateTime? Birthday { get; set; }

    public string? ProfileBorder { get; set; }

    public int? SoulsCoin { get; set; }

    public string? ProfileBackground { get; set; }

    public int? RankNum { get; set; }

    public string? RankName { get; set; }

    public string? Nationality { get; set; }

    public string? Gender { get; set; }

    public string? Race { get; set; }
}
