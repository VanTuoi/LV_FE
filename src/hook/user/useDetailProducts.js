import { useState } from "react";

const useDetailProducts = () => {


    const sortListReview = (listData, iSascending, sortField) => {
        const sortedData = listData.slice();

        // Sắp xếp mảng sortedData dựa vào giá trị của trường field trong mỗi object
        sortedData.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return iSascending ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return iSascending ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    }


    return { sortListReview }
}

export default useDetailProducts
