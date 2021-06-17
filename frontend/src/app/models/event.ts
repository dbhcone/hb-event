export interface Event {
  id: string | number;
  title: string;
  date: string;
  time: string;
  speaker: string;
  venue: string;
  image?: string;
  details?: {
    theme: string;
    special_guest: string;
  };
  description: string;
  avatar?: string;
}
