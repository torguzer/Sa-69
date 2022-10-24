package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Student{},
		&Scholarship{},
		&Reason{},
		&Report{},
	)

	db = database

	student := Student{
		ID:         1001,
		Name:       "Thirawat  Eusirwong",
		Email:      "Thirawat@gmail.com",
		PersonalID: "1309902751836",
		Gpa:        "3.00",
		faculty:      "cpe",
	}

	db.Model(&Student{}).Create(&student)

	//ทุน

	data := []Scholarship{
		{
			ID:   1234,
			Name: "กยศ",
		}, {
			ID:   1235,
			Name: "ทุนเรียนดี",
		}, {
			ID:   1236,
			Name: "ทุนวิจัย",
		}}

	for d := range data {
		db.Model(&Scholarship{}).Create(&data[d])
	}

	//เหตุผล
	data2 := []Reason{
			{
				ID:   2234,
				Name: "ขาดเเคลนทุนทรัพย์",
			}, {
				ID:   2235,
				Name: "ต่อยอดการวิจัย",
			}, {
				ID:   2236,
				Name: "เรียนต่อ",
			}}
	    for d:=range data2{
	        db.Model(&Reason{}).Create(&data2[d])
	    }

	report := Report{
		StudentID:     1001,
		ScholarshipID: 2001,
		ReasonID:      3001,
		ReasonInfo:     "ครอบครับเป็นหาเช้ากินค่ำ ปัจจุบันอาศัยอยู่กับลุงเเละป้า",
	}

	db.Model(&Report{}).Create(&report)

}
