// src/components/QRCodeImage.js
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeImage = ({ value, size, fgColor, bgColor }) => (
  <QRCodeCanvas
    value={value}
    size={size}
    fgColor={fgColor}
    bgColor={bgColor}
    level="H"
    includeMargin={true}
    style={{
      width: '100%',       // escala al contenedor
      height: '100%',
      display: 'block'
    }}
  />
);

export default QRCodeImage;
