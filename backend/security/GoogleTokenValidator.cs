namespace Backend.Security;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json;


public class GoogleTokenValidator : ISecurityTokenValidator
{
    private readonly string _googleClientId;
    private readonly JwtSecurityTokenHandler _tokenHandler;

    public GoogleTokenValidator(string googleClientId)
    {
        _googleClientId = googleClientId;
        _tokenHandler = new JwtSecurityTokenHandler();
    }

    public bool CanValidateToken => true;

    public int MaximumTokenSizeInBytes { get; set; } = TokenValidationParameters.DefaultMaximumTokenSizeInBytes;

    public bool CanReadToken(string securityToken)
    {
        return true;
    }

    public ClaimsPrincipal ValidateToken(string securityToken, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
    {
        validatedToken = _tokenHandler.ReadJwtToken(securityToken);
        Console.WriteLine(_googleClientId);
        try
        {
            var payload = GoogleJsonWebSignature.ValidateAsync(securityToken, new GoogleJsonWebSignature.ValidationSettings(){
                Audience = new[] { _googleClientId }
            }).Result;

            Console.WriteLine("Name" + payload.Picture);
            Console.WriteLine("Email" + payload.Email);
            Console.WriteLine("Subject" + payload.Subject);
            Console.WriteLine("Issuer" + payload.Issuer);

            var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, payload.Name),
            new Claim(ClaimTypes.NameIdentifier, payload.Name),
            new Claim(JwtRegisteredClaimNames.Email, payload.Email),
            new Claim(JwtRegisteredClaimNames.Sub, payload.Subject),
            new Claim(JwtRegisteredClaimNames.Iss, payload.Issuer),
        };

            var principle = new ClaimsPrincipal();
            principle.AddIdentity(new ClaimsIdentity(claims, JwtBearerDefaults.AuthenticationScheme));
            return principle;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

}