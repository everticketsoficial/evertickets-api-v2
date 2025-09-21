CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  , "name" TEXT NOT NULL
  , "description" TEXT
  , "order" INTEGER NOT NULL
  , photo_url TEXT NOT NULL
  , active BOOLEAN NOT NULL DEFAULT false
  , highlighted BOOLEAN NOT NULL DEFAULT false
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;
