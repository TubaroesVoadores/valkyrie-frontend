/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useMemo, useState } from 'react';
import {
  Image,
  Paper,
  Text,
  Title,
  Button,
} from '@mantine/core';

import { useProjectInfosStyles, useProjectImageStyles } from '../styles';

const ProjectImage = ({ image }) => {
  const { classes } = useProjectImageStyles();
  const [isOriginalImage, setIsOriginalImage] = useState(false);

  const {
    s3link: originalImage,
    filteredImageLink: filteredImage,
    data,
  } = image;

  const {
    area,
    lat,
    log,
    nativeForest,
  } = useMemo(() => {
    const roundedArea = Math.floor(data.area * 100) / 100;
    const roundedNativeForest = Math.floor(data.nativeForest * 100);

    return {
      ...data,
      area: roundedArea,
      nativeForest: roundedNativeForest,
    };
  }, [data]);

  return (
    <Paper
      shadow="xs"
      radius="xs"
      p="md"
      withBorder
      className={classes.wrapper}
    >
      <Image
        src={isOriginalImage ? originalImage : filteredImage}
        withPlaceholder
      />
      <div className={classes.detailsWrapper}>
        <Title order={4}>Detalhes da imagem</Title>
        <div className={classes.infos}>
          <Text>{`Latitude: ${lat}`}</Text>
          <Text>{`Longitude: ${log}`}</Text>
          <Text>{`Area da propriedade: ${area} km²`}</Text>
          <Text>{`Floresta nativa: ${nativeForest}%`}</Text>
        </div>
        <Button
          color="green"
          size="md"
          onClick={() => setIsOriginalImage(!isOriginalImage)}
          sx={{ marginTop: '0.5rem' }}
        >
          {isOriginalImage ? 'Ver imagem filtrada' : 'Ver imagem original'}
        </Button>
      </div>
    </Paper>
  );
};

export const ProjectInfos = ({ project }) => {
  const { classes } = useProjectInfosStyles();

  const {
    nativeForestAreaPercent,
    country,
    nativeForestArea,
    state,
    city,
    area,
    images,
  } = useMemo(() => {
    const roundedArea = Math.floor(project.area * 100) / 100;
    const roundedNativeForestArea = Math.floor(project.nativeForestArea * 100) / 100;
    const roundedNativeForestAreaPercent = Math.floor(project.nativeForestAreaPercent * 100);

    return {
      ...project,
      area: roundedArea,
      nativeForestArea: roundedNativeForestArea,
      nativeForestAreaPercent: roundedNativeForestAreaPercent,
    };
  }, [project]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.detailsWrapper}>
        <Title order={2}>Detalhes do projeto</Title>
        <Paper
          className={classes.infoCard}
          shadow="xs"
          radius="xs"
          p="sm"
          withBorder
        >
          <Text>{`Cidade: ${city}`}</Text>
          <Text>{`Estado: ${state}`}</Text>
          <Text>{`Pais: ${country}`}</Text>
          <Text>{`Area da propriedade: ${area} km²`}</Text>
          <Text>{`Area de floresta nativa: ${nativeForestArea} km²`}</Text>
          <Text>{`Porcentagem de floresta nativa: ${nativeForestAreaPercent}%`}</Text>
        </Paper>
      </div>
      <div className={classes.imagesWrapper}>
        {
          images.map((image) => (
            <ProjectImage key={image.id} image={image} />
          ))
        }
      </div>
    </div>
  );
};
