package com.bank.springangularrestapisample.services;

import com.bank.springangularrestapisample.entities.Payment;
import com.bank.springangularrestapisample.entities.PaymentStatus;
import com.bank.springangularrestapisample.entities.PaymentType;
import com.bank.springangularrestapisample.entities.Student;
import com.bank.springangularrestapisample.repository.PaymentRepository;
import com.bank.springangularrestapisample.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {

    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;

    public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }

    public Payment savePayment(MultipartFile file, LocalDate date, double amount,
                               PaymentType type, String studentCode) throws IOException {
//        Path folderPath = Paths.get(System.getProperty("user.home") + "/images", "payments");
        Path folderPath = Paths.get(System.getProperty("user.home") + File.separator + "app-data" + File.separator + "payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        // Validate file type
        if (!file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Invalid file type. Only PDF files are allowed.");
        }

        // Generate unique file name
        String fileName = UUID.randomUUID().toString();

        // Save the file
        Path filepath = Paths.get(System.getProperty("user.home"),"app-data", "payments", fileName + ".pdf");
        Files.copy(file.getInputStream(), filepath);

        // Save the payment record
        Student student = studentRepository.findByCode(studentCode);
        Payment payment = Payment.builder()
                .amount(amount)
                .date(date)
                .type(type)
                .status(PaymentStatus.CREATED)
                .student(student)
                .file(filepath.toUri().toString())
                .build();

        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(PaymentStatus status,Long id){
        Payment payment = paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public byte[] getPaymentFile(Long id) throws IOException {
        Payment payment = paymentRepository.findById(id).get();
        Path path = Paths.get(payment.getFile());
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }

}
