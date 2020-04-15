USE employee_tracker_db;

INSERT INTO role (title, salary, department_id)
VALUES("Junior Dev", 10, 1),
("Senior Dev", 20, 1),
("HR Manager", 17, 2),
("HR Rep", 15, 2),
("Legal Inter", 8, 3),
("Lawyer", 23, 3);

INSERT INTO departments (name)
VALUES("Web Development"),
("Human Resources"),
("Legal");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jane", "Doe", 2),
("John", "Doe", 1, 2),
("Dane", "Joe", 3),
("Dohn", "Joe", 4, 3),
("Jake", "Bake", 6),
("Don", "Doe", 5, 6);