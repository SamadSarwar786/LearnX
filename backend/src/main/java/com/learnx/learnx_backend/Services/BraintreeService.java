package com.learnx.learnx_backend.Services;

import com.braintreegateway.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BraintreeService {

    @Autowired
    private BraintreeGateway gateway;

    public String generateClientToken() {
        return gateway.clientToken().generate();
    }

    public Result<Transaction> processPayment(String nonce, double amount) {
        TransactionRequest request = new TransactionRequest()
                .amount(new java.math.BigDecimal(amount))
                .paymentMethodNonce(nonce)
                .options()
                .submitForSettlement(true)
                .done();

        return gateway.transaction().sale(request);
    }
}

