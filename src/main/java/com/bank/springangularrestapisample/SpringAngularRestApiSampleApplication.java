package com.bank.springangularrestapisample;

import com.bank.springangularrestapisample.entities.Payment;
import com.bank.springangularrestapisample.entities.PaymentStatus;
import com.bank.springangularrestapisample.entities.PaymentType;
import com.bank.springangularrestapisample.entities.Student;
import com.bank.springangularrestapisample.repository.PaymentRepository;
import com.bank.springangularrestapisample.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class SpringAngularRestApiSampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringAngularRestApiSampleApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository,
                                        PaymentRepository paymentRepository){
        return args -> {
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112234").firstName("Ibrahim").lastName("Mohamed").programId("SDIA").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112235").firstName("Abdel").lastName("Imane").programId("SDIA").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112236").firstName("Sofia").lastName("Yasmine").programId("GLSID").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112237").firstName("Jahira").lastName("Najat").programId("BDCC").build());

            PaymentType[] paymentTypes = PaymentType.values();
            Random random = new Random();

            studentRepository.findAll().forEach(st->{
                for (int i = 0; i < 10; i++){
                    int index = random.nextInt(paymentTypes.length);
                    Payment payment = Payment.builder()
                            .amount(1000 + (int)(Math.random()+20000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .date(LocalDate.now())
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
                }
            );

        };
    }
}
