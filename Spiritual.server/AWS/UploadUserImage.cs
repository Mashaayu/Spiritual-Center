

using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace Spiritual.Server.AWS
{
    public class UploadUserImage
    {
        public static async Task<string> UploadDevoteeImage(IFormFile file)
        {
            string bucket = "devotee-system-user-images";
            string SecretAccessKey = "Your_secret_key";
            string AccessKey = "your_accesss_key";

            RegionEndpoint regionEndpoint = RegionEndpoint.APSouth1;

            string distributionURL = "https://d250kuoiofjbc3.cloudfront.net";

            using (var S3client = new AmazonS3Client(AccessKey,SecretAccessKey,regionEndpoint))
                {
                    using (var newstream = new MemoryStream())
                    {
                        try
                        {
                            file.CopyTo(newstream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newstream,
                                Key = file.FileName,
                                BucketName = bucket,
                                CannedACL = S3CannedACL.PublicReadWrite,
                            };

                            var fileTransferUtility = new TransferUtility(S3client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                        catch (Exception ex) {
                             throw ex.InnerException;
                        }
                    }

                try
                {
                    var getObjectReq = new GetObjectRequest()
                    {
                        BucketName = bucket,
                        Key = file.FileName,
                    };
                    var obj = S3client.GetObjectAsync(getObjectReq);

                    return $"{distributionURL}/{file.FileName}";
                }
                catch (Exception ex) {
                    throw ex;
                }

            }

            //RegionEndpoint regionEndpoint = RegionEndpoint.APSouth1;
            // AmazonS3Client  s3Client = new AmazonS3Client(regionEndpoint);
            //try
            //{
            //    var request = new PutObjectRequest()
            //    {
            //        BucketName = "devotee-system-user-images",
            //        ContentBody = File as FileStream,
            //       Key = File.FileName,

            //    };

            //    var response = await s3Client.PutObjectAsync(request);
            //    if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            //    {
            //        Console.WriteLine("Bucket successfully Created");
            //    }

            //catch (AmazonS3Exception e)
            //{
            //    Console.Write(e.Message);
            //}
            //catch (Exception e) { 
            //    Console.Write(e.Message);
            //}

        }
    }
}
