import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';


function App() {

  //Objeto produto
  const produto = {
    id : 0,
    nome : '',
    marca : ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProdtudo, setObjProduto] = useState(produto);

  // useEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados so formulário
  const aoDigitar = (e) =>{
    setObjProduto({...objProdtudo, [e.target.name]:e.target.value});
  }

  // Cadastrar produto 
  const cadastrar = () =>{
    fetch('http://localhost:8080/cadastrar',{
      method: 'post',
      body:JSON.stringify(objProdtudo),
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      
        if(retorno_convertido.mensagem !== undefined){
          alert(retorno_convertido.mensagem);
        }else{
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario();
        }

    })
  }

  // Remover produto 
  const remover = () =>{
    fetch('http://localhost:8080/remover/'+objProdtudo.id,{
      method: 'delete',
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      
      // Mensagem
      alert(retorno_convertido.mensagem);

      // Cópia do vetor de produtos
      let vetorTemp = [...produtos];

      // Índice
      let indice = vetorTemp.findIndex((p) => {
        return p.id === objProdtudo.id;
      });

      // Remover produto do vetorTemp
      vetorTemp.splice(indice, 1);

      // Atualizar o vetor de produtos
      setProdutos(vetorTemp);

      // Limpar Formulário
      limparFormulario();

    })
  }

  // Alterar produto 
  const alterar = () =>{
    fetch('http://localhost:8080/alterar',{
      method: 'put',
      body:JSON.stringify(objProdtudo),
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      
        if(retorno_convertido.mensagem !== undefined){
          alert(retorno_convertido.mensagem);
        }else{
          
          // Mensagem
          alert('Produto alterado com sucesso!');

          // Cópia do vetor de produtos
          let vetorTemp = [...produtos];

          // Índice
          let indice = vetorTemp.findIndex((p) => {
            return p.id === objProdtudo.id;
          });

          // Alterar produto do vetorTemp
          vetorTemp[indice] = objProdtudo;

          // Atualizar o vetor de produtos
          setProdutos(vetorTemp);

          // Limpar Formulário
          limparFormulario();
        }

    })
  }

  // Limpar formulário
  const limparFormulario = () =>{
    setObjProduto(produto);
    setBtnCadastrar(true);
  }
  // Selecionar Produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false)
  }

  // Retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProdtudo} cancelar={limparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
