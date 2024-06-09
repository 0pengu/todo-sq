alter table "public"."todos" add column "user_id" uuid default auth.uid();

alter table "public"."todos" enable row level security;

alter table "public"."todos" add constraint "todos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."todos" validate constraint "todos_user_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."todos"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."todos"
as permissive
for select
to public
using (true);



