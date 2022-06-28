package configs

import (
	"os"

	"github.com/joho/godotenv"
)

func EnvMongoURI() string {
	err := godotenv.Load()

	if err != nil {
		panic(err)
	}

	return os.Getenv("MONGO_URI")
}
