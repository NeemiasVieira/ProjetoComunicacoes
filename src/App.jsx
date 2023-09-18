import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Style } from './App';

function FourierSeries() {
  const [amplitude, setAmplitude] = useState(1);
  const [width, setWidth] = useState(1);
  const [harmonics, setHarmonics] = useState(5);
  const [time, setTime] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const calculateFourierSeries = () => {
      const seriesData = [];
      const numPoints = 1000; // Número de pontos para o gráfico
      const deltaT = time / numPoints; // Intervalo de tempo entre pontos

      // Itera sobre cada ponto de tempo
      for (let i = 0; i < numPoints; i++) {
        const t = i * deltaT;
        let sum = 0;

        // Itera sobre os harmônicos
        for (let n = 1; n <= harmonics; n++) {
          // Fórmula da série de Fourier para uma onda quadrada
          const frequency = 2 * n - 1;
          const term =
            ((4 * amplitude) / (Math.PI * frequency)) *
            Math.sin((2 * Math.PI * frequency * t) / width);
          sum += term;
        }

        // Armazena o valor da série de Fourier para este ponto de tempo
        seriesData.push({ x: t, y: sum });
      }
      return seriesData;
    };

    // Calcula a série de Fourier e atualiza o state 'data'
    const seriesData = calculateFourierSeries();
    setData(seriesData);
  }, [amplitude, width, harmonics, time]);

  const handleAmplitudeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setAmplitude(parseFloat(value));
      setError('');
    } else {
      setError('Digite um número válido para Amplitude.');
    }
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setWidth(parseFloat(value));
      setError('');
    } else {
      setError('Digite um número válido para Largura.');
    }
  };

  const handleHarmonicsChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*$/.test(value)) {
      setHarmonics(parseInt(value));
      setError('');
    } else {
      setError('Digite um número válido para Harmônicos.');
    }
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setTime(parseFloat(value));
      setError('');
    } else {
      setError('Digite um número válido para Tempo.');
    }
  };

  const plotData = [
    {
      type: 'scatter',
      mode: 'lines',
      x: data.map((point) => point.x),
      y: data.map((point) => point.y),
    },
  ];

  // Cálculo do espectro da série de Fourier
  const calculateSpectrum = (amplitude) => {
    const spectrumData = [];
    for (let n = 1; n <= harmonics; n++) {
      const frequency = 2 * n - 1;
      const term = (4 * amplitude) / (Math.PI * frequency);
      spectrumData.push({ x: frequency, y: term });
    }
    return spectrumData;
  };

  const spectrumData = calculateSpectrum(amplitude);

  const spectrumPlotData = [
    {
      type: 'bar',
      x: spectrumData.map((point) => point.x),
      y: spectrumData.map((point) => point.y),
    },
  ];

  const layout = {
    xaxis: { title: 'Tempo (s)' },
    yaxis: { title: 'Amplitude (V)' },
  };

  const spectrumLayout = {
    xaxis: { title: 'Frequência (Hz)' },
    yaxis: { title: 'Amplitude (V)' },
  };

  return (
    <Style>
      <header>
        <h1>Universidade Santa Cecília - Comunicações Digitais</h1>
        <h2>
          Neemias Vieira | Matheus Mota | Gabriel Nascimento | João Victor
        </h2>
      </header>
      <div>
        <section>
          <h1 className='title'>Série de Fourier</h1>
          <div className='divInput'>
            <label>Amplitude (V)</label>
            <input
              type='number'
              step='any'
              value={amplitude}
              onChange={handleAmplitudeChange}
            />
          </div>
          <div className='divInput'>
            <label>Largura (s)</label>
            <input
              type='number'
              step='any'
              value={width}
              onChange={handleWidthChange}
            />
          </div>
          <div className='divInput'>
            <label>Harmônicos</label>
            <input
              type='number'
              step='1'
              value={harmonics}
              onChange={handleHarmonicsChange}
            />
          </div>
          <div className='divInput'>
            <label>Tempo (s)</label>
            <input
              type='number'
              step='any'
              value={time}
              onChange={handleTimeChange}
            />
          </div>
          {error && <p className='error'>{error}</p>}
        </section>
        <Plot data={plotData} layout={layout} />
        <Plot data={spectrumPlotData} layout={spectrumLayout} />
      </div>
    </Style>
  );
}

export default FourierSeries;
