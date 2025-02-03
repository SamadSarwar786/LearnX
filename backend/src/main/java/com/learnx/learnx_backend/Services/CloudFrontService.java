package com.learnx.learnx_backend.Services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import software.amazon.awssdk.services.cloudfront.CloudFrontUtilities;
import software.amazon.awssdk.services.cloudfront.model.CannedSignerRequest;
import software.amazon.awssdk.services.cloudfront.url.SignedUrl;

public class CloudFrontService {

    private static final String CLOUDFRONT_DOMAIN = System.getenv("CLOUDFRONT_DOMAIN");
    private static final String KEY_PAIR_ID = System.getenv("KEY_PAIR_ID");
//    private static final String PRIVATE_KEY = System.getenv("CLOUDFRONT_PRIVATE_KEY");

    public static String generateCloudFrontSignedUrl(String filePath) {
        try {
            if(filePath == null || filePath.isEmpty()) {
                throw new IllegalArgumentException("File path cannot be null or empty");
            }
            CloudFrontUtilities cloudFrontUtilities = CloudFrontUtilities.create();
            Instant expirationDate = Instant.now().plus(7, ChronoUnit.DAYS);
            String resourceUrl = CLOUDFRONT_DOMAIN + filePath;
            CannedSignerRequest cannedRequest = CannedSignerRequest.builder()
                    .resourceUrl(resourceUrl)
                    .privateKey(new java.io.File("C:\\code\\java codes\\LearnX\\backend\\src\\main\\java\\com\\learnx\\learnx_backend\\Services\\private_key.pem").toPath())
                    .keyPairId(KEY_PAIR_ID)
                    .expirationDate(expirationDate)
                    .build();
            SignedUrl signedUrl = cloudFrontUtilities.getSignedUrlWithCannedPolicy(cannedRequest);
            return signedUrl.url();
        } catch (Exception e) {
            throw new RuntimeException("Error generating CloudFront signed URL: " + e.getMessage());
        }
    }
}
