package com.learnx.learnx_backend.Controllers;

import com.braintreegateway.Result;
import com.braintreegateway.Transaction;
import com.learnx.learnx_backend.Dtos.RequestDtos.PaymentRequest;
import com.learnx.learnx_backend.Dtos.ResponseDtos.GeneralResponse;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Services.BraintreeService;
import com.learnx.learnx_backend.Services.CourseService;
import com.learnx.learnx_backend.Services.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private BraintreeService braintreeService;

    @GetMapping("/client-token")
    public String getClientToken() {
        return braintreeService.generateClientToken();
    }

    @PostMapping("/process-payment")
    public ResponseEntity<GeneralResponse> processPayment(@Valid @RequestBody PaymentRequest paymentRequest, @AuthenticationPrincipal Student student) {
        GeneralResponse res = new GeneralResponse();
        try {
            Integer amount = courseService.getCourseById(paymentRequest.getCourseId()).getPrice();
            Result<Transaction> result = braintreeService.processPayment(paymentRequest.getNonce(), amount);

            if (result.isSuccess()) {
                Transaction transaction = result.getTarget();
                enrollmentService.enrollStudent(student, paymentRequest.getCourseId(), transaction.getId(), amount);
                res.setMessage("Payment successful! Transaction ID: " + transaction.getId());
                res.setStatus("success");
            } else {
                res.setMessage("Payment failed: " + result.getMessage());
                res.setStatus("failure");
            }
        } catch (Exception e) {
            res.setMessage(e.getMessage());
            res.setStatus("failure");
        }
        return ResponseEntity.ok(res);
    }
}




