import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { ReportInterface } from "../models/IReport";
import useApi from "../hook/useApi";

function Report() {
  const {GetReport} = useApi()
  const [report, setReport] = useState<ReportInterface[]>([]);


  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    let res = await GetReport();
    if (res) {
        setReport(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    {
      field: "StudentID",
      headerName: "นักศึกษา",
      width: 150,
      valueFormatter: (params) => params.value.ID,
    },
    {
      field: "ScholarshipID",
      headerName: "ทุนการศึกษา",
      width: 150,
      valueFormatter: (params) => params.value.ID,
    },
    {
      field: "ReasonID",
      headerName: "เหตุผลที่ใช้ขอทุนกสชาศึกษา",
      width: 150,
      valueFormatter: (params) => params.value.ID,
    },
    {
      field: "ReasonInfo",
      headerName: "รายละเอียดประกอบการขอทุน",
      width: 150,
      valueFormatter: (params) => params.value.ReasonInfo,
    },
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการขอทุนการศึกษา
            </Typography>
          </Box>
          <Box>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={report}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
          <Box style={{display:"flex",justifyContent: "center"}}>
            <Button
              component={RouterLink}
              to="/ScholarCreate"
              variant="contained"
              color="primary"
            >
              ขอทุนการศึกษา
            </Button>
          </Box>
      </Container>
    </div>
  );
}

export default Report;