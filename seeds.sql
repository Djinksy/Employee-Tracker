INSERT INTO department (name)
VALUES 
('Engineering'),
('Finance'),
('Sales'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Sales Lead', 100000, 3),
('Salesperson', 80000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 5, null),
('Mike', 'Chan', 6, 1),
('Ashley', 'Rodriguez', 1, null),
('Kevin', 'Tupik', 2, 3),
('Kunal', 'Singh', 3, null),
('Malia', 'Brown', 4, 5),
('Sarah', 'Lourd', 7, null),
('Tom', 'Allen', 8, 7);


