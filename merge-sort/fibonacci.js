function fibIterative(n) {
    let arr = [0, 1];
    for (let i = 0; i < n - 2; i++) {
        arr.push(arr[i] + arr[i + 1]);
    }
    return arr;
}

function fibRecursive(n) {
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    else {
        let arr = fibRecursive(n - 1);
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
        return arr;
    }
}