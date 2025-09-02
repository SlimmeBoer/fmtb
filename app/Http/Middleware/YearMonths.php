<?php

namespace App\Http\Middleware;

class YearMonths
{
    public static function showYearMonths(int $number): string
    {
        $years = intdiv($number, 12);
        $months = $number % 12;

        return $years . 'j ' . $months . 'm';
    }

}
