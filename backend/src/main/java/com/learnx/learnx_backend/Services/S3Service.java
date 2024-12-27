package com.learnx.learnx_backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.net.URL;
import java.time.Duration;
import java.util.Map;

@Service
public class S3Service {

    @Autowired
    private S3Presigner s3Presigner;

    @Autowired
    private S3Client s3Client;

    public URL generatePreSignedUrlForGetObject(String bucketName, String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        GetObjectPresignRequest preSignRequest = GetObjectPresignRequest.builder()
                .getObjectRequest(getObjectRequest)
                .signatureDuration(Duration.ofMinutes(1)) // URL valid for 2 minutes
                .build();

        return s3Presigner.presignGetObject(preSignRequest).url();
    }

    public URL generatePresignedUrlForPutObject(
            String bucketName,
            String key
//            String contentType
//            long contentLength
//            Map<String, String> metadata
    ) {
        // Build the PutObjectRequest with extra details
        PutObjectRequest.Builder putObjectRequestBuilder = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key);
//                .contentType(contentType);
//                .contentLength(contentLength);

        // Add additional metadata if needed
//        if (metadata != null && !metadata.isEmpty()) {
//            putObjectRequestBuilder = putObjectRequestBuilder.metadata(metadata);
//        }

        PutObjectRequest putObjectRequest = putObjectRequestBuilder.build();

        // Create the presign request with additional parameters
        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .putObjectRequest(putObjectRequest)
                .signatureDuration(Duration.ofMinutes(10)) // URL valid for 10 minutes
                .build();

        // Generate and return the pre-signed URL
        return s3Presigner.presignPutObject(presignRequest).url();
    }
}
