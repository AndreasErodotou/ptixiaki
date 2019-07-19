/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.data;

import java.util.Date;

/**
 *
 * @author Andreas
 */
public class Professional extends User {

    private String job;
    private String workExperience;
//    private Map<String, TimetableEvent> timetable;
    private Locations sLocations;

    Professional(String name, String surname, String username, User.AccountType accountType, User.Gender gender, String UID, Date bday, String address, String email, String phoneNum) {
        super(name, surname, username, accountType, gender, UID, bday, address, email, phoneNum);
    }

    public Professional() {
        job = "";
        workExperience = "";
//        timetable = new HashMap<>();
        sLocations = null;
    }

    public enum Locations {
        HERAKLION, NICOSIA, LARNAKA
    };

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(String workExperience) {
        this.workExperience = workExperience;
    }

//    public Map<String, TimetableEvent> getTimetable() {
//        return timetable;
//    }
//
//    public void setTimetable(Map<String, TimetableEvent> timetable) {
//        this.timetable = timetable;
//    }

    public Locations getsLocations() {
        return sLocations;
    }

    public void setsLocations(Locations sLocations) {
        this.sLocations = sLocations;
    }

}
