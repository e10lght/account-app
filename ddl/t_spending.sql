-- public.t_spending definition

-- Drop table

-- DROP TABLE public.t_spending;

CREATE TABLE public.t_spending (
	id serial4 NOT NULL,
	spending_title text NULL,
	spending_category_id int4 NULL,
	spending_amount int4 NULL,
	spending_date timestamptz NULL,
	createdat timestamptz NULL DEFAULT clock_timestamp(),
	updateat timestamptz NULL DEFAULT clock_timestamp(),
	user_id int4 NULL
);