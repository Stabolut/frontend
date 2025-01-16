import React, { useState } from "react";
import { Spinner } from "react-bootstrap"; // Import Spinner from Bootstrap
import { LoginFormApi } from "../../api/purchase/purchase";
import { errorMessageHandler } from "../../uitls/helperMethods";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { useNavigate } from "react-router-dom";


const LoginForm = ({ onForgotPassword }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({})
    try {

      const { data } = await LoginFormApi(formData);
      localStorage.setItem("jwtToken", data.data.token);
      navigate("/purchase-with-eth");

    } catch (error) {
      setErrors({ api: errorMessageHandler(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center main-login-class">
      <div id="card">
        {console.log("error", errors)}
        <div id="card-content">
          <div id="card-title">
            <h2>LOGIN</h2>
            <div className="underline-title"></div>
          </div>
          <form method="post" className="form" onSubmit={handleSubmit}>
            <label htmlFor="user-email" style={{ paddingTop: "13px" }}>
              &nbsp;Email
            </label>
            <input
              id="user-email"
              className="form-content"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
              required
            />

            <div className="form-border"></div>

            <label htmlFor="user-password" style={{ paddingTop: "22px" }}>
              &nbsp;Password
            </label>
            <input
              id="user-password"
              className="form-content"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />



            <div className="form-border"></div>

            <a href="#">
              <legend id="forgot-pass" onClick={onForgotPassword}>
                Reset password?
              </legend>
            </a>

            <div className="d-flex justify-content-center align-items-center pt-1 error-class mx-auto">
          {errors.api && <ErrorAlert message={errors.api} />}
          {errors.email && <ErrorAlert message={errors.email} />}
          {errors.password && <ErrorAlert message={errors.password} />}

        </div>

            {/* Submit Button with Spinner */}
            <button
              id="submit-btn"
              type="primary"
              name="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                "LOGIN"
              )}
            </button>


            {/* Display success or API error message */}

          </form>
        </div>
        
      </div>
    </div>
  );
};

export default LoginForm;
