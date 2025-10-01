INSERT INTO storage.buckets (id, "name", "public")
  VALUES ('categories', 'categories', true)
  ON CONFLICT DO NOTHING
;

CREATE POLICY "Allow public access to categories"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'categories')
;

CREATE POLICY "Allow authenticated uploads to categories"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'categories'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;

CREATE POLICY "Allow users to update their own categories"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'categories'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
  WITH CHECK (
    bucket_id = 'categories'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;

CREATE POLICY "Allow users to delete their own categories"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'categories'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;
