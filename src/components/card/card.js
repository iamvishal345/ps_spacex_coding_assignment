import React from "react";

import "./card.scss";

export const Card = ({ data }) => (
  <div className="card">
    <div className="card-image">
      <img src={data.links.mission_patch_small} alt={data.mission_name} />
    </div>
    <div className="card-body">
      <h3>
        {data.mission_name} #{data.flight_number}
      </h3>
      <dl>
        <dt>Mission Ids:</dt>
        <dd className="w-100">
          <ul className="w-100">
            {data.mission_id.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </dd>
        <dt>Launch Year:</dt>
        <dd>{data.launch_year}</dd>
        <dt>Successful Launch:</dt>
        <dd>{data.launch_success ? "True" : "False"}</dd>
        <dt>Successful Landing:</dt>
        <dd>
          {data.rocket.first_stage.cores[0].land_success ? "True" : "False"}
        </dd>
      </dl>
    </div>
  </div>
);
