/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import hy499.ptixiaki.data.Listing;
import hy499.ptixiaki.api.ServerResponseAPI;
import hy499.ptixiaki.data.Professional.Locations;
import java.sql.Array;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public final class ListingDB implements DB<Listing> {

    public ListingDB() throws SQLException {
        try {
            initListingDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ReviewDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void initListingDB() throws ClassNotFoundException, SQLException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();
                createQuery.append("CREATE TABLE IF NOT EXISTS LISTING (")
                        .append(" LID       VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" UID       VARCHAR(50)    NOT NULL,")
                        .append(" TITLE    VARCHAR(100)    NOT NULL, ")
                        .append(" DESCRIPTION  TEXT, ")
                        .append(" PICS  TEXT[], ")
                        .append(" START  TIMESTAMP    NOT NULL, ")
                        .append(" EXPIRE  TIMESTAMP   NOT NULL, ")
                        .append(" LOCATION  VARCHAR(50) NOT NULL, ")
                        .append(" CATEGORY  VARCHAR(50) NOT NULL, ")
                        .append(" MAX_PRICE    REAL NOT NULL, ")
                        .append(" CREATED   TIMESTAMP)");
                stmt.executeUpdate(createQuery.toString());
                System.out.println("#ListingDB: Table Listing Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public Listing resToType(ResultSet res) {
        Listing listing = new Listing();
        try {
            listing.setLID(res.getString("LID"));
            listing.setUID(res.getString("UID"));
            listing.setTitle(res.getString("TITLE"));
            listing.setDescription(res.getString("DESCRIPTION"));
            Array a = res.getArray("PICS");
            String[][] str = (String[][]) a.getArray();
            listing.setPics(new ArrayList<>(Arrays.asList(str[0])));
            listing.setAvailable_from(res.getTimestamp("START"));
            listing.setAvailable_until(res.getTimestamp("EXPIRE"));
            listing.setLocation(Locations.valueOf(res.getString("LOCATION")));
            listing.setJobCategory(res.getString("CATEGORY"));
            listing.setMax_price(res.getDouble("MAX_PRICE"));
        } catch (SQLException ex) {
            Logger.getLogger(ListingDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return listing;
    }
    
    public ServerResponseAPI search(String query, String filters)throws ClassNotFoundException {
        ServerResponseAPI serverRes = new ServerResponseAPI();
        Map<String, Listing> listings = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM LISTING ")
                        .append(" WHERE ");
                if(query!=null) {
                    getQuery.append(" to_tsvector(title) ").append("@@ to_tsquery('").append(query).append("') ");
                }
                getQuery.append(filters).append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Listing listing = resToType(res);
                    listings.put(listing.getLID(), listing);
                }
            }
            serverRes.setMsg("Search Listings");
            serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);
            serverRes.setData(new GsonBuilder().setDateFormat("YYYY-MM-DD'T'hh:mm").create().toJsonTree(listings.values()).getAsJsonArray());

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    public ServerResponseAPI getUserListings(String UID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = new ServerResponseAPI();
        Map<String, Listing> listings = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM LISTING ")
                        .append("WHERE UID = ").append("'").append(UID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Listing listing = resToType(res);
                    listings.put(listing.getLID(), listing);
                }
            }
            serverRes.setMsg("User Listings");
            serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);
            serverRes.setData(new GsonBuilder().setDateFormat("YYYY-MM-DD'T'hh:mm").create().toJsonTree(listings.values()).getAsJsonArray());

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI get(String ID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = new ServerResponseAPI();
        Listing listing = new Listing();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM LISTING ")
                        .append("WHERE LID = ").append("'").append(ID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    listing = resToType(res);
                }
            }
            serverRes.setMsg("All Listings");
            serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);
            serverRes.setData(new GsonBuilder().setDateFormat("YYYY-MM-DD'T'hh:mm").create().toJsonTree(listing));

        } catch (SQLException ex) {
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
        ServerResponseAPI serverRes = new ServerResponseAPI();
        Map<String, Listing> listings = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM LISTING").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Listing listing = resToType(res);
                    listings.put(listing.getLID(), listing);
                }
            }
            serverRes.setMsg("All Listings");
            serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);
            serverRes.setData(new GsonBuilder().setDateFormat("YYYY-MM-DD'T'hh:mm").create().toJsonTree(listings.values()).getAsJsonArray());

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI add(Listing listing) throws ClassNotFoundException {
        ServerResponseAPI serverRes = new ServerResponseAPI();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                Date date = new Date();
                Timestamp timestamp = new Timestamp(date.getTime());
                StringBuilder insQuery = new StringBuilder();
                ArrayList<String> pics = listing.getPics();

                insQuery.append("INSERT INTO ")
                        .append(" LISTING ( LID, UID, TITLE, DESCRIPTION, PICS, START, ")
                        .append("EXPIRE, LOCATION, CATEGORY, MAX_PRICE, CREATED) ")
                        .append(" VALUES (")
                        .append("'").append(listing.getLID()).append("',")
                        .append("'").append(listing.getUID()).append("',")
                        .append("'").append(listing.getTitle()).append("',")
                        .append("'").append(listing.getDescription()).append("',")
                        .append("'{");

                for (int i = 0; i < pics.size(); i++) {
                    insQuery.append("{\"").append(pics.get(i)).append("\"}");
                    if (i < pics.size() - 1) {
                        insQuery.append(",");
                    }
                }

                insQuery.append("}',")
                        .append("'").append(listing.getAvailable_from()).append("',")
                        .append("'").append(listing.getAvailable_until()).append("',")
                        .append("'").append(listing.getLocation()).append("',")
                        .append("'").append(listing.getJobCategory()).append("',")
                        .append(listing.getMax_price()).append(",")
                        .append("'").append(timestamp).append("');");
                System.out.println("SQL:" + insQuery.toString());
                stmt.executeUpdate(insQuery.toString());
                System.out.println("#ListingDB: Listing added");

                serverRes.setMsg("Listing Added");
                serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);
                serverRes.setResourceId(listing.getLID());

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
            serverRes.setMsg("Invalid Data");
            serverRes.setStatus(ServerResponseAPI.Status.ERROR);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI edit(Listing listing) throws ClassNotFoundException {
        ServerResponseAPI serverRes = new ServerResponseAPI();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder updQuery = new StringBuilder();

                updQuery.append("UPDATE LISTING ")
                        .append(" SET ")
                        .append(" TITLE = ").append("'").append(listing.getTitle()).append("',")
                        .append(" DESCRIPTION = ").append("'").append(listing.getDescription()).append("',")
                        .append(" PICS = ").append("'{");

                for (int i = 0; i < listing.getPics().size(); i++) {
                    updQuery.append("\"").append(listing.getPics().get(i)).append("\"");
                    if (i < listing.getPics().size() - 1) {
                        updQuery.append(",");
                    }
                }

                updQuery.append("}',")
                        .append(" START = ").append("'").append(listing.getAvailable_from()).append("',")
                        .append(" EXPIRE = ").append("'").append(listing.getAvailable_until()).append("',")
                        .append(" LOCATION = ").append("'").append(listing.getLocation()).append("',")
                        .append(" CATEGORY = ").append("'").append(listing.getJobCategory()).append("',")
                        .append(" MAX_PRICE = ").append(listing.getMax_price())
                        .append(" WHERE LID = ").append("'").append(listing.getLID()).append("';");

                stmt.executeUpdate(updQuery.toString());
                System.out.println("#ListingDB: Listing Updated, LID: " + listing.getLID());

                serverRes.setMsg("Listing Edited");
                serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
            serverRes.setMsg("Invalid Data");
            serverRes.setStatus(ServerResponseAPI.Status.ERROR);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI delete(String LID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = new ServerResponseAPI();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM LISTING ")
                        .append(" WHERE LID = ").append("'").append(LID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#ListingDB: Listing Deleted, LID: " + LID);

                serverRes.setMsg("Listing Deleted");
                serverRes.setStatus(ServerResponseAPI.Status.SUCCESS);

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
            serverRes.setMsg("Invalid Data");
            serverRes.setStatus(ServerResponseAPI.Status.ERROR);
        }
        return serverRes;
    }
}
