-- Add rollback SQL statements.
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

