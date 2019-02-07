package hy499.test_ptixiaki.controller;

import hy499.test_ptixiaki.data.Timetable;
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
public class TimetableService {
    private Map<String, Timetable> timetables;

    TimetableService() {
        timetables = new HashMap();
    }
}
