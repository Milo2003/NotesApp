const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

// Initiation
const app = express();
const PORT = process.env.PORT;
require("./db"); // Importación del archivo de conexión a MongoDB
require("./config/passport"); // Configuración de passport para autenticación

// Settings

app.set("port", PORT || 3000); // Puerto de escucha del servidor
app.set("views", path.join(__dirname, "views")); // Carpeta de las vistas de la app
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false })); // Parseo de datos en formato URL-encoded
app.use(methodOverride("_method")); // Soporte para PUT y DELETE HTTP
app.use(
  session({
    secret: "mySecretApp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize()); // Inicialización de passport
app.use(passport.session()); // Configuración de sesión en passport
app.use(flash()); // Mensajes flash para mostrar en la app

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); // Mensajes de éxito
  res.locals.error_msg = req.flash("error_msg"); // Mensajes de error
  res.locals.error = req.flash("error"); // Errores
  res.locals.user = req.user || null; // Información del usuario autenticado
  next();
});

// Routes
app.use(require("./routes/index")); // Rutas de la página principal
app.use(require("./routes/notes")); // Rutas de las notas
app.use(require("./routes/users")); // Rutas de los usuarios

// Static Files
app.use(express.static(path.join(__dirname, "public"))); // Archivos estáticos de la app

// Server is listening
app.listen(PORT, () => {
  console.log("Server on port", app.get("port"));
});