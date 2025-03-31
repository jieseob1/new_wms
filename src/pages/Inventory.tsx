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
  LinearProgress,
  Skeleton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

// Mock API call
const fetchInventory = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    items: [
      {
        id: "1",
        code: "FLM-LG-W01",
        name: "LG 하우시스 필름 (화이트)",
        category: "필름",
        stock: 12,
        unit: "롤",
        minStock: 20,
        location: "A-1-2",
        lastUpdated: "2023-04-15",
        status: "부족",
      },
      {
        id: "2",
        code: "TIL-FL-600W",
        name: "바닥 타일 (600x600 화이트)",
        category: "타일",
        stock: 120,
        unit: "장",
        minStock: 200,
        location: "B-2-1",
        lastUpdated: "2023-04-10",
        status: "부족",
      },
      {
        id: "3",
        code: "ADH-TIL-20KG",
        name: "타일 접착제 (20kg)",
        category: "접착제",
        stock: 8,
        unit: "포대",
        minStock: 15,
        location: "C-1-3",
        lastUpdated: "2023-04-12",
        status: "부족",
      },
      {
        id: "4",
        code: "MOL-CL-2.4M",
        name: "천장 몰딩 (2.4m)",
        category: "몰딩",
        stock: 25,
        unit: "개",
        minStock: 30,
        location: "D-3-1",
        lastUpdated: "2023-04-08",
        status: "부족",
      },
      {
        id: "5",
        code: "SIL-CLR-300",
        name: "실리콘 (투명)",
        category: "접착제",
        stock: 18,
        unit: "개",
        minStock: 30,
        location: "C-1-4",
        lastUpdated: "2023-04-14",
        status: "부족",
      },
      {
        id: "6",
        code: "FLM-LG-W02",
        name: "LG 하우시스 필름 (우드)",
        category: "필름",
        stock: 28,
        unit: "롤",
        minStock: 15,
        location: "A-1-3",
        lastUpdated: "2023-04-11",
        status: "정상",
      },
      {
        id: "7",
        code: "TIL-FL-600B",
        name: "바닥 타일 (600x600 블랙)",
        category: "타일",
        stock: 85,
        unit: "장",
        minStock: 100,
        location: "B-2-2",
        lastUpdated: "2023-04-09",
        status: "부족",
      },
      {
        id: "8",
        code: "PNT-INT-18L",
        name: "내부용 페인트 (화이트 18L)",
        category: "페인트",
        stock: 12,
        unit: "통",
        minStock: 8,
        location: "E-1-1",
        lastUpdated: "2023-04-13",
        status: "정상",
      },
      {
        id: "9",
        code: "MOL-FL-2.4M",
        name: "바닥 몰딩 (2.4m)",
        category: "몰딩",
        stock: 42,
        unit: "개",
        minStock: 25,
        location: "D-3-2",
        lastUpdated: "2023-04-07",
        status: "과다",
      },
      {
        id: "10",
        code: "SIL-WHT-300",
        name: "실리콘 (화이트)",
        category: "접착제",
        stock: 32,
        unit: "개",
        minStock: 20,
        location: "C-1-5",
        lastUpdated: "2023-04-06",
        status: "과다",
      },
    ],
    categories: ["필름", "타일", "접착제", "몰딩", "페인트"],
    statuses: ["정상", "부족", "과다", "유휴"],
  };
};

const Inventory: React.FC = () => {
  const { data, isLoading } = useQuery("inventory", fetchInventory);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

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

  // Filter items based on search and filters
  const filteredItems =
    data?.items.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    }) || [];

  // Pagination
  const paginatedItems = filteredItems.slice(
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
      case "부족":
        color = "error";
        break;
      case "과다":
        color = "success";
        break;
      case "유휴":
        color = "warning";
        break;
      case "정상":
        color = "info";
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
          재고 관리
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{ mr: 1 }}
          >
            신규 자재 등록
          </Button>
          {!isMobile && (
            <>
              <Button
                variant="outlined"
                startIcon={<FileUploadIcon />}
                sx={{ mr: 1 }}
              >
                엑셀 가져오기
              </Button>
              <Button variant="outlined" startIcon={<FileDownloadIcon />}>
                엑셀 내보내기
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="자재명, 코드, 위치 등으로 검색..."
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
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
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

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
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
          <Table sx={{ minWidth: 650 }} aria-label="재고 테이블">
            <TableHead>
              <TableRow>
                <TableCell>코드</TableCell>
                <TableCell>자재명</TableCell>
                {!isMobile && <TableCell>분류</TableCell>}
                <TableCell>재고량</TableCell>
                {!isMobile && <TableCell>위치</TableCell>}
                <TableCell>상태</TableCell>
                <TableCell align="right">작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((item) => {
                const stockPercentage = (item.stock / item.minStock) * 100;

                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.code}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    {!isMobile && <TableCell>{item.category}</TableCell>}
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <Box sx={{ width: "100%", mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(stockPercentage, 100)}
                            color={
                              stockPercentage < 50
                                ? "error"
                                : stockPercentage < 100
                                ? "warning"
                                : "success"
                            }
                            sx={{ height: 8, borderRadius: 5 }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35, mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {`${item.stock}/${item.minStock} ${item.unit}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    {!isMobile && <TableCell>{item.location}</TableCell>}
                    <TableCell>{getStatusChip(item.status)}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" aria-label="delete">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginatedItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isMobile ? 5 : 7} align="center">
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
          count={filteredItems.length}
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

      {/* Add New Item Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>신규 자재 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            새로운 자재 정보를 입력해주세요.
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="code"
                label="자재 코드"
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
                label="자재명"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="stock"
                label="재고량"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="unit"
                label="단위"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="minStock"
                label="최소 재고량"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="location"
                label="위치"
                type="text"
                fullWidth
                variant="outlined"
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
    </Box>
  );
};

export default Inventory;
