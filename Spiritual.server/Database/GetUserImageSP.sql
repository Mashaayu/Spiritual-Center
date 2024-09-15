Use DevoteeServer 
GO;

CREATE PROCEDURE GetUserImagEByID(
 @DevoteeID INT
 )
 AS
 BEGIN
 
		SELECT U.Id,U.lastModified,U.lastModifiedDate,U.name,U.size,U.type,U.webkitRelativePath FROM UserImages U
		JOIN Devotees D ON D.UserImageId = U.Id WHERE D.Id =6;
 END
 GO;

 EXEC GetUserImagEByID 1;