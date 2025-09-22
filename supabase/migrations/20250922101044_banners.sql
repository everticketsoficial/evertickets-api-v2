CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  , "name" TEXT NOT NULL
  , photo_url TEXT NOT NULL
  , link TEXT NOT NULL
  , "order" INTEGER NOT NULL
  , active BOOLEAN NOT NULL DEFAULT true
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.banners
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;
