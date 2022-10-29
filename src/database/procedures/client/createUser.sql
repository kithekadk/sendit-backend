
ALTER PROCEDURE createUser (@fullName VARCHAR(200), 
@userName VARCHAR(200), @email VARCHAR(200) , @phoneNumber INT,
@password VARCHAR(200))
AS
BEGIN

	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE email=@email)
		BEGIN
				RAISERROR('Email taken, use a different email', 11, 1);
				RETURN;
		END
	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE userName=@userName)
		BEGIN
				RAISERROR('Username taken, use a different username', 11, 1);
				RETURN;
		END
	ELSE 
		BEGIN
				INSERT INTO dbo.CLIENTS (fullName, userName, email, phoneNumber, password)
				VALUES (@fullName, @userName, @email, @phoneNumber, @password)
		END
END