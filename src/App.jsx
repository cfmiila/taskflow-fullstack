import { useState, useEffect } from 'react';
import styles from './App.module.css'; 

export default function App() {
 //config de estados (memória do componente)
  const [tarefas, setTarefas] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [carregando, setCarregando] = useState(true);

  const API_URL = 'http://localhost:5000/api/tarefas';

  
  useEffect(() => {
    async function buscarTarefas() {
      try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        setTarefas(dados);
      } catch (erro) {
        console.error("Erro ao buscar dados do servidor:", erro);
      } finally {
        setCarregando(false);
      }
    }
    buscarTarefas();
  }, []);

  
  async function lidarComEnvio(e) {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: novoTitulo })
      });

      if (resposta.ok) {
        const novaTarefa = await resposta.json();
        // Imutabilidade: espalha as antigas e adiciona a nova numa nova referência de array
        setTarefas([...tarefas, novaTarefa]);
        setNovoTitulo(''); // Limpa o campo de digitação
      }
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    }
  }

  // ATUALIZAÇÃO DO STATUS DA TAREFA (UPDATE)
  async function alternarConclusao(id) {
    try {
      const resposta = await fetch(`${API_URL}/${id}`, { method: 'PUT' });

      if (resposta.ok) {
        const tarefaAtualizada = await resposta.json();
        // Mapeia o array substituindo apenas o objeto que o backend alterou
        setTarefas(tarefas.map(t => t.id === id ? tarefaAtualizada : t));
      }
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  }

 
  if (carregando) {
    return <div className={styles.loading}>Sincronizando Dashboard...</div>;
  }

  const totalTarefas = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.container}>
        
        {/* HEADER ESTRATÉGICO */}
        <header className={styles.header}>
          <h1 className={styles.title}>Strategic Task Roadmap</h1>
          <p className={styles.subtitle}>Gerenciamento de entregáveis e marcos do projeto</p>
          
          <div className={styles.summaryBar}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>TOTAL</span>
              <span className={styles.summaryValue}>{totalTarefas}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>CONCLUÍDAS</span>
              <span className={styles.summaryValue}>{concluidas}</span>
            </div>
          </div>
        </header>

        {/* INPUT DE CADASTRO */}
        <form onSubmit={lidarComEnvio} className={styles.form}>
          <input 
            type="text" 
            placeholder="Adicionar novo marco estratégico..."
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.addButton}>ADICIONAR</button>
        </form>

        {/* LISTAGEM DINÂMICA (RENDERIZAÇÃO DE ARRAYS) */}
        <div className={styles.listContainer}>
          {tarefas.map(tarefa => (
            <div key={tarefa.id} className={styles.taskItem}>
              <div className={styles.taskContent}>
                {/* O círculo indicador de status ganha cor baseada no estado */}
                <div 
                  className={styles.statusDot} 
                  style={{ backgroundColor: tarefa.concluida ? '#10b981' : '#3b82f6' }}
                />
                {/* Estilização dinâmica condicional que risca o texto se concluída */}
                <span 
                  className={styles.taskText}
                  style={{
                    textDecoration: tarefa.concluida ? 'line-through' : 'none',
                    color: tarefa.concluida ? '#94a3b8' : '#1e293b'
                  }}
                >
                  {tarefa.titulo}
                </span>
              </div>
              
              <button 
                onClick={() => alternarConclusao(tarefa.id)}
                className={styles.actionButton}
                style={{
                  borderColor: tarefa.concluida ? '#10b981' : '#e2e8f0',
                  color: tarefa.concluida ? '#10b981' : '#1e3a8a'
                }}
              >
                {tarefa.concluida ? ' CONCLUÍDO' : 'MARCAR FOCO'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}