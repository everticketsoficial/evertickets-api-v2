INSERT INTO storage.buckets (id, "name", "public")
  VALUES ('events', 'events', true)
  ON CONFLICT DO NOTHING
;

CREATE POLICY "Allow public access to events"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'events')
;

CREATE POLICY "Allow authenticated uploads to events"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'events'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;

CREATE POLICY "Allow users to update their own events"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'events'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
  WITH CHECK (
    bucket_id = 'events'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;

CREATE POLICY "Allow users to delete their own events"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'events'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  )
;
