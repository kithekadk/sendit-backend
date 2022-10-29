ALTER PROCEDURE createUpdateParcel (@sender VARCHAR(200),
								@parcelWeight INT,
								@price INT,
								@lat INT,
								@lng INT,
								@senderLat INT,
								@senderLng INT,
								@parcelDescription VARCHAR(200),
								@receiverLocation VARCHAR(200),
								@receiverPhone VARCHAR(14),
								@receiverEmail VARCHAR(200),
								@deliveryDate VARCHAR(200))
								
	AS
	BEGIN

		DECLARE @exists BIT;

		DECLARE @parcelID INT

		SELECT @exists = count(parcelID) from dbo.PARCELS where parcelID = @parcelID;
		IF @exists=0
		BEGIN
		INSERT INTO dbo.PARCELS (sender,
								parcelWeight,
								price,
								lat,
								lng,
								senderLat,
								senderLng,
								parcelDescription,
								receiverLocation,
								receiverPhone,
								receiverEmail,
								deliveryDate)
									
					VALUES(	@sender,
							@parcelWeight,
							@price,
							@lat,
							@lng,
							@senderLat,
							@senderLng,
							@parcelDescription,
							@receiverLocation,
							@receiverPhone,
							@receiverEmail,
							@deliveryDate)
			END
	ELSE
		BEGIN
		UPDATE dbo.PARCELS SET  sender=@sender,
								parcelWeight =@parcelWeight,
								price=@price,
								lat=@lat,
								lng=@lng,
								senderLat= @senderLat,
								senderLng= @senderLng,
								parcelDescription=@parcelDescription,
								receiverLocation=@receiverLocation,
								receiverPhone=@receiverPhone,
								receiverEmail=@receiverEmail,
								deliveryDate=@deliveryDate
		WHERE parcelID=@parcelID
		END
END
