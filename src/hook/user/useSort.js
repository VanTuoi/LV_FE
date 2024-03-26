import { useState } from "react";
import dayjs from 'dayjs';

const useSort = () => {

    const sortReviews = (reviews, isAscending, sortField) => {
        const sortedData = reviews.slice();

        sortedData.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return isAscending ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return isAscending ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    }

    const sortFavouriteStores = (favouriteStores, typeSort) => {
        if (!favouriteStores || favouriteStores.length === 0) {
            return favouriteStores;
        }
        if (typeSort === 'A-Z') {
            return favouriteStores.sort((a, b) => a.CS_Name.localeCompare(b.CS_Name));
        } else if (typeSort === 'Z-A') {
            return favouriteStores.sort((a, b) => b.CS_Name.localeCompare(a.CS_Name));
        } else {
            return favouriteStores;
        }
    }

    const sortTickets = (tickets, typeSort) => {
        if (!tickets || tickets.length === 0) {
            return tickets;
        }

        if (typeSort === 'A-Z') {
            return tickets.sort((a, b) => a.CS_Name.localeCompare(b.CS_Name));
        } else if (typeSort === 'Z-A') {
            return tickets.sort((a, b) => b.CS_Name.localeCompare(a.CS_Name));
        } else if (typeSort === 'Newest') {
            return tickets.sort((a, b) => dayjs(a.RT_DateTimeArrival).isBefore(b.RT_DateTimeArrival) ? 1 : -1);
        } else if (typeSort === 'Oldest') {
            return tickets.sort((a, b) => dayjs(b.RT_DateTimeArrival).isBefore(a.RT_DateTimeArrival) ? 1 : -1);
        } else {
            return tickets;
        }
    }

    return { sortReviews, sortFavouriteStores, sortTickets, }
}

export default useSort
