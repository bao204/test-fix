import * as fs from 'fs';
import * as path from 'path';

const sourceDir = path.join(__dirname, 'uploads');
const destDir = path.join(__dirname, 'dist', 'uploads');

async function copyUploads() {
  try {
    await fs.copy(sourceDir, destDir);
    console.log('Uploads copied successfully');
  } catch (err) {
    console.error('Error copying uploads:', err);
  }
}

copyUploads();
