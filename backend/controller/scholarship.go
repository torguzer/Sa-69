package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/torguzer/sa-65-example/entity"
)

// POST /scholarships
func CreateScholarship(c *gin.Context) {
	var scholarship entity.Scholarship
	if err := c.ShouldBindJSON(&scholarship); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&scholarship).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": scholarship})
}

// GET /scholarship/:id
func GetScholarship(c *gin.Context) {
	var scholarship entity.Scholarship
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&scholarship); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "scholarship not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": scholarship})
}

// GET /scholarships
func ListScholarship(c *gin.Context) {
	var scholarships []entity.Scholarship
	if err := entity.DB().Raw("SELECT * FROM scholarships").Scan(&scholarships).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": scholarships})
}

// DELETE /scholarships/:id
func DeleteScholarship(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM scholarships WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "scholarship not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /scholarships
func UpdateScholarship(c *gin.Context) {
	var scholarship entity.Scholarship
	if err := c.ShouldBindJSON(&scholarship); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", scholarship.ID).First(&scholarship); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "scholarship not found"})
		return
	}

	if err := entity.DB().Save(&scholarship).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": scholarship})
}