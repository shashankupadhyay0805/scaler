CREATE DATABASE IF NOT EXISTS cal_clone;
USE cal_clone;

CREATE TABLE IF NOT EXISTS event_types (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  duration INT NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS availability (
  id VARCHAR(36) PRIMARY KEY,
  event_type_id VARCHAR(36),
  day_of_week INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(36) PRIMARY KEY,
  event_type_id VARCHAR(36),
  name VARCHAR(100),
  email VARCHAR(100),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status ENUM('CONFIRMED', 'CANCELLED') DEFAULT 'CONFIRMED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,
  UNIQUE(event_type_id, date, start_time)
);
