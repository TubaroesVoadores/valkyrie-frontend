/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import {
  Image,
  Paper,
  Text,
  Title,
  useMantineTheme,
  SimpleGrid,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useModals } from '@mantine/modals';

import { ProjectImagesSheet } from './index';
import { useProjectInfosStyles } from '../styles';

export const ProjectInfos = ({ project }) => {
  const theme = useMantineTheme();
  const modals = useModals();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes } = useProjectInfosStyles();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [image, setImage] = useState(null);

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

  const handleOpenImage = (currentImage) => {
    if (!matches) {
      modals.openContextModal('ProjectImages', {
        title: 'Detalhes da imagem',
        centered: true,
        size: 'xl',
        innerProps: {
          image: currentImage,
        },
      });
    } else {
      setImage(currentImage);
      setIsSheetOpen(true);
    }
  };

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
        <Title order={2}>Imagens</Title>
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: theme.breakpoints.xl, cols: 1 },
          ]}
          className={classes.imagesGrid}
        >
          {
            images.map((currentImage) => (
              <Image
                key={currentImage.id}
                src={currentImage.s3link}
                radius="xs"
                withPlaceholder
                onClick={() => handleOpenImage(currentImage)}
              />
            ))
          }
        </SimpleGrid>
      </div>
      {
        image && (
          <ProjectImagesSheet
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
            image={image}
          />
        )
      }
    </div>
  );
};
