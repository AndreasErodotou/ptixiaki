import React, { Component } from "react";
import FullTemplatePage from "./FullTemplatePage";

class UserProfilePage extends Component {
  render() {
    const Categories = ["Electrician", "Hydraulic", "Engineer"];
    const Locations = ["Nicosia", "Heraklion", "Athens"];
    return (
      <div>
        <FullTemplatePage
          categories={Categories}
          locations={Locations}
          content={null}
        />
      </div>
    );
  }
}

export default UserProfilePage;
