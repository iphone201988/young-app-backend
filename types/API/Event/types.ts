export type CreateEventRequest = {
  title: string;
  topic: string;
  description: string;
  scheduledDate: string;
  type: string;
};

export type GetEventsRequest = {
  page: number;
  limit: number;
};
