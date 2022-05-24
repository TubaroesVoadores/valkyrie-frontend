/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import Sheet from 'react-modal-sheet';
import {
  Image, Button, ActionIcon, Transition, Text, Overlay,
} from '@mantine/core';
import { Info } from 'react-feather';

import { useProjectImagesSheetStyles } from '../../styles';

export const ProjectImagesSheet = ({ isOpen, onClose, image }) => {
  const { classes } = useProjectImagesSheetStyles();
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

  const {
    s3link: originalImage,
    filteredImageLink: filteredImage,
    data,
  } = image;

  const {
    area, lat, log, nativeForest,
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
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[420]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={classes.modalContent}>
            <div className={classes.imageContainer}>
              <ActionIcon
                size="md"
                radius="xl"
                variant="filled"
                color="green"
                onClick={() => setOverlayVisibility(!isOverlayVisible)}
                className={classes.overlayIcon}
              >
                <Info />
              </ActionIcon>
              <Transition
                mounted={isOverlayVisible}
                transition="fade"
                duration={500}
                timingFunction="ease"
              >
                {(styles) => (
                  <Overlay
                    style={styles}
                    gradient="linear-gradient(0deg, rgba(0,0,0,0.7) 70%, transparent 100%)"
                    zIndex={5}
                    sx={{ height: '52%', top: 'unset' }}
                    radius="sm"
                    className={classes.overlay}
                  >
                    <Text color="white">{`Latitude: ${lat}`}</Text>
                    <Text color="white">{`Longitude: ${log}`}</Text>
                    <Text color="white">{`Area da propriedade: ${area} km²`}</Text>
                    <Text color="white">{`Floresta nativa: ${nativeForest}%`}</Text>
                  </Overlay>
                )}
              </Transition>
              <Image
                src={!isOriginalOpen ? originalImage : filteredImage}
                withPlaceholder
                radius="sm"
              />
            </div>
            <Button
              size="md"
              className={classes.button}
              onClick={() => setIsOriginalOpen(!isOriginalOpen)}
            >
              {!isOriginalOpen ? 'Ver imagem filtrada' : 'Ver imagem original'}
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
