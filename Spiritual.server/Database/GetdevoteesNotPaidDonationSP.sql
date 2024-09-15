USE DevoteeServer;
GO;
ALTER PROCEDURE GetDevoteesNotPaidDonation 
AS
	SELECT * FROM Devotees WHERE Id NOT IN 
	(SELECT DevoteeId FROM Donations);

EXEC GetDevoteesNotPaidDonation