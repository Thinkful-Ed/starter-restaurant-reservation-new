import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router";
import { today } from "../utils/date-time";
import DateButtons from "./DateButtons";
import ShowTablesList from "./ShowTablesList";
import ShowReservationsList from "./ShowReservationsList";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date : thisDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const loc = useLocation();
  let query = new URLSearchParams(loc.search);
  const date = query.get("date") || today();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    // in case of /dashboard with no date params the listReservations function will be called with empty params
    listReservations( date ? { date } : {} , abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main >
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date : {date || "All Dates"}</h4>
      </div>
      <ErrorAlert error={reservationsError} />

      <DateButtons date={date || today()}/> 
      <ShowReservationsList reservations={reservations} />

      <ShowTablesList />

    </main>
  );
}

export default Dashboard;
