/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public final class UserDB {

    public UserDB() throws SQLException {
        try {
            initUserDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ReviewDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initUserDB() throws ClassNotFoundException, SQLException {

        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createCustomerQuery = new StringBuilder();
                createCustomerQuery.append("CREATE TABLE IF NOT EXISTS CUSTOMER (")
                        .append(" UID           VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" NAME          VARCHAR(50)    NOT NULL, ")
                        .append(" SURNAME       VARCHAR(50)    NOT NULL, ")
                        .append(" USERNAME      VARCHAR(50)    NOT NULL, ")
                        .append(" ACCOUNT_TYPE  VARCHAR(50)    NOT NULL, ")
                        .append(" GENDER        VARCHAR(50)    NOT NULL, ")
                        .append(" BDAY          DATE           NOT NULL, ")
                        .append(" ADDRESS       VARCHAR(50)    NOT NULL, ")
                        .append(" EMAIL         VARCHAR(50)    NOT NULL, ")
                        .append(" PHONE_NUM     VARCHAR(15)    NOT NULL, ")
                        .append(" PASSWORD      VARCHAR(30)    NOT NULL, ")
                        .append(" CREATED       TIMESTAMP)");
                stmt.executeUpdate(createCustomerQuery.toString());
                System.out.println("#UserDB: Table Customer Created");

                StringBuilder createProfQuery = new StringBuilder();
                createProfQuery.append("CREATE TABLE IF NOT EXISTS PROFESSIONAL (")
                        .append(" UID           VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" NAME          VARCHAR(50)    NOT NULL, ")
                        .append(" SURNAME       VARCHAR(50)    NOT NULL, ")
                        .append(" USERNAME      VARCHAR(50)    NOT NULL, ")
                        .append(" ACCOUNT_TYPE  VARCHAR(50)    NOT NULL, ")
                        .append(" GENDER        VARCHAR(50)    NOT NULL, ")
                        .append(" BDAY          DATE           NOT NULL, ")
                        .append(" ADDRESS       VARCHAR(50)    NOT NULL, ")
                        .append(" EMAIL         VARCHAR(50)    NOT NULL, ")
                        .append(" PHONE_NUM     VARCHAR(15)    NOT NULL, ")
                        .append(" PASSWORD      VARCHAR(30)    NOT NULL, ")
                        .append(" JOB           VARCHAR(50)    NOT NULL, ")
                        .append(" WORK_EXP      INT            NOT NULL, ")
                        .append(" ABOUT_ME      TEXT           NOT NULL, ")
                        .append(" SERVE_LOC     VARCHAR(50)    NOT NULL, ")
                        .append(" CREATED       TIMESTAMP)");
                stmt.executeUpdate(createProfQuery.toString());
                System.out.println("#UserDB: Table Professional Created");

                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
