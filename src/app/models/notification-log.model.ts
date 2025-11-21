export interface NotificationLog {
  notificationId: string;
  toEmail: string;
  type: 'registration' | 'ticket' | 'waitlist';
  status: 'sent' | 'failed';
  timestamp: Date;
}