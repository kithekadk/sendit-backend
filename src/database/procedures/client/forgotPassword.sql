ALTER PROCEDURE changePassword (@email VARCHAR(200), @phoneNumber INT, @password VARCHAR(200))
AS
BEGIN	
	BEGIN
		SELECT * FROM dbo.CLIENTS WHERE email=@email AND phoneNumber=@phoneNumber
		UPDATE CLIENTS SET password=@password
	END
END