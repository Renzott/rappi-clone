package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID   primitive.ObjectID `bson:"_id" json:"id"`
	Name string             `json:"name"`
}

type Products []Product
