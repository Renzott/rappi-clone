using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Text.Json;

namespace Backend.Controller;

[ApiController]
[AllowAnonymous]
[Route("/access")]
public class GoogleController : ControllerBase
{
    [HttpGet]
    [Route("/login")]
    public async Task<ActionResult> GoogleLogin(){

        var properties = new AuthenticationProperties
        {
            RedirectUri = Url.Action("GoogleResponse")
        };

        return await Task.FromResult(Challenge(properties, GoogleDefaults.AuthenticationScheme));
    }

    [HttpGet]
    [Route("/logout")]
    public async Task<ActionResult> GoogleLogout(){

        await HttpContext.SignOutAsync();
        return await Task.FromResult(Redirect("/"));
    }


    //RETURN json claims
    [HttpGet]
    [Route("/google-response")]
    public async Task<ActionResult> GoogleResponse()
    {
        var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        var claims = result?.Principal?.Identities.FirstOrDefault()?
            .Claims.Select(claim => new 
            { 
                claim.Issuer,
                claim.OriginalIssuer,
                claim.Type,
                claim.Value
            });

        return await Task.FromResult(Ok(JsonSerializer.Serialize(claims)));
        
    }

}
