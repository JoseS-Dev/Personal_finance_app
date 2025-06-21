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