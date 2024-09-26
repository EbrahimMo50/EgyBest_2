using AuthDummy.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthDummy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly Movies _service;
        public MoviesController(Movies service)
        {
            _service = service;
        }

        [HttpGet("GetMovies")]
        public IActionResult GetMovies()
        {
            return Ok(_service.GetMovies());
        }
    }
}
