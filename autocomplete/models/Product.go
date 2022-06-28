package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Categories  Categories         `json:"categories"`
	Price       string             `json:"price"`
	ImageUrl    []string           `json:"imageUrl"`
}

type Products []Product
