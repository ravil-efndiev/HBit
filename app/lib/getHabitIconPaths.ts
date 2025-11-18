import path from "path"
import fs from "fs"

const getHabitIconPaths = () => {
  const dir = path.join(process.cwd(), "public/habitIcons");
  const filenames = fs.readdirSync(dir);

  return filenames.map((filename) => `habitIcons/${filename}`);
}

export default getHabitIconPaths;
