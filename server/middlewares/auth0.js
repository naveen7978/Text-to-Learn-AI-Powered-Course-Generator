import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

// Compute absolute path to .env (works regardless of where you run the server)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") }); // 👈 ../ because .env is in /server

// Debug logs (optional)
console.log("AUTH0_DOMAIN (auth0.js):", process.env.AUTH0_DOMAIN);
console.log("AUTH0_AUDIENCE (auth0.js):", process.env.AUTH0_AUDIENCE);

// Configure JWT validation
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

export default checkJwt;
