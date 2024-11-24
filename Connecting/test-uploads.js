import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testUploadsDirectory() {
  try {
    // Get uploads directory path
    const uploadsPath = path.join(__dirname, "../Connecting", "uploads");
    console.log("Uploads directory path:", uploadsPath);

    // Check if directory exists
    try {
      await fs.access(uploadsPath);
      console.log("✓ Uploads directory exists");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("× Uploads directory does not exist");

        // Try to create directory
        try {
          await fs.mkdir(uploadsPath, { recursive: true });
          console.log("✓ Created uploads directory");
        } catch (mkdirError) {
          console.error(
            "× Failed to create uploads directory:",
            mkdirError.message
          );
          return;
        }
      } else {
        console.error("× Access error:", error.message);
        return;
      }
    }

    // Test write permissions
    const testFile = path.join(uploadsPath, "test.txt");
    try {
      await fs.writeFile(testFile, "test");
      console.log("✓ Successfully wrote test file");
      await fs.unlink(testFile);
      console.log("✓ Successfully deleted test file");
    } catch (writeError) {
      console.error("× Failed write/delete test:", writeError.message);
    }

    // Open the uploads directory and list its contents
    try {
      const files = await fs.readdir(uploadsPath);
      console.log(
        "✓ Successfully opened uploads directory. Contents:",
        files.length > 0 ? files : "No files in directory"
      );
    } catch (readError) {
      console.error("× Failed to open uploads directory:", readError.message);
    }

    // Get directory stats
    const stats = await fs.stat(uploadsPath);
    console.log("Directory permissions:", {
      mode: stats.mode.toString(8),
      owner: { uid: stats.uid, gid: stats.gid },
      isDirectory: stats.isDirectory(),
      isWritable: !!(stats.mode & 0o200),
    });
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

// Run the test
testUploadsDirectory();
