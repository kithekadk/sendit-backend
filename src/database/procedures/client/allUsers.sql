	ALTER PROCEDURE getClients
	AS
	BEGIN
	DECLARE @PageNumber AS INT
	DECLARE @RowsOfPage AS INT
	DECLARE @MaxTablePage  AS FLOAT 
	SET @PageNumber=1
	SET @RowsOfPage=100
	IF EXISTS( SELECT * FROM dbo.CLIENTS)

		SELECT @MaxTablePage = COUNT(*) FROM dbo.CLIENTS
		SET @MaxTablePage = CEILING(@MaxTablePage/@RowsOfPage)
		IF @MaxTablePage >= @PageNumber

			BEGIN
				SELECT userName,clientID, fullName, email, phoneNumber, lat, lng FROM dbo.CLIENTS ORDER BY clientID
					OFFSET (@PageNumber-1)*@RowsOfPage ROWS
					FETCH NEXT @RowsOfPage ROWS ONLY
					SET @PageNumber = @PageNumber + 1
			END
		ELSE
			BEGIN
				RAISERROR('No users Currently',11,1)
			END
	END