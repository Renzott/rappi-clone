using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Services;
using Backend.Models;
using MongoDB.Bson;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{

    private readonly OrderService _orderService;

    public OrderController(OrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders() =>
        await _orderService.GetAll();

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> Get(string id) =>
        (ObjectId.TryParse(id, out _)) ? await _orderService.Get(id) : Ok(null);


    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
        await _orderService.Create(order);
        return CreatedAtAction(nameof(GetOrders), new { id = order.id }, order);
    }
    [HttpPut("{id}/status/{status}")]
    public async Task<ActionResult<Order>> UpdateStatus(string id, string status) =>
        (ObjectId.TryParse(id, out _)) ? Ok(await _orderService.UpdateStatus(id, status)) : Ok(null);
}