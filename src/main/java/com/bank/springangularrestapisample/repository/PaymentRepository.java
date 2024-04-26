package com.bank.springangularrestapisample.repository;

import com.bank.springangularrestapisample.entities.Payment;
import com.bank.springangularrestapisample.entities.PaymentStatus;
import com.bank.springangularrestapisample.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String code);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type );
}
