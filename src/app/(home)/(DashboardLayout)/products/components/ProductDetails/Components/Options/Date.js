
//Third-party

import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import {
    Badge,
    Typography,
} from '@mui/material';

// Redux

import { useAppSelector } from '@/lib/hooks';
import bookingSlice, { } from '@/lib/features/booking/bookingSlice'
import { useAppDispatch } from '@/lib/hooks';

// In the project

import useActivitySchedule from '@/hook/manager/use-activity-schedule'


function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ?
                <Typography
                    variant="subtitle1"
                    sx={{ color: 'red' }}
                >off
                </Typography>
                :
                undefined
            }
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

export default function DateCalendarServerRequest() {

    const dispatch = useAppDispatch()
    const dayToRedux = useAppSelector((state) => state.reducer.booking.date)
    const { getHolidays, uniqueDays } = useActivitySchedule();

    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);

    const [currentDay, setCurrentDay] = useState(dayjs());

    useEffect(() => {                                   // lấy dữ liệu lần đầu
        getHolidays(dayjs())
    }, []);

    useEffect(() => {                                  // lay ngay duoc chon từ redux
        setCurrentDay(dayToRedux)
    }, [dayToRedux]);

    const checkAndIncreaseDay = (currentDay) => {       // Check có trùng ngày nghĩ
        let newDay = currentDay.clone();
        while (highlightedDays.includes(newDay.date())) {
            newDay = newDay.add(1, 'day');
        }
        return newDay;
    };

    useEffect(() => {                                   // Xử lý cập nhật ds ngày nghĩ
        setHighlightedDays(uniqueDays);
        handleSelectDayStart(dayToRedux)
        setIsLoading(false);
    }, [uniqueDays]);

    const handleSelectDayStart = (date) => {            // Dành do việc render lại
        const validDay = checkAndIncreaseDay(date);
        if (date.toString() !== validDay.toString()) {
            dispatch(bookingSlice.actions.setDate(validDay));
        }
    }
    const handleSelectDay = (date) => {
        dispatch(bookingSlice.actions.setDate(date));
    }

    const disableWeekends = (date) => {                //  Ko cho chọn những ngày nghĩ
        return highlightedDays.includes(dayjs(date).date())
    }

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        getHolidays(date)
        setIsLoading(true);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateCalendar
                    shouldDisableDate={disableWeekends}
                    sx={{ marginLeft: '-20px' }}
                    disablePast={true}              // Không cho chọn ngày trc hôm nay
                    disableHighlightToday={true}
                    value={currentDay}
                    onChange={(newValue) => handleSelectDay(newValue)}
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
        </>
    );
}
