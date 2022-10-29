CREATE PROCEDURE createParcel (	@sender VARCHAR(200),
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
								deliveryDate
								)
									
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
							@deliveryDate
							)
END