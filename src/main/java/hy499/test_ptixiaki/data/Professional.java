/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.test_ptixiaki.data;

/**
 *
 * @author Andreas
 */
public class Professional extends Users {

    private String job;
    private String workExperience;
    private Timetable timetable;
    private Locations sLocations;

    public enum Locations {
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

    public Timetable getTimetable() {
        return timetable;
    }

    public void setTimetable(Timetable timetable) {
        this.timetable = timetable;
    }

    public Locations getsLocations() {
        return sLocations;
    }

    public void setsLocations(Locations sLocations) {
        this.sLocations = sLocations;
    }

}
