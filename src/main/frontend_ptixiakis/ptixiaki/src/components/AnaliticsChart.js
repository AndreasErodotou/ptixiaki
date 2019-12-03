import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Analitics = ({ name, checked, ...dim }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let style = "p-2 border rounded";
  checked ? (style += " border-primary ") : (style += " border-secondary");

  return (
    <div className={style}>
      <div className="d-flex justify-content-between">
        <h4>{name}</h4>
        <DropdownButton
          id="dropdown-basic-button"
          title="Last Year"
          size="sm"
          // disabled
        >
          <Dropdown.Item href="#/last-month">Last Month</Dropdown.Item>
          <Dropdown.Item href="#/last-week">Last Week</Dropdown.Item>
          <Dropdown.Item href="#/all">All</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="p-2 border border-secondary">
        <Chart
          {...dim}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ["", "", "rejected", { role: "style" }],
            ...months.map((month, index) => [
              month,
              index + 1,
              index,
              ["blue", "black"]
            ])
          ]}
          options={{
            bar: { groupWidth: "95%" },
            legend: { position: "none" }
          }}
        />
      </div>
    </div>
  );
};

export default Analitics;
