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

    private String jobs;
    private Double workExperience;
    private String aboutMe;
    private Locations servedLoc;

    Professional(String name, String surname, String username, User.AccountType accountType, User.Gender gender, String UID, Date bday, String address, String email, String phoneNum, String password) {
        super(name, surname, username, accountType, gender, UID, bday, address, email, phoneNum, password);
    }

    public Professional() {
        super(AccountType.PROFESSIONAL);
        jobs = "";
        workExperience = -1.0;
        aboutMe = "";
        servedLoc = null;
    }

    public enum Locations {
        HERAKLION, NICOSIA, LARNAKA
    };

    public String getJobs() {
        return jobs;
    }

    public void setJobs(String jobs) {
        this.jobs = jobs;
    }

    public Double getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(Double workExperience) {
        this.workExperience = workExperience;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public Locations getsLocations() {
        return servedLoc;
    }

    public void setsLocations(Locations sLocations) {
        this.servedLoc = sLocations;
    }

}
