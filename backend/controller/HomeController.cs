using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using Backend.Models;
using Backend.Services;

namespace Backend.Controller;

[ApiController]
[Authorize]
[Route("/")]    
public class HomeController : ControllerBase
{   
    private readonly ProductService _productService;
    private readonly CategoryService _categoryService;

    public HomeController(ProductService productService, CategoryService categoryService)
    {
        _productService = productService;
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<string>> Get(){

        return await Task.FromResult("Go to /swagger to see the documentation");
    }

    // add mock values for testing on mongoDB
    [HttpGet("init11")]
    public async Task<ActionResult<string>> GetSwagger(){

        Product product1 = new Product{
            name = "Hamburguesa",
            description = "Product 1 description",
            categories = new List<Category>{
                new Category{
                    name = "Carne"
                }
            },
            price = 10.99m,
            imageUrl = new List<string>{
                "https://picsum.photos/200/300?image=10",
                "https://picsum.photos/200/300?image=11",
                "https://picsum.photos/200/300?image=12"
            }
        };

        await _productService.Create(product1);

        product1.categories.ForEach(async (category) =>
        {
            await _categoryService.Create(category);
        });

        return await Task.FromResult("Add values");
    }
}
