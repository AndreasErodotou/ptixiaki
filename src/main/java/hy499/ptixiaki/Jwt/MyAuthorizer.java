/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.Jwt;

import hy499.ptixiaki.db.UserDB;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.pac4j.core.authorization.authorizer.ProfileAuthorizer;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.core.profile.CommonProfile;

/**
 *
 * @author Andreas
 */
public class MyAuthorizer extends ProfileAuthorizer<CommonProfile> {

    @Override
    public boolean isAuthorized(final WebContext context, final List<CommonProfile> profiles) throws HttpAction {
        return isAnyAuthorized(context, profiles);
    }

    @Override
    public boolean isProfileAuthorized(final WebContext context, final CommonProfile profile) {
        UserDB userDB = null;

        try {
            userDB = new UserDB();
            userDB.checkLogin((String) context.getRequestAttribute("email"), (String) context.getRequestAttribute("password"));
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(MyAuthorizer.class.getName()).log(Level.SEVERE, null, ex);
        }
        return profile == null;
    }
}
