--
-- File generated with SQLiteStudio v3.2.1 on ¾. ¡.¾. 5 22:20:39 2020
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
    CourseManagerId INTEGER       REFERENCES User (UserID) 
                                  UNIQUE
                                  NOT NULL,
    EnrollPrice     INTEGER,
    IsActive        BOOLEAN,
    CreatedDate     DATETIME,
    UpdatedDate     DATETIME
);


-- Table: CourseSubjects
CREATE TABLE CourseSubjects (
    CourseSubjectId INTEGER PRIMARY KEY
                            UNIQUE
                            NOT NULL,
    CourseId        INTEGER REFERENCES Course (CourseId) 
                            UNIQUE
                            NOT NULL,
    SubjectId       INTEGER REFERENCES Subject (SubjectId) 
                            UNIQUE
                            NOT NULL,
    Sequence        INTEGER
);


-- Table: Enrollment
CREATE TABLE Enrollment (
    EnrollmentId  INTEGER PRIMARY KEY
                          UNIQUE
                          NOT NULL,
    StudentId     INTEGER REFERENCES User (UserID) 
                          UNIQUE
                          NOT NULL,
    CourseId      INTEGER REFERENCES Course (CourseId) 
                          UNIQUE
                          NOT NULL,
    Price         INTEGER,
    PretestScore  FLOAT,
    PosttestScore FLOAT,
    IsComplete    BOOLEAN
);


-- Table: Knowledge
CREATE TABLE Knowledge (
    KnowledgeId   INTEGER       PRIMARY KEY
                                UNIQUE
                                NOT NULL,
    Version       INTEGER,
    Name          VARCHAR (63),
    Content       VARCHAR (255),
    AuthorId      INTEGER       REFERENCES User (UserID) 
                                UNIQUE
                                NOT NULL,
    Price         INTEGER,
    PageCount     INTEGER,
    KnowledgeType INTEGER,
    IsActive      BOOLEAN,
    CreatedDate   DATETIME,
    UpdatedDate   DATETIME
);


-- Table: KnowledgeConnector
CREATE TABLE KnowledgeConnector (
    KnowledgeSourceId INTEGER       REFERENCES Knowledge (KnowledgeId) 
                                    UNIQUE
                                    NOT NULL,
    LinkOut           VARCHAR (255) 
);


-- Table: LabScore
CREATE TABLE LabScore (
    LabScoreId  INTEGER  PRIMARY KEY
                         NOT NULL,
    StudentId   INTEGER  REFERENCES User (UserID) 
                         UNIQUE
                         NOT NULL,
    KnowledgeId INTEGER  REFERENCES Knowledge (KnowledgeId) 
                         UNIQUE
                         NOT NULL,
    IsPass      INTEGER,
    CreatedDate DATETIME,
    TestDate    DATETIME
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


-- Table: Role
CREATE TABLE Role (
    RoleId INTEGER      PRIMARY KEY
                        NOT NULL
                        UNIQUE,
    Name   VARCHAR (31) 
);


-- Table: Subject
CREATE TABLE Subject (
    SubjectId   INTEGER       PRIMARY KEY
                              UNIQUE
                              NOT NULL,
    Name        VARCHAR (63),
    Description VARCHAR (255),
    Syllabus    VARCHAR (511),
    AuthorId    INTEGER       UNIQUE
                              NOT NULL
                              REFERENCES User (UserId),
    CreatedDate DATETIME,
    UpdatedDate DATETIME
);


-- Table: SubjectKnowledges
CREATE TABLE SubjectKnowledges (
    SubjectKnowledgeId INTEGER PRIMARY KEY
                               UNIQUE
                               NOT NULL,
    SubjectId          INTEGER REFERENCES Subject (SubjectId) 
                               UNIQUE
                               NOT NULL,
    KnowledgeId        INTEGER REFERENCES Knowledge (KnowledgeId) 
                               UNIQUE
                               NOT NULL,
    Sequence           INTEGER
);


-- Table: User
CREATE TABLE User (
    UserId   INTEGER      PRIMARY KEY
                          UNIQUE
                          NOT NULL,
    Name     VARCHAR (31),
    Lastname VARCHAR (31),
    Username VARCHAR (31) UNIQUE
                          NOT NULL,
    Password VARCHAR (31) NOT NULL,
    RoleId   INTEGER      REFERENCES Role (RoleId) 
                          NOT NULL
                          UNIQUE
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
