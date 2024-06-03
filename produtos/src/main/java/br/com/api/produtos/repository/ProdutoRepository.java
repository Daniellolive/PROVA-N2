package br.com.api.produtos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.produtos.model.ProdutoModelo;

@Repository
public interface ProdutoRepository extends CrudRepository<ProdutoModelo, Long>{
    
}
