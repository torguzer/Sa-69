package entity

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	ID         int
	Name       string 
	Email      string `gorm: "uniqueIndex"`
	PersonalID string `gorm: "uniqueIndex"`
	Gpa        string	
	Major      string
}

type Scholarship struct {
	gorm.Model
	ID   int
	Name string
}

type Reason struct {
	gorm.Model
	ID   int
	Name string
}

type Report struct {
	gorm.Model

	StudentID int
	Student   Student

	ScholarshipID int
	Scholarship   Scholarship

	ReasonID int
	Reason   Reason

	ReasonInfo string 	
}
