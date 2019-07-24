/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.data.Customer;
import hy499.ptixiaki.data.Professional;
import hy499.ptixiaki.data.Professional.Locations;
import hy499.ptixiaki.data.User;
import hy499.ptixiaki.data.User.AccountType;
import static hy499.ptixiaki.data.User.AccountType.CUSTOMER;
import hy499.ptixiaki.data.User.Gender;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
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

    public Map<String, User> getUsers() throws ClassNotFoundException {
        Map<String, User> users = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM CUSTOMER").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

//                ( UID, NAME, SURNAME, USERNAME, ACCOUNT_TYPE, GENDER, BDAY, ADDRESS, EMAIL, ")
//                            .append("PHONE_NUM, PASSWORD, CREATED)
                while (res.next() == true) {
                    User cust = new Customer();
                    cust.setUID(res.getString("UID"));
                    cust.setName(res.getString("NAME"));
                    cust.setSurname(res.getString("SURNAME"));
                    cust.setUsername(res.getString("USERNAME"));
                    cust.setAccountType(AccountType.valueOf(res.getString("ACCOUNT_TYPE")));
                    cust.setGender(Gender.valueOf(res.getString("GENDER")));
                    cust.setBday(res.getDate("BDAY"));
                    cust.setAddress(res.getString("ADDRESS"));
                    cust.setEmail(res.getString("EMAIL"));
                    cust.setPhoneNum(res.getString("PHONE_NUM"));
                    cust.setPassword(res.getString("PASSWORD"));

                    users.put(cust.getUID(), cust);
                }

                getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM PROFESSIONAL").append(";");

                stmt.execute(getQuery.toString());

                res = stmt.getResultSet();

//                JOB, WORK_EXP, ABOUT_ME, SERVE_LOC,
                while (res.next() == true) {
                    Professional prof = new Professional();
                    prof.setUID(res.getString("UID"));
                    prof.setName(res.getString("NAME"));
                    prof.setSurname(res.getString("SURNAME"));
                    prof.setUsername(res.getString("USERNAME"));
                    prof.setAccountType(AccountType.valueOf(res.getString("ACCOUNT_TYPE")));
                    prof.setGender(Gender.valueOf(res.getString("GENDER")));
                    prof.setBday(res.getDate("BDAY"));
                    prof.setAddress(res.getString("ADDRESS"));
                    prof.setEmail(res.getString("EMAIL"));
                    prof.setPhoneNum(res.getString("PHONE_NUM"));
                    prof.setPassword(res.getString("PASSWORD"));
                    prof.setJob(res.getString("JOB"));
                    prof.setWorkExperience(res.getDouble("WORK_EXP"));
                    prof.setAboutMe(res.getString("ABOUT_ME"));
                    prof.setsLocations(Locations.valueOf(res.getString("SERVE_LOC")));

                    users.put(prof.getUID(), prof);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return users;
    }

    public void addUser(User user) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                Date date = new Date();
                Timestamp timestamp = new Timestamp(date.getTime());

                StringBuilder insQuery = new StringBuilder();

                if (user.getAccountType() == CUSTOMER) {
                    insQuery.append("INSERT INTO ")
                            .append(" CUSTOMER ( UID, NAME, SURNAME, USERNAME, ACCOUNT_TYPE, GENDER, BDAY, ADDRESS, EMAIL, ")
                            .append("PHONE_NUM, PASSWORD, CREATED) ")
                            .append(" VALUES (")
                            .append("'").append(user.getUID()).append("',")
                            .append("'").append(user.getName()).append("',")
                            .append("'").append(user.getSurname()).append("',")
                            .append("'").append(user.getUsername()).append("',")
                            .append("'").append(user.getAccountType()).append("',")
                            .append("'").append(user.getGender()).append("',")
                            .append("'").append(user.getBday()).append("',")
                            .append("'").append(user.getAddress()).append("',")
                            .append("'").append(user.getEmail()).append("',")
                            .append("'").append(user.getPhoneNum()).append("',")
                            .append("'").append(user.getPassword()).append("',")
                            .append("'").append(timestamp).append("');");
                } else {
                    Professional prof = (Professional) user;
                    insQuery.append("INSERT INTO ")
                            .append(" PROFESSIONAL ( UID, NAME, SURNAME, USERNAME, ACCOUNT_TYPE, GENDER, BDAY, ADDRESS, ")
                            .append("EMAIL, PHONE_NUM, PASSWORD, JOB, WORK_EXP, ABOUT_ME, SERVE_LOC, CREATED) ")
                            .append(" VALUES (")
                            .append("'").append(prof.getUID()).append("',")
                            .append("'").append(prof.getName()).append("',")
                            .append("'").append(prof.getSurname()).append("',")
                            .append("'").append(prof.getUsername()).append("',")
                            .append("'").append(prof.getAccountType()).append("',")
                            .append("'").append(prof.getGender()).append("',")
                            .append("'").append(prof.getBday()).append("',")
                            .append("'").append(prof.getAddress()).append("',")
                            .append("'").append(prof.getEmail()).append("',")
                            .append("'").append(prof.getPhoneNum()).append("',")
                            .append("'").append(prof.getPassword()).append("',")
                            .append("'").append(prof.getJob()).append("',")
                            .append(prof.getWorkExperience()).append(",")
                            .append("'").append(prof.getAboutMe()).append("',")
                            .append("'").append(prof.getsLocations()).append("',")
                            .append("'").append(timestamp).append("');");

                }

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#UserDB: User added");

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
