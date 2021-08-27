import React from 'react';
import Widget from './Widget';

const Map = () => (
  <Widget>
    <div style={{ width: '100%' }}>
      <h5 className="mb-3">Miejsce 🥳</h5>
      <iframe
        className="rounded"
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.485839703669!2d21.58847653741367!3d54.12514502014864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDA3JzI5LjAiTiAyMcKwMzUnMjkuNCJF!5e0!3m2!1spl!2spl!4v1630082552406!5m2!1spl!2spl"
        width="100%"
        height="300"
        allowFullScreen
      />
    </div>
  </Widget>
);

export default Map;
