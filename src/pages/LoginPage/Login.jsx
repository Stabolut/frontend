import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ResetPasswordModal from "./ResetModal";

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <LoginForm onForgotPassword={handleShowModal} />
      <ResetPasswordModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Login;
