import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
//process.cwd nos da la ruta desde raiz de disco hasta el folder de mi proyecto
// .join concatena: la ruta anterior, + una barra + "posts"
const postsDirectory = path.join(process.cwd(), 'posts');

// NTE metodo para obtener posts desde el file .MD
export function getSortedPostsData() {
    // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      // Combine the data with the id
      return {
          id,
          ...matterResult.data,
        };
    });
    // Sort posts by date
    // Retorna lista de objetos, un json
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// NTE metodo para obtener los ID's posibles
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }
// nte Funcion que obtiene un posts en particular basado en el ID
export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
}
