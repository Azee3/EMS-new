export interface Event {
  eventId: string;
  organizerId: string;
  title: string;
  description: string;
  posterURL?: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  seatingLayoutId: string;
  createdAt: Date;
  updatedAt: Date;
}