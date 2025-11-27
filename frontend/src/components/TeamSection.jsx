export default function TeamSection() {
  return (
    <section className="team">
      <h2>Our Team</h2>

      <div className="team-grid">
        <div className="team-card">
          <img src="/images/team1.jpg" />
          <h3>Sarah Johnson</h3>
          <p>Program Director</p>
        </div>

        <div className="team-card">
          <img src="/images/team2.jpg" />
          <h3>Michael Brown</h3>
          <p>IISS Supervisor</p>
        </div>

        <div className="team-card">
          <img src="/images/team3.jpg" />
          <h3>Aisha Patel</h3>
          <p>Family Consultant</p>
        </div>
      </div>
    </section>
  );
}
