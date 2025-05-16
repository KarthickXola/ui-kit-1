import PropTypes from "prop-types";
import React, { useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { MonthGrid } from "./MonthGrid";

export const MonthSelector = ({ date, locale, onChange }) => {
    const [isSelectingMonth, setIsSelectingMonth] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date);

    const handleMonthSelect = (newDate) => {
        onChange(newDate);
        setIsSelectingMonth(false);
    };

    const handleYearChange = (offset) => {
        const newDate = new Date(selectedDate);
        newDate.setFullYear(newDate.getFullYear() + offset);
        setSelectedDate(newDate);
    };

    const handleClear = () => {
        setIsSelectingMonth(false);
    };

    const handleToday = () => {
        onChange(new Date());
        setIsSelectingMonth(false);
    };

    return (
        <span className="DayPicker-Caption">
            <span className="inline-block">
                {isSelectingMonth ? (
                    <span className="absolute top-0 z-10 rounded-lg  border border-gray bg-white p-3 shadow-md">
                        <MonthGrid
                            year={selectedDate.getFullYear()}
                            value={date}
                            locale={locale}
                            handleYearChange={handleYearChange}
                            andleClear={handleClear}
                            handleToday={handleToday}
                            onChange={(date) => handleMonthSelect(date)}
                        />
                    </span>
                ) : (
                    <div
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => setIsSelectingMonth(true)}
                    >
                        <span className="pr-1 text-lg font-bold">
                            {date.toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                        <ChevronDownIcon />
                    </div>
                )}
            </span>
        </span>
    );
};

MonthSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};
