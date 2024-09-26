using AuthDummy.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthDummy.Services
{
    public class Auth
    {
        private readonly Context _context;
        public Auth()
        {
            _context = new Context();
        }

        public string GenerateToken(string email,string pass)
        {
            User user = new User();

            if (_context.Users.FirstOrDefault(x => x.Email == email) == null)
                return "err";

            user = _context.Users.FirstOrDefault(x => x.Email == email)!;

            if (user.Password != pass)
                return "err";

            var handler = new JwtSecurityTokenHandler();

            //uses private key to start the token
            var key = Encoding.ASCII.GetBytes("bdfjnpdinfjingjianjfinjign34u82btu22hr2un20-eun2ef2fqe94g594q34t989549g1344t39484t3945g3r9g438g34t9344t9543g6dg54sdg934973984t793748t7983ge5g54");
            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature);

            //describes the attributes inside the payload 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = GenerateClaims(user),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = credentials,
            };

            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }

        private static ClaimsIdentity GenerateClaims(User user)
        {
            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            claims.AddClaim(new Claim(ClaimTypes.Name, user.Name));
            return claims;
        }
    
    
        public void Register(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }

    
}
