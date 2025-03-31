"use client";

import type React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Print as PrintIcon,
  GetApp as DownloadIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";

// Mock API call
const fetchReportsData = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    inventoryStats: {
      totalItems: 142,
      totalValue: 24350000,
      lowStockItems: 7,
      idleItems: 12,
    },
    projectStats: {
      totalProjects: 8,
      activeProjects: 3,
      avgMaterialsPerProject: 15,
      avgToolsPerProject: 4,
    },
    toolStats: {
      totalTools: 24,
      borrowedTools: 12,
      repairingTools: 2,
      lostTools: 1,
    },
    inventoryReports: [
      {
        id: "inv-1",
        title: "월간 재고 현황 보고서",
        description:
          "모든 자재의 현재 재고 수준과 최소 재고 대비 상태를 보여줍니다.",
        date: "2023-04-01",
      },
      {
        id: "inv-2",
        title: "재고 부족 알림 보고서",
        description:
          "최소 재고 수준 이하로 떨어진 자재 목록과 발주 권장 수량을 제공합니다.",
        date: "2023-04-15",
      },
      {
        id: "inv-3",
        title: "자재 이동 내역 보고서",
        description:
          "지난 달 모든 자재의 입고, 출고, 이동 내역을 시간순으로 보여줍니다.",
        date: "2023-04-01",
      },
    ],
    projectReports: [
      {
        id: "prj-1",
        title: "현장별 자재 사용 보고서",
        description:
          "각 현장에서 사용된 자재의 종류와 수량을 상세히 보여줍니다.",
        date: "2023-04-01",
      },
      {
        id: "prj-2",
        title: "현장 진행 상황 보고서",
        description: "각 현장의 진행 상태와 예상 완료일을 보여줍니다.",
        date: "2023-04-15",
      },
      {
        id: "prj-3",
        title: "현장별 비용 분석",
        description: "각 현장에서 사용된 자재와 공구의 비용을 분석합니다.",
        date: "2023-04-01",
      },
    ],
    toolReports: [
      {
        id: "tool-1",
        title: "공구 대여 현황 보고서",
        description: "현재 대여 중인 모든 공구와 반납 예정일을 보여줍니다.",
        date: "2023-04-01",
      },
      {
        id: "tool-2",
        title: "공구 상태 보고서",
        description:
          "모든 공구의 현재 상태와 수리가 필요한 공구 목록을 제공합니다.",
        date: "2023-04-15",
      },
      {
        id: "tool-3",
        title: "공구 사용 빈도 분석",
        description: "각 공구의 대여 빈도와 평균 대여 기간을 분석합니다.",
        date: "2023-04-01",
      },
    ],
  };
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `reports-tab-${index}`,
    "aria-controls": `reports-tabpanel-${index}`,
  };
}

const Reports: React.FC = () => {
  const { data, isLoading } = useQuery("reportsData", fetchReportsData);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2023, 3, 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2023, 3, 30));
  const [reportType, setReportType] = useState("inventory");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReportTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setReportType(event.target.value as string);
  };

  if (isLoading || !data) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            보고서
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <DatePicker
                label="시작일"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
              <Box sx={{ mx: 1 }}>~</Box>
              <DatePicker
                label="종료일"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            </Box>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              인쇄
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />}>
              PDF 저장
            </Button>
          </Box>
        </Box>

        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="보고서 탭"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : undefined}
            >
              <Tab label="재고 보고서" {...a11yProps(0)} />
              <Tab label="현장 보고서" {...a11yProps(1)} />
              <Tab label="공구 보고서" {...a11yProps(2)} />
              <Tab label="맞춤 보고서" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      총 자재 종류
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.inventoryStats.totalItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      총 자재 가치
                    </Typography>
                    <Typography variant="h4" component="div">
                      ₩ {data.inventoryStats.totalValue.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      재고 부족 항목
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.inventoryStats.lowStockItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      유휴 재고 항목
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.inventoryStats.idleItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {data.inventoryReports.map((report) => (
                <Grid item xs={12} md={4} key={report.id}>
                  <Card>
                    <CardHeader title={report.title} subheader={report.date} />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 2 }}
                      >
                        {report.description}
                      </Typography>
                      <Button startIcon={<DownloadIcon />} size="small">
                        다운로드
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      총 현장 수
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.projectStats.totalProjects}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      진행 중인 현장
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.projectStats.activeProjects}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      현장별 평균 자재 수
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.projectStats.avgMaterialsPerProject}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      현장별 평균 공구 수
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.projectStats.avgToolsPerProject}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {data.projectReports.map((report) => (
                <Grid item xs={12} md={4} key={report.id}>
                  <Card>
                    <CardHeader title={report.title} subheader={report.date} />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 2 }}
                      >
                        {report.description}
                      </Typography>
                      <Button startIcon={<DownloadIcon />} size="small">
                        다운로드
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      총 공구 수
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.toolStats.totalTools}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      대여 중인 공구
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.toolStats.borrowedTools}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      수리 중인 공구
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.toolStats.repairingTools}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      분실된 공구
                    </Typography>
                    <Typography variant="h4" component="div">
                      {data.toolStats.lostTools}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {data.toolReports.map((report) => (
                <Grid item xs={12} md={4} key={report.id}>
                  <Card>
                    <CardHeader title={report.title} subheader={report.date} />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 2 }}
                      >
                        {report.description}
                      </Typography>
                      <Button startIcon={<DownloadIcon />} size="small">
                        다운로드
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Card>
              <CardHeader title="맞춤 보고서 생성" />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 3 }}
                >
                  필요한 데이터와 형식을 선택하여 맞춤형 보고서를 생성하세요.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="report-type-label">
                        보고서 유형
                      </InputLabel>
                      <Select
                        labelId="report-type-label"
                        id="report-type"
                        value={reportType}
                        onChange={handleReportTypeChange}
                        label="보고서 유형"
                      >
                        <MenuItem value="inventory">재고 현황</MenuItem>
                        <MenuItem value="movement">자재 이동 내역</MenuItem>
                        <MenuItem value="project">현장별 자재 사용</MenuItem>
                        <MenuItem value="tools">공구 대여 현황</MenuItem>
                        <MenuItem value="cost">비용 분석</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <CalendarIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        2023-04-01 ~ 2023-04-30
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                      포함할 데이터
                    </Typography>
                    <FormGroup row>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="자재 코드"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="자재명"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="수량"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="단가"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="총액"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="위치"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="담당자"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="날짜"
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                      출력 형식
                    </Typography>
                    <ButtonGroup variant="outlined" aria-label="출력 형식">
                      <Button variant="contained" color="primary">
                        PDF
                      </Button>
                      <Button>Excel</Button>
                      <Button>CSV</Button>
                    </ButtonGroup>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" fullWidth>
                      보고서 생성
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;
