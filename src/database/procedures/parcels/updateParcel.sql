CREATE PROCEDURE updateParcel (	@parcelID INT,
								@sender VARCHAR(200),
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
		IF EXISTS(SELECT * FROM dbo.CLIENTS)
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
		ELSE
		BEGIN
			RAISERROR('No parcels currently',11,1)
		END
END