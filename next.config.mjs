import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
    unoptimized: true
  },
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: dirname
  }
};

export default nextConfig;
