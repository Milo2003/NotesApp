const express = require("express");
const router = express.Router();

const User = require("../models/User");

const passport = require("passport");

// Renderizar el formulario de inicio de sesión
router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

// Manejar la autenticación de inicio de sesión
router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

// Renderizar el formulario de registro
router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

// Manejar el registro de un nuevo usuario
router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  // Verificar que los campos de contraseña sean iguales
  if (password !== confirm_password) {
    errors.push({ text: "Password do not match" });
  }

  // Verificar que la contraseña tenga al menos 8 caracteres
  if (password.length < 8) {
    errors.push({ text: "Password must be at least 8 characters" });
  }

  // Si hay errores, renderizar el formulario de registro con los errores
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    // Buscar si ya hay un usuario con el mismo email
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The email is already in use");
      res.redirect("/users/signup");
    } else {// Si no hay un usuario con el mismo email, crear uno nuevo
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered");
      res.redirect("/users/signin");
    }
  }
});

// Manejar el cierre de sesión del usuario
router.get("/users/logout", (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err)
    }
  });
  req.flash("success_msg", "You are logget out now")
  res.redirect("/users/signin");
});

module.exports = router;
