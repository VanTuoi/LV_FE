import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material';
import { Stack } from '@mui/system';

const Custom = styled(Select)(({ theme }) => ({
    borderRadius: '10px',
    fontSize: '1.0rem',
    fontWeight: 400
}));


const CustomSelect = ({ listValue, children, click }) => {
    const listItem = listValue || ['Không tìm thấy'];
    const [defaultValue, setDefaultValue] = useState(listItem[0]);

    useEffect(() => {
        click(defaultValue)
    }, [defaultValue, click]);

    return (
        <Custom
            value={defaultValue}
            onChange={event => setDefaultValue(event.target.value)}
        >
            {listItem && listItem.map((item) => (
                <MenuItem key={item} value={item}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        {children} {item}
                    </Stack>
                </MenuItem>
            ))}
        </Custom >
    );
};

export default CustomSelect;
