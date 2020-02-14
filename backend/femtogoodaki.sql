--
-- File generated with SQLiteStudio v3.2.1 on ?. ?.?. 14 19:49:04 2020
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Course
CREATE TABLE Course (
    CourseId        INTEGER       PRIMARY KEY
                                  UNIQUE
                                  NOT NULL,
    Name            VARCHAR (63),
    Description     VARCHAR (255),
    Syllabus        VARCHAR (511),
    CourseManagerId INTEGER       REFERENCES User (UserId) 
                                  NOT NULL,
    EnrollPrice     INTEGER,
    IsActive        BOOLEAN,
    CreatedDate     DATETIME,
    UpdatedDate     DATETIME
);

INSERT INTO Course (
                       CourseId,
                       Name,
                       Description,
                       Syllabus,
                       CourseManagerId,
                       EnrollPrice,
                       IsActive,
                       CreatedDate,
                       UpdatedDate
                   )
                   VALUES (
                       1300001,
                       'Food course',
                       'train about cooking',
                       'Please visit Cucas',
                       100001,
                       1000,
                       1,
                       '2010-05-14 13:45:54',
                       '2019-07-06 12:34:44'
                   );

INSERT INTO Course (
                       CourseId,
                       Name,
                       Description,
                       Syllabus,
                       CourseManagerId,
                       EnrollPrice,
                       IsActive,
                       CreatedDate,
                       UpdatedDate
                   )
                   VALUES (
                       1300002,
                       'Horoscope',
                       '[closed]',
                       '-',
                       100002,
                       1000,
                       0,
                       '2019-04-06 10:35:33',
                       '2020-01-01 11:11:11'
                   );

INSERT INTO Course (
                       CourseId,
                       Name,
                       Description,
                       Syllabus,
                       CourseManagerId,
                       EnrollPrice,
                       IsActive,
                       CreatedDate,
                       UpdatedDate
                   )
                   VALUES (
                       1300003,
                       'english',
                       'by Nicola',
                       'lecture and lab',
                       100002,
                       1000,
                       1,
                       '2020-02-09 10:02:17',
                       '2020-02-09 10:02:17'
                   );

INSERT INTO Course (
                       CourseId,
                       Name,
                       Description,
                       Syllabus,
                       CourseManagerId,
                       EnrollPrice,
                       IsActive,
                       CreatedDate,
                       UpdatedDate
                   )
                   VALUES (
                       1300004,
                       'math',
                       'math 101-103',
                       '2 year course',
                       100001,
                       1000,
                       1,
                       '2020-02-17 07:37:00',
                       '2020-02-17 07:37:00'
                   );


-- Table: CourseSubjects
CREATE TABLE CourseSubjects (
    CourseSubjectId INTEGER PRIMARY KEY
                            UNIQUE
                            NOT NULL,
    CourseId        INTEGER REFERENCES Course (CourseId) 
                            NOT NULL,
    SubjectId       INTEGER REFERENCES Subject (SubjectId) 
                            NOT NULL,
    Sequence        INTEGER
);

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200001,
                               1300001,
                               100001,
                               2
                           );

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200002,
                               1300001,
                               100003,
                               1
                           );

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200003,
                               1300002,
                               100002,
                               1
                           );

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200004,
                               1300003,
                               100004,
                               1
                           );

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200005,
                               1300003,
                               100007,
                               2
                           );

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200006,
                               1300004,
                               100005,
                               1
                           );

INSERT INTO CourseSubjects (
                               CourseSubjectId,
                               CourseId,
                               SubjectId,
                               Sequence
                           )
                           VALUES (
                               1200007,
                               1300004,
                               100006,
                               2
                           );


-- Table: Enrollment
CREATE TABLE Enrollment (
    EnrollmentId  INTEGER PRIMARY KEY
                          UNIQUE
                          NOT NULL,
    StudentId     INTEGER REFERENCES User (UserId) 
                          NOT NULL,
    CourseId      INTEGER REFERENCES Course (CourseId) 
                          NOT NULL,
    Price         INTEGER,
    PretestScore  FLOAT,
    PosttestScore FLOAT,
    IsComplete    BOOLEAN
);

INSERT INTO Enrollment (
                           EnrollmentId,
                           StudentId,
                           CourseId,
                           Price,
                           PretestScore,
                           PosttestScore,
                           IsComplete
                       )
                       VALUES (
                           10001,
                           100001,
                           1300002,
                           1000,
                           10.0,
                           10.0,
                           1
                       );

INSERT INTO Enrollment (
                           EnrollmentId,
                           StudentId,
                           CourseId,
                           Price,
                           PretestScore,
                           PosttestScore,
                           IsComplete
                       )
                       VALUES (
                           10002,
                           100002,
                           1300001,
                           1000,
                           6.0,
-                          1.0,
                           0
                       );

INSERT INTO Enrollment (
                           EnrollmentId,
                           StudentId,
                           CourseId,
                           Price,
                           PretestScore,
                           PosttestScore,
                           IsComplete
                       )
                       VALUES (
                           10003,
                           100003,
                           1300003,
                           1000,
                           5.0,
                           7.0,
                           1
                       );

INSERT INTO Enrollment (
                           EnrollmentId,
                           StudentId,
                           CourseId,
                           Price,
                           PretestScore,
                           PosttestScore,
                           IsComplete
                       )
                       VALUES (
                           10004,
                           100004,
                           1300003,
                           1000,
                           4.0,
-                          1.0,
                           0
                       );

INSERT INTO Enrollment (
                           EnrollmentId,
                           StudentId,
                           CourseId,
                           Price,
                           PretestScore,
                           PosttestScore,
                           IsComplete
                       )
                       VALUES (
                           10005,
                           100005,
                           1300001,
                           1000,
                           8.0,
-                          1.0,
                           0
                       );

INSERT INTO Enrollment (
                           EnrollmentId,
                           StudentId,
                           CourseId,
                           Price,
                           PretestScore,
                           PosttestScore,
                           IsComplete
                       )
                       VALUES (
                           10006,
                           100005,
                           1300003,
                           1000,
                           9.0,
-                          1.0,
                           0
                       );


-- Table: Knowledge
CREATE TABLE Knowledge (
    KnowledgeId   INTEGER       PRIMARY KEY AUTOINCREMENT
                                UNIQUE
                                NOT NULL,
    Version       INTEGER,
    Name          VARCHAR (63),
    Content       VARCHAR (255),
    AuthorId      INTEGER       REFERENCES User (UserId) 
                                NOT NULL,
    Price         INTEGER,
    PageCount     INTEGER,
    KnowledgeType INTEGER       REFERENCES KnowledgeType (KnowledgeType),
    IsActive      BOOLEAN,
    CreatedDate   DATETIME,
    UpdatedDate   DATETIME
);

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100001,
                          1,
                          'Prepare a chicken',
                          '1. Kill chicken 2. Rinse chicken 3. Chop chicken 4. Keep in fridge',
                          100004,
                          1,
                          25,
                          1,
                          1,
                          '2008-02-07 12:14:59',
                          '2008-02-07 12:14:59'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100002,
                          2,
                          'Ginger Chicken',
                          'https://www.youtube.com/watch?v=nvFmNsW3nq8',
                          100004,
                          2,
                          36,
                          2,
                          1,
                          '2008-02-07 12:14:59',
                          '2008-04-18 14:06:10'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100003,
                          9,
                          'Welding Lab',
                          'Place:  ABC soi  25/6/2018 9.00',
                          100003,
                          0,
                          17,
                          3,
                          1,
                          '2008-05-09 17:15:56',
                          '2018-06-19 07:09:03'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100004,
                          1,
                          'Horoscope: Zodiac',
                          'Teach about how to read zodiac sign.',
                          100004,
                          1,
                          16,
                          1,
                          1,
                          '2008-08-08 08:08:08',
                          '2018-08-08 08:08:08'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100005,
                          2,
                          'Valentine horo',
                          'Lover horoscope',
                          100004,
                          1,
                          123,
                          1,
                          1,
                          '2008-10-01 19:15:47',
                          '2019-02-14 10:31:34'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100006,
                          1,
                          'How to clean veggie',
                          'Open tap then wash it',
                          100005,
                          2,
                          4,
                          1,
                          1,
                          '2008-11-30 16:30:30',
                          '2008-11-30 16:30:30'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100007,
                          2,
                          'How to prepare veggie.(Deprecrated)',
                          'https://www.youtube.com/watch?v=Qi_G367LVco',
                          100005,
                          1,
                          9,
                          2,
                          0,
                          '2008-11-30 17:00:00',
                          '2019-06-05 09:00:04'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100008,
                          1,
                          'Happynewyear',
                          'New year is .......',
                          100004,
                          2,
                          5,
                          1,
                          1,
                          '2015-01-01 00:00:00',
                          '2015-01-01 00:00:00'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100009,
                          2,
                          'Com Animation',
                          'Something about computer animation',
                          100004,
                          3,
                          32,
                          1,
                          1,
                          '2015-03-03 19:12:14',
                          '2016-04-07 13:00:49'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100010,
                          2,
                          'Computer Graphics',
                          'Something about computer graphics',
                          100003,
                          1,
                          12,
                          2,
                          1,
                          '2015-09-30 14:00:12',
                          '2015-12-04 12:15:16'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100011,
                          3,
                          'english',
                          'abcdefghijklmnopqrstuvwxyz',
                          100005,
                          1,
                          11,
                          1,
                          1,
                          '2016-06-29 08:49:35',
                          '2016-07-31 19:30:44'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100012,
                          9,
                          'Cooking mama',
                          'Online lab at www.abdc.com (Open server on 20-23/12/19 17:00)',
                          100003,
                          0,
                          7,
                          3,
                          0,
                          '2017-02-28 16:35:45',
                          '2019-12-23 17:00:00'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100013,
                          4,
                          'math101',
                          '+ and -',
                          100003,
                          2,
                          55,
                          1,
                          1,
                          '2018-04-19 17:36:01',
                          '2019-04-19 17:36:19'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100014,
                          5,
                          'math102',
                          '* and /',
                          100004,
                          1,
                          44,
                          2,
                          1,
                          '2018-11-16 12:12:12',
                          '2019-01-02 16:28:47'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100015,
                          7,
                          '2019 Horo',
                          'Every horo in 2019',
                          100004,
                          2,
                          112,
                          2,
                          1,
                          '2019-02-06 10:32:33',
                          '2019-03-06 10:32:33'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100016,
                          3,
                          'Edible plants',
                          'This is a list of plants that have a culinary role as vegetables. "Vegetable" can be used in several senses, including culinary, botanical and legal. This list includes botanical fruits such as pumpkins, and does not include herbs, spices, cereals and most culinary fruits and culinary nuts. Edible fungi are not included in this list.',
                          100005,
                          1,
                          23,
                          1,
                          1,
                          '2019-06-04 11:12:13',
                          '2019-06-04 15:24:07'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100017,
                          4,
                          'Edible seaweed',
                          'Edible seaweed, or sea vegetables, are seaweeds that can be eaten and used in the preparation of food. They typically contain high amounts of fiber.[1][2] They may belong to one of several groups of multicellular algae: the red algae, green algae, and brown algae.',
                          100005,
                          1,
                          98,
                          2,
                          1,
                          '2019-06-05 13:00:00',
                          '2019-06-05 19:30:00'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100018,
                          1,
                          'math103',
                          '< > =',
                          100003,
                          1,
                          0,
                          1,
                          0,
                          '2020-02-07 10:02:17',
                          '2020-02-09 10:02:17'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100019,
                          1,
                          'soundlab spell test',
                          'At CULI 2020-02-15 14:00:00',
                          100003,
                          0,
                          19,
                          3,
                          1,
                          '2020-02-09 10:02:17',
                          '2020-02-09 10:02:17'
                      );

INSERT INTO Knowledge (
                          KnowledgeId,
                          Version,
                          Name,
                          Content,
                          AuthorId,
                          Price,
                          PageCount,
                          KnowledgeType,
                          IsActive,
                          CreatedDate,
                          UpdatedDate
                      )
                      VALUES (
                          100020,
                          1,
                          'GATI Lab',
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt Japan tomorrow',
                          100005,
                          1,
                          6,
                          3,
                          1,
                          '2020-02-09 19:19:19',
                          '2020-02-09 19:19:19'
                      );


-- Table: KnowledgeConnector
CREATE TABLE KnowledgeConnector (
    KnowledgeSourceId INTEGER       REFERENCES Knowledge (KnowledgeId) 
                                    NOT NULL,
    LinkOut           VARCHAR (255) 
);

INSERT INTO KnowledgeConnector (
                                   KnowledgeSourceId,
                                   LinkOut
                               )
                               VALUES (
                                   100002,
                                   'https://www.youtube.com/watch?v=nvFmNsW3nq8'
                               );

INSERT INTO KnowledgeConnector (
                                   KnowledgeSourceId,
                                   LinkOut
                               )
                               VALUES (
                                   100012,
                                   'www.abdc.com'
                               );

INSERT INTO KnowledgeConnector (
                                   KnowledgeSourceId,
                                   LinkOut
                               )
                               VALUES (
                                   100017,
                                   'https://www.youtube.com/watch?v=5Xc7flhpmF4'
                               );

INSERT INTO KnowledgeConnector (
                                   KnowledgeSourceId,
                                   LinkOut
                               )
                               VALUES (
                                   100007,
                                   'https://www.youtube.com/watch?v=Qi_G367LVco'
                               );


-- Table: KnowledgeType
CREATE TABLE KnowledgeType (
    KnowledgeType INTEGER     PRIMARY KEY
                              UNIQUE
                              NOT NULL,
    Name          VARCHAR (7) 
);

INSERT INTO KnowledgeType (
                              KnowledgeType,
                              Name
                          )
                          VALUES (
                              1,
                              'text'
                          );

INSERT INTO KnowledgeType (
                              KnowledgeType,
                              Name
                          )
                          VALUES (
                              2,
                              'vdo'
                          );

INSERT INTO KnowledgeType (
                              KnowledgeType,
                              Name
                          )
                          VALUES (
                              3,
                              'lab'
                          );


-- Table: LabScore
CREATE TABLE LabScore (
    LabScoreId  INTEGER  PRIMARY KEY
                         NOT NULL,
    StudentId   INTEGER  REFERENCES User (UserId) 
                         NOT NULL,
    KnowledgeId INTEGER  REFERENCES Knowledge (KnowledgeId) 
                         NOT NULL,
    IsPass      INTEGER,
    CreatedDate DATETIME,
    TestDate    DATETIME
);

INSERT INTO LabScore (
                         LabScoreId,
                         StudentId,
                         KnowledgeId,
                         IsPass,
                         CreatedDate,
                         TestDate
                     )
                     VALUES (
                         10001,
                         100003,
                         100019,
                         1,
                         '2020-02-09 11:02:17',
                         '2020-02-15 14:00:00'
                     );

INSERT INTO LabScore (
                         LabScoreId,
                         StudentId,
                         KnowledgeId,
                         IsPass,
                         CreatedDate,
                         TestDate
                     )
                     VALUES (
                         10002,
                         100004,
                         100019,
                         0,
                         '2020-02-09 11:02:47',
                         '2020-02-15 14:00:00'
                     );

INSERT INTO LabScore (
                         LabScoreId,
                         StudentId,
                         KnowledgeId,
                         IsPass,
                         CreatedDate,
                         TestDate
                     )
                     VALUES (
                         10003,
                         100005,
                         100019,
                         0,
                         '2020-02-09 11:03:17',
                         '2020-02-15 14:00:00'
                     );


-- Table: Question
CREATE TABLE Question (
    QuestionId INTEGER       PRIMARY KEY
                             UNIQUE
                             NOT NULL,
    SubjectId  INTEGER       REFERENCES Subject (SubjectId),
    Subject    VARCHAR (255),
    A          VARCHAR (255),
    B          VARCHAR (255),
    C          VARCHAR (255),
    D          VARCHAR (255),
    Answer     VARCHAR (1) 
);

INSERT INTO Question (
                         QuestionId,
                         SubjectId,
                         Subject,
                         A,
                         B,
                         C,
                         D,
                         Answer
                     )
                     VALUES (
                         100001,
                         100001,
                         'Question1',
                         'A',
                         'B',
                         'C',
                         'D',
                         'C'
                     );

INSERT INTO Question (
                         QuestionId,
                         SubjectId,
                         Subject,
                         A,
                         B,
                         C,
                         D,
                         Answer
                     )
                     VALUES (
                         100002,
                         100003,
                         'Question2',
                         'A',
                         'B',
                         'C',
                         'D',
                         'C'
                     );

INSERT INTO Question (
                         QuestionId,
                         SubjectId,
                         Subject,
                         A,
                         B,
                         C,
                         D,
                         Answer
                     )
                     VALUES (
                         100003,
                         100005,
                         '1+1=?',
                         '0',
                         '1',
                         '2',
                         '9',
                         'B'
                     );

INSERT INTO Question (
                         QuestionId,
                         SubjectId,
                         Subject,
                         A,
                         B,
                         C,
                         D,
                         Answer
                     )
                     VALUES (
                         100004,
                         100005,
                         '10*10*10*10=?',
                         '1',
                         '100',
                         '10000',
                         '1000000',
                         'A'
                     );


-- Table: Role
CREATE TABLE Role (
    RoleId INTEGER      PRIMARY KEY
                        NOT NULL
                        UNIQUE,
    Name   VARCHAR (31) 
);

INSERT INTO Role (
                     RoleId,
                     Name
                 )
                 VALUES (
                     1,
                     'Course Manager'
                 );

INSERT INTO Role (
                     RoleId,
                     Name
                 )
                 VALUES (
                     2,
                     'Author'
                 );

INSERT INTO Role (
                     RoleId,
                     Name
                 )
                 VALUES (
                     3,
                     'Student'
                 );


-- Table: Subject
CREATE TABLE Subject (
    SubjectId   INTEGER       PRIMARY KEY AUTOINCREMENT
                              UNIQUE
                              NOT NULL,
    Name        VARCHAR (63),
    Description VARCHAR (255),
    Syllabus    VARCHAR (511),
    AuthorId    INTEGER       NOT NULL
                              REFERENCES User (UserId),
    CreatedDate DATETIME,
    UpdatedDate DATETIME
);

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100001,
                        'Simple cooking chicken',
                        'Teach about how to cook chicken',
                        'prepare chicken and ginger chicken',
                        100004,
                        '2008-02-07 12:14:59',
                        '2008-02-07 12:14:59'
                    );

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100002,
                        'Horo',
                        'All in one horoscope',
                        'Zodiac, 2019 and lover',
                        100004,
                        '2019-02-06 10:35:33',
                        '2019-03-06 10:35:33'
                    );

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100003,
                        'edible green thing',
                        '-',
                        'week1 ... week2 ... week3 ...',
                        100005,
                        '2008-11-30 18:00:00',
                        '2019-06-05 20:11:12'
                    );

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100004,
                        'english',
                        'eng plz',
                        '-',
                        100005,
                        '2008-05-09 17:17:43',
                        '2008-16-19 07:15:12'
                    );

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100005,
                        'math1',
                        '101 and 103',
                        '-',
                        100003,
                        '2018-04-19 17:40:40',
                        '2019-04-19 18:40:40'
                    );

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100006,
                        'math2',
                        '102',
                        '102',
                        100004,
                        '2019-01-02 16:28:47',
                        '2019-01-02 16:28:47'
                    );

INSERT INTO Subject (
                        SubjectId,
                        Name,
                        Description,
                        Syllabus,
                        AuthorId,
                        CreatedDate,
                        UpdatedDate
                    )
                    VALUES (
                        100007,
                        'eng lab',
                        'spell test',
                        'Please visit knowledge description',
                        100003,
                        '2020-02-09 10:02:17',
                        '2020-02-09 10:02:17'
                    );


-- Table: SubjectKnowledges
CREATE TABLE SubjectKnowledges (
    SubjectKnowledgeId INTEGER PRIMARY KEY
                               UNIQUE
                               NOT NULL,
    SubjectId          INTEGER REFERENCES Subject (SubjectId) 
                               NOT NULL,
    KnowledgeId        INTEGER REFERENCES Knowledge (KnowledgeId) 
                               NOT NULL,
    Sequence           INTEGER
);

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100001,
                                  100001,
                                  100001,
                                  1
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100002,
                                  100001,
                                  100002,
                                  2
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100003,
                                  100002,
                                  100005,
                                  1
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100004,
                                  100002,
                                  100004,
                                  2
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100005,
                                  100002,
                                  100015,
                                  3
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100006,
                                  100003,
                                  100006,
                                  1
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100007,
                                  100003,
                                  100017,
                                  2
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100008,
                                  100004,
                                  100011,
                                  1
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100009,
                                  100005,
                                  100013,
                                  1
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100010,
                                  100005,
                                  100018,
                                  2
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100011,
                                  100007,
                                  100019,
                                  2
                              );

INSERT INTO SubjectKnowledges (
                                  SubjectKnowledgeId,
                                  SubjectId,
                                  KnowledgeId,
                                  Sequence
                              )
                              VALUES (
                                  1100012,
                                  100006,
                                  100014,
                                  1
                              );


-- Table: User
CREATE TABLE User (
    UserId   INTEGER      PRIMARY KEY AUTOINCREMENT
                          UNIQUE
                          NOT NULL,
    Name     VARCHAR (31),
    Lastname VARCHAR (31),
    Username VARCHAR (31) UNIQUE
                          NOT NULL,
    Password VARCHAR (31) NOT NULL,
    RoleId   INTEGER      REFERENCES Role (RoleId) 
                          NOT NULL
);

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100001,
                     'Manager1',
                     'Manager',
                     'manager1',
                     'password',
                     1
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100002,
                     'Manager2',
                     'Manager',
                     'manager2',
                     'password',
                     1
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100003,
                     'Author1',
                     'Author',
                     'author1',
                     'password',
                     2
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100004,
                     'Author2',
                     'Author',
                     'author2',
                     'password',
                     2
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100005,
                     'Author3',
                     'Author',
                     'author3',
                     'password',
                     2
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100006,
                     'Kevin',
                     'Taothong',
                     'student1',
                     'password',
                     3
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100007,
                     'Covit',
                     'Nineteen',
                     'student2',
                     'password',
                     3
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100008,
                     'Ncov',
                     'Nineteen',
                     'student3',
                     'password',
                     3
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100009,
                     'Fish',
                     'Stop',
                     'student4',
                     'password',
                     3
                 );

INSERT INTO User (
                     UserId,
                     Name,
                     Lastname,
                     Username,
                     Password,
                     RoleId
                 )
                 VALUES (
                     100010,
                     'Monday',
                     'Tasty',
                     'student5',
                     'password',
                     3
                 );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
