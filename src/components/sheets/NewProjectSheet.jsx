/* eslint-disable react/prop-types */
import React from 'react';
import Sheet from 'react-modal-sheet';

import { NewProject } from '../index';
import { useNewProjectSheetStyles } from '../../styles';

export const NewProjectSheet = ({ isOpen, onClose }) => {
  const { classes } = useNewProjectSheetStyles();

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[380]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={classes.modalContent}>
            <NewProject />
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
