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
  Input as InputIcon,
  Output as OutputIcon,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";

// Mock API call
const fetchTools = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    tools: [
      {
        id: "1",
        code: "TL-DR-01",
        name: "전동드릴 세트",
        category: "전동공구",
        status: "대여중",
        borrower: "이기사",
        project: "송파 아파트 인테리어",
        borrowDate: "2023-04-12",
        returnDate: "2023-04-19",
        condition: "좋음",
      },
      {
        id: "2",
        code: "TL-LV-01",
        name: "레이저 레벨기",
        category: "측정공구",
        status: "대여가능",
        borrower: null,
        project: null,
        borrowDate: null,
        returnDate: null,
        condition: "좋음",
      },
      {
        id: "3",
        code: "TL-CT-01",
        name: "타일 커터",
        category: "수공구",
        status: "대여중",
        borrower: "최기술",
        project: "마포 카페 시공",
        borrowDate: "2023-04-10",
        returnDate: "2023-04-17",
        condition: "보통",
      },
      {
        id: "4",
        code: "TL-GR-01",
        name: "그라인더",
        category: "전동공구",
        status: "수리중",
        borrower: null,
        project: null,
        borrowDate: null,
        returnDate: null,
        condition: "나쁨",
      },
      {
        id: "5",
        code: "TL-HM-01",
        name: "해머드릴",
        category: "전동공구",
        status: "대여중",
        borrower: "김현장",
        project: "강남 오피스텔 리모델링",
        borrowDate: "2023-04-08",
        returnDate: "2023-04-15",
        condition: "좋음",
      },
      {
        id: "6",
        code: "TL-SC-01",
        name: "전동 스크류드라이버",
        category: "전동공구",
        status: "대여가능",
        borrower: null,
        project: null,
        borrowDate: null,
        returnDate: null,
        condition: "좋음",
      },
      {
        id: "7",
        code: "TL-MS-01",
        name: "마이터 톱",
        category: "전동공구",
        status: "분실",
        borrower: "박시공",
        project: "강서 병원 인테리어",
        borrowDate: "2023-03-20",
        returnDate: null,
        condition: "나쁨",
      },
      {
        id: "8",
        code: "TL-HG-01",
        name: "열풍기",
        category: "전동공구",
        status: "대여가능",
        borrower: null,
        project: null,
        borrowDate: null,
        returnDate: null,
        condition: "보통",
      },
    ],
    categories: ["전동공구", "수공구", "측정공구", "안전장비"],
    statuses: ["대여가능", "대여중", "수리중", "분실"],
    conditions: ["좋음", "보통", "나쁨"],
    borrowers: ["김현장", "이기사", "최기술", "박시공"],
    projects: [
      "강남 오피스텔 리모델링",
      "송파 아파트 인테리어",
      "마포 카페 시공",
      "분당 사무실 인테리어",
      "일산 주택 리모델링",
      "강서 병원 인테리어",
      "광진 음식점 리모델링",
      "용산 호텔 객실 리뉴얼",
    ],
  };
};

const Tools: React.FC = () => {
  const { data, isLoading } = useQuery("tools", fetchTools);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [borrowDate, setBorrowDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

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

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as string);
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

  // Filter tools based on search and filters
  const filteredTools =
    data?.tools.filter((tool) => {
      const matchesSearch =
        !searchTerm ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.borrower &&
          tool.borrower.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        !selectedCategory || tool.category === selectedCategory;
      const matchesStatus = !selectedStatus || tool.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    }) || [];

  // Pagination
  const paginatedTools = filteredTools.slice(
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
      case "대여가능":
        color = "success";
        break;
      case "대여중":
        color = "primary";
        break;
      case "수리중":
        color = "warning";
        break;
      case "분실":
        color = "error";
        break;
      default:
        color = "default";
    }

    return <Chip label={status} color={color} size="small" />;
  };

  const getConditionChip = (condition: string) => {
    let color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning" = "default";

    switch (condition) {
      case "좋음":
        color = "success";
        break;
      case "보통":
        color = "info";
        break;
      case "나쁨":
        color = "error";
        break;
      default:
        color = "default";
    }

    return <Chip label={condition} color={color} size="small" />;
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
          공구 관리
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          신규 공구 등록
        </Button>
      </Box>

      {isMobile ? (
        // Mobile card view
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="공구명, 코드, 대여자 등으로 검색..."
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
                <InputLabel id="category-select-label">분류</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="분류"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {data.categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
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
            {paginatedTools.map((tool) => (
              <Grid item xs={12} key={tool.id}>
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
                        {tool.name}
                      </Typography>
                      {getStatusChip(tool.status)}
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      코드: {tool.code} | 분류: {tool.category}
                    </Typography>
                    <Typography variant="body2">
                      상태: {getConditionChip(tool.condition)}
                    </Typography>
                    {tool.borrower && (
                      <>
                        <Typography variant="body2">
                          대여자: {tool.borrower}
                        </Typography>
                        <Typography variant="body2">
                          현장: {tool.project}
                        </Typography>
                        <Typography variant="body2">
                          대여일: {tool.borrowDate}{" "}
                          {tool.returnDate && `~ ${tool.returnDate}`}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<InputIcon />}
                      disabled={tool.status !== "대여가능"}
                    >
                      대여
                    </Button>
                    <Button
                      size="small"
                      startIcon={<OutputIcon />}
                      disabled={tool.status !== "대여중"}
                    >
                      반납
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
            count={filteredTools.length}
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
              placeholder="공구명, 코드, 대여자 등으로 검색..."
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
                <InputLabel id="category-select-label">분류</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="분류"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {data.categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
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
            <Table sx={{ minWidth: 650 }} aria-label="공구 테이블">
              <TableHead>
                <TableRow>
                  <TableCell>코드</TableCell>
                  <TableCell>공구명</TableCell>
                  {!isTablet && <TableCell>분류</TableCell>}
                  <TableCell>상태</TableCell>
                  <TableCell>상태</TableCell>
                  {!isTablet && <TableCell>대여자</TableCell>}
                  {!isTablet && <TableCell>대여일</TableCell>}
                  <TableCell align="right">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell component="th" scope="row">
                      {tool.code}
                    </TableCell>
                    <TableCell>{tool.name}</TableCell>
                    {!isTablet && <TableCell>{tool.category}</TableCell>}
                    <TableCell>{getStatusChip(tool.status)}</TableCell>
                    <TableCell>{getConditionChip(tool.condition)}</TableCell>
                    {!isTablet && <TableCell>{tool.borrower || "-"}</TableCell>}
                    {!isTablet && (
                      <TableCell>
                        {tool.borrowDate ? (
                          <>
                            {tool.borrowDate}{" "}
                            {tool.returnDate && `~ ${tool.returnDate}`}
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    )}
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        aria-label="대여"
                        title="대여"
                        disabled={tool.status !== "대여가능"}
                      >
                        <InputIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="반납"
                        title="반납"
                        disabled={tool.status !== "대여중"}
                      >
                        <OutputIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedTools.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isTablet ? 5 : 8} align="center">
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
            count={filteredTools.length}
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

      {/* Add New Tool Dialog */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>신규 공구 등록</DialogTitle>
          <DialogContent>
            <DialogContentText>
              새로운 공구 정보를 입력해주세요.
            </DialogContentText>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="code"
                  label="공구 코드"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="category-label">분류</InputLabel>
                  <Select labelId="category-label" id="category" label="분류">
                    {data.categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="name"
                  label="공구명"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status-label">상태</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    label="상태"
                    defaultValue="대여가능"
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
                <FormControl fullWidth margin="dense">
                  <InputLabel id="condition-label">상태</InputLabel>
                  <Select
                    labelId="condition-label"
                    id="condition"
                    label="상태"
                    defaultValue="좋음"
                  >
                    {data.conditions.map((condition) => (
                      <MenuItem key={condition} value={condition}>
                        {condition}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

export default Tools;
