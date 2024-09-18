import React from "react";
import "../style/card.css";
import userImg from "../utils/icons_FEtask/user.png";
import { getImage } from "./getImage";
const Card = ({ data, priorityLabel, key, groupby }) => {
  let statusImage = getImage(data, groupby)[0];
  let priorityImage = getImage(data, groupby)[1];

  return (
    <div className="card">
      <section className="card-details">
        <div>{data.id}</div>
        <div>
          {" "}
          {groupby !== "user" && (
            <img src={userImg} alt="card_image1" className="card_image0" />
          )}
        </div>
      </section>

      <section className="card-mid-detail">
        <span>
          {groupby !== "status" && (
            <img src={statusImage} alt="card_image1" className="card_image1" />
          )}
        </span>

        <h3>{data.title}</h3>
      </section>
      <section className="card-end-detail">
        <span>
          {groupby !== "priority" && (
            <img
              src={priorityImage}
              alt="card_image1"
              className="card_image2"
            />
          )}
        </span>
        <span>
          <p>Feature Request</p>
        </span>
      </section>
    </div>
  );
};
export default Card;
