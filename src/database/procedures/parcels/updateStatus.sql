CREATE PROCEDURE updateStatus (@parcelID INT, @status VARCHAR(200))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.PARCELS WHERE status='In Transit')
	BEGIN
		SELECT * FROM dbo.PARCELS 
		UPDATE dbo.PARCELS SET status= @status WHERE status='In Transit' AND parcelID=@parcelID
	END
	ELSE
	IF EXISTS(SELECT * FROM dbo.PARCELS WHERE status='Awaiting Pick-up')
	BEGIN
		SELECT * FROM dbo.PARCELS 
		UPDATE dbo.PARCELS SET status = @status WHERE status='Awaiting Pick-up' AND parcelID=@parcelID
	END
	ELSE
	BEGIN
		RAISERROR ('No Parcels currently',11,1)
		RETURN
	END
END