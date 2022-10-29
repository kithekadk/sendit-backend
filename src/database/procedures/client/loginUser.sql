-- CREATE PROCEDURE loginUser(@email VARCHAR(200), @password VARCHAR(200))
-- AS
-- BEGIN
-- 	IF EXISTS(SELECT * FROM dbo.CLIENTS WHERE email = @email)
-- 		BEGIN
-- 			SELECT * FROM dbo.CLIENTS WHERE email = @email;
-- 		END
-- 		ELSE
-- 		BEGIN
-- 			RAISERROR ('User account NOT found',11,1)
-- 		END
-- END

CREATE PROCEDURE loginUser(@email VARCHAR(200), @password VARCHAR(200),@lat INT, @lng INT)
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.CLIENTS WHERE email = @email)
		BEGIN
			SELECT * FROM dbo.CLIENTS WHERE email = @email 
			UPDATE dbo.CLIENTS SET lat=@lat, lng=@lng 
			WHERE email = @email;
		END
		ELSE
		BEGIN
			RAISERROR ('User account NOT found',11,1)
		END
END