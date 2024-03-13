
//Third-party
import React, { useEffect } from 'react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { Typography, TextField, AccordionSummary, AccordionDetails, Accordion, Paper } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';

// In The Project
import store from '@/lib/features/storeSlice'
import { useAppDispatch } from "@/lib/hooks";
import useControllerStore from '@/hook/manager/useControllerStore'

const TableMenu = (props) => {

    const dispatch = useAppDispatch()
    const { setIsChangeMenus } = useControllerStore()
    const { menus } = props
    const [updatedList, setUpdatedList] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);

    useEffect(() => {
        setUpdatedList(menus)
    }, [menus])

    const handleSwapObjects = (index1, index2) => {
        const newList = [...updatedList];
        const tempItem1 = { ...newList[index1] };
        const tempItem2 = { ...newList[index2] };
        const tempId = tempItem1.M_Id;
        tempItem1.M_Id = tempItem2.M_Id;
        tempItem2.M_Id = tempId;
        newList[index1] = tempItem2;
        newList[index2] = tempItem1;
        setUpdatedList(newList);
        setIsChangeMenus(true)
        dispatch(store.actions.onChangeMenus(newList))
    };

    const handleMoveUp = (index) => {
        setSelectedRow(index - 1);
        if (index === 0) return;
        handleSwapObjects(index, index - 1);
    };

    const handleMoveDown = (index) => {
        setSelectedRow(index + 1);
        if (index === updatedList.length - 1) return;
        handleSwapObjects(index, index + 1);
    };

    const handleAddRow = () => {
        const newId = 'N_' + (updatedList.length + 1);
        const newRow = { M_Id: newId, M_Name: '', M_Price: '' };
        setUpdatedList([...updatedList, newRow]);
        setIsChangeMenus(true)
        dispatch(store.actions.onChangeMenus([...updatedList, newRow]))
    };

    const handleChange = (id, field, value) => {
        const newList = updatedList.map(item => {
            if (item.M_Id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setUpdatedList(newList);
        setIsChangeMenus(true)
        dispatch(store.actions.onChangeMenus(newList))
    };

    const handleDeleteRow = (index) => {
        const newList = updatedList.map((item, idx) => {
            if (idx === index) {
                const newItem = { ...item };
                newItem.M_Id = "D_" + newItem.M_Id;
                return newItem;
            }
            return item;
        });
        setUpdatedList(newList);
        setSelectedRow(null);
        setIsChangeMenus(true)
        dispatch(store.actions.onChangeMenus(newList))
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    return (
        //defaultExpanded
        <Accordion
            sx={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Quản lý danh sách đồ uống của cửa hàng
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ width: '20px', fontWeight: 'bold', fontSize: '14px' }}>STT</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Tên đồ uống</TableCell>
                                <TableCell sx={{ width: '125px', fontWeight: 'bold', fontSize: '14px' }}>Giá bán(VNĐ)</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold', fontSize: '14px' }}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            updatedList && updatedList.length > 0 ? (
                                <TableBody>
                                    {updatedList.map((item, index) => {
                                        const stringM_Id = String(item.M_Id); // Ép kiểu 'M_Id' sang chuỗi
                                        const isNumber = typeof item.M_Id === 'number'; // Kiểm tra 'M_Id' có phải là một số không
                                        const isStringWithM = typeof item.M_Id === 'string' && stringM_Id.includes('D'); // Kiểm tra 'M_Id' có phải là chuỗi và chứa kí tự 'M' không

                                        if (isNumber || !isStringWithM) {
                                            return (
                                                <TableRow
                                                    key={item.M_Id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index === selectedRow ? '#f5f5f5' : null }}
                                                >
                                                    <TableCell sx={{ width: '20px' }} align="center" component="th" scope="row">{index + 1}</TableCell>
                                                    <TableCell
                                                        onClick={() => handleRowClick(index)}>
                                                        <TextField
                                                            size='small'
                                                            variant="standard"
                                                            value={item.M_Name}
                                                            onChange={(e) => handleChange(item.M_Id, 'M_Name', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ width: '120px', }}
                                                        onClick={() => handleRowClick(index)}>
                                                        <TextField
                                                            size='small'
                                                            variant="standard"
                                                            type="number"
                                                            value={item.M_Price}
                                                            onChange={(e) => handleChange(item.M_Id, 'M_Price', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ width: '100px' }} align="left" >
                                                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                            <ArrowUpwardIcon
                                                                sx={{
                                                                    cursor: index !== 0 ? 'pointer' : null,
                                                                    color: index === 0 ? 'rgba(0, 0, 0, 0.35)' : '#5D87FF',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                                        borderRadius: '10%',
                                                                    },
                                                                    '&:active': {
                                                                        color: '#1976D2',
                                                                        transform: 'scale(0.95)',
                                                                    },
                                                                }}
                                                                disabled={index === 0}
                                                                onClick={() => handleMoveUp(index)}
                                                            />
                                                            <ArrowDownwardIcon
                                                                sx={{
                                                                    cursor: index !== updatedList.length - 1 ? 'pointer' : null,
                                                                    color: index === updatedList.length - 1 ? 'rgba(0, 0, 0, 0.35)' : '#5D87FF',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                                        borderRadius: '10%',
                                                                    },
                                                                    '&:active': {
                                                                        color: '#1976D2',
                                                                        transform: 'scale(0.95)',
                                                                    },
                                                                }}
                                                                disabled={index === 0}
                                                                onClick={() => handleMoveDown(index)}
                                                            />
                                                            <DeleteIcon
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    color: 'rgba(0, 0, 0, 0.35)',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                                        borderRadius: '10%',
                                                                    },
                                                                    '&:active': {
                                                                        color: '#FFCDD2',
                                                                        transform: 'scale(0.95)',
                                                                    },
                                                                }}
                                                                disabled={index === 0}
                                                                onClick={() => handleDeleteRow(index)}
                                                            />
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                        return null; // Không hiển thị hàng nếu không thỏa mãn điều kiện
                                    })}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            <Typography variant='h6' sx={{ fontWeight: 400 }}>
                                                Không có sản phẩm nào
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        }
                    </Table>
                    {/* <Button variant="contained" onClick={handleSave}>Save</Button> */}
                </TableContainer>
                <Button sx={{ marginTop: '5px' }} variant="text" onClick={handleAddRow}>Thêm một sản phẩm</Button>
            </AccordionDetails>
        </Accordion >
    );
};

export default TableMenu;
