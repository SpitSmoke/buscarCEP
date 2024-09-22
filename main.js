// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('btn-buscar-cep').addEventListener('click', function(){
//         // AJAX - Asynchronous JavaScript and XML
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;

//         // Configura a requisição para o endpoint
//         xhttp.open('GET', endpoint, true); // O terceiro parâmetro true é para garantir que seja assíncrona.

//         // Define o que fazer quando o estado da requisição mudar
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 // A resposta chegou com sucesso
//                 const resposta = JSON.parse(this.responseText); // Converte a resposta JSON em um objeto JavaScript
//                 console.log(resposta); // Você pode fazer algo com os dados aqui (exibir na tela, por exemplo)
//             } else if (this.readyState == 4) {
//                 // Se o código de status não for 200, algo deu errado
//                 console.error("Erro ao buscar o CEP");
//             }
//         };

//         // Envia a requisição
//         xhttp.send();

//         // https://viacep.com.br/ws/80240030/json
//     });
// });

// Requisição AJAX
        // $.ajax(endpoint).done(function(data){
        //     const logradouro = data.logradouro;
        //     const bairro = data.bairro;
        //     const cidade = data.localidade;
        //     const uf = data.uf;


        //     const endereco = `${logradouro}, ${bairro} - ${cidade} - ${uf}`;

        //     $('#endereco').val(endereco);

        //     setTimeout(function(){
        //         $(botao).find('i').removeClass('d-none');
        //         $(botao).find('span').addClass('d-none');
        //     }, 2000);

        // }).fail(function(){
        //     alert('Erro ao buscar o CEP. Verifique se ele é válido.');
        //     // Certifique-se de esconder o spinner em caso de erro também
        //     $(botao).find('i').removeClass('d-none');
        //     $(botao).find('span').addClass('d-none');
        // });
// -----------------------------------------------------------------------------------------------------------------------

$(document).ready(function() {
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').on('click', function() {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const botao = $(this);
        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        fetch(endpoint)
            .then(function(respostas) {
                return respostas.json();
            })
            .then(function(json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const uf = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${uf}`;
                $('#endereco').val(endereco);

                setTimeout(function() {
                    $(botao).find('i').removeClass('d-none');
                    $(botao).find('span').addClass('d-none');
                }, 2000);
            }).catch(function(erro){
                alert('Erro ao buscar o CEP. Verifique se ele é válido.');
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            });
            
    });
});
