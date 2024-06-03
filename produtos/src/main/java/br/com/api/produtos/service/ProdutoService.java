package br.com.api.produtos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.api.produtos.model.ProdutoModelo;
import br.com.api.produtos.model.RespostaModelo;
import br.com.api.produtos.repository.ProdutoRepository;
import java.util.Optional;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private RespostaModelo rm;

    // Método para listar todos os produtos
    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

    // Método para cadastrar ou alterar produtos 
    public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String acao){

        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            // Verificar se o ID do produto já existe no banco de dados
            Optional<ProdutoModelo> produtoExistenteOptional = pr.findById(pm.getId());
            if (produtoExistenteOptional.isPresent()) {
                // Se o produto existe, garantir que o ID permaneça o mesmo durante a alteração
                ProdutoModelo produtoExistente = produtoExistenteOptional.get();
                produtoExistente.setNome(pm.getNome());
                produtoExistente.setMarca(pm.getMarca());
                pr.save(produtoExistente); // Atualizar o produto existente
                return new ResponseEntity<ProdutoModelo>(produtoExistente, HttpStatus.OK);
            } else {
                // Se o produto não existe, tratar como uma operação de cadastro
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            }
        }
    }

    // Método para remover produtos
    public ResponseEntity<RespostaModelo> remover(long id){
        pr.deleteById(id);
        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
