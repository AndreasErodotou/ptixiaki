package hy499.ptixiaki.services;

import hy499.ptixiaki.data.TimetableEvent;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

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
    private Map<String, TimetableEvent> timetableEvents;
    private String timetableMsg;

    public TimetableService() {
        timetableEvents = new HashMap();
        timetableMsg = "";
    }

    public Boolean addTimetableEvent(TimetableEvent timetableEvent) {
        if (checkFieldsBeforeAdd(timetableEvent)) {
            timetableEvents.put(timetableEvent.getLID(), timetableEvent);
            timetableMsg = "Timetable Event Added";
            return true;
        }
        return false;
    }

    public TimetableEvent editTimetableEvent(TimetableEvent timetableEvent) {
        if (checkFieldsBeforeEdit(timetableEvent)) {
            TimetableEvent preExistEvent = getTimetableEvent(timetableEvent.getLID());
            if (preExistEvent != null) {
                if (timetableEvent.getDate() != null) {
                    preExistEvent.setDate(timetableEvent.getDate());
                }
                timetableMsg = "Timetable Event Edited";
                return preExistEvent;
            }
            timetableMsg = "Timetable Event Does Not Exist!!";
        }
        return null;
    }

    public TimetableEvent deleteTimetableEvent(String LID) {
        TimetableEvent timetableEvent = timetableEvents.remove(LID);
        if (timetableEvent != null) {
            timetableMsg = "Timetable Event Removed!!";
            return timetableEvent;
        } else {
            timetableMsg = "Timetable Event Does Not Exist!!";
        }
        return null;
    }

    public TimetableEvent getTimetableEvent(String LID) {
        return timetableEvents.get(LID);
    }

    public Map<String, TimetableEvent> getUserTimetableEvents(String UID) {
        Map<String, TimetableEvent> userEvents = new HashMap<>();
        Set<String> eventsKeys = timetableEvents.keySet();
        for (String key : eventsKeys) {
            if (timetableEvents.get(key).getUID().equals(UID)) {
                userEvents.put(key, timetableEvents.get(key));
            }
        }
        if (userEvents.isEmpty()) {
            timetableMsg = "There Are No Events For This User";
        } else {
            timetableMsg = "User Events";
        }
        return userEvents;
    }

    private Boolean checkFieldsBeforeEdit(TimetableEvent timetableEvent) {
        timetableMsg = "";
        if (timetableEvent != null) {
            if (timetableEvent.getLID() == null) {
                timetableMsg += "LID Cannot Be Blank\n";
            }
            if (timetableEvent.getUID() == null) {
                timetableMsg += "UID Cannot Be Blank\n";
            }
            if (timetableEvent.getDate() == null) {
                timetableMsg += "Date Cannot Be Blank\n";
            }
            return timetableMsg.isEmpty();
        }
        timetableMsg = "timetableEvent Cannot Be Null";
        return false;
    }

    public Boolean checkFieldsBeforeAdd(TimetableEvent timetableEvent) {
        timetableMsg = "";
        if (timetableEvent != null) {
            if (timetableEvent.getUID() == null) {
                timetableMsg += "UID Cannot Be Blank\n";
            }
            if (timetableEvent.getDate() == null) {
                timetableMsg += "Date Cannot Be Blank";
            }
            if (timetableEvent.getLID() == null) {
                timetableMsg += "LID Decription Cannot Be Blank\n";
            }
            if (timetableEvent.getDuration() <= 0) {
                timetableMsg += "Duration Cannot Be Less Than 1\n";
            }
            return timetableMsg.isEmpty();
        }
        timetableMsg = "timetableEvent Cannot Be Null";
        return false;
    }

    public String getTimetableMsg() {
        return timetableMsg;
    }

    public void setTimetableMsg(String tTableMsg) {
        this.timetableMsg = tTableMsg;
    }

    public Map<String, TimetableEvent> getTimetableEvents() {
        if (timetableEvents.isEmpty()) {
            timetableMsg = "There Are No Events";
        } else {
            timetableMsg = "Events";
        }
        return timetableEvents;
    }

    public void setTimetableEvents(Map<String, TimetableEvent> timetableEvents) {
        this.timetableEvents = timetableEvents;
    }

}
