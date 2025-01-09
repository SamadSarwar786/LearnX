package com.learnx.learnx_backend.Config.Payments;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BraintreeConfig {
    @Value("${braintree.environment}")
    private String environment;

    @Value("${braintree.merchant.id}")
    private String merchantId;

    @Value("${braintree.public.key}")
    private String publicKey;

    @Value("${braintree.private.key}")
    private String privateKey;

    @Bean
    public BraintreeGateway braintreeGateway() {
        return new BraintreeGateway(
                environment.equals("sandbox") ? Environment.SANDBOX : Environment.PRODUCTION,
                merchantId,
                publicKey,
                privateKey
        );
    }
}
