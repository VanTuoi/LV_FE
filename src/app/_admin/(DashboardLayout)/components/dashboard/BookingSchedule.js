import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { Button, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useState } from "react";
import useTableBookingSchedule from '@/hook/manager/use-list-booking'


let listDayViews = {};
const initialValue = dayjs();

const handleClick = (day) => {
    console.log('click', day);
}

const viewDay = (date) => {
    const time = new Date(date).getDate()
    return (
        <Box
            onClick={() => handleClick(day)}
            sx={{ marginTop: '3px', backgroundColor: 'white', zIndex: 10, color: 'red', border: '1px solid red', padding: '0px 2px 2px 2px', borderRadius: '2px' }}
        >
            {listDayViews[time]}
        </Box>
    )
}

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? viewDay(props.day) : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />

        </Badge>
    );
}

export default function DateCalendarServerRequest() {

    const { getListBooking, uniqueDays, frequency } = useTableBookingSchedule();

    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([]);

    React.useEffect(() => {
        getListBooking(dayjs()).then(() => {
            listDayViews = frequency;
            setHighlightedDays(uniqueDays);
        }).catch((error) => {
            console.error('Error:', error);
        });

    }, []);

    React.useEffect(() => {
        setHighlightedDays(uniqueDays)
        setIsLoading(false)
    }, [uniqueDays]);

    React.useEffect(() => {
        listDayViews = frequency
    }, [frequency]);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }
        getListBooking(date).then(() => {
            listDayViews = frequency;
        }).catch((error) => {
            console.error('Error:', error);
        });
        setIsLoading(true);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                displayWeekNumber
                defaultValue={initialValue}
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
