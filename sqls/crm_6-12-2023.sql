/*8 Tables*/

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS user_t;
DROP TABLE IF EXISTS candidate_t;
DROP TABLE IF EXISTS currency_t;
DROP TABLE IF EXISTS address_t;
DROP TABLE IF EXISTS phone_number_t;
DROP TABLE IF EXISTS education_t;
DROP TABLE IF EXISTS skill_t;
DROP TABLE IF EXISTS experience_t;
SET FOREIGN_KEY_CHECKS = 1;



CREATE TABLE user_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);



CREATE TABLE currency_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    code VARCHAR(3)
);

CREATE TABLE address_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    country VARCHAR(100),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE candidate_t (
    id VARCHAR(36)  PRIMARY KEY NOT NULL,
    owner_id VARCHAR(36) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    age INT,
    department VARCHAR(100),
    min_salary_expectation DECIMAL(10, 2),
    max_salary_expectation DECIMAL(10, 2),
    currency_id VARCHAR(36) NOT NULL,
    address_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user_t(id),
    FOREIGN KEY (currency_id) REFERENCES currency_t(id),
    FOREIGN KEY (address_id) REFERENCES address_t(id)
);

CREATE TABLE phone_number_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    candidate_id VARCHAR(36) NOT NULL,
    type VARCHAR(50),
    number VARCHAR(20),
    FOREIGN KEY (candidate_id) REFERENCES candidate_t(id)
);

CREATE TABLE education_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    candidate_id VARCHAR(36),
    school VARCHAR(255),
    degree VARCHAR(100),
    major VARCHAR(100),
    FOREIGN KEY (candidate_id) REFERENCES candidate_t(id)
);

CREATE TABLE skill_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    candidate_id VARCHAR(36) NOT NULL,
    skill VARCHAR(100),
    level INT,
    FOREIGN KEY (candidate_id) REFERENCES candidate_t(id)
);

CREATE TABLE experience_t (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    candidate_id VARCHAR(36) NOT NULL,
    company VARCHAR(255),
    title VARCHAR(100),
    years INT,
    FOREIGN KEY (candidate_id) REFERENCES candidate_t(id)
);


