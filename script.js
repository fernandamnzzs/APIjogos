async function searchGames() {
  const query = document.getElementById('searchInput').value.trim();
  const gameList = document.getElementById('gameList');
  gameList.innerHTML = '';

  if (!query) return;

  const apiKey = 'd180b1f4bea8450e816b12e3e351002d'; 
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      gameList.innerHTML = '<p>Nenhum jogo encontrado.</p>';
      return;
    }

    data.results.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';

      const image = game.background_image ?
        `<img src="${game.background_image}" alt="${game.name}">` : '';

      card.innerHTML = `
        ${image}
        <div class="game-info">
          <h3>${game.name}</h3>
          <p>Lançado em: ${new Date(game.released).toLocaleDateString()}</p>
        </div>
      `;

      gameList.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    gameList.innerHTML = '<p>Erro ao carregar jogos.</p>';
  }
}