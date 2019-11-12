/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.data;

import java.util.Date;

/**
 *
 * @author Andreas
 */
public class Customer extends User {

    public Customer(String name, String surname, String username, User.AccountType accountType, User.Gender gender, String UID, Date bday, String address, String email, String phoneNum, String password) {
        super(name, surname, username, accountType, gender, UID, bday, address, email, phoneNum, password);
    }

    public Customer(String name, String surname, String username, User.AccountType accountType, User.Gender gender, String UID, String address, String email, String phoneNum, String password) {
        super(name, surname, username, accountType, gender, UID, null, address, email, phoneNum, password);
    }

    public Customer() {
        super(AccountType.CUSTOMER);
    }

}
