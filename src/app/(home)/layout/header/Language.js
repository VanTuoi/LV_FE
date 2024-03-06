import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Language = () => {

    // select
    const [language, setLanguage] = useState('VN');

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    // chart color
    const theme = useTheme();

    return (

        <Select
            labelId="lg"
            id="lg"
            value={language}
            size="small"
            onChange={handleChange}
        >
            <MenuItem value={'VN'}>VN</MenuItem>
            <MenuItem value={'EN'}>EN</MenuItem>
        </Select>
    );
};

export default Language;
