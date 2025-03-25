<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { border: 1px solid black; padding: 8px; text-align: left; }
        .signature { margin-top: 40px; text-align: right; }
    </style>
</head>
<body>

<div class="header">
    <img src="{{ $logo }}" alt="Logo" width="150">
    <h2>{{ $title }}</h2>
    <p>Date: {{ $date }}</p>
</div>

<h3>Table Data</h3>
<table class="table">
    <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($tableData as $row)
        <tr>
            <td>{{ $row['name'] }}</td>
            <td>{{ $row['email'] }}</td>
            <td>{{ $row['status'] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>

<div class="signature">
    <p>Authorized Signature:</p>
    <img src="{{ $signature }}" alt="Signature" width="150">
</div>

</body>
</html>
