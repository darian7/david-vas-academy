import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { splitExtension, splitNombre } from '../../../../common/utilities/extractUrl';

export const Files = ({ files }) => {

  const openPdf = (url) => window.open(url)
  const { t } = useTranslation()

  return (
    <div className="files-modal">
      <div className="files-modal-container">
        <h2>{t('scenes.modules.files')}</h2>
        {files?.map((file) =>
          <div key={file.id} onClick={() => openPdf(file.url)} >
            <FileIcon extension={splitExtension(file.url)} {...defaultStyles[splitExtension(file.url)]} />
            <p>{splitNombre(file.url)}</p>
          </div>
        )}
      </div>
    </div>
  )
}