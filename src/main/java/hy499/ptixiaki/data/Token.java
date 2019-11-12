/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.data;

import hy499.ptixiaki.data.User.AccountType;
import java.util.Date;

/**
 *
 * @author Andreas
 */
public class Token {

    private String token;
    private String UserId;
    private AccountType accountType;
    private Date expiration;

    public Token() {
    }

    public Token(String token, String UserId, AccountType accountType, Date expiration) {
        this.token = token;
        this.UserId = UserId;
        this.accountType = accountType;
        this.expiration = expiration;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String UserId) {
        this.UserId = UserId;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

}
