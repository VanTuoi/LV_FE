import React, { useEffect } from 'react';
import { useAppDispatch } from "@/lib/hooks";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Button, Paper } from '@mui/material';


import Typography from '@mui/material/Typography';


const initialServices = [
    { S_Id: '1', S_IsAvailable: false, S_Name: 'Wifi', S_Describe: '' },
    { S_Id: '2', S_IsAvailable: false, S_Name: 'Điều hòa', S_Describe: '' },
    { S_Id: '3', S_IsAvailable: false, S_Name: 'Phòng riêng', S_Describe: '' },
    { S_Id: '4', S_IsAvailable: false, S_Name: 'Bàn ngoài trời', S_Describe: '' },
    { S_Id: '5', S_IsAvailable: false, S_Name: 'Máy chiếu', S_Describe: '' },
    { S_Id: '6', S_IsAvailable: false, S_Name: 'Bóng đá K+', S_Describe: '' },
    { S_Id: '7', S_IsAvailable: false, S_Name: 'Ghế trẻ em', S_Describe: '' },
    { S_Id: '8', S_IsAvailable: false, S_Name: 'Chỗ chơi trẻ em', S_Describe: '' },
    { S_Id: '9', S_IsAvailable: false, S_Name: 'Chỗ hút thuốc', S_Describe: '' },
    { S_Id: '10', S_IsAvailable: false, S_Name: 'Hóa đơn VAT', S_Describe: '' },
    { S_Id: '11', S_IsAvailable: false, S_Name: 'Visa/Master card', S_Describe: '' },
    { S_Id: '12', S_IsAvailable: false, S_Name: 'Chỗ để ô tô', S_Describe: '' },
    { S_Id: '13', S_IsAvailable: false, S_Name: 'Phục vụ đồ ăn nhẹ', S_Describe: '' },
]

const Tags = (props) => {

    const { services } = props

    useEffect(() => {
        setListServices(services)
    }, [services])


    const [listServices, setListServices] = useState([]);

    const handleToggleAvailability = (index) => {
        const newServices = [...listServices];
        newServices[index].S_IsAvailable = !newServices[index].S_IsAvailable;
        setListServices(newServices);
    };

    const handleDescriptionChange = (index, newDescription) => {
        const newServices = [...listServices];
        newServices[index].S_Describe = newDescription;
        setListServices(newServices);
    };

    const saveChanges = () => {
        // Hàm để lưu các thay đổi, thực hiện fetch POST/PUT request tới API
        console.log('Saving changes', listServices);
        // Sau đây là cách bạn có thể fetch đến một endpoint API:
        // fetch('/api/listServices', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(listServices),
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    };


    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Quản lý danh sách dịch vụ của cửa hàng
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '50px', py: 0.5, px: 1, textAlign: 'center', fontWeight: '600', fontSize: '14px' }} align="right">Có Sẵn</TableCell>
                                <TableCell sx={{ width: '150px', py: 0.5, px: 1, textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Tên Dịch Vụ</TableCell>
                                <TableCell sx={{ py: 0.5, px: 1, textAlign: 'center', fontWeight: '600', fontSize: '14px' }} align="right">Mô Tả (nếu có) </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listServices && listServices.length > 0 && listServices.map((service, index) => (
                                <TableRow key={service.S_Id}>
                                    <TableCell sx={{ width: '70px', py: 0.5, px: 1, textAlign: 'center' }} component="th" scope="row">
                                        <Checkbox
                                            checked={service.S_IsAvailable}
                                            onChange={() => handleToggleAvailability(index)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ width: '150px', py: 0.5, px: 1, textAlign: 'left', fontWeight: '500', fontSize: '14px' }} align="left">
                                        {service.S_Name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }} align="left">
                                        <TextField
                                            multiline
                                            fullWidth
                                            variant="standard"
                                            size="small"
                                            value={service.S_Describe || ''}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" onClick={saveChanges} sx={{ mt: 2 }}>
                    Lưu Thay Đổi
                </Button>


            </AccordionDetails>
        </Accordion>
    );
};

export default Tags;
