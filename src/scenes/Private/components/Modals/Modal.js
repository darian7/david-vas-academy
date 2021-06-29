import React, { useState, useEffect } from 'react';

export const Modal = ({ visible, modal, hideModal }) => {
  return (
    <div className="modal">
      <div className="modal-bkg" onClick={() => hideModal(!visible)}></div>
      <div className="modal-content">
        <div>{modal}</div>
      </div>
    </div>
  )
}