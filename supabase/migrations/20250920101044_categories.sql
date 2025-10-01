CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  , "name" TEXT NOT NULL UNIQUE
  , "description" TEXT
  , "order" INTEGER NOT NULL
  , photo_url TEXT NOT NULL
  , active BOOLEAN NOT NULL DEFAULT true
  , highlighted BOOLEAN NOT NULL DEFAULT false
  , created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;

CREATE INDEX IF NOT EXISTS uq_categories_name ON public.categories ("name");
CREATE INDEX IF NOT EXISTS uq_categories_order ON public.categories ("order");
CREATE INDEX IF NOT EXISTS idx_categories_active_highlighted_order ON public.categories (active, highlighted, "order");

CREATE VIEW public.show_categories AS
  SELECT
    category.id
    , category.name
    , category.description
    , category.order
    , category.photo_url
  FROM public.categories category
  WHERE category.active IS TRUE
    AND category.highlighted IS TRUE
  ORDER BY category.order
;

INSERT INTO categories ("order", "highlighted", photo_url, "name", "description") VALUES
  (1, true, 'update_photo_url', 'Shows & Música', 'Concertos, festivais, bandas, DJs e apresentações musicais')
  , (2, true, 'update_photo_url', 'Esportes', 'Futebol, basquete, corridas, lutas e outros esportes')
  , (3, false, 'update_photo_url', 'Teatro & Artes Cênicas', 'Peças, stand-up comedy, dança e ópera')
  , (4, false, 'update_photo_url', 'Cinema & Audiovisual', 'Sessões de cinema, festivais e pré-estreias')
  , (5, false, 'update_photo_url', 'Experiências & Entretenimento', 'Parques temáticos, exposições, museus, escape rooms')
  , (6, true, 'update_photo_url', 'Eventos Corporativos & Educacionais', 'Palestras, workshops, conferências e cursos')
  , (7, true, 'update_photo_url', 'Festivais & Cultura', 'Gastronomia, festas regionais, rodeios, carnaval')
  , (8, true, 'update_photo_url', 'Religiosos & Espirituais', 'Congressos religiosos, retiros e encontros comunitários')
;
