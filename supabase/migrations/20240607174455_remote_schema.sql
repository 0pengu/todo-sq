alter table "public"."todos" drop column "dueDate";

alter table "public"."todos" add column "due_date" timestamp with time zone not null;

alter table "public"."todos" add column "is_deleted" boolean default false;


