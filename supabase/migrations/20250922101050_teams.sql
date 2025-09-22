CREATE TYPE team_status_enum AS ENUM ('pending', 'accepted', 'rejected');

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  , producer_id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE
  , staff_id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE
  , "status" team_status_enum NOT NULL DEFAULT 'pending'
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , CONSTRAINT uq_teams_producer_id_staff_id UNIQUE (producer_id, staff_id)
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;

CREATE INDEX IF NOT EXISTS uq_teams_producer_id ON public.teams (producer_id);
CREATE INDEX IF NOT EXISTS uq_teams_producer_id_status ON public.teams (producer_id, "status");
CREATE INDEX IF NOT EXISTS uq_teams_staff_id ON public.teams (staff_id);
CREATE INDEX IF NOT EXISTS uq_teams_staff_id_status ON public.teams (staff_id, "status");

-- TODO: producer_id e staff_id não podem ser iguais
