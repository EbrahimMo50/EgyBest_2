using Microsoft.EntityFrameworkCore;

namespace AuthDummy.Models
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            var connString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Ebrahim.Mohsen\\Documents\\AuthDummy.mdf;Integrated Security=True;Connect Timeout=30";
            optionsBuilder.UseSqlServer(connString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .ToTable("users")
                .HasKey(x=>x.Id);

            modelBuilder.Entity<Movie>()
                .ToTable("movies")
                .HasKey(m => m.Id);
        }
    }
}
