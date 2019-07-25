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
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
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
                stmt.close();
                con.close();
            }


        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return users;
    }

    public Map<String, User> getCustomers() throws ClassNotFoundException {
        Map<String, User> users = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM CUSTOMER").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

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
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return users;
    }

    public Map<String, User> getProfessionals() throws ClassNotFoundException {
        Map<String, User> users = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM PROFESSIONAL").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

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
                stmt.close();
                con.close();
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

    public void updateUser(User user) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder updQuery = new StringBuilder();

                if (user.getAccountType() == CUSTOMER) {
                    Customer cust = (Customer) user;
                    updQuery.append("UPDATE CUSTOMER ")
                            .append(" SET ")
                            .append(" NAME = ").append("'").append(cust.getName()).append("',")
                            .append(" SURNAME = ").append("'").append(cust.getSurname()).append("',")
                            .append(" ACCOUNT_TYPE = ").append("'").append(cust.getAccountType()).append("',")
                            .append(" ADDRESS = ").append("'").append(cust.getAddress()).append("',")
                            .append(" PASSWORD = ").append("'").append(cust.getPassword()).append("'")
                            .append(" WHERE UID = ").append("'").append(cust.getUID()).append("';");


                } else {
                    Professional prof = (Professional) user;
                    updQuery.append("UPDATE PROFESSIONAL ")
                            .append(" SET ")
                            .append(" NAME = ").append("'").append(prof.getName()).append("',")
                            .append(" SURNAME = ").append("'").append(prof.getSurname()).append("',")
                            .append(" ACCOUNT_TYPE = ").append("'").append(prof.getAccountType()).append("',")
                            .append(" ADDRESS = ").append("'").append(prof.getAddress()).append("',")
                            .append(" PASSWORD = ").append("'").append(prof.getPassword()).append("',")
                            .append(" JOB = ").append("'").append(prof.getJob()).append("',")
                            .append(" WORK_EXP = ").append(prof.getWorkExperience()).append(",")
                            .append(" ABOUT_ME = ").append("'").append(prof.getAboutMe()).append("',")
                            .append(" SERVE_LOC = ").append("'").append(prof.getsLocations()).append("'")
                            .append(" WHERE UID = ").append("'").append(prof.getUID()).append("';");
                }
                stmt.executeUpdate(updQuery.toString());
                System.out.println("#UserDB: User Updated, UID: " + user.getUID());

                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }



    public void deleteUser(String UID, AccountType accType) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();
                if (accType == CUSTOMER) {
                    delQuery.append("DELETE FROM CUSTOMER ")
                            .append(" WHERE UID = ").append("'").append(UID).append("';");
                } else {
                    delQuery.append("DELETE FROM PROFESSIONAL ")
                            .append(" WHERE UID = ").append("'").append(UID).append("';");
                }
                stmt.executeUpdate(delQuery.toString());
                System.out.println("#UserDB: User Deleted, UID: " + UID);

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
