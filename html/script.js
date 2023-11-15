document.addEventListener('DOMContentLoaded', () => {
  carregarFuncionarios();
});

function carregarFuncionarios() {
  const selectFuncionario = document.getElementById('funcionario');

  // Substitua a URL pelo endpoint correto do seu backend
  fetch('http://localhost:3000/funcionarios')
    .then(response => response.json())
    .then(funcionarios => {
      funcionarios.forEach(funcionario => {
        const option = document.createElement('option');
        option.value = funcionario.id;
        option.textContent = funcionario.nome;
        selectFuncionario.appendChild(option);
      });
    })
    .catch(error => console.error('Erro ao carregar funcionários:', error));
}

function registrarPonto() {
  const funcionarioId = document.getElementById('funcionario').value;
  const tipoRegistro = document.getElementById('tipoRegistro').value;

  // Substitua a URL pelo endpoint correto do seu backend
  fetch('http://localhost:3000/registrar-ponto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ funcionario_id: funcionarioId, tipo_registro: tipoRegistro }),
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Erro ao registrar ponto');
      }
    })
    .then(mensagem => {
      document.getElementById('mensagem').innerHTML = `<div class="alert alert-success">${mensagem}</div>`;
    })
    .catch(error => {
      console.error('Erro ao registrar ponto:', error);
      document.getElementById('mensagem').innerHTML = `<div class="alert alert-danger">Erro ao registrar ponto</div>`;
    });
}
