import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { ResetPassApi } from "../../api/purchase/purchase";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { errorMessageHandler } from "../../uitls/helperMethods";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";

const ResetPasswordModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types
  };

  // Reset form data and errors when modal closes
  const handleModalClose = () => {
    setFormData({ password: "", email: "" });
    setErrors({});
    setSuccessMessage("");
    handleClose(); // Call the parent-provided handleClose function
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const { email, password } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Make API call
    setLoading(true);
    setErrors({})
    try {
      const { data } = await ResetPassApi(formData);
      setSuccessMessage("Password reset was successful!");
      console.log(data); // Log the response for debugging
    } catch (error) {
      setErrors({ api: errorMessageHandler(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} centered onHide={handleModalClose}>
      <Modal.Body className="diff-class">
        <div id="card-content">
          <div id="card-title">
            <h2>Reset Password</h2>
          </div>
          <form method="post" className="form" onSubmit={handleSubmit}>
            {/* Password Input */}
            <label htmlFor="password" style={{ paddingTop: "22px" }}>
              &nbsp;Password
            </label>
            <input
              id="password"
              className="form-content"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="form-border"></div>

            {/* Confirm Password Input */}
            <label htmlFor="confirmPassword" style={{ paddingTop: "13px" }}>
              &nbsp;Confirm Password
            </label>
            <input
              id="password"
              className="form-content"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="form-border"></div>

            <div className="d-flex justify-content-center align-items-center pt-3">
              {/* Display Errors and Success Message */}
              {errors.api && <ErrorAlert message={errors.api} />}
              {errors.email && <ErrorAlert message={errors.email} />}
              {errors.password && <ErrorAlert message={errors.password} />}
              {successMessage && <SuccessAlert message={successMessage} />}
            </div>

            {/* Submit Button with Spinner */}
            <button
              id="submit-btn"
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                "Reset Password"
              )}
            </button>

          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordModal;
