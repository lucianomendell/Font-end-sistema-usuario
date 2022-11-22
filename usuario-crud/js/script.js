http = new XMLHttpRequest();
var lista;
var enderecoApi = "https://senac-usuario-home.herokuapp.com/api/usuario/";

listar();

function incluir() {
  var usuario = {};

  usuario.nome = document.getElementById("nome").value;
  usuario.email = document.getElementById("email").value;
  usuario.id = document.getElementById("id").value;

  if (usuario.id > 0) {
    metodo = "PUT";
  } else {
    metodo = "POST";
  }

  http.open(metodo, enderecoApi);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  http.send(JSON.stringify(usuario));
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
      texto += `<tr onclick='editar(${i})'> <td>${u.nome}</td> <td>${u.email} </td> </td>`;
      i++;
    }
    document.getElementById("lista").innerHTML = texto;
  };
}

function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("id").value = "";
}

function editar(i) {
  u = lista[i];
  document.getElementById("nome").value = u.nome;
  document.getElementById("email").value = u.email;
  document.getElementById("id").value = u.id;
}

function apagar() {
  id = document.getElementById("id").value;

  http.open("DELETE", enderecoApi + id);
  http.send();

  http.onload = function () {
    listar();
  };
}
