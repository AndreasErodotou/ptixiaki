/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import com.google.gson.Gson;
import hy499.ptixiaki.api.ServerResponseAPI;
import hy499.ptixiaki.api.ServerResponseAPI.Status;
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
public final class UserDB implements DB<User> {

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

    @Override
    public User resToType(ResultSet res) throws SQLException {
        User user;
        if (AccountType.valueOf(res.getString("ACCOUNT_TYPE")) == CUSTOMER) {
            Customer cust = new Customer();
            cust.setUID(res.getString("UID"));
            cust.setName(res.getString("NAME"));
            cust.setSurname(res.getString("SURNAME"));
            cust.setUsername(res.getString("USERNAME"));
            cust.setGender(Gender.valueOf(res.getString("GENDER")));
            cust.setBday(res.getDate("BDAY"));
            cust.setAddress(res.getString("ADDRESS"));
            cust.setEmail(res.getString("EMAIL"));
            cust.setPhoneNum(res.getString("PHONE_NUM"));
            cust.setPassword(res.getString("PASSWORD"));
            user = cust;
        } else {
            Professional prof = new Professional();
            prof.setUID(res.getString("UID"));
            prof.setName(res.getString("NAME"));
            prof.setSurname(res.getString("SURNAME"));
            prof.setUsername(res.getString("USERNAME"));
            prof.setGender(Gender.valueOf(res.getString("GENDER")));
            prof.setBday(res.getDate("BDAY"));
            prof.setAddress(res.getString("ADDRESS"));
            prof.setEmail(res.getString("EMAIL"));
            prof.setPhoneNum(res.getString("PHONE_NUM"));
            prof.setPassword(res.getString("PASSWORD"));
            prof.setJobs(res.getString("JOB"));
            prof.setWorkExperience(res.getDouble("WORK_EXP"));
            prof.setAboutMe(res.getString("ABOUT_ME"));
            prof.setsLocations(Locations.valueOf(res.getString("SERVE_LOC")));
            user = prof;
        }
        return user;
    }

    public ServerResponseAPI getCustomers() throws ClassNotFoundException {
        Map<String, Customer> customers = new HashMap<>();
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM CUSTOMER").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Customer cust = (Customer) resToType(res);
                    customers.put(cust.getUID(), cust);
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "All Customers", new Gson().toJsonTree(customers));

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    public ServerResponseAPI getProfessionals() throws ClassNotFoundException {
        Map<String, Professional> professionals = new HashMap<>();
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM PROFESSIONAL").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Professional prof = (Professional) resToType(res);
                    professionals.put(prof.getUID(), prof);
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "All Professionals", new Gson().toJsonTree(professionals));
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    public ServerResponseAPI checkEmail(String email) throws ClassNotFoundException {
        boolean isAvailable = false;
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder checkQuery = new StringBuilder();

                checkQuery.append("SELECT * FROM CUSTOMER ")
                        .append(" WHERE EMAIL = ").append("'").append(email).append("';");

                stmt.execute(checkQuery.toString());
                if (stmt.getResultSet().next() == true) {
                    System.out.println("#UserDB: email: " + email + " already exists");
                } else {
                    isAvailable = true;
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "Username is " + ((isAvailable) ? "" : "un") + "available");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    public ServerResponseAPI checkUsername(String username) throws ClassNotFoundException {
        boolean isAvailable = false;
        ServerResponseAPI serverRes;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder checkQuery = new StringBuilder();

                checkQuery.append("SELECT * FROM CUSTOMER ")
                        .append(" WHERE USERNAME = ").append("'").append(username).append("';");

                stmt.execute(checkQuery.toString());
                if (stmt.getResultSet().next() == true) {
                    System.out.println("#UserDB: username: " + username + " already exists");
                } else {
                    isAvailable = true;
                }

                serverRes = new ServerResponseAPI(Status.SUCCESS, "Username is " + ((isAvailable) ? "" : "un") + "available");

                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            serverRes = new ServerResponseAPI(Status.ERROR, "SQL Error");
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    public User checkLogin(String email, String password) throws ClassNotFoundException {
        User authUser = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder checkQuery = new StringBuilder();

                checkQuery.append("SELECT * FROM CUSTOMER, PROFESSIONAL ")
                        .append(" WHERE (CUSTOMER.EMAIL = ").append("'").append(email).append("'")
                        .append(" and CUSTOMER.PASSWORD = ").append("'").append(password).append("')")
                        .append(" or (PROFESSIONAL.EMAIL = ").append("'").append(email).append("'")
                        .append(" and PROFESSIONAL.PASSWORD = ").append("'").append(password).append("');");

                stmt.execute(checkQuery.toString());

                ResultSet res = stmt.getResultSet();

                if (res.next() == true) {
                    authUser = resToType(res);
                }

                System.out.println("#UserDB: login successfully");

                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return authUser;
    }

    @Override
    public ServerResponseAPI get(String UID) throws ClassNotFoundException {
        User user = null;
        ServerResponseAPI serverRes;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM CUSTOMER")
                        .append("WHERE ").append("UID = ").append("'").append(UID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                user = resToType(res);

                if (user == null) {
                    getQuery = new StringBuilder();

                    getQuery.append("SELECT * FROM PROFESSIONAL")
                            .append("WHERE ").append("UID = ").append("'").append(UID).append("';");

                    stmt.execute(getQuery.toString());

                    res = stmt.getResultSet();
                    user = resToType(res);
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "User", new Gson().toJsonTree(user));

                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            serverRes = new ServerResponseAPI(Status.ERROR, "User", new Gson().toJsonTree(user));
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI getQuery(String query) throws ClassNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ServerResponseAPI getAll() throws ClassNotFoundException {
        Map<String, User> users = new HashMap<>();
        ServerResponseAPI serverRes;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM CUSTOMER").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    User cust = resToType(res);
                    users.put(cust.getUID(), cust);
                }

                getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM PROFESSIONAL").append(";");

                stmt.execute(getQuery.toString());

                res = stmt.getResultSet();

                while (res.next() == true) {
                    User prof = resToType(res);
                    users.put(prof.getUID(), prof);
                }

                serverRes = new ServerResponseAPI(Status.SUCCESS, "All Users", new Gson().toJsonTree(users));
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            serverRes = new ServerResponseAPI(Status.ERROR, "All Users SQL Error");
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI add(User user) throws ClassNotFoundException {
        ServerResponseAPI serverRes;
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
                            .append("'").append(prof.getJobs()).append("',")
                            .append(prof.getWorkExperience()).append(",")
                            .append("'").append(prof.getAboutMe()).append("',")
                            .append("'").append(prof.getsLocations()).append("',")
                            .append("'").append(timestamp).append("');");

                }

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#UserDB: User added");

                serverRes = new ServerResponseAPI(Status.SUCCESS, "User Added");
                serverRes.setResourceId(user.getUID());
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            serverRes = new ServerResponseAPI(Status.SUCCESS, "User Add Error");
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI edit(User user) throws ClassNotFoundException {
        ServerResponseAPI serverRes;
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
                            .append(" JOB = ").append("'").append(prof.getJobs()).append("',")
                            .append(" WORK_EXP = ").append(prof.getWorkExperience()).append(",")
                            .append(" ABOUT_ME = ").append("'").append(prof.getAboutMe()).append("',")
                            .append(" SERVE_LOC = ").append("'").append(prof.getsLocations()).append("'")
                            .append(" WHERE UID = ").append("'").append(prof.getUID()).append("';");
                }
                stmt.executeUpdate(updQuery.toString());
                System.out.println("#UserDB: User Updated, UID: " + user.getUID());

                serverRes = new ServerResponseAPI(Status.SUCCESS, "User Edited");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            serverRes = new ServerResponseAPI(Status.ERROR, "User Edit Error");
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI delete(String UID) throws ClassNotFoundException {
        ServerResponseAPI serverRes;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {
                StringBuilder delQuery = new StringBuilder();
//                if (accType == CUSTOMER) {
                    delQuery.append("DELETE FROM CUSTOMER ")
                            .append(" WHERE UID = ").append("'").append(UID).append("';");
//                } else {
                    delQuery.append("DELETE FROM PROFESSIONAL ")
                            .append(" WHERE UID = ").append("'").append(UID).append("';");
//                }
                stmt.executeUpdate(delQuery.toString());
                System.out.println("#UserDB: User Deleted, UID: " + UID);

                serverRes = new ServerResponseAPI(Status.SUCCESS, "User Deleted");
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            serverRes = new ServerResponseAPI(Status.ERROR, "There Are No Such User");
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

}
