CREATE PROCEDURE deleteParcel(@parcelID INT)
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.PARCELS WHERE parcelID=@parcelID)
		BEGIN
			UPDATE dbo.PARCELS SET isDeleted=1 WHERE parcelID=@parcelID
		END
		ELSE
		BEGIN
			RAISERROR ('No parcels at the moment',11,1)
		END
END