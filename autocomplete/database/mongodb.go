package database

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	/* 	usr = "root"
	   	pwd = "root" */
	host     = "localhost"
	port     = "27017"
	database = "sample_mflix"
)

func GetCollection(collection string) *mongo.Collection {

	/* 	uri := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s", usr, pwd, host, port, database)
	 */

	uri := fmt.Sprintf("mongodb://%s:%s/%s", host, port, database)

	client, err := mongo.NewClient(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	err = client.Connect(ctx)

	if err != nil {
		panic(err)
	}

	return client.Database(database).Collection(collection)
}
