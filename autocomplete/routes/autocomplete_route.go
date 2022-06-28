package routes

import (
	"rappi-clone/autocomplete/controllers"

	"github.com/gofiber/fiber/v2"
)

func AutocompleteRoute(app *fiber.App) {
	app.Get("/products", controllers.FindProduct)
	app.Get("/categories", controllers.FindCategory)
}
