module.exports = {
  apps: [
    {
      name: "app1",
      script: "./app.js",
      env: {
        NODE_ENV: "production",
        PORT: 80,
        DATABASE_URL:
          "postgresql://ngurahwira:2bCdk5mKLyWY@ep-raspy-math-31033101.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
        JWT_SECRET: "RAHASIA",
        GOOGLE_ID: "",
      },
    },
  ],
};
