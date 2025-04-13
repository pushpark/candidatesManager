import { useState } from "react";

const AddCandidate = ({ isError, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    experience: "1 Year",
    skills: [],
  });

  const availableSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Java",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Candidate</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Experience:</label>
                <select
                  className="form-select"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Skills:</label>
                <div className="d-flex flex-wrap gap-3">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`skill-${skill}`}
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`skill-${skill}`}
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Candidate
              </button>
              {isError && (
                <p className="text-danger fs-6">
                  Please enter valid phone number and email id
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
