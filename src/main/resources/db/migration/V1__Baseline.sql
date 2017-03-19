
CREATE TABLE schema_migrations
(
  version VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations (version);
INSERT INTO schema_migrations(version) VALUES ('1');

CREATE TABLE test_cases
(
  id INTEGER NOT NULL,
  test_group VARCHAR,
  context VARCHAR,
  description VARCHAR,
  execution_result VARCHAR,
  exception TEXT,
  pending_message VARCHAR,
  duration DOUBLE PRECISION,
  backtrace TEXT,
  metadata TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  test_runs_id INTEGER
);

CREATE SEQUENCE test_cases_id_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;
ALTER SEQUENCE test_cases_id_seq OWNED BY test_cases.id;
ALTER TABLE ONLY test_cases ALTER COLUMN id SET DEFAULT nextval('test_cases_id_seq'::regclass);
ALTER TABLE ONLY test_cases ADD CONSTRAINT test_cases_pkey PRIMARY KEY (id);

CREATE TABLE test_runs
(
  id INTEGER NOT NULL,
  duration DOUBLE PRECISION,
  example_count INTEGER,
  failure_count INTEGER,
  pending_count INTEGER,
  build VARCHAR,
  computer_name VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  test_suites_id INTEGER
);

CREATE SEQUENCE test_runs_id_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;
ALTER SEQUENCE test_runs_id_seq OWNED BY test_runs.id;
ALTER TABLE ONLY test_runs ALTER COLUMN id SET DEFAULT nextval('test_runs_id_seq'::regclass);
ALTER TABLE ONLY test_runs ADD CONSTRAINT test_runs_pkey PRIMARY KEY (id);

CREATE TABLE test_suites
(
  id INTEGER  NOT NULL,
  suite VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE SEQUENCE test_suites_id_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;
ALTER SEQUENCE test_suites_id_seq OWNED BY test_suites.id;
ALTER TABLE ONLY test_suites ALTER COLUMN id SET DEFAULT nextval('test_suites_id_seq'::regclass);
ALTER TABLE ONLY test_suites ADD CONSTRAINT test_suites_pkey PRIMARY KEY (id);
