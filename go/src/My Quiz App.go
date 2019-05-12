package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"

	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error
var err2 error

type User struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Genre struct {
	ID     uint   `json:"id"`
	Genre  string `json:"genre" gorm:"unique"`
	QuizNo int    `json:"quizno"`
}

type LoginJSON struct {
	User     string `json:"username" gorm:"unique"`
	Password string `json:"password"`
}

type Leaderboard struct {
	ID     uint   `json:"id"`
	User   string `json:"username"`
	Genre  string `json:"genre"`
	Score  int    `json:"score"`
	QuizNo int    `json:"quizno"`
}

type Question struct {
	ID       uint   `json:"id"`
	Genre    string `json:"genre"`
	QuizNo   int    `json:"quizno"`
	Question string `json:"question"`
	Option1  string `json:"option1"`
	Option2  string `json:"option2"`
	Option3  string `json:"option3"`
	Option4  string `json:"option4"`
	Answer1  bool   `json:"answer1"`
	Answer2  bool   `json:"answer2"`
	Answer3  bool   `json:"answer3"`
	Answer4  bool   `json:"answer4"`
	Type     string `json:"type"`
}

var genre = []Genre{
	Genre{1, "Marvel", 2},
	Genre{2, "General Knowledge", 2},
}

var ques = []Question{
	Question{1, "Marvel", 1, "Who played Drax the Destroyer?", "Georges St. Pierre", "Dave Bautista", "Randy Couture", "Steve Austin", false, true, false, false, "single"},
	Question{2, "Marvel", 1, "What did Peggy Carter promise to Steve Rogers (Captain America) before he crashed Red Skull's bomber?", "Dance", "Fondue", "A Kiss", "High Level Clearance", true, false, false, false, "single"},
	Question{3, "Marvel", 1, "In 'Iron Man 2,' what supposedly bunker-busting smart missile fizzled when War Machine tried to use it?", "The Sidewinder", "The Jericho Missile", "The Ex-Wife", "The Hulk Buster", false, false, true, false, "single"},
	Question{4, "Marvel", 1, "What power source fuels Tony Stark's Iron Man suit?", "Lithium Ion", "Arc Reactor", "The Arkenstone", "The Tesseract", false, true, false, false, "single"},
	Question{5, "Marvel", 1, "Who killed Frigga in 'Thor: The Dark World'?", "Algrim", "Malekith", "Jane Foster", "Loki", true, false, false, false, "single"},
	Question{6, "Marvel", 2, "Which of these films are from Marvels Comic Universe?", "Iron-Man", "Hancock", "Superman", "Captain Marvel", true, false, false, true, "multiple"},
	Question{7, "Marvel", 2, "Which of these characters are from Movie Iron-Man?", "Pepper Pots", "Nick Fury", "Christian Bale", "Thor", true, true, false, false, "multiple"},
	Question{8, "Marvel", 2, "Which of these characters are from Movie Black Panther?", "T'Chaka", "M'Baku", "Kala Daku", "T'Challa", true, true, false, true, "multiple"},
	Question{9, "Marvel", 2, "As of 2017 who have been members of the Avengers?", "Jack of Hearts", "Wolverine", "Beast", "Silver Surfer", true, true, true, false, "multiple"},
	Question{10, "Marvel", 2, "Which of these are Marvel Villian?", "Red Skull", "Doctor Doom", "Green Goblin", "Joker", true, true, true, false, "multiple"},
	Question{11, "General Knowledge", 1, "What is the name of the closest star to the Sun?", "Alpha Centauri", "Proxima Centauri", "Moon", "Sirius II", false, true, false, false, "single"},
	Question{12, "General Knowledge", 1, "What is the name of Mickey Mouse's pet dog?", "Saturn", "Goofy", "Pluto", "Donald", false, false, true, false, "single"},
	Question{13, "General Knowledge", 1, "Which state is the biggest in the US?", "Arizona", "Texas", "Alaska", "California", false, false, true, false, "single"},
	Question{14, "General Knowledge", 1, "After which famous person was the teddy bear named?", "Christopher Columbus", "Theodore Roosevelt", "Sir Cornell", "Abraham Lincoln", false, true, false, false, "single"},
	Question{15, "General Knowledge", 1, "What is the capital city of Norway?", "Oslo", "Finland", "Stockholm", "Sweden", true, false, false, false, "single"},
	Question{16, "General Knowledge", 2, "Who all of these acted in F.R.I.E.N.D.S?", "Jennifer Aniston", "Matt Blanc", "Janice Jolly", "Walter White", true, true, false, false, "multiple"},
	Question{17, "General Knowledge", 2, "Who all of these were Famous Painters?", "Leonardo da Vinci", "Pablo Picasso", "Galileo Gallili", "Vincent Van Gogh", true, true, false, true, "multiple"},
	Question{18, "General Knowledge", 2, "Which of these are Famous TV Series?", "Breaking Bad", "Sacred Games", "Dragon Tales", "Spongebob Squarepants", true, true, false, false, "multiple"},
	Question{19, "General Knowledge", 2, "Which of these are the top three longest rivers of the world?", "Nile", "Ganga", "Amazon", "Yangtze", true, false, true, true, "multiple"},
	Question{20, "General Knowledge", 2, "Which of these are pure Elements?", "Diamond", "Cement", "Haemetite", "Graphite", true, false, false, true, "multiple"},
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	//db.AutoMigrate(&Person{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Genre{})
	db.AutoMigrate(&Leaderboard{})

	// for i := 0; i < 20; i++ {
	// 	db.Create(&ques[i])
	// }

	// for i := 0; i < 2; i++ {
	// 	db.Create(&genre[i])
	// }
	//db.AutoMigrate(&LoginJSON{})

	r := gin.Default()

	//r.GET("/people/", GetPeople) // Creating routes for each functionality
	//r.GET("/people/:id", GetPerson)
	r.POST("/signup", SignUp)
	r.POST("/login", Login)
	r.POST("/addquiz", AddQuiz)
	r.PUT("/editques/:id", EditQues)
	r.POST("/addgenre", AddGenre)
	r.POST("/addleader", AddBoard)
	r.GET("/getfullleader", GetFullBoard)
	r.GET("/getleader/:genre", GetBoard)
	r.GET("/gethistory/:username", GetHistory)
	r.GET("/getgenre", GetGenre)
	r.GET("/getuser", GetUser)
	r.GET("/getquizno/:genre", GetQuizNo)
	r.GET("/getques/:genre/:quizno", GetQues)
	r.DELETE("/getuser/:id", DeleteUser)
	r.DELETE("/getques/:id", DeleteQues)

	//r.PUT("/people/:id", UpdatePerson)
	//r.DELETE("/people/:id", DeletePerson)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func SignUp(c *gin.Context) {
	//username := c.Params.ByName("username")
	c.Header("access-control-allow-origin", "*")

	var user User
	var user2 User
	c.BindJSON(&user)

	err := db.Where("username = ?", user.Username).First(&user2).Error
	err2 := db.Where("email = ?", user.Email).First(&user2).Error
	if err != nil && err2 != nil {
		db.Create(&user)
		c.JSON(200, user)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not Added"})
		fmt.Println(err)
	}
}

func GetUser(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")

	var user []User
	err := db.Find(&user).Error
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		//c.BindJSON(&user)
		c.JSON(200, user)
	}
}

func GetBoard(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")

	gen := c.Params.ByName("genre")
	var leader []Leaderboard
	err := db.Where("genre = ?", gen).Order("score desc").Find(&leader).Error
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		//c.BindJSON(&user)
		c.JSON(200, leader)
	}
}

func GetHistory(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")

	user := c.Params.ByName("username")
	var leader []Leaderboard
	err := db.Where("user = ?", user).Find(&leader).Error
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		//c.BindJSON(&user)
		c.JSON(200, leader)
	}
}

func GetFullBoard(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")

	var leader []Leaderboard
	err := db.Order("score desc").Find(&leader).Error
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		//c.BindJSON(&user)
		c.JSON(200, leader)
	}
}

func Login(c *gin.Context) {

	c.Header("access-control-allow-origin", "*")

	var user User
	var temp User

	c.BindJSON(&user)
	fmt.Printf("%s %s", user.Username, user.Password)
	err := db.Where("username = ? and password = ?", user.Username, user.Password).First(&temp).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "unsuccessful authentication"})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "authentication successful"})
	}

}

func AddQuiz(c *gin.Context) {

	c.Header("access-control-allow-origin", "*")

	var ques Question

	c.BindJSON(&ques)
	db.Create((&ques))
	c.JSON(http.StatusOK, gin.H{"message": "Ques Added Successfully"})
	//fmt.Printf("%s %s", user.Username, user.Password)
}

func EditQues(c *gin.Context) {

	c.Header("access-control-allow-origin", "*")
	id := c.Params.ByName("id")
	var ques Question

	err = db.Where("id = ?", id).First(&ques).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Cannot be Udated"})
		fmt.Println(err)
	} else {
		c.BindJSON(&ques)
		db.Save(&ques)
		c.JSON(http.StatusOK, gin.H{"message": "Updated Successfully"})
	}
}

func AddBoard(c *gin.Context) {

	c.Header("access-control-allow-origin", "*")

	var leader Leaderboard

	c.BindJSON(&leader)
	db.Create((&leader))
	c.JSON(http.StatusOK, gin.H{"message": "Ques Added Successfully"})
	//fmt.Printf("%s %s", user.Username, user.Password)
}

func AddGenre(c *gin.Context) {

	c.Header("access-control-allow-origin", "*")

	var genre Genre

	c.BindJSON(&genre)
	db.Create((&genre))
	c.JSON(http.StatusOK, gin.H{"message": "Genre Added Successfully"})
	//fmt.Printf("%s %s", user.Username, user.Password)
}

func GetGenre(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")

	var genre []Genre
	err = db.Find(&genre).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "no genres found"})
	} else {
		c.JSON(http.StatusOK, genre)
	}
}

func GetQuizNo(c *gin.Context) {
	gen := c.Params.ByName("genre")
	c.Header("access-control-allow-origin", "*")

	var genre Genre
	err = db.Where("genre = ?", gen).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "no genres found"})
	} else {
		c.JSON(http.StatusOK, genre)
	}
}

func GetQues(c *gin.Context) {
	gen := c.Params.ByName("genre")
	quizno := c.Params.ByName("quizno")
	c.Header("access-control-allow-origin", "*")

	var ques []Question
	err = db.Where("genre = ? and quiz_no = ?", gen, quizno).Find(&ques).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "no questions found"})
	} else {
		c.JSON(http.StatusOK, ques)
	}
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	d := db.Where("id = ?", id).Delete(&user)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQues(c *gin.Context) {
	id := c.Params.ByName("id")
	var ques Question
	d := db.Where("id = ?", id).Delete(&ques)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

// func UpdatePerson(c *gin.Context) {
// 	var person Person
// 	id := c.Params.ByName("id")
// 	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println(err)
// 	}
// 	c.BindJSON(&person)
// 	db.Save(&person)
// 	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
// 	c.JSON(200, person)
// }

// func GetPerson(c *gin.Context) {
// 	id := c.Params.ByName("id")
// 	var person Person
// 	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println(err)
// 	} else {
// 		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
// 		c.JSON(200, person)
// 	}
// }

// func GetPeople(c *gin.Context) {
// 	var people []Person
// 	if err := db.Find(&people).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println(err)
// 	} else {
// 		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
// 		c.JSON(200, people)
// 	}
// }
