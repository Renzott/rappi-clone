package controllers

import (
	"context"
	"rappi-clone/autocomplete/database"
	m "rappi-clone/autocomplete/models"
)

var collection = database.GetCollection("movies")
var ctx = context.Background()

func Create(p m.Product) error {

	var err error

	_, err = collection.InsertOne(ctx, p)

	if err != nil {
		return err
	}

	return nil
}

func Read() m.Products {
	return nil
}

func Update(p m.Product) error {
	return nil
}

func Delete(id string) error {
	return nil
}
