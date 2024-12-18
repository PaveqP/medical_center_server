USE `medical_center_db`;

INSERT INTO
    `medical_center_db`.`specialization` (`name`)
VALUES ('Стоматология'),
    ('Кардиология'),
    ('Неврология'),
    ('Психиатрия'),
    ('Травматология'),
    ('Терапия'),
    ('Эндокринология'),
    ('Эллергология - Иммунология'),
    ('Онкология'),
    ('Хирургия'),
    ('Гастроэнтерология'),
    ('Офтальмология'),
    ('Отоларингология'),
    ('Нутрициология');

INSERT INTO
    `post` (`name`)
VALUES ('Главный врач'),
    ('Заместитель главного врача'),
    ('Заведующий'),
    ('Заместитель заведующего'),
    ('Специалист'),
    ('Ординатор'),
    ('Интерн');