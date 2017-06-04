CREATE TABLE users
(
  id        serial primary key,
  gid       varchar(255),
  email     varchar(255),
  token     varchar(255),
  name      varchar(255)
);

-- CREATE TABLE google_accounts
-- (
--   id        serial primary key,
--   email     varchar(255),
--   token     varchar(255),
--   name      varchar(255),
--   user_id   int references users(id)
-- );

CREATE TABLE topics
(
  id        serial primary key,
  title        varchar(255),
  description  text,
  author_id   int references users(id)
);

CREATE TABLE comments
(
  id        serial primary key,
  description  text,
  author_id   int references users(id)
);
