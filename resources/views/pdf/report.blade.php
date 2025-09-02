@php use App\Http\Middleware\YearMonths; @endphp
<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        @page {
            margin: 0;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
        }



        h1 {
            font-size: 18px;
            margin: 4mm;
        }

        .company-data {
            font-size: 10px;
            margin: 4mm;
            width: 100mm;
        }
        .kpi-data {
            font-size: 10px;
            margin: 4mm;
            width: 100mm;
            text-align: center;
        }
        .management-data {
            font-size: 10px;
            margin: 4mm;
            width: 50mm;
            text-align: center;
        }

        .company-data td{
            border: 0;
        }
        .company-data .boldcell {
            font-weight: bold;
            width: 50mm;
        }
        .company-data .datacell {
            width: 100mm;
        }

        .kpi-data td, .management-data td {
            border: 1px solid #000000;
        }

        .green {
            background-color: #c6e0b4;
            font-weight: bold;
        }
        .lightgreen {
            background-color: #e2efda;
        }
        .disclaimer {
            font-style: italic;
        }
        .top-row, .bottom-row {
            width: 297mm;
            height: 8mm;
            background-color: #30b4e5;
        }

        .header-row {
            width: 297mm;
            height: 58mm;
        }

        .header-row .logo {
            width: 50mm;
            height: 50mm;
            float: left;
            vertical-align: top;
        }

        .header-row .info {
            width: 174mm;
            height: 58mm;
            float: left;
            vertical-align: top;
        }

        .header-row .logo-provincie {
            width: 75mm;
            height: 50mm;
            float: left;
            vertical-align: top;
        }

        .data-row {
            width: 297mm;
            height: 139.5mm;
        }

        .data-row .main-content {
            width: 200mm;
            height: 139.5mm;
            background-color: #ffffff;
            float: left;
            vertical-align: top;
        }

        .data-row .sidebar {
            width: 97mm;
            height: 139.5mm;
            float: left;
            vertical-align: top;
        }

        table {
            width: 100%;
            border: 0;
            border-collapse: collapse;
        }

    </style>
</head>
<body>
<table>
    <tr class="top-row">
        <td colspan="3">&nbsp;</td>
    </tr>
    <tr class="header-row">
        <td class="logo">
            <img style="padding: 4mm;" src="{{ $logos['umbb'] }}" alt="Logo" width="140">
        </td>
        <td class="info">
            <h1>{{$title}}</h1>
           <table class="company-data">
               <tr>
                   <td class="boldcell">Bedrijfsnaam:</td>
                   <td class="datacell">{{$company_data['name']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">KvK-nummer(s):</td>
                   <td class="datacell">{{$company_data['name']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">Straat en huisnummer:</td>
                   <td class="datacell">{{$company_data['address']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">Postcode / woonplaats:</td>
                   <td class="datacell">{{$company_data['postal_code']}} {{$company_data['city']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">Telefoon:</td>
                   <td class="datacell">{{$company_data['phone']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">E-mailadres:</td>
                   <td class="datacell">{{$company_data['email']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">Bankrekeningnummer:</td>
                   <td class="datacell">{{$company_data['bank_account']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">Rekeninghouder:</td>
                   <td class="datacell">{{$company_data['bank_account_name']}}</td>
               </tr>
               <tr>
                   <td class="boldcell">Biologisch bedrijf?:</td>
                   <td class="datacell">{{ isset($company_data['bio']) && $company_data['bio'] == 1 ? 'Ja' : 'Nee' }}</td>
               </tr>
           </table>
        </td>
        <td class="logo-provincie">
            <img style="padding: 4mm;" src="{{ $logos['provincie'] }}" alt="Logo" width="210">
        </td>
    </tr>
</table>
<table>
    <tr class="data-row">
        <td class="main-content">
            <table class="kpi-data">
                <tr class="green">
                    <td style="width: 5mm">&nbsp;</td>
                    <td style="width: 80mm">&nbsp;</td>
                    <td style="width: 15mm">2022</td>
                    <td style="width: 15mm">2023</td>
                    <td style="width: 15mm">2024</td>
                    <td style="width: 15mm">Gem. resultaat</td>
                    <td style="width: 15mm">Gem. resultaat alle deelnemers</td>
                    <td style="width: 15mm">Score bedrijf</td>
                    <td style="width: 15mm">Score alle deelnemers</td>
                </tr>
                <tr>
                    <td>1a</td>
                    <td style="text-align: left">Stikstofbalans bodemoverschot (kg N-totaal per ha)</td>
                    <td>{{$scores['year1']['kpi1a']}}</td>
                    <td>{{$scores['year2']['kpi1a']}}</td>
                    <td>{{$scores['year3']['kpi1a']}}</td>
                    <td>{{$scores['avg']['kpi1a']}}</td>
                    <td rowspan="2" class="lightgreen">{{$scores['avg_tot']['kpi1b']}}</td>
                    <td rowspan="2" >{{$scores['score']['kpi1b']}}</td>
                    <td rowspan="2" class="lightgreen">{{$scores['score_tot']['kpi1b']}}</td>
                </tr>
                <tr>
                    <td>1b</td>
                    <td style="text-align: left">Stikstofbalans bodemoverschot (kg N-totaal per ha) incl. correctie veen</td>
                    <td>{{$scores['year1']['kpi1b']}}</td>
                    <td>{{$scores['year2']['kpi1b']}}</td>
                    <td>{{$scores['year3']['kpi1b']}}</td>
                    <td>{{$scores['avg']['kpi1b']}}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td style="text-align: left">Fosfaatbalansbodemoverschot (kg P2O5 per ha)</td>
                    <td>{{$scores['year1']['kpi2']}}</td>
                    <td>{{$scores['year2']['kpi2']}}</td>
                    <td>{{$scores['year3']['kpi2']}}</td>
                    <td>{{$scores['avg']['kpi2']}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi2']}}</td>
                    <td>{{$scores['score']['kpi2']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi2']}}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td style="text-align: left">Ammoniakuitstoot (in kg NH3/ha)</td>
                    <td>{{$scores['year1']['kpi3']}}</td>
                    <td>{{$scores['year2']['kpi3']}}</td>
                    <td>{{$scores['year3']['kpi3']}}</td>
                    <td>{{$scores['avg']['kpi3']}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi3']}}</td>
                    <td>{{$scores['score']['kpi3']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi3']}}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td style="text-align: left">Weidegang (uur/jaar)</td>
                    <td>{{$scores['year1']['kpi4']}}</td>
                    <td>{{$scores['year2']['kpi4']}}</td>
                    <td>{{$scores['year3']['kpi4']}}</td>
                    <td>{{$scores['avg']['kpi4']}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi4']}}</td>
                    <td>{{$scores['score']['kpi4']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi4']}}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td style="text-align: left">Tankmelkureum (mg/100g)</td>
                    <td>{{$scores['year1']['kpi5']}}</td>
                    <td>{{$scores['year2']['kpi5']}}</td>
                    <td>{{$scores['year3']['kpi5']}}</td>
                    <td>{{$scores['avg']['kpi5']}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi5']}}</td>
                    <td>{{$scores['score']['kpi5']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi5']}}</td>
                </tr>
                <tr>
                    <td>6a</td>
                    <td style="text-align: left">Broeikasgasemissie (in CO2eq. per ha)</td>
                    <td>{{$scores['year1']['kpi6a']}}</td>
                    <td>{{$scores['year2']['kpi6a']}}</td>
                    <td>{{$scores['year3']['kpi6a']}}</td>
                    <td>{{$scores['avg']['kpi6a']}}</td>
                    <td rowspan="4" class="lightgreen">{{$scores['avg_tot']['kpi6b']}}</td>
                    <td rowspan="4" >{{$scores['score']['kpi6b']}}</td>
                    <td rowspan="4" class="lightgreen">{{$scores['score_tot']['kpi6b']}}</td>
                </tr>
                <tr>
                    <td>6b</td>
                    <td style="text-align: left">Broeikasgasemissie (in CO2eq. per ha)  incl. correctie veen</td>
                    <td>{{$scores['year1']['kpi6b']}}</td>
                    <td>{{$scores['year2']['kpi6b']}}</td>
                    <td>{{$scores['year3']['kpi6b']}}</td>
                    <td>{{$scores['avg']['kpi6b']}}</td>
                </tr>
                <tr>
                    <td>6c</td>
                    <td style="text-align: left">Broeikasgasemissie (in CO2eq. per kg fcpm)</td>
                    <td>{{$scores['year1']['kpi6c']}}</td>
                    <td>{{$scores['year2']['kpi6c']}}</td>
                    <td>{{$scores['year3']['kpi6c']}}</td>
                    <td>{{$scores['avg']['kpi6c']}}</td>
                </tr>
                <tr>
                    <td>6d</td>
                    <td style="text-align: left">Broeikasgasemissie (in CO2eq. per kg fcpm) incl. correctie veen</td>
                    <td>{{$scores['year1']['kpi6d']}}</td>
                    <td>{{$scores['year2']['kpi6d']}}</td>
                    <td>{{$scores['year3']['kpi6d']}}</td>
                    <td>{{$scores['avg']['kpi6d']}}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td style="text-align: left">Eiwit van eigen land</td>
                    <td>{{$scores['year1']['kpi7']}}</td>
                    <td>{{$scores['year2']['kpi7']}}</td>
                    <td>{{$scores['year3']['kpi7']}}</td>
                    <td>{{$scores['avg']['kpi7']}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi7']}}</td>
                    <td>{{$scores['score']['kpi7']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi7']}}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td style="text-align: left">Gewasbeschermingsmiddelen (chemische middelen)</td>
                    <td colspan="4">{{$scores['avg']['kpi8']}}</td>
                    <td class="lightgreen">-</td>
                    <td>{{$scores['score']['kpi8']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi8']}}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td style="text-align: left">Blijvend grasland</td>
                    <td>{{ is_numeric($scores['year1']['kpi9'] ?? null) ? $scores['year1']['kpi9'] . '%' : $scores['year1']['kpi9'] }}</td>
                    <td>{{ is_numeric($scores['year2']['kpi9'] ?? null) ? $scores['year2']['kpi9'] . '%' : $scores['year2']['kpi9'] }}</td>
                    <td>{{ is_numeric($scores['year3']['kpi9'] ?? null) ? $scores['year3']['kpi9'] . '%' : $scores['year3']['kpi9'] }}</td>
                    <td>{{$scores['avg']['kpi9'].'%'}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi9'].'%'}}</td>
                    <td>{{$scores['score']['kpi9']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi9']}}</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td style="text-align: left">Extensief kruidenrijk grasland</td>
                    <td colspan="4">{{number_format($scores['avg']['kpi10']* 100,1) .'%'}}</td>
                    <td class="lightgreen">{{number_format($scores['avg_tot']['kpi10']* 100,1) .'%'}}</td>
                    <td>{{$scores['score']['kpi10']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi10']}}</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td style="text-align: left">Natuur en Landschap</td>
                    <td colspan="4">{{number_format($scores['avg']['kpi11']* 100,1) .'%'}}</td>
                    <td class="lightgreen">{{number_format($scores['avg_tot']['kpi11']* 100,1) .'%'}}</td>
                    <td>{{$scores['score']['kpi11']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi11']}}</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td style="text-align: left">Groenblauwe dooradering</td>
                    <td colspan="4">{{number_format($scores['avg']['kpi12']* 100,1) .'%'}}</td>
                    <td class="lightgreen">{{number_format($scores['avg_tot']['kpi12']* 100,1) .'%'}}</td>
                    <td>{{$scores['score']['kpi12']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi12']}}</td>
                </tr>
                <tr>
                    <td>13a</td>
                    <td style="text-align: left">Energiebalans (opgewekt/verbruikt)*</td>
                    <td>
                        {{ is_numeric($scores['year1']['kpi13a'] ?? null)
                            ? number_format($scores['year1']['kpi13a'] * 100, 1) . '%'
                            : '–' }}
                    </td>
                    <td>
                        {{ is_numeric($scores['year2']['kpi13a'] ?? null)
                            ? number_format($scores['year2']['kpi13a'] * 100, 1) . '%'
                            : '–' }}
                    </td>
                    <td>
                        {{ is_numeric($scores['year3']['kpi13a'] ?? null)
                            ? number_format($scores['year3']['kpi13a'] * 100, 1) . '%'
                            : '–' }}
                    </td>
                    <td>
                        {{ is_numeric($scores['avg']['kpi13a'] ?? null)
                            ? number_format($scores['avg']['kpi13a'] * 100, 1) . '%'
                            : '–' }}
                    </td>
                    <td class="lightgreen">{{number_format($scores['avg_tot']['kpi13a']* 100,1).'%'}}</td>
                    <td>{{$scores['score']['kpi13a']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi13a']}}</td>
                </tr>
                <tr>
                    <td>13b</td>
                    <td style="text-align: left">Energieverbruik (KWH per koe per jaar)*</td>
                    <td>{{$scores['year1']['kpi13b']}}</td>
                    <td>{{$scores['year2']['kpi13b']}}</td>
                    <td>{{$scores['year3']['kpi13b']}}</td>
                    <td>{{$scores['avg']['kpi13b']}}</td>
                    <td class="lightgreen">{{$scores['avg_tot']['kpi13b']}}</td>
                    <td>{{$scores['score']['kpi13b']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi13b']}}</td>
                </tr>
                <tr>
                    <td>14</td>
                    <td style="text-align: left">Levensduur (maanden)</td>
                    <td>{{YearMonths::showYearMonths($scores['year1']['kpi14'])}}</td>
                    <td>{{YearMonths::showYearMonths($scores['year2']['kpi14'])}}</td>
                    <td>{{YearMonths::showYearMonths($scores['year3']['kpi14'])}}</td>
                    <td>{{YearMonths::showYearMonths($scores['avg']['kpi14'])}}</td>
                    <td class="lightgreen">{{YearMonths::showYearMonths($scores['avg_tot']['kpi14'])}}</td>
                    <td>{{$scores['score']['kpi14']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi14']}}</td>
                </tr>
                <tr>
                    <td>15</td>
                    <td style="text-align: left"> Sociaal-maatschappelijke activiteiten</td>
                    <td colspan="4">{{$scores['avg']['kpi15']}}</td>
                    <td class="lightgreen">-</td>
                    <td>{{$scores['score']['kpi15']}}</td>
                    <td class="lightgreen">{{$scores['score_tot']['kpi15']}}</td>
                </tr>
                <tr>
                    <td colspan="7" style="border: 0; text-align: right">Totaal:</td>
                    <td>{{$scores['total']['score']}}</td>
                    <td class="lightgreen">{{$scores['total_tot']['score']}}</td>
                </tr>
                <tr>
                    <td colspan="7" style="border: 0; text-align: right">In euro's:</td>
                    <td style="border: 1px solid #000;">{{$scores['total']['money']}}</td>
                    <td style="border: 1px solid #000;" class="lightgreen">{{$scores['total_tot']['money']}}</td>
                </tr>
                <tr>
                    <td style="border: 0;">&nbsp;</td>
                    <td colspan="5" style="border: 0; text-align: left" class="disclaimer">Uitdraai op basis van de gegevens aangeleverd door u als melkveehouder, de Utrechtse agrarische collectieven en de gegevens uit de KringloopWijzer, op {{$date}}
                    </td>
                    <td colspan="3" style="border: 0;">&nbsp;</td>
                </tr>
            </table>
        </td>
        <td class="sidebar">
            <table class="management-data">
                <tr class="green">
                    <td style="width: 40mm">Management-variabele:</td>
                    <td style="width: 25mm">Waarde</td>
                </tr>
                <tr>
                    <td style="text-align: left">Hectares totaal:</td>
                    <td>{{number_format($company_properties['opp_totaal'],1)}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Hectares totaal (subsidiabel):</td>
                    <td>{{number_format($company_properties['opp_totaal_subsidiabel'],1)}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Melkkoeien:</td>
                    <td>{{$company_properties['melkkoeien']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Meetmelk per koe:</td>
                    <td>{{$company_properties['meetmelk_per_koe']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Meetmelk per hectare :</td>
                    <td>{{number_format($company_properties['meetmelk_per_ha'],1)}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Jongvee per 10 mk :</td>
                    <td>{{$company_properties['jongvee_per_10mk']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">GVE bezetting per hectare:</td>
                    <td>{{number_format($company_properties['gve_per_ha'],1)}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Kg N kunstmest per hectare:</td>
                    <td>{{$company_properties['kunstmest_per_ha']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Opbrengst grasland per hectare:</td>
                    <td>{{$company_properties['opbrengst_grasland_per_ha']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Re/KVEM:</td>
                    <td>{{$company_properties['re_kvem']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Kg krachtvoer per 100 kg melk :</td>
                    <td>{{$company_properties['krachtvoer_per_100kg_melk']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Veebenutting N :</td>
                    <td>{{$company_properties['veebenutting_n']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Bodembenutting N:</td>
                    <td>{{$company_properties['bodembenutting_n']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Bedrijfsbenutting:</td>
                    <td>{{$company_properties['bedrijfsbenutting_n']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">CO2-vastlegging bodem (gram per kg. meetmelk):</td>
                    <td>{{$company_properties['g_co2_per_kg_meetmelk']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">CO2-vastlegging bodem (kg. per hectare):</td>
                    <td>{{$company_properties['kg_co2_per_ha']}}</td>
                </tr>
                <tr>
                    <td style="text-align: left">Grondsoort:</td>
                    <td>{{$company_properties['grondsoort']}}</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr class="bottom-row">
        <td colspan="2">&nbsp;</td>
    </tr>
</table>

</body>
</html>
