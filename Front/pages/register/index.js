import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import Filter from "../../components/Filter/filter.js";
import styles from "../../styles/register.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Aqui você pode manipular os dados, como enviar para uma API ou outro tratamento.
  };

  const password = watch("password");

  return (
    <>
      <Header />
      <Filter>
        <div className={styles.mainContainer}>
          <div className={styles.photoContainer}>
            <h1>Ready to rank up?</h1>
            <p className={styles.upperSubtitle}>
              Discover the best poker leagues for every skill
            </p>
            <img
              className={styles.photo}
              src="/images/signUpPhoto.png"
              alt="sign up"
            ></img>
            <p className={styles.bottomSubtitle}>
              Track your poker progress effortlessly!
            </p>
          </div>

          <form
            className={styles.signUpContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className={styles.title}>Sign up for free</h1>
            <p className={styles.subtitle}>
              Get exclusive access to league features. No obligations.
            </p>
            {/* Nome */}
            <input
              className={styles.inputBox}
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}{" "}
            {/* se erros.fullName for verdade, renderiza o error*/}
            {/* Email */}
            <input
              className={styles.inputBox}
              placeholder="Enter your best email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
            {/* Username */}
            <input
              className={styles.inputBox}
              placeholder="Choose a unique username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
            {/* Password */}
            <input
              className={styles.inputBox}
              type="password"
              placeholder="Create a password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            {/* Confirm Password */}
            <input
              className={styles.inputBox}
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
            <button type="submit" className={styles.joinButton}>
              Join now
            </button>
            <div className={styles.altSignUpTextContainer}>
              <p>or sign up with</p>
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.companyButton}>Google</button>
              <button className={styles.companyButton}>Facebook</button>
            </div>
          </form>
        </div>
      </Filter>
      <Footer />
    </>
  );
}

export default Register;
