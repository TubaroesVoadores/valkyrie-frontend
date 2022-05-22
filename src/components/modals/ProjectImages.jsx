/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import {
  Button,
  Image,
  Overlay,
  Text,
  Transition,
} from '@mantine/core';

import { useProjectImagesStyles } from '../../styles';

export const ProjectImages = ({ innerProps: { image } }) => {
  const { classes } = useProjectImagesStyles();
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

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
    <div className={classes.wrapper}>
      <Transition mounted={isOverlayVisible} transition="fade" duration={500} timingFunction="ease">
        {(styles) => (
          <Overlay
            style={styles}
            gradient="linear-gradient(0deg, black 72%, transparent 100%)"
            zIndex={5}
            sx={{ height: '45%', top: 'unset' }}
            onMouseLeave={() => setOverlayVisibility(false)}
            onMouseEnter={() => setOverlayVisibility(true)}
            radius="sm"
            className={classes.overlay}
          >
            <Text color="white">{`Latitude: ${lat}`}</Text>
            <Text color="white">{`Longitude: ${log}`}</Text>
            <Text color="white">{`Area da propriedade: ${area} km²`}</Text>
            <Text color="white">{`Floresta nativa: ${nativeForest}%`}</Text>
            <Button
              className={classes.button}
              onClick={() => setIsOriginalOpen(!isOriginalOpen)}
            >
              {isOriginalOpen ? 'Ver imagem filtrada' : 'Ver imagem original'}
            </Button>
          </Overlay>
        )}
      </Transition>
      <Image
        src={!isOriginalOpen ? originalImage : filteredImage}
        withPlaceholder
        radius="sm"
        onMouseLeave={() => setOverlayVisibility(false)}
        onMouseEnter={() => setOverlayVisibility(true)}
      />
    </div>
  );
};
