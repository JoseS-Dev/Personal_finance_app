CREATE TABLE register_user(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(120) NOT NULL,
    lastName_user VARCHAR(120) NOT NULL,
    email_user VARCHAR(120) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL,
    account_balance_user DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    meta_user DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
);

CREATE TABLE login_users(
    id_login INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES register_user(id_user)
    
);

CREATE TABLE register_finance(
    id_finance INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    name_finance VARCHAR(120) NOT NULL,
    description_finance VARCHAR(255) NOT NULL,
    date_finance DATE NOT NULL,
    type_finance VARCHAR(100) NOT NULL,
    category_finance VARCHAR(100) NOT NULL,
    amount_finance DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES register_user(id_user)
);