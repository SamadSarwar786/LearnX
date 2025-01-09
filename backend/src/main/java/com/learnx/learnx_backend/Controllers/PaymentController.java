package com.learnx.learnx_backend.Controllers;

import com.braintreegateway.Result;
import com.braintreegateway.Transaction;
import com.learnx.learnx_backend.Dtos.RequestDtos.PaymentRequest;
import com.learnx.learnx_backend.Dtos.RequestDtos.PaymentResponse;
import com.learnx.learnx_backend.Services.BraintreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private BraintreeService braintreeService;

    @GetMapping("/client-token")
    public String getClientToken() {
        return braintreeService.generateClientToken();
    }

    @PostMapping("/process-payment")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest paymentRequest) {
        long amount = 50;
        Result<Transaction> result = braintreeService.processPayment(paymentRequest.getNonce(), amount);

        PaymentResponse res = new PaymentResponse();
        if (result.isSuccess()) {
            Transaction transaction = result.getTarget();
            res.setMessage("Payment successful! Transaction ID: " + transaction.getId());
            res.setStatus("success");
        } else {
            res.setMessage("Payment failed: " + result.getMessage());
            res.setStatus("failure");
        }
        return ResponseEntity.ok(res);
    }
}




