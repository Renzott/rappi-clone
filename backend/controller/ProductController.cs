using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using MongoDB.Bson;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{

    private readonly ProductService _productService;
    private readonly CategoryService _categoryService;

    public ProductController(ProductService productService, CategoryService categoryService)
    {
        _productService = productService;
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts() =>
        await _productService.GetAll();

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        await _productService.Create(product);

        product.categories.ForEach(async (category) =>
        {
            await _categoryService.Create(category);
        });

        return CreatedAtAction(nameof(GetProducts), new { id = product.id }, product);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(string id) =>
        (ObjectId.TryParse(id, out _)) ? await _productService.Get(id) : Ok(null);

    [HttpGet("search/{name}")]
    public async Task<ActionResult<List<Product>>> Search(string name) =>
        await _productService.Search(name);

    [HttpGet("search/category/{id}")]
    public async Task<ActionResult<List<Product>>> GetByCategory(string id) =>
        (ObjectId.TryParse(id, out _)) ? await _productService.GetByCategory(id) : Ok(null);


    //search by category and name
    [HttpGet("search/{category}/{name}")]
    public async Task<ActionResult<List<Product>>> Search(string category, string name) =>
        await _productService.Search(category, name);

}
