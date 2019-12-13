/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import com.google.gson.Gson;
import hy499.ptixiaki.api.ServerResponseAPI;
import hy499.ptixiaki.data.Bid;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public final class BidDB implements DB<Bid> {

    public BidDB() {
        try {
            initBidDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(BidDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initBidDB() throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();

                createQuery.append("CREATE TABLE IF NOT EXISTS BID (")
                        .append(" BID           VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" UID           VARCHAR(50)    NOT NULL,")
                        .append(" LID           VARCHAR(50)    NOT NULL, ")
                        .append(" SOLUTION_DESCR  VARCHAR(50)  NOT NULL, ")
                        .append(" PRICE         REAL    NOT NULL, ")
                        .append(" TIME_TO_FIX   REAL   NOT NULL, ")
                        .append(" WHEN_P        DATE    NOT NULL, ")
                        .append(" SELECTED      BOOLEAN   NOT NULL, ")
                        .append(" CREATED       TIMESTAMP   NOT NULL)");
                stmt.executeUpdate(createQuery.toString());
                System.out.println("#BidDB: Table Bid Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public Bid resToType(ResultSet res) {
        Bid bid = new Bid();
        try {
            bid.setBID(res.getString("BID"));
            bid.setUID(res.getString("UID"));
            bid.setLID(res.getString("LID"));
            bid.setSolution_decription(res.getString("SOLUTION_DESCR"));
            bid.setPrice(res.getDouble("PRICE"));
            bid.setTime_to_fix(res.getDouble("TIME_TO_FIX"));
            bid.setWhen(res.getDate("WHEN_P"));
            bid.setSelected(res.getBoolean("SELECTED"));
        } catch (SQLException ex) {
            Logger.getLogger(BidDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return bid;
    }

    public Map<String, Bid> getListingBids(String LID) throws ClassNotFoundException {
        Map<String, Bid> bids = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * ")
                        .append("FROM BID ")
                        .append("WHERE LID = ").append("'").append(LID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    Bid bid = resToType(res);

                    bids.put(bid.getBID(), bid);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bids;

    }

    public Map<String, Bid> getUserBids(String UID) throws ClassNotFoundException {
        Map<String, Bid> bids = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM BID ")
                        .append("WHERE UID = ").append("'").append(UID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    Bid bid = resToType(res);
                    bids.put(bid.getBID(), bid);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bids;
    }

    public Map<String, Bid> getSelectedBids(Boolean Selected) throws ClassNotFoundException {
        Map<String, Bid> bids = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM BID ")
                        .append("WHERE Selected = ").append("'").append(Selected).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    Bid bid = resToType(res);
                    bids.put(bid.getBID(), bid);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bids;
    }

    public Map<String, Bid> getUserSelectedBids(Boolean Selected, String UID) throws ClassNotFoundException {
        Map<String, Bid> bids = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM BID ")
                        .append("WHERE Selected = ").append("'").append(Selected).append("'")
                        .append(" and UID = ").append("'").append(UID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    Bid bid = resToType(res);
                    bids.put(bid.getBID(), bid);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bids;
    }

    public Boolean deleteListingBids(String LID) throws ClassNotFoundException {
        Boolean deleted = false;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM BID ")
                        .append("WHERE LID = ").append("'").append(LID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#BidDB: Listing Bids Deleted, LID: " + LID);

                stmt.close();
                con.close();
                deleted = true;

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return deleted;
    }

    public Boolean deleteUserBids(String UID) throws ClassNotFoundException {
        Boolean deleted = false;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM BID ")
                        .append("WHERE UID = ").append("'").append(UID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#BidDB: User Bids Deleted, UID: " + UID);

                stmt.close();
                con.close();
                deleted = true;
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return deleted;
    }

    public int countBids() throws ClassNotFoundException {
        int listingBidsCount = 0;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT COUNT(*)")
                        .append("FROM BID").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    listingBidsCount = res.getInt("count");
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listingBidsCount;
    }

    public int countListingBids(String LID) throws ClassNotFoundException {
        int listingBidsCount = 0;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT COUNT(*)")
                        .append("FROM BID ")
                        .append("WHERE LID = ").append("'").append(LID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    listingBidsCount = res.getInt("count");
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listingBidsCount;
    }

    public int countUserBids(String UID) throws ClassNotFoundException {
        int listingBidsCount = 0;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT COUNT(*)")
                        .append("FROM BID ")
                        .append("WHERE UID = ").append("'").append(UID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    listingBidsCount = res.getInt("count");
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listingBidsCount;
    }

    public int countUserSelectedBids(Boolean Selected, String UID) throws ClassNotFoundException {
        int listingBidsCount = 0;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT COUNT(*)")
                        .append("FROM BID ")
                        .append("WHERE Selected = ").append("'").append(Selected).append("'")
                        .append(" and UID = ").append("'").append(UID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    listingBidsCount = res.getInt("count");
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listingBidsCount;
    }

    public int countSelectedBids(Boolean Selected) throws ClassNotFoundException {
        int listingBidsCount = 0;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT COUNT(*)")
                        .append("FROM BID ")
                        .append("WHERE Selected = ").append(Selected).append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    listingBidsCount = res.getInt("count");
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listingBidsCount;
    }

    @Override
    public ServerResponseAPI get(String BID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        Bid bid = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM BID ")
                        .append("WHERE BID = ").append("'").append(BID).append("';");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    bid = resToType(res);
                }

                serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "Bid", new Gson().toJsonTree(bid));
                stmt.close();
                con.close();
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI getQuery(String query) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        Map<String, Bid> bids = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM BID ")
                        .append("WHERE ").append(query).append(";");

                System.out.println("BD: " + getQuery.toString());
                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Bid bid = resToType(res);

                    bids.put(bid.getBID(), bid);
                }

                serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "Bid", new Gson().toJsonTree(bids));
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI getAll() throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        Map<String, Bid> bids = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM BID").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Bid bid = resToType(res);

                    bids.put(bid.getBID(), bid);
                }

                serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "All Bids", new Gson().toJsonTree(bids));
                stmt.close();
                con.close();
            }


        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI add(Bid bid) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        if (bid.checkFieldsBeforeAdd(bid)) {
            String uniqueBID = UUID.randomUUID().toString();
            bid.setBID(uniqueBID);
            try {
                try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                    Date date = new Date();
                    Timestamp timestamp = new Timestamp(date.getTime());
                    StringBuilder insQuery = new StringBuilder();

                    insQuery.append("INSERT INTO ")
                            .append(" BID ( BID, UID, LID, SOLUTION_DESCR, PRICE, TIME_TO_FIX, WHEN_P, SELECTED, CREATED) ")
                            .append(" VALUES (")
                            .append("'").append(bid.getBID()).append("',")
                            .append("'").append(bid.getUID()).append("',")
                            .append("'").append(bid.getLID()).append("',")
                            .append("'").append(bid.getSolution_decription()).append("',")
                            .append(bid.getPrice()).append(",")
                            .append(bid.getTime_to_fix()).append(",")
                            .append("'").append(bid.getWhen()).append("',")
                            .append(bid.getSelected()).append(",")
                            .append("'").append(timestamp).append("');");

                    stmt.executeUpdate(insQuery.toString());
                    System.out.println("#BidDB: BID added");

                    serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "Bid Added", new Gson().toJsonTree(bid));
                    stmt.close();
                    con.close();

                }

            } catch (SQLException ex) {
                Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI edit(Bid bid) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        if (bid.checkFieldsBeforeEdit(bid)) {
            try {
                try (Connection con = ConnectionDB.getDatabaseConnection();
                        Statement stmt = con.createStatement()) {

                    StringBuilder updQuery = new StringBuilder();
                    updQuery.append("UPDATE BID ")
                            .append(" SET ")
                            .append(" SOLUTION_DESCR = ").append("'").append(bid.getSolution_decription()).append("',")
                            .append(" PRICE = ").append(bid.getPrice()).append(",")
                            .append(" TIME_TO_FIX = ").append("'").append(bid.getTime_to_fix()).append("',")
                            .append(" WHEN_P = ").append("'").append(bid.getWhen()).append("',")
                            .append(" SELECTED = ").append("'").append(bid.getSelected()).append("'")
                            .append(" WHERE BID = ").append("'").append(bid.getBID()).append("';");

                    stmt.executeUpdate(updQuery.toString());
                    System.out.println("#BidDB: Bid Updated, BID: " + bid.getBID());

                    serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "Bid Edited", new Gson().toJsonTree(bid));
                    stmt.close();
                    con.close();

                }

            } catch (SQLException ex) {
                Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI delete(String BID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;

        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM BID ")
                        .append("WHERE BID = ").append("'").append(BID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#BidDB: Bid Deleted, BID: " + BID);

                serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "Bid Deleted");
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

}
