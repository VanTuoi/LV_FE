
//Third-party
import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// In The Project

const initialServices = [
    { S_Id: '1', S_IsAvailable: false, S_Name: 'Wifi', S_Describe: null },
    { S_Id: '2', S_IsAvailable: false, S_Name: 'Điều hòa', S_Describe: null },
    { S_Id: '3', S_IsAvailable: false, S_Name: 'Phòng riêng', S_Describe: null },
    { S_Id: '4', S_IsAvailable: false, S_Name: 'Bàn ngoài trời', S_Describe: null },
    { S_Id: '5', S_IsAvailable: false, S_Name: 'Máy chiếu', S_Describe: null },
    { S_Id: '6', S_IsAvailable: false, S_Name: 'Bóng đá K+', S_Describe: null },
    { S_Id: '7', S_IsAvailable: false, S_Name: 'Ghế trẻ em', S_Describe: null },
    { S_Id: '8', S_IsAvailable: false, S_Name: 'Chỗ chơi trẻ em', S_Describe: null },
    { S_Id: '9', S_IsAvailable: false, S_Name: 'Chỗ hút thuốc', S_Describe: null },
    { S_Id: '10', S_IsAvailable: false, S_Name: 'Hóa đơn VAT', S_Describe: null },
    { S_Id: '11', S_IsAvailable: false, S_Name: 'Visa/Master card', S_Describe: null },
    { S_Id: '12', S_IsAvailable: false, S_Name: 'Chỗ để ô tô', S_Describe: null },
    { S_Id: '13', S_IsAvailable: false, S_Name: 'Phục vụ đồ ăn nhẹ', S_Describe: null },
]

const Services = (props) => {

    const { services, setServicesToDB } = props
    const [listServices, setListServices] = useState([]);

    useEffect(() => {
        if (services !== null && services !== undefined && services.length > 0)
            setListServices(services)
        else setListServices(initialServices)
    }, [services])

    const handleToggleAvailability = (index) => {
        const newServices = [...listServices];
        const updatedService = { ...newServices[index] };
        updatedService.S_IsAvailable = !updatedService.S_IsAvailable;
        newServices[index] = updatedService;
        setListServices(newServices);
        setServicesToDB(newServices)
    };

    const handleDescriptionChange = (index, newDescription) => {
        const newServices = [...listServices];
        const updatedService = { ...newServices[index] };
        updatedService.S_Describe = newDescription;
        newServices[index] = updatedService;
        setListServices(newServices);
        setServicesToDB(newServices);
    };


    return (
        <Accordion
            sx={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
            }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Danh sách dịch vụ
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer
                    sx={{ maxHeight: 300 }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '50px', py: 0.5, px: 1, textAlign: 'center', fontWeight: '600', fontSize: '14px' }} align="right">Có sẵn</TableCell>
                                <TableCell sx={{ width: '150px', py: 0.5, px: 1, textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Tên dịch vụ</TableCell>
                                <TableCell sx={{ py: 0.5, px: 1, textAlign: 'center', fontWeight: '600', fontSize: '14px' }} align="right">Mô Tả </TableCell>
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
                                            value={service.S_Describe === null ? '' : service.S_Describe}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default Services;

