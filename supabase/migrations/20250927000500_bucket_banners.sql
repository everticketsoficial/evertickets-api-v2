INSERT INTO storage.buckets (id, "name", "public")
  VALUES ('banners', 'banners', true)
  ON CONFLICT DO NOTHING
;

CREATE POLICY "Allow public access to banners"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'banners')
;

CREATE POLICY "Allow authenticated uploads to banners"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'banners'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;

CREATE POLICY "Allow users to update their own banners"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'banners'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
  WITH CHECK (
    bucket_id = 'banners'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;

CREATE POLICY "Allow users to delete their own banners"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'banners'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;
