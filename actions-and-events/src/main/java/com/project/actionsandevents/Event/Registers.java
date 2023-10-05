/**
 * This file contains class that implements Registers class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

import com.project.actionsandevents.User.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(RegistersId.class)
public class Registers {
    // @Id
    // @GeneratedValue
    // private Long id;
    @Id
    @ManyToOne
    private User user;

    @Id
    @ManyToOne
    private Event event;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String status;
}