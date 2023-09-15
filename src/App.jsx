import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Style } from './App';

function FourierSeries() {
  // State para armazenar a amplitude da série de Fourier
  const [amplitude, setAmplitude] = useState(1);

  // State para armazenar a largura da série de Fourier
  const [width, setWidth] = useState(1);

  // State para armazenar a quantidade de harmônicos a serem usados
  const [harmonics, setHarmonics] = useState(5);

  // State para armazenar o tempo (variável de entrada)
  const [time, setTime] = useState(1);

  // State para armazenar os dados da série de Fourier
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para calcular a série de Fourier
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
          const term = (4 * amplitude / (Math.PI * frequency)) * Math.sin((2 * Math.PI * frequency * t) / width);
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
  }, [amplitude, width, harmonics, time]); // Dependências do useEffect

  // Configuração dos dados do gráfico Plotly
  const plotData = [
    {
      type: 'scatter',
      mode: 'lines',
      x: data.map((point) => point.x),
      y: data.map((point) => point.y),
    },
  ];

  // Configuração do layout do gráfico Plotly
  const layout = {
    xaxis: { title: 'Tempo (s)' },
    yaxis: { title: 'Amplitude (V)' },
  };

  return (
    <Style>

    <header>
      <h1>Universidade Santa Cecília - Comunicações Digitais</h1>
      <h2>Neemias Vieira | Matheus Mota | Gabriel Nascimento | João Victor</h2>
    </header>
    <div>
      <section>
      <h1 className='title'>Série de Fourier</h1>
      <div className="divInput">
        <label>Amplitude (V)</label>
        <input
          type="number"
          value={amplitude}
          onChange={(e) => setAmplitude(parseFloat(e.target.value))}
        />
      </div>
      <div className="divInput">
        <label>Largura (s)</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseFloat(e.target.value))}
        />
      </div>
      <div className="divInput">
        <label>Harmônicos</label>
        <input
          type="number"
          value={harmonics}
          onChange={(e) => setHarmonics(parseInt(e.target.value))}
        />
      </div>
      <div className="divInput">
        <label>Tempo (s)</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(parseFloat(e.target.value))}
        />
      </div>
      </section>
      <Plot data={plotData} layout={layout} />
    </div>
    </Style>
  );
}

export default FourierSeries;
