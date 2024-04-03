export const fetchData = async () => {
    try {
      const timestamp = new Date().getTime(); // Unique timestamp
  
      const response1 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json?_=${timestamp}`);
      const placaNominados = await response1.json();
  
      const response2 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/participants.json?_=${timestamp}`);
      const participants = await response2.json();
  
      const response3 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/modificadores.json?_=${timestamp}`);
      const modificadores = await response3.json();

      const response4 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json?_=${timestamp}`);
      const nominaciones = await response4.json();

      const response5 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json?_=${timestamp}`);
      const participantsChart = await response5.json();
  
      return { placaNominados, participants, modificadores, nominaciones, participantsChart };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };