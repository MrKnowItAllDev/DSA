'use strict';

function merge(lArray, rArray, array) {
    let n = lArray.length;
    let m = rArray.length;
    let i = 0, k = 0, j = 0;

    while (i < n && j < m) {
        if (lArray[i] < rArray[j]) array[k++] = lArray[i++];
        else array[k++] = rArray[j++];
    }

    for (;i < n; i++) array[k++] = lArray[i];
    for (;j < m; j++) array[k++] = rArray[j];

    return array;
}

function mergeSort(arr) {
    if (arr.length === 1) return arr;
    else {
        let array = [];
        let l = mergeSort(arr.slice(0, arr.length / 2));
        let r = mergeSort(arr.slice(arr.length / 2, arr.length));
        return merge(l, r, array);
    }
}

const array = [4, 7, 2, 5, 0, 1, 9, 3, 12];