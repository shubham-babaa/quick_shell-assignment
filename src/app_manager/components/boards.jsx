import React, { useEffect, useState } from "react";
import Card from "./cards";
import Filter from "./filterItems";
import { fetchApiData } from "../../action/fetchdata";
import dot from "../utils/icons_FEtask/3 dot menu.svg";
import add from "../utils/icons_FEtask/add.svg";
import "../style/board.css";
import { getImageBykey } from "./getImage";
import userImg from "../utils/icons_FEtask/user.png";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("title");

  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedView = localStorage.getItem("stored_tickets");
    if (savedView) {
      const { groupBy, sortBy } = JSON.parse(savedView);
      setGroupBy(groupBy);
      setSortBy(sortBy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stored_tickets", JSON.stringify({ groupBy, sortBy }));
  }, [groupBy, sortBy]);

  const handleGroupChange = (e) => setGroupBy(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return b.priority - a.priority;
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const userName = user ? user.name : "Unknown";

    const key =
      groupBy === "user"
        ? userName
        : groupBy === "priority"
        ? priorityLabels[ticket.priority] || "No priority"
        : ticket.status;

    acc[key] = acc[key] || [];
    acc[key].push({ ...ticket, userName });
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      <Filter
        onGroupChange={handleGroupChange}
        onSortChange={handleSortChange}
      />
      <div className="board">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div className="column" key={key}>
            <section className="section-header">
              <h4 className="Image-header">
                <img
                  src={
                    groupBy !== "user" ? getImageBykey(key, groupBy) : userImg
                  }
                  alt="mai_img"
                  className={`${groupBy === "user" && "card_image0"}`}
                />{" "}
                <span>{key}</span> <span>{tickets.length}</span>
              </h4>
              <div>
                <img src={add} alt="add_icon" />
                <img src={dot} alt="dot_icon" />
              </div>
            </section>
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                data={ticket}
                priorityLabel={priorityLabels[ticket.priority]}
                groupby={groupBy}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
