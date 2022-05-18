/* package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


func main() {

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))

	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("sample_mflix").Collection("movies")

	doc := bson.A{
		bson.D{
			{"title", "The Go Programming Language"},
			{"year", 2009},
		},
	}

	result, err := coll.InsertOne(context.TODO(), doc)

	if err != nil {
		panic(err)
	}

	fmt.Printf("%s\n", result)
} */

package main

import (
	"rappi-clone/autocomplete/controllers"
	m "rappi-clone/autocomplete/models"
)

func main() {

	user := m.Product{
		Name: "Product 1",
	}

	err := controllers.Create(user)

	if err != nil {
		panic(err)
	}

}
