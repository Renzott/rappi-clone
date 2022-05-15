using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controller;

[ApiController]
[Authorize]
[Route("/test")]
public class TestFileController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<string>> Get() =>
        await Task.FromResult("Go to /swagger to see the documentation");
}