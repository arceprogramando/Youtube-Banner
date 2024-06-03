import fs from 'fs/promises';

export const updateReadme = async (data) => {
  try {

    const { mainVideo, lastVideos } = data;

    // Estructura para el contenido del README
    let content = `
# Canal de YouTube

## Video de Presentación

[![Presentación](${mainVideo.thumbnail})](${mainVideo.url})

## Últimos Videos

`;

    lastVideos.forEach((video, index) => {
      content += `
### Video ${index + 1}

[![Video ${index + 1}](${video.thumbnail})](${video.url})
`;
    });

    // Escribimos el contenido en el archivo README.md
    await fs.writeFile('README.md', content, 'utf8');
    console.log('README.md actualizado exitosamente');
  } catch (error) {
    throw new Error('Error al actualizar el README.md');
  }
};
