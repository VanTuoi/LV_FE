import React from 'react';
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

const EditableTable = () => {

    const dispatch = useAppDispatch()

    // Dữ liệu giả lập
    const data = [
        { M_Id: 1, M_Name: 'Coffee', M_Price: 50000 },
        { M_Id: 2, M_Name: 'Coffee đá', M_Price: 55000 },
        { M_Id: 3, M_Name: 'Cappuccino', M_Price: 60000 },
        { M_Id: 4, M_Name: 'Latte', M_Price: 55000 },
    ];

    const [list, setList] = React.useState(data);
    const [updatedList, setUpdatedList] = React.useState(data);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleSave = () => {
        setList(updatedList);
        dispatch(store.actions.onChangeMenus(updatedList))
        console.log('updatedList', updatedList);
    };

    const handleMoveUp = (index) => {
        console.log('index', index, selectedRow);
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


    const handleDeleteRow = (id) => {
        const newList = updatedList.filter(item => item.M_Id !== id);
        // Cập nhật lại ID cho danh sách
        const updatedListWithNewIds = newList.map((item, index) => ({ ...item, M_Id: index + 1 }));
        setUpdatedList(updatedListWithNewIds);
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Tên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '14px' }}>Giá (VNĐ)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        updatedList && updatedList.length !== 0 ? (
                            <TableBody>
                                {updatedList.map((item, index) => (
                                    <TableRow
                                        key={item.M_Id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index === selectedRow ? '#f5f5f5' : null }}
                                    >
                                        <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell
                                            onClick={() => handleRowClick(index)}>
                                            <TextField
                                                size='small'
                                                value={item.M_Name}
                                                onChange={(e) => handleChange(item.M_Id, 'M_Name', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell
                                            onClick={() => handleRowClick(index)}>
                                            <TextField
                                                size='small'
                                                type="number"
                                                value={item.M_Price}
                                                onChange={(e) => handleChange(item.M_Id, 'M_Price', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size='small'
                                                variant="text"
                                                disabled={index === 0}
                                                onClick={() => handleMoveUp(index)}
                                            >
                                                <ArrowUpwardIcon />
                                            </Button>
                                            <Button
                                                size='small'
                                                variant="text"
                                                disabled={index === updatedList.length - 1}
                                                onClick={() => handleMoveDown(index)}
                                            >
                                                <ArrowDownwardIcon />
                                            </Button>
                                            <Button
                                                sx={{ color: 'gray' }}
                                                size='contained'
                                                variant="text"
                                                onClick={() => handleDeleteRow(item.M_Id)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            'Không có sản phẩm nào'
                        )
                    }

                </Table>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </TableContainer>
            <Button sx={{ margin: 1 }} variant="outlined" onClick={handleAddRow}>Thêm một sản phẩm</Button>
        </div >
    );
};

export default EditableTable;
