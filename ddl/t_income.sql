-- public.t_income definition

-- Drop table

-- DROP TABLE public.t_income;

CREATE TABLE public.t_income (
	id serial4 NOT NULL,
	income_title text NULL,
	income_category_id int4 NULL,
	income_amount int4 NULL,
	income_recieved_date timestamptz NULL,
	createdat timestamptz NULL DEFAULT clock_timestamp(),
	updateat timestamptz NULL DEFAULT clock_timestamp(),
	user_id int4 NULL
);