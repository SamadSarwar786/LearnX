package com.learnx.learnx_backend.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {

    @Value("${aws_access_key_id}")
    private String awsAccessKey;

    @Value("${aws_secret_access_key}")
    private String awsSecretKey;

    @Value("${aws.region}")
    private String regionName;

    @Bean
    public S3Client getAmazonS3Client() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);
        S3Client s3Client = S3Client
                .builder()
                .region(Region.of(regionName))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
//                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();

        return s3Client;
    }

    @Bean
    public S3Presigner s3Presigner() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);
        return S3Presigner.builder()
                .region(Region.of(regionName))
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }
}
