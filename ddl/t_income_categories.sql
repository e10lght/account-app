-- public.t_income_categories definition

-- Drop table

-- DROP TABLE public.t_income_categories;

CREATE TABLE public.t_income_categories (
	income_category_name text NULL,
	id int4 NOT NULL DEFAULT nextval('t_income_categories_category_id_seq'::regclass)
);