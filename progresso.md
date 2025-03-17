<!-- CTRL + SHIFT + V para visualizar -->    
# Melhorias do projeto

* Atualmente, ele salva o progresso das armas, mas não de uma para outra.
    * Idealmente, ao final, ele será capaz de salvar as evoluções das armas também.

* Mostrar visualmente que uma evolução não pode ser feita.

* Poder dar um reset em tudo

* Deixar o nome de todas as armas para o usuário ver em algum canto.

### useEffect
- [x] Sempre que o estado mudar, o efeito colateral desse hook será salvá-lo com **localStorage**.
- [x] Resetar a página ao clicar em um botão.
- [x] Botão para forma base.
### useRef
  - [x] Colocar num input o nome das armas e usar esse hook para acessar diretamente o nome das armas, após uma verificação.
  - [ ] Deixar colocar o nome todo em maíusculo ou todo em minúsculo.
  - [x] Talvez colocar uns || com "Arco", "Espada"...etc.
### useReducer
  - [x] Usar o reducer para a manipulação (incremento, decremento e resetar) o TitanBlood.

