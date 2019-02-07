package hy499.test_ptixiaki.controller;

import hy499.test_ptixiaki.data.Users;
import java.util.HashMap;
import java.util.Map;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Andreas
 */
public class UserService {
    private Map<String, Users> allUsers;
    private Map<String, Users> customers;
    private Map<String, Users> professionals;

    UserService() {
        allUsers = new HashMap();
        customers = new HashMap();
        professionals = new HashMap();
    }
}
