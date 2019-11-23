/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api;

import hy499.ptixiaki.data.Token;
import hy499.ptixiaki.data.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

/**
 *
 * @author Andreas
 */
public class JwtAPI {

    private final Key key;

    public JwtAPI() {
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String createJwt(String authUserId, String username, User.AccountType type) {
        long hour = 1000 * 3600;
        long tokenLife = 10 * (24 * hour);

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        long expMillis = nowMillis + tokenLife;
        Date exp = new Date(expMillis);

        JwtBuilder builder = Jwts.builder().setId(authUserId)
                .setIssuedAt(now)
                .setSubject(username)
                .setExpiration(exp)
                .claim("name", username)
                .claim("accountType", type.toString())
                .signWith(key);

        return builder.compact();
    }

    public Token parseJWT(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token).getBody();
        } catch (/*MalformedJwtException | ExpiredJwtException*/Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        return new Token(token, claims.getId(), User.AccountType.valueOf(String.valueOf(claims.get("accountType"))), claims.getExpiration());
    }

}
