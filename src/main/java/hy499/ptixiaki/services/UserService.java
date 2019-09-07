/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.services;

import hy499.ptixiaki.data.User;
import hy499.ptixiaki.db.UserDB;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 *
 * @author Andreas
 */
public class UserService {

    private Map<String, User> customers;
    private Map<String, User> professionals;
    private String userMsg;
    private final UserDB userDB;

    public UserService() throws SQLException, ClassNotFoundException {
        userMsg = "";
        userDB = new UserDB();
        customers = userDB.getCustomers();
        professionals = userDB.getProfessionals();
    }

    public Boolean addUser(User user) throws ClassNotFoundException {
        if (checkFieldsBeforeAdd(user)) {
            String uniqueID = UUID.randomUUID().toString();
            user.setUID(uniqueID);
            if (user.getAccountType().toString().equals("PROFESSIONAL")) {
                professionals.put(uniqueID, user);
            } else {
                customers.put(uniqueID, user);
            }
            userDB.addUser(user);
            userMsg = "User Added";
            return true;
        }
        return false;
    }

    public User getUser(String UID) {
        User cust = customers.get(UID);
        User prof = professionals.get(UID);
        if (cust != null) {
            userMsg = "User With UID: " + UID;
            return cust;
        } else if (prof != null) {
            userMsg = "User With UID: " + UID;
            return prof;
        } else {
            userMsg = "There Is No User With UID: " + UID;
        }
        return null;
    }

    public Map<String, User> getUsers() {
        Map<String, User> allUsers = new HashMap<>(customers);
        Set<String> profKeys = professionals.keySet();
        for (String key : profKeys) {
            allUsers.put(key, professionals.get(key));
        }
        if (allUsers.isEmpty()) {
            userMsg = "There Are No Users";
        } else {
            userMsg = "All Users";
        }
        return allUsers;
    }

    public User editUser(User user) throws ParseException, ClassNotFoundException {
        if (checkFieldsBeforeEdit(user)) {
            User preExistUser = getUser(user.getUID());
            if (preExistUser != null) {
                if (user.getUsername() != null && !user.getUsername().equals(preExistUser.getUsername())) {
                    preExistUser.setUsername(user.getUsername());
                }
                if (user.getAccountType() != null && !user.getAccountType().equals(preExistUser.getAccountType())) {
                    preExistUser.setAccountType(user.getAccountType());
                }
                if (user.getName() != null && !user.getName().equals(preExistUser.getName())) {
                    preExistUser.setName(user.getName());
                }
                if (user.getSurname() != null && !user.getSurname().equals(preExistUser.getSurname())) {
                    preExistUser.setSurname(user.getSurname());
                }
                if (user.getGender() != null && !user.getGender().equals(preExistUser.getGender())) {
                    preExistUser.setGender(user.getGender());
                }
                if (user.getUID() != null && !user.getUID().equals(preExistUser.getUID())) {
                    preExistUser.setUID(user.getUID());
                }
                if (user.getBday() != null && !user.getBday().equals(preExistUser.getBday())) {
                    preExistUser.setBday(user.getBday());
                }
                if (user.getAddress() != null && !user.getAddress().equals(preExistUser.getAddress())) {
                    preExistUser.setAddress(user.getAddress());
                }
                if (user.getEmail() != null && !user.getEmail().equals(preExistUser.getEmail())) {
                    preExistUser.setEmail(user.getEmail());
                }
                if (user.getPhoneNum() != null && !user.getPhoneNum().equals(preExistUser.getPhoneNum())) {
                    preExistUser.setPhoneNum(user.getPhoneNum());
                }
                userDB.updateUser(user);
                userMsg = "User Edited";
                return preExistUser;
            }
            userMsg = "User Does Not Exist!!";
        }
        return null;
    }

    public User deleteUser(String UID) throws ClassNotFoundException {
        User user0 = customers.remove(UID);
        User user1 = professionals.remove(UID);
        if (user0 != null) {
            userDB.deleteUser(UID, User.AccountType.CUSTOMER);
            userMsg = "User Removed!!";
            return user0;
        } else if (user1 != null) {
            userDB.deleteUser(UID, User.AccountType.PROFESSIONAL);
            userMsg = "User Removed!!";
            return user1;
        } else {
            userMsg = "User Does Not Exist!!";
        }
        return null;
    }

    private Boolean checkFieldsBeforeAdd(User user) {
        userMsg = "";
        if (user != null) {
            if (user.getName() == null || user.getName().isEmpty()) {
                userMsg += "Name Cannot Be Blank\n";
            }
            if (user.getSurname() == null || user.getSurname().isEmpty()) {
                userMsg += "Surname Cannot Be Blank\n";
            }
            if (user.getUsername() == null || user.getUsername().isEmpty()) {
                userMsg += "Username Cannot Be Blank\n";
            }
            if (user.getAccountType() == null) {
                userMsg += "Account Type Cannot Be Blank\n";
            }
            if (user.getGender() == null) {
                userMsg += "Gender Cannot Be Blank\n";
            }
            if (user.getBday() == null) {
                userMsg += "Birthday Cannot Be Blank\n";
            }
            if (user.getAddress() == null || user.getAddress().isEmpty()) {
                userMsg += "Address Cannot Be Blank\n";
            }
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                userMsg += "Email Cannot Be Blank\n";
            }
            if (user.getPhoneNum() == null || user.getPhoneNum().isEmpty()) {
                userMsg += "Phone Number Cannot Be Blank\n";
            }
            return userMsg.isEmpty();

        }
        userMsg = "User Cannot Be Null";
        return false;
    }

    private Boolean checkFieldsBeforeEdit(User user) {
        userMsg = "";
        if (user != null) {
            if (user.getUID() == null) {
                userMsg = "UID Cannot Be Blank\n";
            }
            return userMsg.isEmpty();
        }
        userMsg = "User Cannot Be Null";
        return false;
    }

    public Boolean checkEmailAvail(String email) throws ClassNotFoundException {
        Boolean isAvailable = userDB.checkEmail(email);
        if (isAvailable) {
            userMsg = "Email Is Available!";
        } else {
            userMsg = "Email Already Exists...";
        }
        return isAvailable;
    }

    public Boolean checkUsernameAvail(String username) throws ClassNotFoundException {
        Boolean isAvailable = userDB.checkUsername(username);
        if (isAvailable) {
            userMsg = "Username Is Available!";
        } else {
            userMsg = "Username Already Exists...";
        }
        return isAvailable;
    }

    public Boolean isProfessional(String UID) {
        return professionals.get(UID) != null;
    }

    public Boolean isCustomer(String UID) {
        return customers.get(UID) != null;
    }

    public Boolean userExist(String UID) {
        return getUser(UID) != null;
    }

    public Map<String, User> getCustomers() {
        if (customers.isEmpty()) {
            userMsg = "There Are No Customers";
        } else {
            userMsg = "All Customers";
        }
        return customers;
    }

    public void setCustomers(Map<String, User> customers) {
        this.customers = customers;
    }

    public Map<String, User> getProfessionals() {
        if (professionals.isEmpty()) {
            userMsg = "There Are No professionals";
        } else {
            userMsg = "All Professionals";
        }
        return professionals;
    }

    public void setProfessionals(Map<String, User> professionals) {
        this.professionals = professionals;
    }

    public String getUserMsg() {
        return userMsg;
    }

    public void setUserMsg(String userMsg) {
        this.userMsg = userMsg;
    }

}