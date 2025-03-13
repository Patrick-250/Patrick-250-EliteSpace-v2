import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { Link as Router } from "react-router";
import "./SignupPage.css";

const SignupPage = () => {
  // form states:
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  //  input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    // Clear any previous errors
    setError(null);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }

    // Check pass length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    // Check terms agreement
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }

    return true;
  };

  // Handle form sub
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Send signup data to the backend endpoint
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      // Handle error response
      if (!response.ok) {
        throw new Error(data.message || "Error creating account");
      }

      // Show success message
      setVerificationSent(true);

    } catch (error: unknown) {
      setError(
        (error as { message?: string }).message ||
          "An error occurred during signup"
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" align="center">
            Logo
          </Typography>
          <Typography variant="h4" align="center" mb={2}>
            Create Account
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {verificationSent ? (
            <Box textAlign="center">
              <Alert severity="success">Verification email sent!</Alert>
              <Typography mt={2}>
                We've sent a verification link to{" "}
                <strong>{formData.email}</strong>
              </Typography>
              <Typography variant="body2" mt={1}>
                Please check your email and click the verification link.
              </Typography>
              <Button
                component={Router}
                to="/login"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Go to Login
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSignup}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                margin="normal"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                margin="normal"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <TextField
                label=" "
                name="dob"
                type="date"
                fullWidth
                margin="normal"
                value={formData.dob}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
                helperText="At least 8 characters"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                }
                label={
                  <span>
                    I agree to the{" "}
                    <Link component="button" sx={{ color: "primary.main" }}>
                      Terms & Conditions
                    </Link>
                  </span>
                }
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </form>
          )}

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                component={Router}
                to="/login"
                sx={{ color: "primary.main" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupPage;
