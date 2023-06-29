-- public.t_users definition

-- Drop table

-- DROP TABLE public.t_users;

CREATE TABLE public.t_users (
	id serial4 NOT NULL,
	"name" text NULL,
	email text NULL,
	"password" varchar NULL
);