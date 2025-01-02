CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  created_at DATETIME,
  update_at DATETIME
);

CREATE TABLE trash (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  status BOOLEAN,
  reset BOOLEAN,
  created_at DATETIME,
  update_at DATETIME
);

CREATE TABLE organik (
  id VARCHAR(255) PRIMARY KEY,
  trash_id VARCHAR(255),
  distance INT,
  created_at DATETIME,
  update_at DATETIME,
  FOREIGN KEY (trash_id) REFERENCES trash(id)
);

CREATE TABLE an_organik (
  id VARCHAR(255) PRIMARY KEY,
  trash_id VARCHAR(255),
  distance INT,
  created_at DATETIME,
  update_at DATETIME,
  FOREIGN KEY (trash_id) REFERENCES trash(id)
);
