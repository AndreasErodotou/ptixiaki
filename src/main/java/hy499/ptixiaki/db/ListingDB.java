/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.data.Listing;
import hy499.ptixiaki.data.Professional.Locations;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
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
public final class ListingDB {

    public ListingDB() throws SQLException {
        try {
            initListingDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ReviewDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initListingDB() throws ClassNotFoundException, SQLException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();
                createQuery.append("CREATE TABLE IF NOT EXISTS LISTING (")
                        .append(" LID       VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" UID       VARCHAR(50)    NOT NULL,")
                        .append(" TITLE    VARCHAR(100)    NOT NULL, ")
                        .append(" DESCRIPTION  TEXT, ")
                        //TEXT[]      =       '{"value 1", "value 2", "value 3"}';
                        .append(" PICS  TEXT[], ")
                        .append(" START  DATE   NOT NULL, ")
                        .append(" EXPIRE  DATE  NOT NULL, ")
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

    public Map<String, Listing> getListings() throws ClassNotFoundException {
        Map<String, Listing> listings = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM LISTING").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Listing listing = new Listing();
                    listing.setLID(res.getString("LID"));
                    listing.setUID(res.getString("UID"));
                    listing.setTitle(res.getString("TITLE"));
                    listing.setDescription(res.getString("DESCRIPTION"));
                    String strPics = res.getString("PICS").replaceAll("([{}])", "");
                    listing.setPics(new ArrayList<>(Arrays.asList(strPics.split(","))));
                    listing.setAvailable_from(res.getDate("START"));
                    listing.setAvailable_until(res.getDate("EXPIRE"));
                    listing.setLocation(Locations.valueOf(res.getString("LOCATION")));
                    listing.setJobCategory(res.getString("CATEGORY"));
                    listing.setMax_price(res.getDouble("MAX_PRICE"));


                    listings.put(listing.getLID(), listing);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listings;
    }

    public void addListing(Listing listing) throws ClassNotFoundException {
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
                    insQuery.append("\"").append(pics.get(i)).append("\"");
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

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#ListingDB: Listing added");

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void updateListing(Listing listing) throws ClassNotFoundException {
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

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void deleteListing(String LID) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM LISTING ")
                        .append(" WHERE LID = ").append("'").append(LID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#ListingDB: Listing Deleted, LID: " + LID);

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
