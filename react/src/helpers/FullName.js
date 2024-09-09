export function showFullName(first, middle, last) {
    if (middle !== '' && middle != null)
    {
        return first + ' ' + middle + ' ' + last;
    }
    else {
        return first + ' ' + last;
    }
}
