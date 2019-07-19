package hy499.ptixiaki.services;

import hy499.ptixiaki.data.Listing;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Andreas
 */
public class ListingService {
    private Map<String, Listing> listings;
    private String listingMsg;

    public ListingService() {
        listings = new HashMap();
        listingMsg = "";
    }

    public Boolean addListing(Listing listing) {
        if (checkFieldsBeforeAdd(listing)) {
            String uniqueLID = UUID.randomUUID().toString();
            listing.setLID(uniqueLID);
            listings.put(uniqueLID, listing);
            listingMsg = "Listing Added";
            return true;
        }
        return false;
    }

    public Listing editListing(Listing listing) {
        if (checkFieldsBeforeEdit(listing)) {
            Listing preExistListing = listings.get(listing.getLID());
            if (preExistListing != null) {
                if (listing.getAvailable_from()!= null && !listing.getAvailable_from().equals(preExistListing.getAvailable_from())) {
                    preExistListing.setAvailable_from(listing.getAvailable_from());
                }
                if (listing.getAvailable_until() != null && !listing.getAvailable_until().equals(preExistListing.getAvailable_until())) {
                    preExistListing.setAvailable_until(listing.getAvailable_until());
                }
                if (listing.getDescription() != null && !listing.getDescription().equals(preExistListing.getDescription())) {
                    preExistListing.setDescription(listing.getDescription());
                }
                if (listing.getJobCategory() != null && !listing.getJobCategory().equals(preExistListing.getJobCategory())) {
                    preExistListing.setJobCategory(listing.getJobCategory());
                }
                if (listing.getLocation() != null && !listing.getLocation().equals(preExistListing.getLocation())) {
                    preExistListing.setLocation(listing.getLocation());
                }
                if (listing.getMax_price() > 0 && listing.getMax_price() != preExistListing.getMax_price()) {
                    preExistListing.setMax_price(listing.getMax_price());
                }
//                if (listing.getPic() != null && !listing.getPic().equals(preExistListing.getPic())) {
//                    preExistListing.setPic(listing.getPic());
//                }
                if (listing.getTitle() != null && !listing.getTitle().equals(preExistListing.getTitle())) {
                    preExistListing.setTitle(listing.getTitle());
                }

                listingMsg = "Listing Edited";
                return preExistListing;
            }
            listingMsg = "Listing Does Not Exist!!";
        }
        return null;
    }

    public Listing deleteListing(String LID) {
        Listing listing = listings.remove(LID);
        if (listing != null) {
            listingMsg = "Listing Removed!!";
            return listing;
        } else {
            listingMsg = "Listing Does Not Exist!!";
        }
        return null;
    }

    private Boolean checkFieldsBeforeEdit(Listing listing) {
        listingMsg = "";
        if (listing != null) {
            if (listing.getLID() == null) {
                listingMsg += "LID Cannot Be Blank\n";
            }
            if (listing.getUID() == null) {
                listingMsg += "UID Cannot Be Blank\n";
            }
            return listingMsg.isEmpty();
        }
        listingMsg = "Listing Cannot Be Null";
        return false;
    }

    public Boolean checkFieldsBeforeAdd(Listing listing) {
        listingMsg = "";
        if (listing != null) {
            if (listing.getMax_price() <= 0) {
                listingMsg += "Price Cannot Be Less Than 0\n";
            }
            if (listing.getAvailable_from() == null) {
                listingMsg += "Available From Cannot Be Blank\n";
            }
            if (listing.getAvailable_until() == null) {
                listingMsg += "Available until Cannot Be Blank\n";
            }
            if (listing.getDescription() == null) {
                listingMsg += "Description Cannot Be Blank\n";
            }
            if (listing.getJobCategory() == null) {
                listingMsg += "Job Category Cannot Be Blank\n";
            }
            if (listing.getLocation() == null) {
                listingMsg += "Location Cannot Be Blank\n";
            }
//            if (listing.getPic() == null) {
//                listingMsg += "Picture Cannot Be Blank\n";
//            }
            if (listing.getTitle() == null) {
                listingMsg += "Title Cannot Be Blank\n";
            }
            if (listing.getUID() == null) {
                listingMsg += "UID Cannot Be Blank\n";
            }
            return listingMsg.isEmpty();
        }
        listingMsg = "Listing Cannot Be Null";
        return false;
    }

    public Map<String, Listing> getUserListings(String UID) {
        Map<String, Listing> userListings = new HashMap<>();
        Set<String> listingKeys = listings.keySet();
        for (String key : listingKeys) {
            if (listings.get(key).getUID().equals(UID)) {
                userListings.put(key, listings.get(key));
            }
        }
        if (userListings.isEmpty()) {
            listingMsg = "There Are No Listings From This User";
        } else {
            listingMsg = "User Listings";
        }
        return userListings;
    }

    public Listing getListing(String LID) {
        Listing listing = listings.get(LID);
        if (listing != null) {
            listingMsg = "Listing With LID: " + LID;
            return listing;
        } else {
            listingMsg = "Listing With LID: " + LID + " Does Not Exist";
            return null;
        }
    }

    public Map<String, Listing> getListings() {
        if (!listings.isEmpty()) {
            listingMsg = "All Listings";
            return listings;
        } else {
            listingMsg = "There Are No Listings";
        }
        return null;
    }

    public void setListings(Map<String, Listing> listings) {
        this.listings = listings;
    }

    public String getListingMsg() {
        return listingMsg;
    }

    public void setListingMsg(String listingMsg) {
        this.listingMsg = listingMsg;
    }

}
