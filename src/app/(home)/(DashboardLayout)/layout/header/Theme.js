import { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Theme = () => {

    // select
    const [checked, setChecked] = useState(true);
    const [title, setTitle] = useState('Light')

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (title === 'Light') {
            setTitle('Night')
        } else {
            setTitle('Light')
        }
    };

    // color
    const theme = useTheme();

    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label={title}
        />
    );
};

export default Theme;
