// Simple middleware: checks username/password provided in body or headers against .env
export default function checkAdminCreds(req, res, next) {
  const envUser = process.env.ADMIN_USER;
  const envPass = process.env.ADMIN_PASS;

  // Accept from headers or body (you can adapt to send creds from frontend each protected request)
  const username = req.headers["x-admin-user"] || req.body.username;
  const password = req.headers["x-admin-pass"] || req.body.password;

  if (!username || !password) {
    return res.status(401).json({ error: "Admin credentials required" });
  }

  if (username !== envUser || password !== envPass) {
    return res.status(403).json({ error: "Invalid admin credentials" });
  }
  // remove creds from body for security
  if (req.body.username) delete req.body.username;
  if (req.body.password) delete req.body.password;
  next();
}
