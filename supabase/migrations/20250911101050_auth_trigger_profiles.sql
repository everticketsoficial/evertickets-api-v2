create function public.handle_new_user()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY definer
  SET search_path = public
  AS $$
    BEGIN
      INSERT INTO public.profiles (
        id
        , profile_type
        , profile_level
        , display_name
        , avatar_url
        , phone
        , cpf
        , cnpj
      )
      VALUES (
        new.id
        , COALESCE(NEW.raw_user_meta_data->>'profile_type', 'physical')::profile_type_enum
        , COALESCE(NEW.raw_user_meta_data->>'profile_level', 'physical')::profile_level_enum
        , new.raw_user_meta_data->>'display_name'
        , new.raw_user_meta_data->>'avatar_url'
        , new.raw_user_meta_data->>'phone'
        , CASE
          WHEN COALESCE(NEW.raw_user_meta_data->>'profile_type', 'physical') = 'physical'
          THEN NEW.raw_user_meta_data->>'cpf'
          ELSE NULL
        END
        , CASE
          WHEN COALESCE(NEW.raw_user_meta_data->>'profile_type', 'physical') = 'business'
          THEN NEW.raw_user_meta_data->>'cnpj'
          ELSE NULL
        END
      );
      RETURN new;
    END;
  $$
;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user()
;
