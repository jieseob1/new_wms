import type React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Skeleton,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Handyman as HandymanIcon,
  Warning as WarningIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock API calls
const fetchDashboardData = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    stats: {
      totalMaterials: 142,
      activeProjects: 8,
      toolsInUse: 24,
      lowStockAlerts: 7,
    },
    monthlyUsage: [
      {
        name: "1월",
        필름: 220,
        타일: 340,
        몰딩: 180,
        접착제: 290,
      },
      {
        name: "2월",
        필름: 280,
        타일: 300,
        몰딩: 200,
        접착제: 310,
      },
      {
        name: "3월",
        필름: 250,
        타일: 290,
        몰딩: 220,
        접착제: 300,
      },
      {
        name: "4월",
        필름: 310,
        타일: 380,
        몰딩: 260,
        접착제: 320,
      },
      {
        name: "5월",
        필름: 290,
        타일: 400,
        몰딩: 210,
        접착제: 280,
      },
      {
        name: "6월",
        필름: 350,
        타일: 420,
        몰딩: 270,
        접착제: 340,
      },
    ],
    lowStockItems: [
      {
        id: 1,
        name: "LG 하우시스 필름 (화이트)",
        stock: "12/20 롤",
        status: "긴급",
      },
      { id: 2, name: "타일 접착제 (20kg)", stock: "8/15 포대", status: "긴급" },
      { id: 3, name: "천장 몰딩 (2.4m)", stock: "25/30 개", status: "" },
      {
        id: 4,
        name: "바닥 타일 (600x600)",
        stock: "120/200 장",
        status: "긴급",
      },
      { id: 5, name: "실리콘 (투명)", stock: "18/30 개", status: "" },
    ],
    recentActivities: [
      {
        id: 1,
        time: "10분 전",
        user: "김현장",
        project: "강남 오피스텔 리모델링",
        activity: "LG 하우시스 필름 (화이트) 2롤 출고",
      },
      {
        id: 2,
        time: "1시간 전",
        user: "이기사",
        project: "송파 아파트 인테리어",
        activity: "전동드릴 세트 대여",
      },
      {
        id: 3,
        time: "3시간 전",
        user: "박관리",
        project: "창고",
        activity: "바닥 타일 (600x600) 200장 입고",
      },
      {
        id: 4,
        time: "5시간 전",
        user: "최기술",
        project: "마포 카페 시공",
        activity: "레이저 레벨기 반납",
      },
      {
        id: 5,
        time: "6시간 전",
        user: "시스템",
        project: "창고",
        activity: "타일 접착제 (20kg) 재고 부족 알림",
      },
    ],
  };
};

const Dashboard: React.FC = () => {
  const { data, isLoading } = useQuery("dashboardData", fetchDashboardData);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"));

  if (isLoading || !data) {
    return (
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={140} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={140} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={140} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={140} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
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
          대시보드
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<FileUploadIcon />}
            sx={{ mr: 1 }}
          >
            자재 입고
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            자재 출고
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    총 자재 종류
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.stats.totalMaterials}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    지난달 대비 +12
                  </Typography>
                </Box>
                <InventoryIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    진행 중인 현장
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.stats.activeProjects}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    이번 주 완료 예정 2
                  </Typography>
                </Box>
                <BusinessIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    대여 중인 공구
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.stats.toolsInUse}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    미반납 3일 초과 2
                  </Typography>
                </Box>
                <HandymanIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    재고 부족 알림
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.stats.lowStockAlerts}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    긴급 발주 필요 3
                  </Typography>
                </Box>
                <WarningIcon color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="월별 자재 사용량" />
            <CardContent sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="필름" fill="#4fc3f7" />
                  <Bar dataKey="타일" fill="#7986cb" />
                  <Bar dataKey="몰딩" fill="#ffb74d" />
                  <Bar dataKey="접착제" fill="#9575cd" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Stock Items */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="재고 부족 자재"
              subheader="최소 수량 이하로 떨어진 자재 목록"
            />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>자재명</TableCell>
                      <TableCell align="right">재고/최소</TableCell>
                      <TableCell align="right">상태</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.lowStockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">{item.stock}</TableCell>
                        <TableCell align="right">
                          {item.status && (
                            <Chip
                              label={item.status}
                              color="error"
                              size="small"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="최근 활동"
              subheader="최근 24시간 내 자재 및 공구 관련 활동"
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>시간</TableCell>
                      <TableCell>담당자</TableCell>
                      <TableCell>현장</TableCell>
                      <TableCell>활동내역</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.recentActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.project}</TableCell>
                        <TableCell>{activity.activity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
