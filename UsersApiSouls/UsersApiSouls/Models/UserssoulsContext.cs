using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace UsersApiSouls.Models;

public partial class UserssoulsContext : DbContext
{
    public UserssoulsContext()
    {
    }

    public UserssoulsContext(DbContextOptions<UserssoulsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("Server=localhost;Port=3306;Database=userssouls;Uid=root;Pwd=;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("userID");
            entity.Property(e => e.Birthday)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("birthday");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("description");
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("enum('masculino','femenino','prefiero no decirlo')")
                .HasColumnName("gender");
            entity.Property(e => e.Nationality)
                .HasMaxLength(15)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nationality");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.ProfileBackground)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("profileBackground");
            entity.Property(e => e.ProfileBorder)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("profileBorder");
            entity.Property(e => e.ProfilePicture)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("profilePicture");
            entity.Property(e => e.Race)
                .HasMaxLength(20)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("race");
            entity.Property(e => e.RankName)
                .HasMaxLength(15)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("rankName");
            entity.Property(e => e.RankNum)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("rankNum");
            entity.Property(e => e.SoulsCoin)
                .HasDefaultValueSql("'10'")
                .HasColumnType("int(11)")
                .HasColumnName("soulsCoin");
            entity.Property(e => e.UserName)
                .HasMaxLength(15)
                .HasColumnName("userName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
