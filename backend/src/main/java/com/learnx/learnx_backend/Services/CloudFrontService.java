package com.learnx.learnx_backend.Services;

import java.io.File;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cloudfront.CloudFrontUtilities;
import software.amazon.awssdk.services.cloudfront.model.CannedSignerRequest;
import software.amazon.awssdk.services.cloudfront.url.SignedUrl;

@Service
public class CloudFrontService {

    @Autowired
    private ResourceUtils resourceUtils;

    @Value("${cloudfront.domain.url}")
    private String CLOUDFRONT_DOMAIN;
    @Value("${cloudfront.key.paid.id}")
    private String KEY_PAIR_ID;
//    private static final String PRIVATE_KEY = System.getenv("CLOUDFRONT_PRIVATE_KEY");

    public String generateCloudFrontSignedUrl(String filePath) {
        try {
            if(filePath == null || filePath.isEmpty()) {
                throw new IllegalArgumentException("File path cannot be null or empty");
            }
            CloudFrontUtilities cloudFrontUtilities = CloudFrontUtilities.create();
            Instant expirationDate = Instant.now().plus(7, ChronoUnit.DAYS);
            String resourceUrl = CLOUDFRONT_DOMAIN + filePath;
            File privateKeyFile = resourceUtils.extractResourceToTempFile("private_key.pem");
            CannedSignerRequest cannedRequest = CannedSignerRequest.builder()
                    .resourceUrl(resourceUrl)
                    .privateKey(privateKeyFile.toPath())
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
