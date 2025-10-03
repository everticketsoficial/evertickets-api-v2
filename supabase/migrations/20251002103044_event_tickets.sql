CREATE TYPE event_ticket_status_enum AS ENUM ('available', 'sold_out', 'blocked');

CREATE TABLE event_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  , event_id UUID NOT NULL REFERENCES public.events ON DELETE CASCADE
  , "status" event_ticket_status_enum NOT NULL DEFAULT 'available'
  , "name" TEXT NOT NULL
  , total NUMERIC NOT NULL
  , min NUMERIC NOT NULL
  , max NUMERIC NOT NULL
  , price NUMERIC NOT NULL
  , "start_date" TIMESTAMP WITH TIME ZONE
  , "end_date" TIMESTAMP WITH TIME ZONE
  , after_running_out_id UUID REFERENCES public.event_tickets ON DELETE CASCADE
  , "description" TEXT
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.event_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;

CREATE INDEX IF NOT EXISTS uq_events_event_id ON public.event_tickets (event_id);
