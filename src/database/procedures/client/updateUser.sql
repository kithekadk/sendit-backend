ALTER PROCEDURE updateUser (@clientID INT,@fullName VARCHAR(200), @phoneNumber INT, @password VARCHAR(200), @email VARCHAR(200), @userName VARCHAR(200))
AS
BEGIN

	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE clientID=@clientID)
		BEGIN
				UPDATE dbo.CLIENTS SET fullName=@fullName,
										phoneNumber=@phoneNumber,
										password=@password,
										email=@email,
										userName=@userName
										WHERE clientID=@clientID
		END
	ELSE 
		BEGIN
			RAISERROR('User not found',11,1)
		END
END