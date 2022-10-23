import { ReasonInterface } from "../models/IReason";
import { ReportInterface } from "../models/IReport";
import { ScholarshipInterface } from "../models/IScholarship";
import { StudentsInterface } from "../models/IStudent";


export default function useApi() {

  const apiUrl = "http://localhost:8080";

  //GetStudent
  async function GetStudent(): Promise<StudentsInterface[]> {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    let res = await fetch(`${apiUrl}/students`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.id);
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  //GetReason
  async function GetReason(): Promise<ReasonInterface[]> {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}/reasons`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  //GetScholarship
  async function GetScholarship(): Promise<ScholarshipInterface[]> {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}/scholarships`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  //Report
  async function CreateReport(data: ReportInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/reports`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  //GetReport
  async function GetReport(): Promise<ReportInterface[]> {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}/reports`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  return {
    GetStudent,
    GetReason,
    GetScholarship,
    CreateReport,
    GetReport,
  }
}