package com.bank.springangularrestapisample.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String amount;

    private PaymentType type;

    private PaymentStatus status;

    @ManyToOne
    private Student student;

}
