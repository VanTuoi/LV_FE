import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, InputAdornment, Box, Grid, Button } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';

export default function Grouped() {
    const options = coffeeShops.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    return (
        <Autocomplete
            fullWidth
            id="grouped-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '3px'
            }}
            renderInput={(params) => (
                <TextField
                    placeholder='Tìm kiếm tên cửa hàng, địa điểm,...'
                    sx={{
                        '& input': {
                            fontWeight: '600'
                        },
                    }}
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconSearch size={21} />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}

const coffeeShops = [
    { id: 1, name: 'Highlands Coffee' },
    { id: 2, name: 'Cộng Cà Phê' },
    { id: 3, name: 'The Coffee House' },
    { id: 4, name: 'Trung Nguyên Coffee' },
    { id: 5, name: 'Phúc Long Coffee & Tea House' },
    { id: 6, name: 'Giang Cafe' },
    { id: 7, name: 'RuNam Bistro' },
    { id: 8, name: 'Maison Marou Saigon' },
    { id: 9, name: 'Nhà Đẹp Cafe' }
];
