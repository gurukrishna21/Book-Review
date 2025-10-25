import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  return (
    <div className="dashboard" style={{padding:20}}>
      <h2>Dashboard</h2>
      <p>Welcome to the Book Review Dashboard — manage books and reviews from here.</p>

      <section>
        <h3>Books</h3>
        <p>Manage book entries (create, update, delete).</p>
      </section>

      <section>
        <h3>Reviews</h3>
        <p>Manage community reviews and moderate content.</p>
      </section>

      <p><Link to="/">Back to Home</Link></p>
    </div>
  );
}
