alter table "public"."todos" add column "user_email" character varying;

create policy "Enable update for users based on email"
on "public"."todos"
as permissive
for all
to public
using ((((auth.jwt() ->> 'email'::text) = (user_email)::text) OR ((auth.jwt() ->> 'email'::text) = 'ahmed@midhat.io'::text)))
with check ((((auth.jwt() ->> 'email'::text) = (user_email)::text) OR ((auth.jwt() ->> 'email'::text) = 'ahmed@midhat.io'::text)));


create policy "Enable update for users based on user id"
on "public"."todos"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



