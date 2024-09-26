using AuthDummy.Models;

namespace AuthDummy.Services
{
    public class Movies
    {
        private readonly Context _context;
        public Movies()
        {
            _context = new Context();
        }
        public List<Movie> GetMovies()
        {

            return [.. _context.Movies];
        }

    }
}
