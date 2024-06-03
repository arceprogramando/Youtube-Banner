import fs from 'fs/promises';

export const updateReadme = async (data) => {
  try {

    const { mainVideo, lastVideos } = data;

    // Estructura para el nuevo contenido de la sección de YouTube
    let youtubeContent = `<div class="Youtube-Content">
# Canal de YouTube

## Video de Presentación

[![Presentación](${mainVideo.thumbnail})](${mainVideo.url})

## Últimos Videos de mi [canaldeyoutube](https://www.youtube.com/channel/UC3Dnra3CWle6GRayNRWiS1g)
`;

    lastVideos.forEach((video, index) => {
      youtubeContent += `
<a href='${video.url}' target='_blank'>
  <img width='30%' src='${video.thumbnail}' alt='Últimos videos ${index}' />
</a>`;
    });

    youtubeContent += `</div>`;

    // Leer el contenido existente del README.md
    let readmeContent = await fs.readFile('README.md', 'utf8');

    // Actualizar solo la sección de YouTube
    const youtubeSectionRegex = /<div class="Youtube-Content">[\s\S]*?<\/div>/;
    if (youtubeSectionRegex.test(readmeContent)) {
      readmeContent = readmeContent.replace(youtubeSectionRegex, youtubeContent);
    } else {
      // Si no existe, agregar al final del contenido
      readmeContent += `\n${youtubeContent}`;
    }

    // Escribir el contenido actualizado en el archivo README.md
    await fs.writeFile('README.md', readmeContent, 'utf8');
    console.log('README.md actualizado exitosamente');
  } catch (error) {
    throw new Error('Error al actualizar el README.md');
  }
};
