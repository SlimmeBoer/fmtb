export function showFullNameReverse(first, middle, last) {
    if (middle !== '' && middle != null)
    {
        return last +  ', ' + first + ' ' + middle;
    }
    else {
        return last + ', ' + first;
    }
}
