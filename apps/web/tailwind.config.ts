import { Config } from "tailwindcss";
import { poluiPlugin } from "pol-ui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/pol-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [poluiPlugin()],
} satisfies Config;
