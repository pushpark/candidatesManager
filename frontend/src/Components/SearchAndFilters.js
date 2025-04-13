import { useState, useRef, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    gender: "all",
    experience: "all",
    skills: [],
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyFilters = () => {
    onFilter(filters);
    setIsFilterOpen(false);
  };

  const toggleSkill = (skill) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div className="d-flex gap-2 gap-md-5 justify-content-end mb-2 p-2">
      <div className="input-group" style={{ width: "300px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, phone or email"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch(searchQuery);
          }}
        />
        <button className="btn btn-outline-secondary btn-sm" type="button">
          <FaSearch style={{ marginRight: "8px" }} />
        </button>
      </div>

      <div className="dropdown" ref={dropdownRef}>
        <button
          className="btn btn-outline-primary dropdown-toggle"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaFilter style={{ marginRight: "5px" }} />
          Filters
        </button>

        <div
          className={`dropdown-menu position-fixed p-3 end-0 ${
            isFilterOpen ? "show" : ""
          }`}
          style={{ width: "300px" }}
        >
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Experience</label>
            <select
              className="form-select"
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
            >
              <option value="all">All Experience</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Skills</label>
            <div className="d-flex flex-column gap-2">
              {["JavaScript", "Python", "React", "Node.js", "HTML/CSS"].map(
                (skill) => (
                  <div key={skill} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`filter-skill-${skill}`}
                      checked={filters.skills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`filter-skill-${skill}`}
                    >
                      {skill}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() =>
                setFilters({
                  gender: "all",
                  experience: "all",
                  skills: [],
                })
              }
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleApplyFilters}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
