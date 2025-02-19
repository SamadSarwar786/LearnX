package com.learnx.learnx_backend.Services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

@Service
public class ResourceUtils {
    private static final Logger logger = LoggerFactory.getLogger(ResourceUtils.class);

    /**
     * Read resource file as String
     * @param resourcePath Path to the resource
     * @return Content of the resource as String
     * @throws IOException If resource cannot be read
     */
    public String readResourceAsString(String resourcePath) throws IOException {
        try {
            ClassPathResource resource = new ClassPathResource(resourcePath);

            if (!resource.exists()) {
                throw new FileNotFoundException("Resource not found: " + resourcePath);
            }

            try (InputStream inputStream = resource.getInputStream()) {
                return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            logger.error("Error reading resource: " + resourcePath, e);
            throw e;
        }
    }

    /**
     * Read resource file as Byte Array
     * @param resourcePath Path to the resource
     * @return Content of the resource as byte array
     * @throws IOException If resource cannot be read
     */
    public byte[] readResourceAsBytes(String resourcePath) throws IOException {
        try {
            ClassPathResource resource = new ClassPathResource(resourcePath);

            if (!resource.exists()) {
                throw new FileNotFoundException("Resource not found: " + resourcePath);
            }

            try (InputStream inputStream = resource.getInputStream()) {
                return inputStream.readAllBytes();
            }
        } catch (IOException e) {
            logger.error("Error reading resource bytes: " + resourcePath, e);
            throw e;
        }
    }

    /**
     * Extract resource to a temporary file
     * @param resourcePath Path to the resource
     * @return Temporary File containing resource content
     * @throws IOException If resource extraction fails
     */
    public File extractResourceToTempFile(String resourcePath) throws IOException {
        try {
            ClassPathResource resource = new ClassPathResource(resourcePath);

            if (!resource.exists()) {
                throw new FileNotFoundException("Resource not found: " + resourcePath);
            }

            // Create temp file
            String fileName = resource.getFilename();
            String prefix = fileName;
            String suffix = "";

            int dotIndex = fileName.lastIndexOf('.');
            if (dotIndex > 0) {
                prefix = fileName.substring(0, dotIndex);
                suffix = fileName.substring(dotIndex);
            }

            File tempFile = File.createTempFile(prefix, suffix);
            tempFile.deleteOnExit();

            // Copy resource to temp file
            try (InputStream inputStream = resource.getInputStream();
                 FileOutputStream outputStream = new FileOutputStream(tempFile)) {
                FileCopyUtils.copy(inputStream, outputStream);
            }

            return tempFile;
        } catch (IOException e) {
            logger.error("Error extracting resource to temp file: " + resourcePath, e);
            throw e;
        }
    }

    /**
     * Read Private Key from PEM file
     * @param resourcePath Path to the PEM file
     * @return PrivateKey object
     * @throws Exception If key reading fails
     */
        public PrivateKey readPrivateKeyFromPEM(String resourcePath) throws Exception {
        // Read the PEM file content
        String pemContent = readResourceAsString(resourcePath);

        // Remove PEM headers and footers
        String privateKeyPEM = pemContent
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");

        // Decode Base64
        byte[] encodedPrivateKey = Base64.getDecoder().decode(privateKeyPEM);

        // Create PrivateKey
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encodedPrivateKey);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(keySpec);
    }

    /**
     * Get Input Stream for a resource
     * @param resourcePath Path to the resource
     * @return InputStream of the resource
     * @throws IOException If resource cannot be accessed
     */
    public InputStream getResourceAsStream(String resourcePath) throws IOException {
        ClassPathResource resource = new ClassPathResource(resourcePath);

        if (!resource.exists()) {
            throw new FileNotFoundException("Resource not found: " + resourcePath);
        }

        return resource.getInputStream();
    }
}

