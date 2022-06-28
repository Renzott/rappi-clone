using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Services;
using Backend.Models;
using MongoDB.Bson;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase{
    
    private readonly CategoryService _categoryService;
    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetCategories() =>
        await _categoryService.GetAll();
}