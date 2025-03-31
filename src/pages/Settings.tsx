"use client";

import React, { useState } from "react";
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
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { useTheme as useAppTheme } from "../contexts/ThemeContext";

// Mock API call
const fetchSettings = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    companyInfo: {
      name: "인테리어 마스터",
      address: "서울시 강남구 테헤란로 123",
      phone: "02-1234-5678",
      email: "info@interior-master.com",
    },
    systemSettings: {
      lowStockNotification: true,
      autoBackup: true,
      darkMode: false,
      language: "ko",
    },
    userRoles: [
      { id: "1", name: "관리자", permissions: ["all"] },
      { id: "2", name: "창고 담당자", permissions: ["inventory", "tools"] },
      {
        id: "3",
        name: "현장 소장",
        permissions: ["projects", "materials_request"],
      },
      { id: "4", name: "일반 직원", permissions: ["view"] },
    ],
    backupHistory: [
      { id: "1", date: "2023-04-15 00:00", type: "자동" },
      { id: "2", date: "2023-04-14 00:00", type: "자동" },
      { id: "3", date: "2023-04-13 15:30", type: "수동" },
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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    "aria-controls": `settings-tabpanel-${index}`,
  };
}

const Settings: React.FC = () => {
  const { data, isLoading } = useQuery("settings", fetchSettings);
  const { mode, toggleTheme } = useAppTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState(0);
  const [language, setLanguage] = useState("ko");
  const [lowStockNotification, setLowStockNotification] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        설정
      </Typography>

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="설정 탭"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : undefined}
          >
            <Tab label="회사 정보" {...a11yProps(0)} />
            <Tab label="시스템 설정" {...a11yProps(1)} />
            <Tab label="사용자 관리" {...a11yProps(2)} />
            <Tab label="백업 및 복원" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="회사명"
                    defaultValue={data.companyInfo.name}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="주소"
                    defaultValue={data.companyInfo.address}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="전화번호"
                    defaultValue={data.companyInfo.phone}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    defaultValue={data.companyInfo.email}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" startIcon={<SaveIcon />}>
                    저장
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="language-label">언어</InputLabel>
                    <Select
                      labelId="language-label"
                      id="language"
                      value={language}
                      onChange={handleLanguageChange}
                      label="언어"
                    >
                      <MenuItem value="ko">한국어</MenuItem>
                      <MenuItem value="en">영어</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={lowStockNotification}
                          onChange={(e) =>
                            setLowStockNotification(e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="재고 부족 알림"
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 4, mt: -1 }}
                    >
                      재고가 최소 수량 이하로 떨어질 경우 알림을 받습니다.
                    </Typography>
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={autoBackup}
                          onChange={(e) => setAutoBackup(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="자동 백업"
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 4, mt: -1 }}
                    >
                      매일 자정에 시스템 데이터를 자동으로 백업합니다.
                    </Typography>
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={mode === "dark"}
                          onChange={toggleTheme}
                          color="primary"
                        />
                      }
                      label="다크 모드"
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 4, mt: -1 }}
                    >
                      어두운 테마를 사용합니다.
                    </Typography>
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" startIcon={<SaveIcon />}>
                    저장
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">사용자 역할 관리</Typography>
                    <Button startIcon={<AddIcon />} size="small">
                      새 역할 추가
                    </Button>
                  </Box>
                  <List>
                    {data.userRoles.map((role) => (
                      <React.Fragment key={role.id}>
                        <ListItem>
                          <ListItemText
                            primary={role.name}
                            secondary={`권한: ${role.permissions.join(", ")}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    사용자 관리
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Button variant="outlined" fullWidth>
                      사용자 목록
                    </Button>
                    <Button variant="outlined" fullWidth>
                      새 사용자 추가
                    </Button>
                    <Button variant="outlined" fullWidth>
                      초대 관리
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">데이터 백업</Typography>
                    <Button variant="contained" startIcon={<BackupIcon />}>
                      지금 백업
                    </Button>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 3 }}
                  >
                    현재 시스템의 모든 데이터를 백업합니다.
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    백업 이력
                  </Typography>
                  <List>
                    {data.backupHistory.map((backup) => (
                      <React.Fragment key={backup.id}>
                        <ListItem>
                          <ListItemText
                            primary={backup.date}
                            secondary={`유형: ${backup.type}`}
                          />
                          <ListItemSecondaryAction>
                            <Button size="small" startIcon={<RestoreIcon />}>
                              복원
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    데이터 복원
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    백업 파일에서 데이터를 복원합니다.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="warning.main"
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <WarningIcon fontSize="small" sx={{ mr: 1 }} />
                    주의: 복원 시 현재 데이터가 모두 삭제됩니다.
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    백업 파일 업로드
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    데이터 초기화
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    시스템의 모든 데이터를 초기화합니다.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="error.main"
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <WarningIcon fontSize="small" sx={{ mr: 1 }} />
                    주의: 이 작업은 되돌릴 수 없습니다.
                  </Typography>
                  <Button variant="outlined" color="error" fullWidth>
                    데이터 초기화
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Settings;
