CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS TRIGGER
  SECURITY DEFINER
  LANGUAGE plpgsql
  SET search_path = public
  AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
  $$
;
