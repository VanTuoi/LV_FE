import React, { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'
import { Stack } from '@mui/system';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EditableTable = (props) => {

    const { menus } = props

    useEffect(() => {
        setUpdatedList(menus)
    }, [menus])


    const dispatch = useAppDispatch()

    // Dữ liệu giả lập
    // const data = [
    //     { M_Name: 'Coffee', M_Price: 50000 },
    //     { M_Name: 'Coffee đá', M_Price: 55000 },
    //     { M_Name: 'Cappuccino', M_Price: 60000 },
    //     { M_Name: 'Latte', M_Price: 55000 },
    // ];

    // const [list, setList] = React.useState(data);
    const [updatedList, setUpdatedList] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleMoveUp = (index) => {
        setSelectedRow(index - 1)
        if (index === 0) return;
        const newList = [...updatedList];
        const temp = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = temp;
        newList[index].M_Id = index + 1;
        newList[index - 1].M_Id = index;
        setUpdatedList(newList);

    };

    const handleMoveDown = (index) => {
        setSelectedRow(index + 1)
        if (index === updatedList.length - 1) return;
        const newList = [...updatedList];
        const temp = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = temp;
        newList[index].M_Id = index + 1;
        newList[index + 1].M_Id = index + 2;
        setUpdatedList(newList);

    };

    const handleAddRow = () => {
        const newId = updatedList.length + 1;
        const newRow = { M_Id: newId, M_Name: '', M_Price: '' };
        setUpdatedList([...updatedList, newRow]);
    };

    const handleChange = (id, field, value) => {
        const newList = updatedList.map(item => {
            if (item.M_Id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setUpdatedList(newList);
    };

    const handleDeleteRow = (index) => {
        const newList = updatedList.filter((item, idx) => idx !== index);
        setUpdatedList(newList);
        setSelectedRow(null); // Reset selectedRow to avoid errors when no row is selected
    };



    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    return (
        <Accordion defaultExpanded>
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
                                    {updatedList.map((item, index) => (
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
                                    ))}
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
        </Accordion>
    );
};

export default EditableTable;
