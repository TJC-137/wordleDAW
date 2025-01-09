using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PJSoulsAPI.Models;

public partial class PjsoulsContext : DbContext
{
    public PjsoulsContext()
    {
    }

    public PjsoulsContext(DbContextOptions<PjsoulsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Character> Characters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("Server=localhost;Port=3306;Database=pjsouls;Uid=root;Pwd=;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Character>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("characters");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Affiliation)
                .HasMaxLength(255)
                .HasColumnName("affiliation");
            entity.Property(e => e.CharacterIcon)
                .HasMaxLength(255)
                .HasColumnName("character_icon");
            entity.Property(e => e.CharacterImage)
                .HasMaxLength(255)
                .HasColumnName("character_image");
            entity.Property(e => e.Game)
                .HasMaxLength(255)
                .HasColumnName("game");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Origin)
                .HasMaxLength(255)
                .HasColumnName("origin");
            entity.Property(e => e.Race)
                .HasMaxLength(255)
                .HasColumnName("race");
            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .HasColumnName("type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
