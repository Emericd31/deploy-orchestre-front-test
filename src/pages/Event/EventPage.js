import React from "react";
import EventTab from "../../components/Event/EventTab";
import "../../App.css"

export default function EventPage() {
  return (
    <div className="body">
      <h2 style={{ marginBottom: "20px" }}>Évènements</h2>
      <EventTab />
    </div>
  );
}
