	CREATE TABLE PARCELS (sender VARCHAR(200),
		parcelID INT IDENTITY(1,1),
		parcelWeight INT NOT NULL,
		price INT,
		lat INT NOT NULL,
		lng INT NOT NULL,
		senderLat INT NOT NULL,
		senderLng INT NOT NULL,
		parcelDescription VARCHAR(200) NOT NULL,
		receiverLocation VARCHAR(200) NOT NULL,
		receiverPhone VARCHAR(14) NOT NULL,
		receiverEmail VARCHAR(200) NOT NULL,
		deliveryDate VARCHAR(200) NOT NULL,
		status VARCHAR(200) DEFAULT 'In Transit',
		isDeleted BIT DEFAULT 0)