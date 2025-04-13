const CandidateTable = ({ candidates }) => {
  if (candidates.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No candidates found matching your criteria.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>+{candidate.phone}</td>
              <td>{candidate.email}</td>
              <td>{candidate.gender}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
