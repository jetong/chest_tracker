// 1. Connect to db
// 2. Determine number of documents in db
// 3. Prepare n goroutines, based on number of docs. Use n goroutines for n docs?
// 4. In gorouting, 

package main

import (
	"fmt"
	"gopkg.in/mgo.v2"
	"log"
	"time"
	"sync"
)

// user schema for database insert
type User struct {
	Username, Id, Days, Hours, Minutes, Timestamp, Total_Chests, Chests_Available string
}

func processUser(book []string, mongoSession *mgo.Session, waitGroup *sync.WaitGroup) {
	defer waitGroup.Done()

	sessionCopy := mongoSession.Copy()
	defer sessionCopy.Close()

	c := sessionCopy.DB("lol").C("users")

  // process data

/* Use upsert to update?
	for i, url := range match {
		err = c.Insert(&User{url})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(i, c, url)
	}
*/
}

func main() {
	start := time.Now()

	mongoSession, err := mgo.Dial("localhost:27017")
	if err != nil {
		panic(err)
	}
	mongoSession.SetMode(mgo.Monotonic, true)

	var waitGroup sync.WaitGroup
	waitGroup.Add(len(dbSize))

// grab first n users from db
// better to grab all users with one db read?

	for _, user := range users {
		go processUser(user, mongoSession, &waitGroup)
	}

	duration := time.Since(start)
	fmt.Println(duration)
	select {}
}
