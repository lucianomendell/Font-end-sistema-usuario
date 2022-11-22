http = new XMLHttpRequest();
var lista;

var enderecoApi = "https://senac-usuario-home.herokuapp.com/api/produto/";

listar();

function incluir() {
  var produto = {};

  produto.id = document.getElementById("id").value;
  produto.nome = document.getElementById("nome").value;
  produto.descricao = document.getElementById("descricao").value;
  produto.valor = document.getElementById("valor").value;

  if (produto.id > 0) {
    metodo = "PUT";
  } else {
    metodo = "POST";
  }

  http.open(metodo, enderecoApi);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  http.send(JSON.stringify(produto));
  http.onload = function () {
    listar();
    limpar();
  };

  limpar();
}

function listar() {
  http.open("GET", enderecoApi);
  http.send();
  http.onload = function () {
    lista = this.responseText;
    lista = JSON.parse(lista);

    texto = "";
    i = 0;
    for (const u of lista) {
      texto += `<tr onclick='editar(${i})'> <td>${u.nome}</td> <td>${u.descricao} </td> <td>${u.valor} </td>`;
      i++;
    }
    document.getElementById("lista").innerHTML = texto;
  };
}

function limpar() {
  document.getElementById("id").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

function editar(i) {
  p = lista[i];

  document.getElementById("id").value = p.id;
  document.getElementById("nome").value = p.nome;
  document.getElementById("descricao").value = p.descricao;
  document.getElementById("valor").value = p.valor;
}

function apagar() {
  id = document.getElementById("id").value;

  http.open("DELETE", enderecoApi + id);
  http.send();
  limpar();

  http.onload = function () {
    listar();
  };
}
