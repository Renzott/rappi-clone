using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace Backend.Controller;

[ApiController]
[Authorize]
[Route("/")]    
public class HomeController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<string>> Get(){

        return await Task.FromResult("Go to /swagger to see the documentation");
    }
}
