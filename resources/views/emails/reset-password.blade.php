<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Wachtwoord resetten</title>
</head>
<body style="background-color: #f4f4f4; padding: 30px; font-family: Arial, sans-serif;">
<div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">

    <img src="{{ asset('images/logo.png') }}" alt="Provincie Fryslan logo" style="max-width: 300px; max-height: 300px; margin-bottom: 20px;">

    <h2 style="color: #333;">Wachtwoord resetten</h2>

    <p style="color: #555;">
        Je hebt aangegeven dat je je wachtwoord wilt resetten. Dit kan zijn omdat je je wachtwoord bent vergeten, of dat je voor de eerste keer inlogt in de webapplicatie.
        Klik op de onderstaande knop of link om je wachtwoord te resetten.
    </p>

    <p style="margin: 30px 0;">
        <a href="{{ $url }}" style="padding: 12px 24px; background: #0b5ed7; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset je wachtwoord
        </a>
    </p>

    <p style="color: #555;">
        Als bovenstaande knop niet werkt, klik dan op deze link of kopieer deze in je browser:
    </p>

    <p style="word-break: break-all;">
        <a href="{{ $url }}" style="color: #0b5ed7;">{{ $url }}</a>
    </p>
</div>
</body>
</html>
