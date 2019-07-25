/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import com.google.gson.Gson;
import hy499.ptixiaki.data.TimetableEvent;
import hy499.ptixiaki.response.ServerResponse;
import hy499.ptixiaki.response.ServerResponse.Status;
import hy499.ptixiaki.services.TimetableService;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class TimetableAPI {
    private TimetableService timetableService;

    public TimetableAPI() throws ClassNotFoundException {
        timetableService = new TimetableService();
    }

    public String createResponse(Response res, Map<String, TimetableEvent> timetableEvents) {
        if (!timetableEvents.isEmpty()) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            timetableService.getTimetableMsg(),
                            new Gson().toJsonTree(timetableEvents)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.WARINING,
                        timetableService.getTimetableMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, TimetableEvent timetableEvent, Boolean bool) {
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            timetableService.getTimetableMsg(),
                            new Gson().toJsonTree(timetableEvent)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.ERROR,
                        timetableService.getTimetableMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String getReqHandler(Request req, Response res) {
        if (req.queryParams("LID") != null) {
            return getATimetableEvent(req, res);
        } else if (req.queryParams("UID") != null) {
            return getAllUserEvents(req, res);
        }
        return getAllTimetableEvents(req, res);
    }

    public String getAllTimetableEvents(Request req, Response res) {
        Map<String, TimetableEvent> timetableEvents = timetableService.getTimetableEvents();
        return createResponse(res, timetableEvents);
    }

    public String getAllUserEvents(Request req, Response res) {
        String UID = req.queryParams("UID");
        Map<String, TimetableEvent> timetableEvents = timetableService.getUserTimetableEvents(UID);
        return createResponse(res, timetableEvents);
    }

    public String getATimetableEvent(Request req, Response res) {
        String LID = req.queryParams("LID");
        TimetableEvent timetableEvent = timetableService.getTimetableEvent(LID);
        return createResponse(res, timetableEvent, timetableEvent != null);
    }


    public String addATimetableEvent(Request req, Response res) throws ClassNotFoundException {
        TimetableEvent timetableEvent = new Gson().fromJson(req.body(), TimetableEvent.class);
        return createResponse(res, timetableEvent, timetableService.addTimetableEvent(timetableEvent));
    }

    public String editATimetableEvent(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        TimetableEvent timetableEvent = new Gson().fromJson(req.body(), TimetableEvent.class);
        timetableEvent.setLID(LID);
        TimetableEvent editedEvent = timetableService.editTimetableEvent(timetableEvent);
        return createResponse(res, editedEvent, editedEvent != null);
    }

    public String deleteATimetableEvent(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        TimetableEvent timetableEvent = timetableService.deleteTimetableEvent(LID);
        return createResponse(res, timetableEvent, timetableEvent != null);
    }

    public TimetableService getBidService() {
        return timetableService;
    }

    public void setBidService(TimetableService timetableService) {
        this.timetableService = timetableService;
    }
}
