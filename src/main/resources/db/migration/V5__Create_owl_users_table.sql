CREATE TABLE owl_users
(
  id INTEGER NOT NULL,
  owl_username VARCHAR(100) NOT NULL,
  owl_password VARCHAR NOT NULL
);

CREATE SEQUENCE owl_users_id_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;
ALTER SEQUENCE owl_users_id_seq OWNED BY owl_users.id;
ALTER TABLE ONLY owl_users ALTER COLUMN id SET DEFAULT nextval('owl_users_id_seq'::regclass);
ALTER TABLE ONLY owl_users ADD CONSTRAINT owl_users_pkey PRIMARY KEY (id);

INSERT INTO owl_users(owl_username, owl_password) VALUES("owluser", "$2a$10$N1/gGMLWCUla5GZ2mMPYIOG8R/ipvdGVVD9Wp7VdFnuX2NdfDKmbK");