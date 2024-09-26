using AuthDummy.Models;
using AuthDummy.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthDummy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private Auth _services;
        public AuthController(Auth services)
        {
            _services = services;
        }
        [HttpPost("Register")]
        public IActionResult Register(User user)
        {
            _services.Register(user);
            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login(UserVm uservm) {
            var result = _services.GenerateToken(uservm.email, uservm.password);
            if(result == "err")
                return NotFound("error in credintals");
            return Ok(result);
        }
    }
}
