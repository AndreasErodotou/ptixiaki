/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api.data;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import hy499.ptixiaki.api.GsonUTCDateAdapter;
import hy499.ptixiaki.api.JwtAPI;
import hy499.ptixiaki.data.Listing;
import hy499.ptixiaki.data.Token;
import hy499.ptixiaki.db.ListingDB;
import hy499.ptixiaki.api.ServerResponseAPI;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class ListingAPI implements DataApi {

    private final ListingDB listingDB;

    public ListingAPI() throws ClassNotFoundException, SQLException {
        listingDB = new ListingDB();
    }

    //    private String getUserListings(Request req, Response res) throws ClassNotFoundException {
    //        String UID = req.params(":UID");
    //        return new Gson().toJson(listingDB.getUserListings(UID));
    //    }

    @Override
    public String get(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        return new Gson().toJson(listingDB.get(LID));
    }

    @Override
    public String getQuery(Request req, Response res) throws ClassNotFoundException {
        String filters = "";
        String query = null;
        Boolean putAnd = false;


        
        if (req.queryParams(":LID") != null) {
            return get(req, res);
        }
        
        if (req.queryParams("q") != null) {
            query = req.queryParams("q");
            query = query.replaceAll(",", "|");
            putAnd = true;
        }

        if(req.queryParams("locations")!=null){
            String locations = req.queryParams("locations").toUpperCase();
            filters += (putAnd?" and ":"") + "( LOCATION = '" + locations.replaceAll(",","' or LOCATION = '");
            filters +=  "') ";
            putAnd = true;
        }
       
        if(req.queryParams("categories")!=null){
            String categories = req.queryParams("categories").toLowerCase();
            filters += (putAnd?" and ":"") + "( CATEGORY = '" + categories.replaceAll(",","' or CATEGORY = '");
            filters += "') ";
            putAnd = true;
        }
        
        if(req.queryParams("min_price")!=null){
            String minPrice = req.queryParams("min_price").toLowerCase();
            filters += (putAnd?" and (":"") + " max_price >= '" + minPrice;
            filters += putAnd ? "') ":"'";
            putAnd = true;
        }
        
        if(req.queryParams("max_price")!=null){
            String maxPrice = req.queryParams("max_price").toLowerCase();
            filters += (putAnd?" and (":"") + " max_price <= '" + maxPrice;
            filters += putAnd ? "') ":"'";
            putAnd = true;
        }

        if(req.queryParams("order")!=null){
            String order = req.queryParams("order").toLowerCase();
            String tmpstr="";

            String pattern = "MM-dd-yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

            if(order.equals("ending-soon")){
                tmpstr=" expire >'"+new Date().toString() +"' and expire < '"+getNextDate(simpleDateFormat.format(new Date()));
            }else{
                tmpstr=" start >'"+simpleDateFormat.format(new Date()) +"' and start < '"+new Date().toString();
            }
            filters += (putAnd?" and (":"") + tmpstr;
            filters += putAnd ? "') ":"'";
            putAnd = true;
        }

        if (req.params(":UID") != null) {
            filters += (putAnd?" and (":"") + " UID = '" + req.params(":UID");
            filters += putAnd ? "') ":"'";
            putAnd = true;

            Token token = new JwtAPI().parseJWT(req.headers("Authorization"));
            if((token.getAccountType().toString().equals("PROFESSIONAL")) && (req.queryParams("selected") == null)){
                return new Gson().toJson(listingDB.getUserBidListings(" BID.UID = '" + req.params(":UID")+"'"));
            }else if (req.queryParams("selected") != null) {
                String tmpQuery;
                if(token.getAccountType().toString().equals("PROFESSIONAL")) {
                    tmpQuery =  " (BID.UID = '" + req.params(":UID") + "')";
                }else{
                    tmpQuery =  " (Listing.UID = '" + req.params(":UID") + "')";
                }
                tmpQuery += (putAnd?" and ":"") + " ( BID.selected = '" + req.queryParams("selected")+ "') ";
                if(req.queryParams("with_review") != null){
                    tmpQuery += (putAnd?" and ":"") + "(REVIEW.UID = '" + req.params(":UID") + "')";
                    return new Gson().toJson(listingDB.getUserReviewListings(tmpQuery,true));
                }else if(req.queryParams("without_review") != null){
                    tmpQuery += (putAnd?" and ":"") + " (REVIEW.LID IS NULL or REVIEW.UID != '" + req.params(":UID") + "') ";
                    return new Gson().toJson(listingDB.getUserReviewListings(tmpQuery,false));
                }else {
                    return new Gson().toJson(listingDB.getUserBidListings(tmpQuery));
                }
            }
        }
        
        if(putAnd){
            System.out.println("filters: " + filters);
            System.out.println("query: " + query);
            return new Gson().toJson(listingDB.search(query,filters));
        }
        
        return getAll(req, res);
    }

    public static String getNextDate(String  curDate) {
        final SimpleDateFormat format = new SimpleDateFormat("MM-dd-yyyy");
        Date date = null;
        try {
            date = format.parse(curDate);
        }catch (ParseException e){
            return null;
        }
        final Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        return format.format(calendar.getTime());
    }

    @Override
    public String getAll(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(listingDB.getAll());
    }

    @Override
    public String add(Request req, Response res) throws ClassNotFoundException {
        System.out.println("request body:" + req.body());
        Listing listing = new GsonBuilder().registerTypeAdapter(Date.class, new GsonUTCDateAdapter()).create().fromJson(req.body(), Listing.class);
        listing.setLID(UUID.randomUUID().toString());
        System.out.println("listing available from: "+listing.getAvailable_from());
        ServerResponseAPI serverRes = listingDB.add(listing);
        return new Gson().toJson(serverRes);
    }

    @Override
    public String edit(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        Listing listing = new GsonBuilder().registerTypeAdapter(Date.class, new GsonUTCDateAdapter()).create().fromJson(req.body(), Listing.class);
        listing.setLID(LID);
        return new Gson().toJson(listingDB.edit(listing));
    }

    @Override
    public String delete(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        return new Gson().toJson(listingDB.delete(LID));
    }
}