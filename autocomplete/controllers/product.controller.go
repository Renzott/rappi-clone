package controllers

import (
	"context"
	"net/http"
	"rappi-clone/autocomplete/configs"
	"rappi-clone/autocomplete/models"
	"rappi-clone/autocomplete/responses"

	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var productCollection *mongo.Collection = configs.GetCollection(configs.DB, "products")

func FindProduct(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	queryParam := c.Query("query")

	if queryParam == "" {
		var response responses.DataResponse

		response.Status = http.StatusBadRequest
		response.Message = "Query param is required"
		response.Data = &fiber.Map{"data": "Query param is required"}

		return c.Status(http.StatusBadRequest).JSON(response)
	}

	var products models.Products

	query := bson.M{
		"name": primitive.Regex{Pattern: "^" + queryParam + ".*", Options: "i"},
	}

	results, err := productCollection.Find(ctx, query)

	if err != nil {

		var response responses.DataResponse

		response.Status = http.StatusInternalServerError
		response.Message = "Error finding products"
		response.Data = &fiber.Map{"data": err.Error()}

		return c.Status(http.StatusInternalServerError).JSON(response)
	}

	defer results.Close(ctx)

	for results.Next(ctx) {
		var product models.Product

		if err = results.Decode(&product); err != nil {
			var response responses.DataResponse

			response.Status = http.StatusInternalServerError
			response.Message = "Error finding products"
			response.Data = &fiber.Map{"data": err.Error()}
			return c.Status(http.StatusInternalServerError).JSON(response)
		}

		products = append(products, product)
	}

	var response responses.DataResponse

	response.Status = http.StatusOK
	response.Message = "Products found"
	response.Data = &fiber.Map{"suggestions": products}

	return c.Status(http.StatusOK).JSON(response)

}
