import EmblaCarousel from './Slider/js/EmblaCarousel'
import './Slider/css/embla.css'
import { Grid, Box } from '@mui/material';
function SwipeableTextMobileStepper() {

    const OPTIONS = { containScroll: false }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return (
        <Box sx={{ backgroundColor: '#FFFFFF' }}>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </Box>
    );
}

export default SwipeableTextMobileStepper;
