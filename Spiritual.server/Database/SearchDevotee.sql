ALTER PROCEDURE SearchDevotee
( @Input VARCHAR )
AS
BEGIN
  DECLARE @SEARCH VARCHAR(10) = CONCAT('%',@Input,'%');

	SELECT * FROM Devotees WHERE
	firstname LIKE @SEARCH 
	OR middlename LIKE @SEARCH  OR
	lastname LIKE  @SEARCH OR emaidId LIKE @SEARCH OR
	devoteeLoginId LIKE  @SEARCH OR InitiationDate LIKE @SEARCH OR
	flatno LIKE  @SEARCH OR area LIKE @SEARCH OR city LIKE  @SEARCH OR
	state LIKE @SEARCH OR pincode LIKE  @SEARCH 

END

