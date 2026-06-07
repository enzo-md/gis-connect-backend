-- 📁 GIS-CONNECT/backend/database/schema.sql
-- Script complet de création de la base de données GIS-CONNECT

-- Création de la base de données (si elle n'existe pas)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'GISConnectDB')
BEGIN
    CREATE DATABASE GISConnectDB;
    PRINT '✅ Base de données GISConnectDB créée';
END
GO

USE GISConnectDB;
GO

-- ============================================
-- 1. TABLE DES UTILISATEURS
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        UserID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Email NVARCHAR(255) UNIQUE NOT NULL,
        FullName NVARCHAR(100) NOT NULL,
        UserType VARCHAR(20) CHECK (UserType IN ('internal', 'external')) NOT NULL,
        Company NVARCHAR(100) NULL,
        ExternalCompanyName NVARCHAR(100) NULL,
        PasswordHash NVARCHAR(255) NOT NULL,
        AvatarURL NVARCHAR(500) NULL,
        IsActive BIT DEFAULT 1,
        LastSeen DATETIME NULL,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
    PRINT '✅ Table Users créée';
END
GO

-- ============================================
-- 2. TABLE DES ÉQUIPES
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Teams' AND xtype='U')
BEGIN
    CREATE TABLE Teams (
        TeamID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        TeamName NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        OwnerID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
        IsExternalTeam BIT DEFAULT 0,
        CreatedAt DATETIME DEFAULT GETDATE()
    );
    PRINT '✅ Table Teams créée';
END
GO

-- ============================================
-- 3. TABLE DES MEMBRES D'ÉQUIPE
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TeamMembers' AND xtype='U')
BEGIN
    CREATE TABLE TeamMembers (
        TeamID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Teams(TeamID),
        UserID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
        Role VARCHAR(20) CHECK (Role IN ('admin', 'member', 'guest')) DEFAULT 'member',
        JoinedAt DATETIME DEFAULT GETDATE(),
        PRIMARY KEY (TeamID, UserID)
    );
    PRINT '✅ Table TeamMembers créée';
END
GO

-- ============================================
-- 4. TABLE DES CONVERSATIONS
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Conversations' AND xtype='U')
BEGIN
    CREATE TABLE Conversations (
        ConversationID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        ConversationType VARCHAR(20) CHECK (ConversationType IN ('direct', 'group', 'team')) NOT NULL,
        Name NVARCHAR(200) NULL,
        TeamID UNIQUEIDENTIFIER NULL FOREIGN KEY REFERENCES Teams(TeamID),
        CreatedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
        CreatedAt DATETIME DEFAULT GETDATE(),
        IsArchived BIT DEFAULT 0
    );
    PRINT '✅ Table Conversations créée';
END
GO

-- ============================================
-- 5. TABLE DES PARTICIPANTS
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ConversationParticipants' AND xtype='U')
BEGIN
    CREATE TABLE ConversationParticipants (
        ConversationID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Conversations(ConversationID),
        UserID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
        AccessLevel VARCHAR(20) CHECK (AccessLevel IN ('full', 'readonly', 'restricted')) DEFAULT 'full',
        JoinedAt DATETIME DEFAULT GETDATE(),
        LastReadAt DATETIME NULL,
        PRIMARY KEY (ConversationID, UserID)
    );
    PRINT '✅ Table ConversationParticipants créée';
END
GO

-- ============================================
-- 6. TABLE DES MESSAGES
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Messages' AND xtype='U')
BEGIN
    CREATE TABLE Messages (
        MessageID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        ConversationID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Conversations(ConversationID),
        SenderID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
        MessageType VARCHAR(20) CHECK (MessageType IN ('text', 'file', 'pdf', 'reaction', 'system')) NOT NULL,
        Content NVARCHAR(MAX) NULL,
        FileID UNIQUEIDENTIFIER NULL,
        PDFPageCount INT NULL,
        ReplyToID UNIQUEIDENTIFIER NULL,
        IsEdited BIT DEFAULT 0,
        IsDeleted BIT DEFAULT 0,
        IsPinned BIT DEFAULT 0,
        SentAt DATETIME DEFAULT GETDATE(),
        EditedAt DATETIME NULL,
        DeletedAt DATETIME NULL
    );
    PRINT '✅ Table Messages créée';
END
GO

-- ============================================
-- 7. TABLE DES FICHIERS
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Files' AND xtype='U')
BEGIN
    CREATE TABLE Files (
        FileID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        MessageID UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Messages(MessageID),
        OriginalName NVARCHAR(255) NOT NULL,
        FileType VARCHAR(50) NOT NULL,
        FileSize BIGINT NOT NULL,
        StoragePath NVARCHAR(500) NOT NULL,
        PDFPreviewPath NVARCHAR(500) NULL,
        PDFPassword NVARCHAR(255) NULL,
        EncryptedKey NVARCHAR(500) NULL,
        UploadedAt DATETIME DEFAULT GETDATE(),
        AccessCount INT DEFAULT 0
    );
    PRINT '✅ Table Files créée';
END
GO

-- ============================================
-- 8. TABLE DES RÈGLES D'ACCÈS EXTERNES
-- ============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ExternalAccessRules' AND xtype='U')
BEGIN
    CREATE TABLE ExternalAccessRules (
        RuleID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        ExternalUserID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
        ConversationID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Conversations(ConversationID),
        CanSendMessages BIT DEFAULT 1,
        CanUploadFiles BIT DEFAULT 0,
        CanViewHistory BIT DEFAULT 0,
        ExpiresAt DATETIME NULL,
        CreatedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID)
    );
    PRINT '✅ Table ExternalAccessRules créée';
END
GO

-- ============================================
-- INDEX POUR LES PERFORMANCES
-- ============================================
CREATE INDEX IF NOT EXISTS IX_Messages_ConversationID ON Messages(ConversationID, SentAt DESC);
CREATE INDEX IF NOT EXISTS IX_Users_UserType ON Users(UserType, IsActive);
CREATE INDEX IF NOT EXISTS IX_Messages_SenderID ON Messages(SenderID);
CREATE INDEX IF NOT EXISTS IX_ConversationParticipants_UserID ON ConversationParticipants(UserID);

PRINT '✅ Tous les index créés';
GO

-- ============================================
-- DONNÉES DE TEST (optionnel)
-- ============================================
INSERT INTO Users (UserID, Email, FullName, UserType, PasswordHash, IsActive)
VALUES 
    (NEWID(), 'admin@gisconnect.com', 'Administrateur', 'internal', '$2a$10$test', 1),
    (NEWID(), 'user1@gisconnect.com', 'Jean Dupont', 'internal', '$2a$10$test', 1),
    (NEWID(), 'partner@externe.com', 'Partenaire Externe', 'external', '$2a$10$test', 1);

PRINT '✅ Données de test insérées';
GO