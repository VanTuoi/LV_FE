import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';

import Account from './Options/Account';
import ListStoreSave from './Options/ListStoreSave';
import ListStoreReport from './Options/ListStoreReport';
// In the Project

export default function NavOptions({ valueSelect }) {
    const [selectedComponent, setSelectedComponent] = useState(null);

    useEffect(() => {
        setSelectedComponent(changeItem(valueSelect));
    }, [valueSelect]);

    const changeItem = (value) => {
        switch (value) {
            case 'detail_account':
                return <Account />;
            case 'list_store_save':
                return <ListStoreSave />;
            case 'list_store_report':
                return <ListStoreReport />;
            default:
                return null; // Nếu không khớp với bất kỳ case nào, trả về null
        }
    };

    return (
        <Box alignItems={'flex-start'} sx={{ display: 'flex', flexDirection: 'column', padding: '30px', backgroundColor: '#F7F7F7', borderRadius: '6px' }}>
            <Box sx={{ width: '100%' }}>
                {selectedComponent}
            </Box>
        </Box>
    );
}
