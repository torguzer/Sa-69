package main

import (
	"github.com/gin-gonic/gin"
	"github.com/torguzer/sa-65-example/controller"
	"github.com/torguzer/sa-65-example/entity"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// Scholarship
	r.GET("/scholarships", controller.ListScholarship)
	r.GET("/scholarship", controller.GetScholarship)
	r.POST("/scholarships", controller.CreateScholarship)
	r.PATCH("/scholarships", controller.UpdateScholarship)
	r.DELETE("/scholarship", controller.DeleteScholarship)

	//Reason
	r.GET("/reasons", controller.ListReason)
	r.GET("/reason", controller.GetReason)
	r.POST("/reasons", controller.CreateReason)
	r.PATCH("/reasons", controller.UpdateReason)
	r.DELETE("/reason", controller.DeleteReason)

	//Student
	r.GET("/students", controller.ListStudents)
	r.GET("/student", controller.GetStudent)
	r.POST("/students", controller.CreateStudent)
	r.PATCH("/students", controller.UpdateStudent)
	r.DELETE("/student", controller.DeleteStudent)

	//Report
	r.GET("/reports", controller.ListReport)
	r.GET("/report", controller.GetReport)
	r.POST("/reports", controller.CreateReport)
	r.PATCH("/reports", controller.UpdateReport)
	r.DELETE("/report", controller.DeleteReport)
	// Run the server
	r.Run()
}
