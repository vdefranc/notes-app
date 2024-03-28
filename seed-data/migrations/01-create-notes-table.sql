CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID,
    title VARCHAR(50) NOT NULL,
    body VARCHAR(300) NOT NULL,
    created_at TIMESTAMP NOT NULL default now(),
    updated_at TIMESTAMP NOT NULL default now()
);

ALTER TABLE notes
    ADD CONSTRAINT check_min_length CHECK (length(body) >= 20);