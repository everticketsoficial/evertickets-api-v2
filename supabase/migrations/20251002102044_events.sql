CREATE TYPE event_status_enum AS ENUM ('draft', 'pending', 'published', 'out_of_print', 'finalized', 'cancelled');

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  , producer_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE
  , category_id UUID NOT NULL REFERENCES public.categories ON DELETE CASCADE
  , "status" event_status_enum NOT NULL DEFAULT 'draft'
  , service_fee NUMERIC NOT NULL
  , slug TEXT NOT NULL UNIQUE
  , "name" TEXT NOT NULL
  , photo_url TEXT NOT NULL
  , "description" TEXT NOT NULL
  , "start_date" TIMESTAMP WITH TIME ZONE NOT NULL
  , "end_date" TIMESTAMP WITH TIME ZONE NOT NULL
  , place TEXT
  , "location" TEXT
  , cep TEXT
  , uf TEXT
  , city TEXT
  , neighborhood TEXT
  , street TEXT
  , "number" TEXT
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;

CREATE INDEX IF NOT EXISTS uq_events_producer_id ON public.events (producer_id);
CREATE INDEX IF NOT EXISTS uq_events_category_id_status ON public.events (category_id, "status");
CREATE INDEX IF NOT EXISTS uq_events_slug ON public.events ("slug");
CREATE INDEX IF NOT EXISTS uq_events_uf_city ON public.events ("uf", "city");
