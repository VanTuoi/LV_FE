
//Third-party
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    Badge,
    Typography,
} from '@mui/material';

// Redux
import bookingSlice from '@/lib/features/bookingSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// In the project
import useActivitySchedule from '@/hook/manager/useActivitySchedule'


function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.date());

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={
                isSelected ? (
                    <Typography variant="subtitle1" sx={{ color: 'red' }}>
                        off
                    </Typography>
                ) : (
                    undefined
                )
            }
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

export default function DateCalendarServerRequest() {
    const dispatch = useAppDispatch();
    const dayToRedux = useAppSelector(state => state.reducer.booking.date);
    const { getHolidays, uniqueDays } = useActivitySchedule();

    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [currentDay, setCurrentDay] = useState(dayjs());

    useEffect(() => {
        getHolidays(dayjs());
    }, []);

    useEffect(() => {
        setCurrentDay(dayToRedux);
    }, [dayToRedux]);

    const checkAndIncreaseDay = currentDay => {
        let newDay = currentDay.clone();
        while (highlightedDays.includes(newDay.date())) {
            newDay = newDay.add(1, 'day');
        }
        return newDay;
    };

    useEffect(() => {
        setHighlightedDays(uniqueDays);
        handleSelectDayStart(dayToRedux);
        setIsLoading(false);
    }, [uniqueDays]);

    const handleSelectDayStart = date => {
        const validDay = checkAndIncreaseDay(date);
        if (date.toString() !== validDay.toString()) {
            dispatch(bookingSlice.actions.setDate(validDay));
        }
    };

    const handleSelectDay = date => {
        dispatch(bookingSlice.actions.setDate(date));
    };

    const disableWeekends = date => {
        return highlightedDays.includes(dayjs(date).date());
    };

    const handleMonthChange = date => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        getHolidays(date);
        setIsLoading(true);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                shouldDisableDate={disableWeekends}
                sx={{ marginLeft: '-20px' }}
                disablePast={true}
                disableHighlightToday={true}
                value={currentDay}
                onChange={newValue => handleSelectDay(newValue)}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: {
                        highlightedDays,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
