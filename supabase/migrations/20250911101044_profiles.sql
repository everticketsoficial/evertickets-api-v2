CREATE TYPE profile_type_enum AS ENUM ('physical', 'business');
CREATE TYPE profile_level_enum AS ENUM ('customer', 'staff', 'producer', 'admin');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE
  , profile_type profile_type_enum NOT NULL DEFAULT 'physical'
  , profile_level profile_level_enum NOT NULL DEFAULT 'customer'
  , display_name TEXT NOT NULL
  , avatar_url TEXT
  , phone TEXT
  , cpf TEXT
  , cnpj TEXT
  , blocked BOOLEAN DEFAULT FALSE
  , created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  , updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at()
;
