import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { Paper } from '@mui/material';
import frLocale from "date-fns/locale/fr";

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay, isEvent }) => ({
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
}));

export default function CustomDay(props) {
    const [value, setValue] = React.useState(new Date());

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
            return <PickersDay {...pickersDayProps} />;
        }

        // const start2 = startOfWeek(value);
        // const end2 = endOfWeek(value);
        const start = value;
        const end = value;

        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };

    const handleClick = (newValue) => {
        props.callBack(newValue);
        setValue(newValue);
    }

    return (
        <Paper elevation={3} style={{ width: "320px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="Week picker"
                    value={value}
                    onChange={(newValue) => {
                        handleClick(newValue);
                    }}
                    renderDay={renderWeekPickerDay}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd-MMMM-yyyyy"
                />
            </LocalizationProvider>
        </Paper>
    );
}