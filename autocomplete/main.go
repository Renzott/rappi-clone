package main

import (
	"rappi-clone/autocomplete/configs"
	"rappi-clone/autocomplete/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	configs.ConnectDB()

	routes.AutocompleteRoute(app)

	app.Listen(":3100")
}
