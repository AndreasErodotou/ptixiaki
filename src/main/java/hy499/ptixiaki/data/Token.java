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
    private String Username;
    private AccountType accountType;
    private Date expiration;
    private Date issuedAt;

    public Token() {
    }

    public Token(String token, String UserId, AccountType accountType, Date expiration) {
        this.token = token;
        this.UserId = UserId;
        this.accountType = accountType;
        this.expiration = expiration;
    }

    public Token(String token, String UserId, String Username, AccountType accountType, Date expiration, Date issuedAt) {
        this.token = token;
        this.UserId = UserId;
        this.Username = Username;
        this.accountType = accountType;
        this.expiration = expiration;
        this.issuedAt = issuedAt;
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

    public String getUsername() {
        return Username;
    }

    public void setUsername(String Username) {
        this.Username = Username;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
    }


}
