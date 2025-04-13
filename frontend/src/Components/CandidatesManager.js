import { useState, useEffect } from "react";
import axios from "axios";
import CandidateTable from "./CandidatesTable";
import AddCandidate from "./AddCandidate";
import SearchAndFilter from "./SearchAndFilters";
import Pagination from "./Pagination";

const CandidatesManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorInAdding, setError] = useState(false);
  const candidatesPerPage = 10;

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("https://candidates-manager.vercel.app/candidates");
      const { data } = response.data;
      setCandidates(data);
      setFilteredCandidates(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredCandidates(candidates);
      return;
    }

    const results = candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.phone.includes(query) ||
        candidate.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCandidates(results);
    setCurrentPage(1);
  };

  const handleFilter = (filters) => {
    const results = candidates.filter((candidate) => {
      return (
        (filters.gender === "all" || candidate.gender === filters.gender) &&
        (filters.experience === "all" ||
          candidate.experience === filters.experience) &&
        (filters.skills.length === 0 ||
          filters.skills.some((skill) => candidate.skills.includes(skill)))
      );
    });
    setFilteredCandidates(results);
    setCurrentPage(1);
  };

  const handleAddCandidate = async (newCandidate) => {
    try {
      await axios.post("https://candidates-manager.vercel.app/candidates", newCandidate);
      fetchCandidates();
      setIsModalOpen(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error adding candidate:", error);
    }
  };

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  console.log("filter:", filteredCandidates);
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-2 mb-3 bg-light">
        <h1 className="text-primary text-center fs-roboto">Candidates</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Add Candidate
        </button>
      </div>

      <div>
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />

        {isLoading ? (
          <div className="text-center py-5">Loading candidates...</div>
        ) : (
          <>
            <CandidateTable candidates={currentCandidates} />

            {filteredCandidates.length > candidatesPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <AddCandidate
          isError={isErrorInAdding}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddCandidate}
        />
      )}
    </div>
  );
};

export default CandidatesManager;
