//Ce schéma définit donc un modèle User, comportant un unique email et un mot de passe.
//Nous associons deux méthodes à chacun des objets, la première authenticate(password) 
//permettant de vérifier si le mot de passe est bien celui associé à l’utilisateur 
//et la seconde getToken() permettant de générer un jeton d’accès à partir du modèle et de notre chaîne de caractères secrète présente dans /config

const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("User", userSchema);