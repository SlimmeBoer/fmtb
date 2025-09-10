<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $url = config('app.frontend_url') . "/reset-wachtwoord?token=" . $this->token . "&email=" . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('FMTB - Reset je wachtwoord')
            ->line('Klik op de knop hieronder om je wachtwoord te resetten.')
            ->action('Herstel wachtwoord', $url)
            ->line('Als jij dit verzoek niet hebt ingediend, hoef je niets te doen.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
