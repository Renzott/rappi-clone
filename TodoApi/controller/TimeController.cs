using TodoApi.Models;
using TodoApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Controller;

[ApiController]
[Route("api/[controller]")]
public class TimeController : ControllerBase
{
    private readonly TimeService _timeService;

    public TimeController(TimeService timeService) => _timeService = timeService;

    [HttpGet]
    public async Task<ActionResult<List<Time>>> GetTimes() =>
        await _timeService.GetTimes();

    [HttpPost]
    public async Task<ActionResult<Time>> Create(Time time)
    {
        await _timeService.Create(time);
        return CreatedAtAction(nameof(GetTimes), new { id = time.Id }, time);
    }
}
