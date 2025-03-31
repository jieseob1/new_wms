"use client";

import type React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Skeleton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Assignment as AssignmentIcon,
  Build as BuildIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";

// Mock API call
const fetchProjects = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    projects: [
      {
        id: "1",
        name: "강남 오피스텔 리모델링",
        address: "서울시 강남구 역삼동 123-45",
        manager: "김현장",
        startDate: "2023-04-01",
        endDate: "2023-05-15",
        status: "진행중",
        materialCount: 12,
        toolCount: 5,
      },
      {
        id: "2",
        name: "송파 아파트 인테리어",
        address: "서울시 송파구 잠실동 456-78",
        manager: "이기사",
        startDate: "2023-04-10",
        endDate: "2023-05-20",
        status: "진행중",
        materialCount: 8,
        toolCount: 3,
      },
      {
        id: "3",
        name: "마포 카페 시공",
        address: "서울시 마포구 합정동 789-12",
        manager: "최기술",
        startDate: "2023-03-15",
        endDate: "2023-04-30",
        status: "완료",
        materialCount: 15,
        toolCount: 4,
      },
      {
        id: "4",
        name: "분당 사무실 인테리어",
        address: "경기도 성남시 분당구 서현동 345-67",
        manager: "박시공",
        startDate: "2023-04-20",
        endDate: "2023-06-10",
        status: "준비중",
        materialCount: 0,
        toolCount: 0,
      },
      {
        id: "5",
        name: "일산 주택 리모델링",
        address: "경기도 고양시 일산동구 장항동 234-56",
        manager: "김현장",
        startDate: "2023-05-01",
        endDate: "2023-06-30",
        status: "준비중",
        materialCount: 0,
        toolCount: 0,
      },
      {
        id: "6",
        name: "강서 병원 인테리어",
        address: "서울시 강서구 화곡동 567-89",
        manager: "이기사",
        startDate: "2023-02-15",
        endDate: "2023-04-15",
        status: "완료",
        materialCount: 20,
        toolCount: 6,
      },
      {
        id: "7",
        name: "광진 음식점 리모델링",
        address: "서울시 광진구 구의동 890-12",
        manager: "최기술",
        startDate: "2023-03-01",
        endDate: "2023-04-20",
        status: "완료",
        materialCount: 10,
        toolCount: 2,
      },
      {
        id: "8",
        name: "용산 호텔 객실 리뉴얼",
        address: "서울시 용산구 한남동 123-45",
        manager: "박시공",
        startDate: "2023-04-15",
        endDate: "2023-07-30",
        status: "진행중",
        materialCount: 25,
        toolCount: 8,
      },
    ],
    managers: ["김현장", "이기사", "최기술", "박시공"],
    statuses: ["준비중", "진행중", "완료", "보류"],
  };
};

const Projects: React.FC = () => {
  const { data, isLoading } = useQuery("projects", fetchProjects);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleManagerChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedManager(event.target.value as string);
    setPage(0);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStatus(event.target.value as string);
    setPage(0);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  // Filter projects based on search and filters
  const filteredProjects =
    data?.projects.filter((project) => {
      const matchesSearch =
        !searchTerm ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesManager =
        !selectedManager || project.manager === selectedManager;
      const matchesStatus =
        !selectedStatus || project.status === selectedStatus;

      return matchesSearch && matchesManager && matchesStatus;
    }) || [];

  // Pagination
  const paginatedProjects = filteredProjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusChip = (status: string) => {
    let color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning" = "default";

    switch (status) {
      case "진행중":
        color = "primary";
        break;
      case "완료":
        color = "success";
        break;
      case "준비중":
        color = "info";
        break;
      case "보류":
        color = "warning";
        break;
      default:
        color = "default";
    }

    return <Chip label={status} color={color} size="small" />;
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          현장 관리
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          신규 현장 등록
        </Button>
      </Box>

      {isMobile ? (
        // Mobile card view
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="현장명, 주소 등으로 검색..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />

          {filterMenuOpen && (
            <Box
              sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="manager-select-label">담당자</InputLabel>
                <Select
                  labelId="manager-select-label"
                  id="manager-select"
                  value={selectedManager}
                  onChange={handleManagerChange}
                  label="담당자"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {data.managers.map((manager) => (
                    <MenuItem key={manager} value={manager}>
                      {manager}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="status-select-label">상태</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  label="상태"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {data.statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={toggleFilterMenu}
            sx={{ mb: 2 }}
          >
            필터 {filterMenuOpen ? "닫기" : "열기"}
          </Button>

          <Grid container spacing={2}>
            {paginatedProjects.map((project) => (
              <Grid item xs={12} key={project.id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {project.name}
                      </Typography>
                      {getStatusChip(project.status)}
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {project.address}
                    </Typography>
                    <Typography variant="body2">
                      담당자: {project.manager}
                    </Typography>
                    <Typography variant="body2">
                      기간: {project.startDate} ~ {project.endDate}
                    </Typography>
                    <Typography variant="body2">
                      자재: {project.materialCount}종 / 공구:{" "}
                      {project.toolCount}종
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<AssignmentIcon />}>
                      자재 요청
                    </Button>
                    <Button size="small" startIcon={<BuildIcon />}>
                      공구 대여
                    </Button>
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <TablePagination
            component="div"
            count={filteredProjects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="페이지당 행 수:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} / ${count}`
            }
          />
        </Box>
      ) : (
        // Desktop table view
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <TextField
              variant="outlined"
              margin="dense"
              placeholder="현장명, 주소 등으로 검색..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 2, flexGrow: 1 }}
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <Tooltip title="필터">
              <IconButton onClick={toggleFilterMenu}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>

          {filterMenuOpen && (
            <Box sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 120 }}
              >
                <InputLabel id="manager-select-label">담당자</InputLabel>
                <Select
                  labelId="manager-select-label"
                  id="manager-select"
                  value={selectedManager}
                  onChange={handleManagerChange}
                  label="담당자"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {data.managers.map((manager) => (
                    <MenuItem key={manager} value={manager}>
                      {manager}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 120 }}
              >
                <InputLabel id="status-select-label">상태</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  label="상태"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {data.statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="현장 테이블">
              <TableHead>
                <TableRow>
                  <TableCell>현장명</TableCell>
                  {!isTablet && <TableCell>주소</TableCell>}
                  <TableCell>담당자</TableCell>
                  {!isTablet && <TableCell>기간</TableCell>}
                  <TableCell>상태</TableCell>
                  <TableCell>자재/공구</TableCell>
                  <TableCell align="right">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell component="th" scope="row">
                      {project.name}
                    </TableCell>
                    {!isTablet && <TableCell>{project.address}</TableCell>}
                    <TableCell>{project.manager}</TableCell>
                    {!isTablet && (
                      <TableCell>
                        {project.startDate} ~ {project.endDate}
                      </TableCell>
                    )}
                    <TableCell>{getStatusChip(project.status)}</TableCell>
                    <TableCell>
                      {project.materialCount}종 / {project.toolCount}종
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        aria-label="자재 요청"
                        title="자재 요청"
                      >
                        <AssignmentIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="공구 대여"
                        title="공구 대여"
                      >
                        <BuildIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedProjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isTablet ? 5 : 7} align="center">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProjects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="페이지당 행 수:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} / ${count}`
            }
          />
        </Paper>
      )}

      {/* Add New Project Dialog */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>신규 현장 등록</DialogTitle>
          <DialogContent>
            <DialogContentText>
              새로운 현장 정보를 입력해주세요.
            </DialogContentText>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="현장명"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="address"
                  label="주소"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="manager-label">담당자</InputLabel>
                  <Select labelId="manager-label" id="manager" label="담당자">
                    {data.managers.map((manager) => (
                      <MenuItem key={manager} value={manager}>
                        {manager}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status-label">상태</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    label="상태"
                    defaultValue="준비중"
                  >
                    {data.statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="시작일"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="종료일"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>취소</Button>
            <Button onClick={handleCloseDialog} variant="contained">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
};

export default Projects;
