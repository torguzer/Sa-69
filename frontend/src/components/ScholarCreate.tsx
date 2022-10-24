import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';


import useApi from "../hook/useApi";
import { DataInterface } from "../models/IData";
import { ReportInterface } from "../models/IReport";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ScholarCreate() {
  const { CreateReport,GetScholarship,GetReason,GetStudent } = useApi()

  //fetch data
  const [data, setData] = useState<DataInterface>();
  //select data
  const [selectScholar, setSelectScholar] = useState<string>("0");
  const [selectReason, setSelectReason] = useState<string>("0");
  const [selectStudent, setSelectStudent] = useState<number>();
  const [selectReport, setSelectReport] = useState<string>(" ");

  const fetchData = async () => {

    const fetchStudent=await GetStudent()
    setSelectStudent(fetchStudent[0].ID)

    const fetchScholarship = await GetScholarship()
    console.log(fetchScholarship)

    const fetchReason = await GetReason()
    console.log(fetchReason)



    //const fetchScholarship=[...data.Scholarship,await GetScholarship()]
    setData({ Reason: fetchReason, Scholarship: fetchScholarship})
  }

  useEffect(() => {
    //call api ตรงนี้
    fetchData()

  }, [])

  //const [report, setReport] = React.useState<Partial<ReportInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  //report
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    setSelectReport(event.target.value as string)
  };

  const handleChange = (event: SelectChangeEvent, selectType: string) => {
    if (selectType == "scholarship") {
      setSelectScholar(event.target.value as string);
    }
    else {
      setSelectReason(event.target.value as string);
    }

  };

  async function submit() {
    const data:ReportInterface={
      ScholarshipID: parseInt(selectScholar),
      ReasonID: parseInt(selectReason),
      StudentID: (selectStudent??0),
      ReasonInfo: (selectReport)
    } 
    console.log(data)

    let res = await CreateReport(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }


  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ขอทุนการศึกษา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <p>ทุนการศึกษา</p>
              <Select
                id="scholarship"
                onChange={(e) => handleChange(e, "scholarship")}
                value={selectScholar}
              >
                {<MenuItem value={"0"} disabled>---เลือกทุนการศึกษา---</MenuItem>}
                {data?.Scholarship.map((scholarship) => (
                  <MenuItem key={scholarship.ID} value={`${scholarship.ID}`}>{scholarship?.Name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <p>เหตุผลที่ใช้ขอทุน</p>
              <Select
                id="reason"
                onChange={(e) => handleChange(e, "reason")}
                value={selectReason}
              >
                <MenuItem value={"0"} disabled>---เลือกเหตุในการขอทุน---</MenuItem>
                {data?.Reason.map((reason) => (
                  <MenuItem key={reason.ID} value={`${reason.ID}`}>{reason?.Name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>รายละเอียดประกอบการขอทุน</p>
              <TextField
                id="ReasonInfo"
                multiline
                rows={4}
                value={selectReport || " "}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Name</p>
            <FormControl fullWidth variant="filled" disabled>
              <TextField
                id="Name"
                variant="filled"
                type="string"
                size="medium"
                value="นาย ธีรวัฒน์ อื้อศรีวงศ์"
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="filled" disabled>
              <p>Personal ID</p>
              <TextField
                id="PersonalID"
                variant="filled"
                type="string"
                size="medium"
                value="1309902751150"
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="filled" disabled>
              <p>Email</p>
              <TextField
                id="Email"
                variant="filled"
                type="string"
                size="medium"
                value="torguzer@hotmail.com"
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="filled" disabled>
              <p>GPAX</p>
              <TextField
                id="Gpa"
                variant="filled"
                type="string"
                size="medium"
                value="3.00"
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="filled" disabled>
              <p>Faculty</p>
              <TextField
                id="Major"
                variant="filled"
                type="string"
                size="medium"
                value="Computer Engineering"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/ScholarHistory" variant="contained">
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ScholarCreate;
