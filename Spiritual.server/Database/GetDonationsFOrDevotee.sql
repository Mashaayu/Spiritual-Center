use DevoteeServer;
go;
ALTER PROCEDURE GetDonationsForDevotee(
	@ID int 
)
AS
BEGIN
		SELECT count(Id)as Id,SUM(DonationAmount)as DonationAmount, year , month ,devoteeLoginId as DevoteeId
		FROM 
		(
			SELECT d.Id as ID,d.DonationAmount,d.year ,d.month,de.devoteeLoginId ,de.Id as DevoteeId
			FROM Donations d join Devotees de 
			on de.Id = d.DevoteeId where DevoteeId = @ID
		)as V1 
		
		GROUP BY year,month,devoteeLoginId 
		ORDER BY DonationAmount ASC;
END

EXEC GetDonationsForDevotee 1087
