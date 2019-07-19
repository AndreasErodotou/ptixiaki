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
public abstract class User {
    private String name;
    private String surname;
    private String username;
    private AccountType accountType;
    private Gender gender;
    private String UID;
    private Date bday;
    private String address;
    private String email;
    private String phoneNum;

    public User() {
        name = "";
        surname = "";
        username = "";
        accountType = null;
        gender = null;
        UID = "";
        bday = null;
        address = "";
        email = "";
        phoneNum = "";
    }

    public User(String name, String surname, String username, AccountType accountType, Gender gender, String UID, Date bday, String address, String email, String phoneNum) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.accountType = accountType;
        this.gender = gender;
        this.UID = UID;
        this.bday = bday;
        this.address = address;
        this.email = email;
        this.phoneNum = phoneNum;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public Date getBday() {
        return bday;
    }

    public void setBday(Date bday) {
        this.bday = bday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public enum Gender {
        MALE, FEMALE
    }

    public enum AccountType {
        CUSTOMER, PROFESSIONAL
    }

}
